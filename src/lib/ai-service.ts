/**
 * Shared AI service — calls edge functions with credit checking and error handling.
 */
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AICallOptions {
  functionName: string;
  body: Record<string, unknown>;
}

export async function callAI<T = unknown>({ functionName, body }: AICallOptions): Promise<T | null> {
  const { data, error } = await supabase.functions.invoke(functionName, { body });

  if (error) {
    // Check for rate limit / payment errors
    const message = error.message || "AI request failed";
    if (message.includes("429") || message.includes("Rate limit")) {
      toast.error("Rate limit exceeded. Please wait a moment and try again.");
    } else if (message.includes("402") || message.includes("Payment")) {
      toast.error("AI credits exhausted. Please upgrade your plan.");
    } else {
      toast.error(message);
    }
    return null;
  }

  if (data?.error) {
    toast.error(data.error);
    return null;
  }

  return data as T;
}

/**
 * Stream an AI response (SSE) from an edge function.
 */
export async function streamAI({
  functionName,
  body,
  onDelta,
  onDone,
}: {
  functionName: string;
  body: Record<string, unknown>;
  onDelta: (text: string) => void;
  onDone: () => void;
}) {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${functionName}`;

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    if (resp.status === 429) toast.error("Rate limit exceeded. Please try again later.");
    else if (resp.status === 402) toast.error("AI credits exhausted. Please upgrade.");
    else toast.error("AI service error");
    onDone();
    return;
  }

  if (!resp.body) { onDone(); return; }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;
      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") { onDone(); return; }
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch {
        buffer = line + "\n" + buffer;
        break;
      }
    }
  }

  // Flush remaining
  if (buffer.trim()) {
    for (let raw of buffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (!raw.startsWith("data: ")) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch {}
    }
  }

  onDone();
}
