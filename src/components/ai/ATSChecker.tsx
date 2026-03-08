/**
 * ATSChecker — ATS score analyzer with animated score, keywords, suggestions.
 */
import { useState } from "react";
import { callAI } from "@/lib/ai-service";
import { ResumeData } from "@/types/resume";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScanSearch, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ATSResult {
  score: number;
  missingKeywords: string[];
  suggestions: string[];
  sectionScores: Record<string, number>;
}

interface Props {
  data: ResumeData;
}

export function ATSChecker({ data }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState<ATSResult | null>(null);

  const analyze = async () => {
    setLoading(true);
    const res = await callAI<ATSResult>({
      functionName: "ai-ats-score",
      body: { resumeData: data, jobDescription: jd },
    });
    if (res) setResult(res);
    setLoading(false);
  };

  const scoreColor = (s: number) => s >= 70 ? "text-green-500" : s >= 40 ? "text-yellow-500" : "text-red-500";
  const progressColor = (s: number) => s >= 70 ? "bg-green-500" : s >= 40 ? "bg-yellow-500" : "bg-red-500";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-1.5">
          <ScanSearch className="h-3.5 w-3.5" />
          ATS Score
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ScanSearch className="h-4 w-4 text-primary" />
            ATS Compatibility Check
          </DialogTitle>
        </DialogHeader>

        {!result ? (
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Job Description (optional)</Label>
              <Textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the job description to check keyword match..."
                className="mt-1 text-sm"
                rows={5}
              />
            </div>
            <Button onClick={analyze} disabled={loading} className="w-full">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ScanSearch className="mr-2 h-4 w-4" />}
              {loading ? "Analyzing..." : "Analyze Resume"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Score Circle */}
            <div className="flex flex-col items-center py-4">
              <div className={cn("text-5xl font-bold", scoreColor(result.score))}>
                {result.score}
              </div>
              <p className="text-sm text-muted-foreground mt-1">ATS Score out of 100</p>
            </div>

            {/* Section Scores */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground">Section Breakdown</p>
              {Object.entries(result.sectionScores).map(([key, val]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="capitalize text-muted-foreground">{key}</span>
                    <span className={scoreColor(val as number)}>{val as number}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-500", progressColor(val as number))}
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Missing Keywords */}
            {result.missingKeywords.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-foreground mb-1.5">Missing Keywords</p>
                <div className="flex flex-wrap gap-1">
                  {result.missingKeywords.map((kw, i) => (
                    <Badge key={i} variant="outline" className="text-xs border-destructive/50 text-destructive">
                      {kw}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {result.suggestions.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-foreground mb-1.5">Suggestions</p>
                <ul className="space-y-1">
                  {result.suggestions.map((s, i) => (
                    <li key={i} className="text-xs text-muted-foreground pl-3 relative before:content-['•'] before:absolute before:left-0">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button variant="outline" onClick={() => setResult(null)} className="w-full text-xs">
              Check Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
