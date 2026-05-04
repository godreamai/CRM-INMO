"use client";

import { useEffect, useState } from "react";

type QrStatus = "disconnected" | "qr" | "connecting" | "connected";

interface StatusPayload {
  status: QrStatus;
  qrPng?: string;
  phone?: string;
  updatedAt?: number;
}

interface Props {
  onConnected: (phone: string) => void;
}

export function QRScreen({ onConnected }: Props) {
  const [data, setData] = useState<StatusPayload>({ status: "disconnected" });
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function poll() {
      try {
        const res = await fetch("/api/connection/status");
        if (!res.ok) return;
        const payload = await res.json() as StatusPayload;

        setData(payload);

        if (payload.status === "connected" && payload.phone) {
          onConnected(payload.phone);
        }
      } catch {}
    }

    poll();
    const interval = setInterval(poll, 2000);
    return () => clearInterval(interval);
  }, [onConnected]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gray-950">
      <h1 className="text-2xl font-bold text-white">Conectar número de WhatsApp</h1>

      {data.status === "qr" && data.qrPng ? (
        <>
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <img src={data.qrPng} alt="QR WhatsApp" width={320} height={320} />
          </div>
          <div className="flex items-center gap-2 text-sm text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Esperando escaneo... Abre WhatsApp → Dispositivos vinculados → Vincular dispositivo
          </div>
        </>
      ) : data.status === "connecting" && data.qrPng ? (
        <>
          <div className="bg-white p-4 rounded-2xl shadow-lg opacity-75">
            <img src={data.qrPng} alt="QR WhatsApp" width={320} height={320} />
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-400">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Conectando...
          </div>
        </>
      ) : data.status === "connecting" ? (
        <div className="flex items-center gap-2 text-sm text-blue-400">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          Conectando...
        </div>
      ) : elapsed > 10 ? (
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="text-4xl">⚠️</div>
          <p className="text-gray-400 text-sm max-w-xs">
            El bot no está respondiendo. Asegurate de haber ejecutado{" "}
            <code className="text-amber-400">pnpm run start:bot</code> en otra terminal.
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Esperando al proceso bot...
        </div>
      )}
    </div>
  );
}
