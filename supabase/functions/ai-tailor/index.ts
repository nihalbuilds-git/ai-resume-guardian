/**
 * AI Resume Tailor — analyzes job description and optimizes resume content.
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
            content: `You are an expert resume optimization specialist. Analyze the job description and optimize the resume to better match it.
- Extract key skills and keywords from the job description
- Rewrite the summary to highlight relevant experience
- Suggest additional skills that match the job
- Improve bullet points to use relevant keywords
Be specific and actionable.`
          },
          {
            role: "user",
            content: `JOB DESCRIPTION:\n${jobDescription}\n\nCURRENT RESUME:\nName: ${resumeData.personal_info?.fullName}\nSummary: ${resumeData.summary}\nSkills: ${resumeData.skills?.join(", ")}\nExperience:\n${resumeData.experience?.map((e: any) => `${e.position} at ${e.company}: ${e.bullets?.join("; ")}`).join("\n")}`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "return_tailored",
              description: "Return tailored resume content",
              parameters: {
                type: "object",
                properties: {
                  updatedSummary: { type: "string", description: "Optimized professional summary" },
                  suggestedSkills: { type: "array", items: { type: "string" }, description: "Skills to add" },
                  improvedBullets: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        experienceId: { type: "string" },
                        original: { type: "string" },
                        improved: { type: "string" },
                      },
                      required: ["original", "improved"],
                      additionalProperties: false,
                    }
                  },
                  keywordsFound: { type: "array", items: { type: "string" } },
                  keywordsMissing: { type: "array", items: { type: "string" } },
                },
                required: ["updatedSummary", "suggestedSkills", "improvedBullets", "keywordsFound", "keywordsMissing"],
                additionalProperties: false,
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "return_tailored" } },
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
    let data = {};
    if (toolCall?.function?.arguments) {
      try { data = JSON.parse(toolCall.function.arguments); } catch { data = {}; }
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("tailor error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
