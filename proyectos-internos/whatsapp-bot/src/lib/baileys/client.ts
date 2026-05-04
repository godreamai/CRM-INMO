import makeWASocket, {
  Browsers,
  DisconnectReason,
  fetchLatestBaileysVersion,
  useMultiFileAuthState,
} from "@whiskeysockets/baileys";
import pino from "pino";
import path from "node:path";
import fs from "node:fs";
import { setConnectionState } from "../db";
import { setupMessageHandler } from "./handler";

const AUTH_DIR = path.resolve(process.cwd(), "auth");

const logger = pino({ level: "silent" });

export interface BotHandle {
  sock: ReturnType<typeof makeWASocket>;
  shutdown: () => Promise<void>;
}

let handle: BotHandle | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

export async function start(): Promise<void> {
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);

  // fetchLatestBaileysVersion OBLIGATORIO — WhatsApp rechaza versiones viejas (405)
  let version: [number, number, number] | undefined;
  try {
    const fetched = await fetchLatestBaileysVersion();
    version = fetched.version;
    console.log(`[bot] Versión WhatsApp Web: ${version.join(".")}`);
  } catch (err) {
    console.warn("[bot] No se pudo obtener última versión, usando default:", err);
  }

  const sock = makeWASocket({
    version,
    auth: state,
    logger,
    // Browsers.macOS('Desktop') es CRÍTICO — un browser custom dispara code 440 en loop
    browser: Browsers.macOS("Desktop"),
    markOnlineOnConnect: false,
    syncFullHistory: false,
    // printQRInTerminal está deprecated en Baileys 6.7+, se maneja manualmente
  });

  handle = {
    sock,
    shutdown: async () => {
      try {
        await sock.logout();
      } catch {}
      try {
        sock.end(undefined);
      } catch {}
    },
  };

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log("[bot] QR recibido, guardando en DB...");
      // Fallback ASCII en consola para debugging
      const { default: qrTerminal } = await import("qrcode-terminal");
      qrTerminal.generate(qr, { small: true });
      setConnectionState({ status: "qr", qr_string: qr, phone: null });
    }

    if (connection === "connecting") {
      const current = (await import("../db")).getConnectionState();
      // Solo degradar a 'connecting' si venimos de 'disconnected' (primer arranque)
      // No degradar desde 'qr' ni 'connected'
      if (current.status === "disconnected") {
        setConnectionState({ status: "connecting" });
      }
    }

    if (connection === "open") {
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
      const rawId = sock.user?.id ?? "";
      // Formato: "5491155...:N@s.whatsapp.net" — extraemos solo el número
      const phone = rawId.split(":")[0];
      console.log(`[bot] Conectado como: ${phone}`);
      setConnectionState({ status: "connected", qr_string: null, phone });
    }

    if (connection === "close") {
      const statusCode = (lastDisconnect?.error as { output?: { statusCode?: number } })
        ?.output?.statusCode;

      console.log(`[bot] Conexión cerrada. Code: ${statusCode}`);

      if (statusCode === DisconnectReason.loggedOut) {
        console.log("[bot] Sesión cerrada por logout (401). Limpiando auth y pidiendo QR nuevo...");
        setConnectionState({ status: "disconnected", qr_string: null, phone: null });
        handle = null;
        try { fs.rmSync(AUTH_DIR, { recursive: true, force: true }); } catch {}
        scheduleReconnect(statusCode);
        return;
      }

      scheduleReconnect(statusCode);
    }
  });

  setupMessageHandler(sock);
}

function scheduleReconnect(code?: number): void {
  if (reconnectTimer) return;

  // Code 440 = connectionReplaced — ocurre justo después del pairing inicial.
  // Reintentar muy rápido entra en loop. Esperar 15s.
  const delay = code === 440 ? 15000 : 5000;
  console.log(`[bot] Reconectando en ${delay / 1000}s (code ${code ?? "?"})...`);

  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    if (handle) {
      try {
        handle.sock.end(undefined);
      } catch {}
      handle = null;
    }
    start().catch((err) => console.error("[bot] Error al reconectar:", err));
  }, delay);
}

export function getHandle(): BotHandle | null {
  return handle;
}
