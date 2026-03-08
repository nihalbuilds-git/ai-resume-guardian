/**
 * AICreditsIndicator — shows remaining AI credits for the current user.
 */
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles } from "lucide-react";

export function AICreditsIndicator() {
  const { profile } = useAuth();
  const isPro = profile?.plan === "pro";
  const used = profile?.ai_credits_used ?? 0;
  const max = 5;

  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground border border-border rounded-md px-2 py-1">
      <Sparkles className="h-3 w-3 text-primary" />
      {isPro ? (
        <span>AI: <span className="text-foreground font-medium">Unlimited</span></span>
      ) : (
        <span>AI: <span className="text-foreground font-medium">{used}/{max}</span> credits</span>
      )}
    </div>
  );
}
