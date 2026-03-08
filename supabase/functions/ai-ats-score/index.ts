/**
 * AI ATS Score — evaluates resume against a job description for ATS compatibility.
 */
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { resumeData, jobDescription } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are an ATS (Applicant Tracking System) simulator. Score this resume against the job description.
Evaluate:
- Keyword match (do resume skills/experience match JD keywords?)
- Formatting (proper sections, no complex layouts?)
- Section completeness (summary, experience, education, skills all present?)
- Action verbs usage
- Quantifiable achievements
Give an overall score 0-100 and section-by-section breakdown.`
          },
          {
            role: "user",
            content: `JOB DESCRIPTION:\n${jobDescription || "No job description provided — score based on general best practices."}\n\nRESUME:\nName: ${resumeData.personal_info?.fullName}\nSummary: ${resumeData.summary}\nSkills: ${resumeData.skills?.join(", ")}\nExperience: ${resumeData.experience?.map((e: any) => `${e.position} at ${e.company}: ${e.bullets?.join("; ")}`).join("\n")}\nEducation: ${resumeData.education?.map((e: any) => `${e.degree} ${e.field} at ${e.school}`).join(", ")}\nProjects: ${resumeData.projects?.map((p: any) => p.name).join(", ")}`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "return_ats_score",
              description: "Return ATS score analysis",
              parameters: {
                type: "object",
                properties: {
                  score: { type: "number", minimum: 0, maximum: 100 },
                  missingKeywords: { type: "array", items: { type: "string" } },
                  suggestions: { type: "array", items: { type: "string" } },
                  sectionScores: {
                    type: "object",
                    properties: {
                      summary: { type: "number" },
                      experience: { type: "number" },
                      education: { type: "number" },
                      skills: { type: "number" },
                      formatting: { type: "number" },
                    },
                    required: ["summary", "experience", "education", "skills", "formatting"],
                    additionalProperties: false,
                  }
                },
                required: ["score", "missingKeywords", "suggestions", "sectionScores"],
                additionalProperties: false,
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "return_ats_score" } },
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (status === 402) return new Response(JSON.stringify({ error: "Payment required." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      return new Response(JSON.stringify({ error: "AI service error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const result = await response.json();
    const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
    let data = { score: 0, missingKeywords: [], suggestions: [], sectionScores: {} };
    if (toolCall?.function?.arguments) {
      try { data = JSON.parse(toolCall.function.arguments); } catch {}
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ats-score error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
