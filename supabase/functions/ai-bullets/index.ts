/**
 * AI Bullet Generator — generates 5 ATS-friendly bullet points for a job experience.
 */
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.98.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function incrementAICredits(authHeader: string | null) {
  if (!authHeader) return;
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);
  
  // Get user from their JWT
  const anonClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!);
  const token = authHeader.replace("Bearer ", "");
  const { data: { user } } = await anonClient.auth.getUser(token);
  if (!user) return;
  
  await supabase.rpc("increment_ai_credits" as any, { p_user_id: user.id }).catch(() => {
    // Fallback: direct update
    supabase.from("profiles").update({ ai_credits_used: supabase.rpc("increment_ai_credits" as any, {}) } as any).eq("user_id", user.id);
  });
  
  // Simple increment
  const { data: profile } = await supabase
    .from("profiles")
    .select("ai_credits_used")
    .eq("user_id", user.id)
    .single();
  
  if (profile) {
    await supabase
      .from("profiles")
      .update({ ai_credits_used: (profile.ai_credits_used || 0) + 1 })
      .eq("user_id", user.id);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { jobTitle, company, responsibilities } = await req.json();
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
            content: `You are an expert resume writer. Generate exactly 5 strong, ATS-friendly bullet points for a resume experience entry.
Rules:
- Start each bullet with a strong action verb (Led, Built, Increased, Developed, Implemented, Streamlined, etc.)
- Include metrics and quantifiable results where possible
- Keep each bullet to 1-2 lines max
- Focus on impact and achievements, not just duties
- Use industry-relevant keywords
Return ONLY a JSON array of 5 strings, no other text.`
          },
          {
            role: "user",
            content: `Job Title: ${jobTitle}\nCompany: ${company}\nResponsibilities/Context: ${responsibilities || "General role responsibilities"}`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "return_bullets",
              description: "Return 5 ATS-friendly bullet points",
              parameters: {
                type: "object",
                properties: {
                  bullets: {
                    type: "array",
                    items: { type: "string" },
                    minItems: 5,
                    maxItems: 5,
                  }
                },
                required: ["bullets"],
                additionalProperties: false,
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "return_bullets" } },
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const t = await response.text();
      console.error("AI error:", status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const result = await response.json();
    const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
    let bullets: string[] = [];
    if (toolCall?.function?.arguments) {
      try {
        const parsed = JSON.parse(toolCall.function.arguments);
        bullets = parsed.bullets || [];
      } catch {
        bullets = [];
      }
    }

    // Increment AI credits after successful call
    await incrementAICredits(req.headers.get("authorization")).catch(console.error);

    return new Response(JSON.stringify({ bullets }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("bullets error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
