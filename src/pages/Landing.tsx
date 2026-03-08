/**
 * Landing page — public-facing marketing page with hero, features, pricing, testimonials, and CTA.
 */
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText, Sparkles, Target, Zap, Shield, Download,
  PenTool, BarChart3, Mail, Check, X, Crown, Star,
  ArrowRight, ChevronRight,
} from "lucide-react";

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-40 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
          <Sparkles className="mr-1.5 h-3.5 w-3.5 text-primary" />
          AI-Powered Resume Builder
        </Badge>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.08]">
          Land your dream job with an{" "}
          <span className="text-primary">AI-crafted</span> resume
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Create stunning, ATS-optimized resumes in minutes. Our AI writes bullet points,
          tailors content to job descriptions, and scores your resume against real ATS systems.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
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
        </div>

        <p className="mt-4 text-sm text-muted-foreground">No credit card required · Free forever plan</p>

        {/* Preview mockup */}
        <div className="mt-16 mx-auto max-w-5xl">
          <div className="rounded-2xl border border-border bg-card shadow-2xl shadow-primary/5 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-green-400/60" />
              <span className="ml-2 text-xs text-muted-foreground">ResumeAI Editor</span>
            </div>
            <div className="flex h-[380px] md:h-[460px]">
              {/* Left panel — form mock */}
              <div className="w-2/5 border-r border-border p-5 space-y-4 hidden md:block overflow-hidden">
                <div className="h-3 w-28 rounded bg-primary/25" />
                <div className="space-y-2.5">
                  <div className="h-9 rounded-md bg-muted border border-border" />
                  <div className="h-9 rounded-md bg-muted border border-border" />
                  <div className="flex gap-2">
                    <div className="h-9 flex-1 rounded-md bg-muted border border-border" />
                    <div className="h-9 flex-1 rounded-md bg-muted border border-border" />
                  </div>
                </div>
                <div className="h-3 w-24 rounded bg-primary/25 mt-3" />
                <div className="h-20 rounded-md bg-muted border border-border" />
                <div className="h-3 w-20 rounded bg-primary/25 mt-3" />
                <div className="space-y-2">
                  <div className="h-9 rounded-md bg-muted border border-border" />
                  <div className="flex gap-2">
                    <div className="h-9 flex-1 rounded-md bg-muted border border-border" />
                    <div className="h-9 w-24 rounded-md bg-muted border border-border" />
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <div className="h-9 w-28 rounded-md bg-primary/20 flex items-center justify-center">
                    <Sparkles className="h-3.5 w-3.5 text-primary/50" />
                  </div>
                  <div className="h-9 w-24 rounded-md bg-muted border border-border" />
                </div>
              </div>
              {/* Right — resume preview mock */}
              <div className="flex-1 flex items-center justify-center bg-muted/20 p-6">
                <div className="w-full max-w-[300px] bg-card rounded-lg shadow-lg border border-border p-6 space-y-3.5">
                  {/* Header */}
                  <div className="flex gap-3 items-start">
                    <div className="w-11 h-11 rounded-lg bg-primary/20 shrink-0 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary/40" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3.5 w-3/4 rounded bg-foreground/15" />
                      <div className="h-2.5 w-1/2 rounded bg-muted-foreground/20" />
                    </div>
                  </div>
                  <div className="h-px bg-border" />
                  {/* Summary */}
                  <div className="space-y-1.5">
                    <div className="h-2.5 w-16 rounded bg-primary/20" />
                    <div className="h-2 w-full rounded bg-muted-foreground/12" />
                    <div className="h-2 w-5/6 rounded bg-muted-foreground/12" />
                    <div className="h-2 w-4/6 rounded bg-muted-foreground/12" />
                  </div>
                  <div className="h-px bg-border" />
                  {/* Experience */}
                  <div className="space-y-1.5">
                    <div className="h-2.5 w-20 rounded bg-primary/20" />
                    <div className="flex justify-between items-center">
                      <div className="h-2.5 w-28 rounded bg-foreground/12" />
                      <div className="h-2 w-16 rounded bg-muted-foreground/15" />
                    </div>
                    <div className="h-2 w-full rounded bg-muted-foreground/10" />
                    <div className="h-2 w-5/6 rounded bg-muted-foreground/10" />
                    <div className="flex justify-between items-center mt-1">
                      <div className="h-2.5 w-24 rounded bg-foreground/12" />
                      <div className="h-2 w-14 rounded bg-muted-foreground/15" />
                    </div>
                    <div className="h-2 w-full rounded bg-muted-foreground/10" />
                    <div className="h-2 w-3/4 rounded bg-muted-foreground/10" />
                  </div>
                  <div className="h-px bg-border" />
                  {/* Skills */}
                  <div className="space-y-1.5">
                    <div className="h-2.5 w-12 rounded bg-primary/20" />
                    <div className="flex flex-wrap gap-1.5">
                      <div className="h-5 w-14 rounded-full bg-primary/10" />
                      <div className="h-5 w-16 rounded-full bg-primary/10" />
                      <div className="h-5 w-12 rounded-full bg-primary/10" />
                      <div className="h-5 w-18 rounded-full bg-primary/10" />
                      <div className="h-5 w-14 rounded-full bg-primary/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Features ─── */
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

function Features() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Features</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Everything you need to get hired
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            From AI-powered content to pixel-perfect exports — every tool you need in one place.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <Card key={f.title} className="bg-card border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
              <CardContent className="pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ─── */
const PLANS = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    features: [
      { text: "1 resume", ok: true },
      { text: "3 templates", ok: true },
      { text: "5 AI credits/month", ok: true },
      { text: "PDF export", ok: true },
      { text: "Unlimited resumes", ok: false },
      { text: "Unlimited AI", ok: false },
    ],
  },
  {
    name: "Pro",
    price: "₹199",
    period: "/month",
    popular: true,
    features: [
      { text: "Unlimited resumes", ok: true },
      { text: "All 4 templates", ok: true },
      { text: "Unlimited AI credits", ok: true },
      { text: "Cover letter generator", ok: true },
      { text: "ATS score checker", ok: true },
      { text: "Priority support", ok: true },
    ],
  },
];

function Pricing() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Pricing</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-muted-foreground">Start free. Upgrade when you're ready.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {PLANS.map((plan) => (
            <Card key={plan.name} className={plan.popular ? "border-primary shadow-xl shadow-primary/10 relative" : ""}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Crown className="mr-1 h-3 w-3" /> Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-2 text-sm">
                      {f.ok ? <Check className="h-4 w-4 text-primary shrink-0" /> : <X className="h-4 w-4 text-muted-foreground/40 shrink-0" />}
                      <span className={f.ok ? "text-foreground" : "text-muted-foreground/50"}>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register">
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    {plan.popular ? "Get Started" : "Start Free"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Software Engineer at Google",
    quote: "ResumeAI helped me tailor my resume for Google. The ATS scorer caught keywords I was missing — I got the interview on my first try!",
    stars: 5,
  },
  {
    name: "James Chen",
    role: "Product Manager at Stripe",
    quote: "The AI bullet generator is incredible. It turned my vague descriptions into impactful, metrics-driven achievements in seconds.",
    stars: 5,
  },
  {
    name: "Sarah Mitchell",
    role: "UX Designer at Figma",
    quote: "I love the Modern template — it's clean, professional, and got me compliments from every recruiter. The cover letter feature saved me hours.",
    stars: 5,
  },
];

function Testimonials() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Loved by job seekers worldwide
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">"{t.quote}"</p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl bg-primary px-8 py-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary-foreground)/0.08),transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to build your perfect resume?
            </h2>
            <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">
              Join thousands of professionals who landed their dream jobs with ResumeAI.
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-base px-8 py-6 shadow-lg">
                Get Started — It's Free
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground text-lg">ResumeAI</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
            <FileText className="h-3 w-3 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground">ResumeAI</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} ResumeAI. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <div id="features"><Features /></div>
        <div id="pricing"><Pricing /></div>
        <div id="testimonials"><Testimonials /></div>
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
