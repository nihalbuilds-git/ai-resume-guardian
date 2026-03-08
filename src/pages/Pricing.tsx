/**
 * Pricing page — Free vs Pro comparison.
 */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Crown, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlanLimits } from "@/hooks/use-plan-limits";

const PLANS = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: "₹0",
    yearlyPrice: "₹0",
    period: "forever",
    features: [
      { text: "1 resume", included: true },
      { text: "3 templates (Classic, Minimal, ATS)", included: true },
      { text: "5 AI credits/month", included: true },
      { text: "PDF export", included: true },
      { text: "Basic support", included: true },
      { text: "Unlimited resumes", included: false },
      { text: "Modern template", included: false },
      { text: "Unlimited AI credits", included: false },
      { text: "Cover letter generator", included: false },
      { text: "ATS score checker", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: "₹199",
    yearlyPrice: "₹1,799",
    period: "",
    popular: true,
    features: [
      { text: "Unlimited resumes", included: true },
      { text: "All 4 templates", included: true },
      { text: "Unlimited AI credits", included: true },
      { text: "PDF export", included: true },
      { text: "Cover letter generator", included: true },
      { text: "ATS score checker", included: true },
      { text: "Resume tailoring", included: true },
      { text: "Priority support", included: true },
      { text: "Early access to new features", included: true },
    ],
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const navigate = useNavigate();
  const { isPro } = usePlanLimits();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back */}
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">Simple, transparent pricing</h1>
          <p className="text-muted-foreground">Choose the plan that fits your career goals</p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center gap-2 mb-10">
          <Button size="sm" variant={billing === "monthly" ? "default" : "outline"} onClick={() => setBilling("monthly")}>
            Monthly
          </Button>
          <Button size="sm" variant={billing === "yearly" ? "default" : "outline"} onClick={() => setBilling("yearly")}>
            Yearly
            <Badge variant="secondary" className="ml-1.5 text-[10px]">Save 25%</Badge>
          </Button>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-6">
          {PLANS.map((plan) => {
            const price = billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
            const period = plan.id === "free" ? "" : billing === "monthly" ? "/month" : "/year";
            const isCurrent = (isPro && plan.id === "pro") || (!isPro && plan.id === "free");

            return (
              <Card key={plan.id} className={plan.popular ? "border-primary shadow-lg relative" : ""}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Crown className="mr-1 h-3 w-3" /> Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-foreground">{price}</span>
                    <span className="text-muted-foreground">{period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-center gap-2 text-sm">
                        {f.included ? (
                          <Check className="h-4 w-4 text-primary shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                        )}
                        <span className={f.included ? "text-foreground" : "text-muted-foreground/60"}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    disabled={isCurrent}
                  >
                    {isCurrent ? "Current Plan" : plan.id === "free" ? "Get Started" : "Upgrade to Pro"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
