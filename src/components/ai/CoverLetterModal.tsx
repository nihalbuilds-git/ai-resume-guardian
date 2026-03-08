/**
 * CoverLetterModal — generates a streaming cover letter with tone selection.
 */
import { useState, useRef } from "react";
import { streamAI } from "@/lib/ai-service";
import { ResumeData } from "@/types/resume";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, Loader2, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface Props {
  data: ResumeData;
}

export function CoverLetterModal({ data }: Props) {
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<"formal" | "friendly">("formal");
  const [jd, setJd] = useState("");
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const letterRef = useRef("");

  const generate = async () => {
    setLoading(true);
    setLetter("");
    letterRef.current = "";

    await streamAI({
      functionName: "ai-cover-letter",
      body: { resumeData: data, jobDescription: jd, tone },
      onDelta: (text) => {
        letterRef.current += text;
        setLetter(letterRef.current);
      },
      onDone: () => setLoading(false),
    });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(letter);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-1.5">
          <FileText className="h-3.5 w-3.5" />
          Cover Letter
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            AI Cover Letter
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {/* Tone Selector */}
          <div>
            <Label className="text-xs mb-1.5 block">Tone</Label>
            <div className="flex gap-2">
              {(["formal", "friendly"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`px-3 py-1.5 rounded-md text-xs border transition-all capitalize ${
                    tone === t
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Job Description */}
          <div>
            <Label className="text-xs">Job Description</Label>
            <Textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Paste the job description..."
              className="mt-1 text-sm"
              rows={4}
            />
          </div>

          <Button onClick={generate} disabled={loading || !jd.trim()} className="w-full">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
            {loading ? "Generating..." : "Generate Cover Letter"}
          </Button>
        </div>

        {/* Output */}
        {letter && (
          <div className="mt-3 space-y-2">
            <Textarea
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              className="text-sm min-h-[200px]"
              rows={12}
            />
            <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-1.5">
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
