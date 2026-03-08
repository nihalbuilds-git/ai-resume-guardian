import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  PenTool, Sparkles, Target, Zap, Shield, Download, Mail, BarChart3,
} from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const FEATURES = [
  { icon: PenTool, title: "4 Professional Templates", desc: "Modern, Classic, Minimal & ATS-Safe — all designed by HR experts for maximum impact." },
  { icon: Sparkles, title: "AI Bullet Generator", desc: "Generate powerful, action-verb bullet points tailored to your role with one click." },
  { icon: Target, title: "ATS Score Checker", desc: "Get a 0-100 compatibility score with missing keywords and section-by-section feedback." },
  { icon: Zap, title: "Resume Tailoring", desc: "Paste a job description and watch AI optimize your resume to match perfectly." },
  { icon: Mail, title: "Cover Letter Generator", desc: "AI writes personalized cover letters in formal or friendly tone — streamed in real-time." },
  { icon: Download, title: "Pixel-Perfect PDF", desc: "Export A4 PDFs that look exactly like the preview. Ready to submit anywhere." },
  { icon: Shield, title: "Data Security", desc: "Row-level security ensures only you can access your resumes. Always encrypted." },
  { icon: BarChart3, title: "Smart Dashboard", desc: "Track all your resumes, AI usage, and plan status from one beautiful dashboard." },
];

export function Features() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <Badge variant="secondary" className="mb-4">Features</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Everything you need to get hired
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            From AI-powered content to pixel-perfect exports — every tool you need in one place.
          </p>
        </AnimatedSection>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <StaggerItem key={f.title}>
              <Card className="bg-card border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group h-full">
                <CardContent className="pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1.5">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
