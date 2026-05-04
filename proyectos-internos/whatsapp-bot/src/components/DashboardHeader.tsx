"use client";

interface Props {
  phone: string;
  onDisconnect: () => void;
}

export function DashboardHeader({ phone, onDisconnect }: Props) {
  async function disconnect() {
    await fetch("/api/connection/disconnect", { method: "POST" });
    onDisconnect();
  }

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-gray-900 border-b border-gray-800 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-sm text-gray-300">
          Conectado como <span className="font-semibold text-white">+{phone}</span>
        </span>
      </div>
      <button
        onClick={disconnect}
        className="text-xs text-gray-400 hover:text-red-400 transition-colors border border-gray-700 hover:border-red-400 px-3 py-1 rounded-full"
      >
        Desconectar
      </button>
    </header>
  );
}
