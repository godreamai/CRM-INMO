// env-loader DEBE ser el primer import — ES modules hoistean todos los imports,
// y otros módulos leen process.env en su top-level al cargar.
import "./env-loader";

import fs from "node:fs";
import path from "node:path";
import { start } from "../src/lib/baileys/client";
import { getPendingOutbox, markOutboxSent } from "../src/lib/db";
import { getHandle } from "../src/lib/baileys/client";

const RESTART_FLAG = path.resolve(process.cwd(), "data", ".restart");
const AUTH_DIR = path.resolve(process.cwd(), "auth");

async function main(): Promise<void> {
  console.log("[bot] Iniciando agente WhatsApp...");
  await start();

  // Poll del outbox — envía mensajes humanos del dashboard cada 2s
  setInterval(async () => {
    const handle = getHandle();
    if (!handle) return;

    const pending = getPendingOutbox(20);
    for (const item of pending) {
      try {
        const jid = `${item.phone}@s.whatsapp.net`;
        await handle.sock.sendMessage(jid, { text: item.content });
        markOutboxSent(item.id);
        console.log(`[bot] → Outbox enviado a ${item.phone}`);
      } catch (err) {
        console.error(`[bot] Error enviando outbox id=${item.id}:`, err);
        // Deja sent=0 para reintentar en el próximo tick
      }
    }
  }, 2000);

  // Poll del flag de restart (API disconnect lo crea)
  setInterval(async () => {
    if (!fs.existsSync(RESTART_FLAG)) return;

    console.log("[bot] Flag .restart detectado — reiniciando sesión...");
    try {
      fs.unlinkSync(RESTART_FLAG);
    } catch {}

    const handle = getHandle();
    if (handle) {
      try {
        await handle.shutdown();
      } catch {}
    }

    // Defensa extra: borrar auth por si el API no lo hizo
    try {
      fs.rmSync(AUTH_DIR, { recursive: true, force: true });
    } catch {}

    console.log("[bot] Arrancando sesión nueva (pedirá QR)...");
    await start();
  }, 1000);
}

main().catch((err) => {
  console.error("[bot] Error fatal:", err);
  process.exit(1);
});
