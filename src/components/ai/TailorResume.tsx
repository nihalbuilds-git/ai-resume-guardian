/**
 * TailorResume — tailors resume to a specific job description.
 * Shows diff of changes, user can accept/reject.
 */
import { useState } from "react";
import { callAI } from "@/lib/ai-service";
import { ResumeData } from "@/types/resume";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Target, Loader2, Check, X } from "lucide-react";

interface TailorResult {
  updatedSummary: string;
  suggestedSkills: string[];
  improvedBullets: { original: string; improved: string; experienceId?: string }[];
  keywordsFound: string[];
  keywordsMissing: string[];
}

interface Props {
  data: ResumeData;
  onApplySummary: (summary: string) => void;
  onAddSkills: (skills: string[]) => void;
}

export function TailorResume({ data, onApplySummary, onAddSkills }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState<TailorResult | null>(null);
  const [summaryApplied, setSummaryApplied] = useState(false);
  const [skillsApplied, setSkillsApplied] = useState(false);

  const tailor = async () => {
    setLoading(true);
    setSummaryApplied(false);
    setSkillsApplied(false);
    const res = await callAI<TailorResult>({
      functionName: "ai-tailor",
      body: { resumeData: data, jobDescription: jd },
    });
    if (res) setResult(res);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setResult(null); }}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-1.5">
          <Target className="h-3.5 w-3.5" />
          Tailor to Job
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Tailor Resume to Job
          </DialogTitle>
        </DialogHeader>

        {!result ? (
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Paste Job Description</Label>
              <Textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the full job description here..."
                className="mt-1 text-sm"
                rows={6}
              />
            </div>
            <Button onClick={tailor} disabled={loading || !jd.trim()} className="w-full">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Target className="mr-2 h-4 w-4" />}
              {loading ? "Tailoring..." : "Tailor My Resume"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Keywords */}
            <div className="flex gap-4">
              {result.keywordsFound.length > 0 && (
                <div className="flex-1">
                  <p className="text-xs font-semibold text-foreground mb-1">Keywords Found ✓</p>
                  <div className="flex flex-wrap gap-1">
                    {result.keywordsFound.map((k, i) => (
                      <Badge key={i} variant="outline" className="text-xs border-green-500/50 text-green-600">{k}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {result.keywordsMissing.length > 0 && (
                <div className="flex-1">
                  <p className="text-xs font-semibold text-foreground mb-1">Missing Keywords</p>
                  <div className="flex flex-wrap gap-1">
                    {result.keywordsMissing.map((k, i) => (
                      <Badge key={i} variant="outline" className="text-xs border-destructive/50 text-destructive">{k}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Updated Summary */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground">Optimized Summary</p>
              <div className="text-xs p-2 rounded border border-border bg-muted/50">{result.updatedSummary}</div>
              <Button
                size="sm"
                className="gap-1"
                disabled={summaryApplied}
                onClick={() => { onApplySummary(result.updatedSummary); setSummaryApplied(true); }}
              >
                {summaryApplied ? <Check className="h-3 w-3" /> : null}
                {summaryApplied ? "Applied" : "Apply Summary"}
              </Button>
            </div>

            {/* Suggested Skills */}
            {result.suggestedSkills.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground">Suggested Skills to Add</p>
                <div className="flex flex-wrap gap-1">
                  {result.suggestedSkills.map((s, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{s}</Badge>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1"
                  disabled={skillsApplied}
                  onClick={() => { onAddSkills(result.suggestedSkills); setSkillsApplied(true); }}
                >
                  {skillsApplied ? <Check className="h-3 w-3" /> : null}
                  {skillsApplied ? "Added" : "Add All Skills"}
                </Button>
              </div>
            )}

            {/* Improved Bullets */}
            {result.improvedBullets.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground">Improved Bullets</p>
                {result.improvedBullets.map((b, i) => (
                  <div key={i} className="text-xs p-2 rounded border border-border space-y-1">
                    <div className="text-muted-foreground line-through">{b.original}</div>
                    <div className="text-foreground font-medium">{b.improved}</div>
                  </div>
                ))}
              </div>
            )}

            <Button variant="outline" onClick={() => setResult(null)} className="w-full text-xs">
              Try Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
