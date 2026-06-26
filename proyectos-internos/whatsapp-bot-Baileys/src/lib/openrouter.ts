import OpenAI from "openai";
import { SYSTEM_PROMPT } from "./system-prompt";

// Cliente Z.AI (si hay key configurada)
const zaiClient = process.env.ZAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.ZAI_API_KEY,
      baseURL: "https://api.z.ai/api/paas/v4",
    })
  : null;

// Cliente OpenAI — fallback
const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface HistoryMessage {
  role: "user" | "assistant";
  content: string;
}

export async function generateReply(
  history: HistoryMessage[]
): Promise<string> {
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
  ];

  // Intentar Z.AI primero si está configurado
  if (zaiClient) {
    const model = process.env.ZAI_MODEL ?? "glm-4.5-air";
    try {
      const completion = await zaiClient.chat.completions.create({ model, messages });
      return completion.choices[0]?.message?.content ?? "";
    } catch (err) {
      console.warn("[llm] Z.AI falló, usando OpenAI como fallback:", (err as Error).message);
    }
  }

  // Fallback OpenAI
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const completion = await openaiClient.chat.completions.create({ model, messages });
  return completion.choices[0]?.message?.content ?? "";
}
