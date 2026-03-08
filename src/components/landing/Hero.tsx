import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, FileText } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
            <Sparkles className="mr-1.5 h-3.5 w-3.5 text-primary" />
            AI-Powered Resume Builder
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.08]"
        >
          Land your dream job with an{" "}
          <span className="text-primary">AI-crafted</span> resume
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Create stunning, ATS-optimized resumes in minutes. Our AI writes bullet points,
          tailors content to job descriptions, and scores your resume against real ATS systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/register">
            <Button size="lg" className="text-base px-8 py-6 shadow-lg shadow-primary/20">
              Start Building for Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="text-base px-8 py-6">
              Sign In
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-sm text-muted-foreground"
        >
          No credit card required · Free forever plan
        </motion.p>

        {/* Editor mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 mx-auto max-w-5xl"
        >
          <div className="rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10 overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/60">
              <div className="w-3 h-3 rounded-full bg-[hsl(0,70%,60%)]" />
              <div className="w-3 h-3 rounded-full bg-[hsl(40,80%,60%)]" />
              <div className="w-3 h-3 rounded-full bg-[hsl(140,60%,50%)]" />
              <span className="ml-2 text-xs text-muted-foreground font-medium">ResumeAI Editor</span>
            </div>

            <div className="flex h-[360px] md:h-[440px]">
              {/* Left panel — form editor */}
              <div className="w-2/5 border-r border-border p-5 space-y-4 hidden md:block overflow-hidden bg-background">
                {/* Section: Personal Info */}
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-primary tracking-wide uppercase">Personal Info</p>
                </div>
                <div className="space-y-2.5">
                  <div className="h-9 rounded-md bg-muted border border-border flex items-center px-3">
                    <span className="text-xs text-muted-foreground">John Anderson</span>
                  </div>
                  <div className="h-9 rounded-md bg-muted border border-border flex items-center px-3">
                    <span className="text-xs text-muted-foreground">john@example.com</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-9 flex-1 rounded-md bg-muted border border-border flex items-center px-3">
                      <span className="text-xs text-muted-foreground">Software Engineer</span>
                    </div>
                    <div className="h-9 w-28 rounded-md bg-muted border border-border flex items-center px-3">
                      <span className="text-xs text-muted-foreground">San Francisco</span>
                    </div>
                  </div>
                </div>

                {/* Section: Summary */}
                <div className="space-y-1 pt-1">
                  <p className="text-[11px] font-semibold text-primary tracking-wide uppercase">Summary</p>
                </div>
                <div className="h-[68px] rounded-md bg-muted border border-border p-2.5">
                  <span className="text-[10px] text-muted-foreground leading-relaxed">
                    Experienced software engineer with 5+ years building scalable web applications…
                  </span>
                </div>

                {/* Section: Experience */}
                <div className="space-y-1 pt-1">
                  <p className="text-[11px] font-semibold text-primary tracking-wide uppercase">Experience</p>
                </div>
                <div className="space-y-2">
                  <div className="h-9 rounded-md bg-muted border border-border flex items-center px-3">
                    <span className="text-xs text-muted-foreground">Senior Dev · TechCorp</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-9 flex-1 rounded-md bg-muted border border-border flex items-center px-3">
                      <span className="text-xs text-muted-foreground">Jan 2021</span>
                    </div>
                    <div className="h-9 w-24 rounded-md bg-muted border border-border flex items-center px-3">
                      <span className="text-xs text-muted-foreground">Present</span>
                    </div>
                  </div>
                </div>

                {/* AI Buttons */}
                <div className="flex gap-2 pt-1">
                  <div className="h-8 px-3 rounded-md bg-primary/15 border border-primary/30 flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-primary" />
                    <span className="text-[10px] font-medium text-primary">AI Improve</span>
                  </div>
                  <div className="h-8 px-3 rounded-md bg-muted border border-border flex items-center">
                    <span className="text-[10px] text-muted-foreground">+ Add Section</span>
                  </div>
                </div>
              </div>

              {/* Right panel — resume preview */}
              <div className="flex-1 flex items-center justify-center bg-muted/40 p-6">
                <div className="w-full max-w-[300px] bg-card rounded-lg shadow-xl border border-border p-6 space-y-3.5">
                  {/* Header */}
                  <div className="text-center space-y-1 pb-2 border-b border-border">
                    <p className="text-sm font-bold text-foreground">John Anderson</p>
                    <p className="text-[10px] text-muted-foreground">Software Engineer · San Francisco, CA</p>
                    <p className="text-[9px] text-muted-foreground/70">john@example.com · (555) 123-4567</p>
                  </div>

                  {/* Summary */}
                  <div className="space-y-1.5">
                    <p className="text-[9px] font-bold text-primary uppercase tracking-wider">Summary</p>
                    <div className="space-y-1">
                      <div className="h-1.5 w-full rounded-full bg-muted-foreground/20" />
                      <div className="h-1.5 w-[90%] rounded-full bg-muted-foreground/20" />
                      <div className="h-1.5 w-[70%] rounded-full bg-muted-foreground/20" />
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="space-y-2">
                    <p className="text-[9px] font-bold text-primary uppercase tracking-wider">Experience</p>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <p className="text-[10px] font-semibold text-foreground/80">Senior Developer</p>
                        <p className="text-[8px] text-muted-foreground">2021–Present</p>
                      </div>
                      <p className="text-[9px] text-muted-foreground/70">TechCorp Inc.</p>
                      <div className="space-y-0.5 pl-2 border-l-2 border-primary/20">
                        <div className="h-1.5 w-full rounded-full bg-muted-foreground/15" />
                        <div className="h-1.5 w-[85%] rounded-full bg-muted-foreground/15" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <p className="text-[10px] font-semibold text-foreground/80">Frontend Engineer</p>
                        <p className="text-[8px] text-muted-foreground">2019–2021</p>
                      </div>
                      <p className="text-[9px] text-muted-foreground/70">StartupXYZ</p>
                      <div className="space-y-0.5 pl-2 border-l-2 border-primary/20">
                        <div className="h-1.5 w-full rounded-full bg-muted-foreground/15" />
                        <div className="h-1.5 w-[75%] rounded-full bg-muted-foreground/15" />
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-1.5">
                    <p className="text-[9px] font-bold text-primary uppercase tracking-wider">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {["React", "TypeScript", "Node.js", "AWS", "Python"].map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-full bg-primary/10 text-[8px] font-medium text-primary">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ATS Score badge */}
                  <div className="flex items-center justify-center pt-1">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 border border-success/20">
                      <div className="w-2 h-2 rounded-full bg-success" />
                      <span className="text-[9px] font-semibold text-success">ATS Score: 92/100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
