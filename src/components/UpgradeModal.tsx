/**
 * UpgradeModal — shown when a user hits a plan limit.
 * Supports different trigger reasons (resume limit, AI credits, template, feature).
 */
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PRO_FEATURES = [
  "Unlimited resumes",
  "All 4 premium templates",
  "Unlimited AI credits",
  "Cover letter generator",
  "ATS score checker",
  "Resume tailoring",
  "Priority support",
  "Early access to new features",
];

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reason?: "resume_limit" | "ai_credits" | "template" | "feature";
}

const REASON_TEXT: Record<string, { title: string; desc: string }> = {
  resume_limit: {
    title: "Resume limit reached",
    desc: "Free plan allows 1 resume. Upgrade to Pro for unlimited resumes.",
  },
  ai_credits: {
    title: "AI credits exhausted",
    desc: "You've used all 5 free AI credits this month. Upgrade for unlimited.",
  },
  template: {
    title: "Premium template",
    desc: "This template is available on the Pro plan.",
  },
  feature: {
    title: "Pro feature",
    desc: "This feature requires a Pro subscription.",
  },
};

export function UpgradeModal({ open, onOpenChange, reason = "feature" }: UpgradeModalProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const navigate = useNavigate();
  const info = REASON_TEXT[reason];

  const price = billing === "monthly" ? "₹199" : "₹1,799";
  const period = billing === "monthly" ? "/month" : "/year";
  const savings = billing === "yearly" ? "Save 25%" : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Crown className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center">{info.title}</DialogTitle>
          <DialogDescription className="text-center">{info.desc}</DialogDescription>
        </DialogHeader>

        {/* Billing toggle */}
        <div className="flex justify-center gap-2 my-2">
          <Button
            size="sm"
            variant={billing === "monthly" ? "default" : "outline"}
            onClick={() => setBilling("monthly")}
          >
            Monthly
          </Button>
          <Button
            size="sm"
            variant={billing === "yearly" ? "default" : "outline"}
            onClick={() => setBilling("yearly")}
          >
            Yearly
            {savings && <Badge variant="secondary" className="ml-1.5 text-[10px]">{savings}</Badge>}
          </Button>
        </div>

        {/* Price */}
        <div className="text-center my-2">
          <span className="text-3xl font-bold text-foreground">{price}</span>
          <span className="text-muted-foreground">{period}</span>
        </div>

        {/* Features */}
        <ul className="space-y-2 my-4">
          {PRO_FEATURES.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-foreground">
              <Check className="h-4 w-4 text-primary shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <Button
          className="w-full"
          onClick={() => {
            onOpenChange(false);
            navigate("/dashboard/billing");
          }}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Upgrade to Pro
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          Stripe integration coming soon. Contact support to upgrade.
        </p>
      </DialogContent>
    </Dialog>
  );
}
