import { Badge } from "@/components/ui/badge";
import { UserPlus, PenTool, Download } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const STEPS = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Account",
    desc: "Sign up for free in seconds. No credit card required — start building immediately.",
  },
  {
    icon: PenTool,
    step: "02",
    title: "Build Your Resume",
    desc: "Choose a template, fill in your details, and let AI generate impactful bullet points.",
  },
  {
    icon: Download,
    step: "03",
    title: "Download & Apply",
    desc: "Export a pixel-perfect PDF, check your ATS score, and start landing interviews.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <Badge variant="secondary" className="mb-4">How it Works</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Three steps to your perfect resume
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Go from zero to a professional, ATS-optimized resume in under 10 minutes.
          </p>
        </AnimatedSection>
        <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {STEPS.map((s, i) => (
            <StaggerItem key={s.step}>
              <div className="relative text-center group">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px border-t-2 border-dashed border-border" />
                )}
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <s.icon className="h-8 w-8" />
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px] mx-auto">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
