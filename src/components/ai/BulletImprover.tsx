/**
 * BulletImprover — improves a single bullet inline.
 */
import { useState } from "react";
import { callAI } from "@/lib/ai-service";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Wand2, Loader2, Check, X } from "lucide-react";

interface Props {
  bullet: string;
  jobTitle: string;
  onAccept: (improved: string) => void;
}

export function BulletImprover({ bullet, jobTitle, onAccept }: Props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ improved: string; reason: string } | null>(null);
  const [open, setOpen] = useState(false);

  const improve = async () => {
    if (!bullet.trim()) return;
    setLoading(true);
    const data = await callAI<{ improved: string; reason: string }>({
      functionName: "ai-improve-bullet",
      body: { bullet, jobTitle },
    });
    if (data) setResult(data);
    setLoading(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="h-6 w-6 shrink-0" title="Improve with AI" onClick={() => { setOpen(true); if (!result) improve(); }}>
          <Wand2 className="h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Improving...
          </div>
        ) : result ? (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-foreground">Improved:</p>
            <p className="text-xs text-foreground bg-accent/50 p-2 rounded">{result.improved}</p>
            <p className="text-xs text-muted-foreground italic">{result.reason}</p>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 gap-1" onClick={() => { onAccept(result.improved); setOpen(false); setResult(null); }}>
                <Check className="h-3 w-3" /> Accept
              </Button>
              <Button size="sm" variant="outline" className="flex-1 gap-1" onClick={() => { setOpen(false); setResult(null); }}>
                <X className="h-3 w-3" /> Reject
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">No result</p>
        )}
      </PopoverContent>
    </Popover>
  );
}
