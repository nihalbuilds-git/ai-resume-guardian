/**
 * Plan limits and feature gating hook.
 * Centralizes all Free vs Pro restrictions.
 */
import { useAuth } from "@/contexts/AuthContext";
import { useResumes } from "@/hooks/use-resumes";

export const PLAN_LIMITS = {
  free: {
    maxResumes: 1,
    maxAICredits: 5,
    templates: ["classic", "minimal", "ats"],
    features: ["pdf_export"],
  },
  pro: {
    maxResumes: Infinity,
    maxAICredits: Infinity,
    templates: ["modern", "classic", "minimal", "ats"],
    features: ["pdf_export", "cover_letter", "ats_checker", "tailor_resume", "priority_support"],
  },
} as const;

export function usePlanLimits() {
  const { profile } = useAuth();
  const { data: resumes } = useResumes();

  const isPro = profile?.plan === "pro";
  const plan = isPro ? "pro" : "free";
  const limits = PLAN_LIMITS[plan];

  const resumeCount = resumes?.length ?? 0;
  const aiCreditsUsed = profile?.ai_credits_used ?? 0;

  return {
    isPro,
    plan,
    limits,
    resumeCount,
    aiCreditsUsed,

    /** Can user create another resume? */
    canCreateResume: isPro || resumeCount < limits.maxResumes,

    /** Can user use AI credits? */
    canUseAI: isPro || aiCreditsUsed < limits.maxAICredits,

    /** Is a template available for this plan? */
    canUseTemplate: (templateId: string) =>
      (limits.templates as readonly string[]).includes(templateId),

    /** Is a feature available? */
    canUseFeature: (feature: string) =>
      (limits.features as readonly string[]).includes(feature),
  };
}
