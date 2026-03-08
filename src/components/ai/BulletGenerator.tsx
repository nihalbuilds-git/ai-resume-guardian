/**
 * BulletGenerator — generates AI bullet points for an experience entry.
 * Shows modal with 5 suggestions, user can click to add.
 */
import { useState } from "react";
import { callAI } from "@/lib/ai-service";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, Plus, Check } from "lucide-react";

interface Props {
  jobTitle: string;
  company: string;
  onAddBullet: (bullet: string) => void;
}

export function BulletGenerator({ jobTitle, company, onAddBullet }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState("");
  const [bullets, setBullets] = useState<string[]>([]);
  const [added, setAdded] = useState<Set<number>>(new Set());

  const generate = async () => {
    setLoading(true);
    setBullets([]);
    setAdded(new Set());
    const result = await callAI<{ bullets: string[] }>({
      functionName: "ai-bullets",
      body: { jobTitle, company, responsibilities: context },
    });
    if (result?.bullets) setBullets(result.bullets);
    setLoading(false);
  };

  const handleAdd = (bullet: string, idx: number) => {
    onAddBullet(bullet);
    setAdded((prev) => new Set(prev).add(idx));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          Generate with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            AI Bullet Generator
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <Label className="text-xs">Context / Responsibilities (optional)</Label>
            <Textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Describe what you did in this role..."
              className="mt-1 text-sm"
              rows={3}
            />
          </div>
          <Button onClick={generate} disabled={loading} className="w-full">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            {loading ? "Generating..." : "Generate 5 Bullet Points"}
          </Button>
        </div>

        {bullets.length > 0 && (
          <div className="space-y-2 mt-2">
            {bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-md border border-border bg-muted/50">
                <p className="text-xs flex-1">{b}</p>
                <Button
                  size="icon"
                  variant={added.has(i) ? "default" : "outline"}
                  className="h-7 w-7 shrink-0"
                  onClick={() => handleAdd(b, i)}
                  disabled={added.has(i)}
                >
                  {added.has(i) ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                </Button>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
