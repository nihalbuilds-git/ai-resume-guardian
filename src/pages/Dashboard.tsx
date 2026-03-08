import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import { useResumes, useCreateResume, useDeleteResume } from "@/hooks/use-resumes";
import { usePlanLimits } from "@/hooks/use-plan-limits";
import { UpgradeModal } from "@/components/UpgradeModal";
import { FileText, Plus, Pencil, Trash2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

export default function Dashboard() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { data: resumes, isLoading } = useResumes();
  const createResume = useCreateResume();
  const deleteResume = useDeleteResume();
  const { canCreateResume } = usePlanLimits();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<"resume_limit" | "ai_credits" | "template" | "feature">("resume_limit");

  const handleCreate = async () => {
    if (!canCreateResume) {
      setUpgradeReason("resume_limit");
      setShowUpgrade(true);
      return;
    }
    const resume = await createResume.mutateAsync("modern");
    navigate(`/dashboard/editor/${resume.id}`);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this resume?")) deleteResume.mutate(id);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}!
                </h1>
                <p className="text-muted-foreground mt-1">Create and manage your AI-powered resumes</p>
              </div>
              <Button onClick={handleCreate} disabled={createResume.isPending}>
                <Plus className="mr-2 h-4 w-4" />
                {createResume.isPending ? "Creating..." : "New Resume"}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Resumes Created</CardDescription>
                  <CardTitle className="text-3xl">{resumes?.length ?? 0}</CardTitle>
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

            {/* Resume Grid */}
            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-48 rounded-lg" />
                ))}
              </div>
            ) : resumes && resumes.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resumes.map((resume) => (
                  <Card
                    key={resume.id}
                    className="cursor-pointer hover:border-primary/50 transition-colors group"
                    onClick={() => navigate(`/dashboard/editor/${resume.id}`)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base truncate">{resume.title}</CardTitle>
                          <CardDescription className="capitalize">{resume.template} template</CardDescription>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/dashboard/editor/${resume.id}`);
                            }}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive"
                            onClick={(e) => handleDelete(resume.id, e)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        Edited {formatDistanceToNow(new Date(resume.last_edited), { addSuffix: true })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent mb-4">
                    <FileText className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">No resumes yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">Create your first AI-powered resume in minutes</p>
                  <Button onClick={handleCreate} disabled={createResume.isPending}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Resume
                  </Button>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
