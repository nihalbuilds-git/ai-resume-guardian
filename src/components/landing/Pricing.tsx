import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Crown } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

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

export function Pricing() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <Badge variant="secondary" className="mb-4">Pricing</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-muted-foreground">Start free. Upgrade when you're ready.</p>
        </AnimatedSection>
        <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {PLANS.map((plan) => (
            <StaggerItem key={plan.name}>
              <Card className={`h-full ${plan.popular ? "border-primary shadow-xl shadow-primary/10 relative" : ""}`}>
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
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
