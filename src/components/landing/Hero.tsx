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
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-warning" />
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="ml-2 text-xs text-muted-foreground font-medium">ResumeAI Editor</span>
            </div>
            <div className="flex h-[340px] md:h-[420px]">
              {/* Left panel */}
              <div className="w-2/5 border-r border-border p-5 space-y-3.5 hidden md:block overflow-hidden">
                <div className="h-3.5 w-28 rounded bg-primary/30 font-medium" />
                <div className="space-y-2">
                  <div className="h-9 rounded-md bg-muted/80 border border-border" />
                  <div className="h-9 rounded-md bg-muted/80 border border-border" />
                  <div className="flex gap-2">
                    <div className="h-9 flex-1 rounded-md bg-muted/80 border border-border" />
                    <div className="h-9 flex-1 rounded-md bg-muted/80 border border-border" />
                  </div>
                </div>
                <div className="h-3.5 w-24 rounded bg-primary/30 mt-2" />
                <div className="h-[72px] rounded-md bg-muted/80 border border-border" />
                <div className="h-3.5 w-20 rounded bg-primary/30 mt-2" />
                <div className="space-y-2">
                  <div className="h-9 rounded-md bg-muted/80 border border-border" />
                  <div className="flex gap-2">
                    <div className="h-9 flex-1 rounded-md bg-muted/80 border border-border" />
                    <div className="h-9 w-24 rounded-md bg-muted/80 border border-border" />
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <div className="h-9 w-28 rounded-md bg-primary/20 flex items-center justify-center">
                    <Sparkles className="h-3.5 w-3.5 text-primary/60" />
                  </div>
                  <div className="h-9 w-24 rounded-md bg-muted/80 border border-border" />
                </div>
              </div>
              {/* Right preview */}
              <div className="flex-1 flex items-center justify-center bg-muted/30 p-6">
                <div className="w-full max-w-[280px] bg-card rounded-lg shadow-lg border border-border p-5 space-y-3">
                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/25 shrink-0 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-primary/50" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3.5 w-3/4 rounded bg-foreground/20" />
                      <div className="h-2.5 w-1/2 rounded bg-muted-foreground/25" />
                    </div>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="space-y-1.5">
                    <div className="h-2.5 w-14 rounded bg-primary/25" />
                    <div className="h-2 w-full rounded bg-muted-foreground/15" />
                    <div className="h-2 w-5/6 rounded bg-muted-foreground/15" />
                    <div className="h-2 w-4/6 rounded bg-muted-foreground/15" />
                  </div>
                  <div className="h-px bg-border" />
                  <div className="space-y-1.5">
                    <div className="h-2.5 w-20 rounded bg-primary/25" />
                    <div className="flex justify-between">
                      <div className="h-2.5 w-28 rounded bg-foreground/15" />
                      <div className="h-2 w-14 rounded bg-muted-foreground/20" />
                    </div>
                    <div className="h-2 w-full rounded bg-muted-foreground/12" />
                    <div className="h-2 w-5/6 rounded bg-muted-foreground/12" />
                    <div className="flex justify-between mt-1">
                      <div className="h-2.5 w-24 rounded bg-foreground/15" />
                      <div className="h-2 w-12 rounded bg-muted-foreground/20" />
                    </div>
                    <div className="h-2 w-full rounded bg-muted-foreground/12" />
                    <div className="h-2 w-3/4 rounded bg-muted-foreground/12" />
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex flex-wrap gap-1.5">
                    <div className="h-5 w-14 rounded-full bg-primary/15" />
                    <div className="h-5 w-16 rounded-full bg-primary/15" />
                    <div className="h-5 w-12 rounded-full bg-primary/15" />
                    <div className="h-5 w-14 rounded-full bg-primary/15" />
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
