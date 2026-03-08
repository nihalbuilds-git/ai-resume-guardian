import { Users, FileCheck, Star, TrendingUp } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

const STATS = [
  { icon: Users, value: "10,000+", label: "Resumes Created" },
  { icon: FileCheck, value: "95%", label: "ATS Pass Rate" },
  { icon: Star, value: "4.9/5", label: "User Rating" },
  { icon: TrendingUp, value: "3x", label: "More Interviews" },
];

export function SocialProof() {
  return (
    <section className="py-12 border-y border-border bg-card">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-2xl md:text-3xl font-bold text-foreground">{s.value}</span>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
