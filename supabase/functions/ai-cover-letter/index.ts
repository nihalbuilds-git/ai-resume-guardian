/**
 * AI Cover Letter Generator — streams a tailored cover letter.
 */
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { resumeData, jobDescription, tone } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const toneInstructions = tone === "friendly"
      ? "Use a warm, conversational, and enthusiastic tone while remaining professional."
      : "Use a formal, polished, and traditional business letter tone.";

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
            content: `You are an expert cover letter writer. Write a compelling 4-paragraph cover letter.
Structure:
1. Opening — hook the reader, mention the specific role
2. Why you're a great fit — highlight relevant experience and skills
3. Specific achievements — reference quantifiable accomplishments
4. Closing — call to action, express enthusiasm

${toneInstructions}
Do NOT include placeholder brackets like [Company Name]. Use the actual information provided.
Write the letter directly, no subject line or "Dear Hiring Manager" unless it fits naturally.`
          },
          {
            role: "user",
            content: `JOB DESCRIPTION:\n${jobDescription}\n\nMY RESUME:\nName: ${resumeData.personal_info?.fullName}\nEmail: ${resumeData.personal_info?.email}\nSummary: ${resumeData.summary}\nSkills: ${resumeData.skills?.join(", ")}\nExperience:\n${resumeData.experience?.map((e: any) => `${e.position} at ${e.company}: ${e.bullets?.join("; ")}`).join("\n")}`
          }
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (status === 402) return new Response(JSON.stringify({ error: "Payment required." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      return new Response(JSON.stringify({ error: "AI service error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Stream the response back to the client
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("cover-letter error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
