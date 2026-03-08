import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import { FileText, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const { profile } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground">
                Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}!
              </h1>
              <p className="text-muted-foreground mt-1">Create and manage your AI-powered resumes</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Resumes Created</CardDescription>
                  <CardTitle className="text-3xl">0</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>AI Credits Used</CardDescription>
                  <CardTitle className="text-3xl">{profile?.ai_credits_used ?? 0}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Current Plan</CardDescription>
                  <CardTitle className="text-3xl capitalize">{profile?.plan ?? "free"}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent mb-4">
                  <FileText className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">No resumes yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create your first AI-powered resume in minutes
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Resume
                </Button>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
