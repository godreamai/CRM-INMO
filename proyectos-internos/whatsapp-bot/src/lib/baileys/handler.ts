import type makeWASocket from "@whiskeysockets/baileys";
import type { proto } from "@whiskeysockets/baileys";
import {
  getOrCreateConversation,
  insertMessage,
  getConversationById,
  getRecentHistory,
} from "../db";
import { generateReply } from "../openrouter";

type WASocket = ReturnType<typeof makeWASocket>;

export function setupMessageHandler(sock: WASocket): void {
  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify" && type !== "append") return;

    for (const msg of messages) {
      try {
        await handleMessage(sock, msg);
      } catch (err) {
        console.error("[bot] Error procesando mensaje:", err);
      }
    }
  });
}

async function handleMessage(
  sock: WASocket,
  msg: proto.IWebMessageInfo
): Promise<void> {
  const { key, message, pushName } = msg;
  const remoteJid = key.remoteJid ?? "";

  if (key.fromMe) return;
  if (remoteJid.endsWith("@g.us")) return;

  // Aceptar @s.whatsapp.net (estándar) y @lid (Linked ID, feature nueva de WhatsApp)
  const is1on1 = remoteJid.endsWith("@s.whatsapp.net") || remoteJid.endsWith("@lid");
  if (!is1on1) return;

  const text =
    message?.conversation ||
    message?.extendedTextMessage?.text;

  if (!text) return;

  const phone = remoteJid.replace("@s.whatsapp.net", "").replace("@lid", "");
  console.log(`[bot] ← Mensaje de ${phone}: "${text}"`);

  const convo = getOrCreateConversation(phone, pushName ?? null);
  insertMessage(convo.id, "user", text);

  // Re-leer para chequear modo actual (pudo haber cambiado vía dashboard)
  const fresh = getConversationById(convo.id);
  if (!fresh || fresh.mode !== "AI") {
    console.log(`[bot] Chat ${phone} en modo HUMAN — no respondiendo.`);
    return;
  }

  const history = getRecentHistory(convo.id, 20);
  const llmMessages = history.map((m) => ({
    // Los mensajes 'human' del dashboard son respuestas nuestras para el LLM
    role: (m.role === "human" ? "assistant" : m.role) as "user" | "assistant",
    content: m.content,
  }));

  console.log(`[bot] Llamando LLM con ${llmMessages.length} mensajes...`);
  const t0 = Date.now();

  const reply = await generateReply(llmMessages);
  console.log(`[bot] LLM respondió en ${Date.now() - t0}ms`);

  insertMessage(convo.id, "assistant", reply);
  await sock.sendMessage(remoteJid, { text: reply });
  console.log(`[bot] → Enviado a ${phone}`);
}
