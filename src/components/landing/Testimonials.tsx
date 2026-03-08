import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Software Engineer at Google",
    quote: "ResumeAI helped me tailor my resume for Google. The ATS scorer caught keywords I was missing — I got the interview on my first try!",
    stars: 5,
    initials: "PS",
    color: "bg-primary/15 text-primary",
  },
  {
    name: "James Chen",
    role: "Product Manager at Stripe",
    quote: "The AI bullet generator is incredible. It turned my vague descriptions into impactful, metrics-driven achievements in seconds.",
    stars: 5,
    initials: "JC",
    color: "bg-success/15 text-success",
  },
  {
    name: "Sarah Mitchell",
    role: "UX Designer at Figma",
    quote: "I love the Modern template — it's clean, professional, and got me compliments from every recruiter. The cover letter feature saved me hours.",
    stars: 5,
    initials: "SM",
    color: "bg-warning/15 text-warning",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <Badge variant="secondary" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Loved by job seekers worldwide
          </h2>
        </AnimatedSection>
        <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <Card className="bg-card border-border h-full">
                <CardContent className="pt-6">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-5">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${t.color}`}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
