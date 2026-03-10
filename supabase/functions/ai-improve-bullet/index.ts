/**
 * AI Bullet Improver — improves a single bullet point.
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
  const anonClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!);
  const token = authHeader.replace("Bearer ", "");
  const { data: { user } } = await anonClient.auth.getUser(token);
  if (!user) return;
  const { data: profile } = await supabase.from("profiles").select("ai_credits_used").eq("user_id", user.id).single();
  if (profile) {
    await supabase.from("profiles").update({ ai_credits_used: (profile.ai_credits_used || 0) + 1 }).eq("user_id", user.id);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { bullet, jobTitle } = await req.json();
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
            content: `You are a resume bullet point optimizer. Improve the given bullet point to be more impactful.
- Start with a strong action verb
- Add metrics/numbers if possible
- Make it ATS-friendly
- Keep it concise (1-2 lines)
Explain why the improvement is better.`
          },
          {
            role: "user",
            content: `Job Title: ${jobTitle}\nOriginal bullet: "${bullet}"`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "return_improved",
              description: "Return improved bullet and reason",
              parameters: {
                type: "object",
                properties: {
                  improved: { type: "string" },
                  reason: { type: "string" },
                },
                required: ["improved", "reason"],
                additionalProperties: false,
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "return_improved" } },
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
    let data = { improved: "", reason: "" };
    if (toolCall?.function?.arguments) {
      try { data = JSON.parse(toolCall.function.arguments); } catch {}
    }

    await incrementAICredits(req.headers.get("authorization")).catch(console.error);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("improve-bullet error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
