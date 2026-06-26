import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { setConnectionState } from "@/lib/db";

const AUTH_DIR = path.resolve(process.cwd(), "auth");
const RESTART_FLAG = path.resolve(process.cwd(), "data", ".restart");

export async function POST() {
  setConnectionState({ status: "disconnected", qr_string: null, phone: null });

  try {
    fs.rmSync(AUTH_DIR, { recursive: true, force: true });
  } catch {}

  // El proceso bot lo detecta, reinicia y pide QR nuevo
  fs.writeFileSync(RESTART_FLAG, "");

  return NextResponse.json({ ok: true });
}
