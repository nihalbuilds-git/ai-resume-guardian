import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardHeader() {
  const { user, profile } = useAuth();
  const displayName = profile?.full_name || user?.email || "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
      <SidebarTrigger className="mr-2" />
      <div className="flex items-center gap-3">
        <Badge variant={profile?.plan === "pro" ? "default" : "secondary"} className="text-xs">
          {profile?.plan === "pro" ? "PRO" : "FREE"}
        </Badge>
        <Avatar className="h-8 w-8">
          <AvatarImage src={profile?.avatar_url || ""} />
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
