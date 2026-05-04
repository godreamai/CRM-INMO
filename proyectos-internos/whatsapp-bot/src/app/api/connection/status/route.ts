import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { getConnectionState } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const state = getConnectionState();

  // Defensivo: mostrar QR si existe qr_string aunque status no sea exactamente 'qr'
  // (race condition: bot pasa de qr→connecting muy rápido)
  const shouldShowQr =
    !!state.qr_string &&
    (state.status === "qr" || state.status === "connecting");

  if (shouldShowQr && state.qr_string) {
    const qrPng = await QRCode.toDataURL(state.qr_string, {
      width: 320,
      margin: 2,
    });
    return NextResponse.json({
      status: "qr",
      qrPng,
      updatedAt: state.updated_at,
    });
  }

  return NextResponse.json({
    status: state.status,
    phone: state.phone ?? null,
    updatedAt: state.updated_at,
  });
}
