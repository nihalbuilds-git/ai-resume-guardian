/**
 * Billing settings page — plan info, usage stats, upgrade.
 */
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Crown, FileText, Sparkles, ExternalLink } from "lucide-react";
import { usePlanLimits } from "@/hooks/use-plan-limits";
import { useNavigate } from "react-router-dom";

export default function Billing() {
  const { isPro, plan, resumeCount, aiCreditsUsed, limits } = usePlanLimits();
  const navigate = useNavigate();

  const maxResumes = isPro ? "∞" : limits.maxResumes;
  const maxAI = isPro ? "∞" : limits.maxAICredits;
  const resumePercent = isPro ? 0 : Math.min((resumeCount / limits.maxResumes) * 100, 100);
  const aiPercent = isPro ? 0 : Math.min((aiCreditsUsed / limits.maxAICredits) * 100, 100);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 max-w-3xl">
            <h1 className="text-2xl font-bold text-foreground mb-6">Billing & Plan</h1>

            {/* Current Plan */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {isPro && <Crown className="h-5 w-5 text-primary" />}
                      {isPro ? "Pro Plan" : "Free Plan"}
                    </CardTitle>
                    <CardDescription>
                      {isPro ? "You have full access to all features" : "Upgrade to unlock unlimited features"}
                    </CardDescription>
                  </div>
                  <Badge variant={isPro ? "default" : "secondary"} className="text-sm">
                    {plan.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {!isPro && (
                  <Button onClick={() => navigate("/pricing")}>
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </Button>
                )}
                {isPro && (
                  <p className="text-sm text-muted-foreground">
                    Stripe management portal coming soon.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Usage */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Resumes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-2xl font-bold text-foreground">{resumeCount}</span>
                    <span className="text-sm text-muted-foreground">/ {maxResumes}</span>
                  </div>
                  {!isPro && <Progress value={resumePercent} className="h-2" />}
                  {isPro && <p className="text-xs text-muted-foreground">Unlimited</p>}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-muted-foreground" />
                    AI Credits (this month)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-2xl font-bold text-foreground">{aiCreditsUsed}</span>
                    <span className="text-sm text-muted-foreground">/ {maxAI}</span>
                  </div>
                  {!isPro && <Progress value={aiPercent} className="h-2" />}
                  {isPro && <p className="text-xs text-muted-foreground">Unlimited</p>}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
