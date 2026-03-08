import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ResumeData } from "@/types/resume";
import { toast } from "sonner";

// Fetch all resumes for the current user
export function useResumes() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["resumes", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .order("last_edited", { ascending: false });
      if (error) throw error;
      return data as unknown as ResumeData[];
    },
    enabled: !!user,
  });
}

// Fetch a single resume
export function useResume(id: string | undefined) {
  return useQuery({
    queryKey: ["resume", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data as unknown as ResumeData;
    },
    enabled: !!id,
  });
}

// Create a new resume
export function useCreateResume() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (template: string = "modern") => {
      const { data, error } = await supabase
        .from("resumes")
        .insert({ user_id: user!.id, template } as any)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as ResumeData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

// Update a resume (for auto-save)
export function useUpdateResume() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ResumeData> & { id: string }) => {
      const { error } = await supabase
        .from("resumes")
        .update({ ...updates, last_edited: new Date().toISOString() } as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["resume", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
}

// Delete a resume
export function useDeleteResume() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("resumes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      toast.success("Resume deleted");
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
