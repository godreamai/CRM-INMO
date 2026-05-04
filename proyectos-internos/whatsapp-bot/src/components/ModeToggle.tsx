"use client";

interface Props {
  mode: "AI" | "HUMAN";
  conversationId: number;
  onToggle: (newMode: "AI" | "HUMAN") => void;
}

export function ModeToggle({ mode, conversationId, onToggle }: Props) {
  async function toggle() {
    const newMode = mode === "AI" ? "HUMAN" : "AI";
    await fetch(`/api/mode/${conversationId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: newMode }),
    });
    onToggle(newMode);
  }

  return (
    <button
      onClick={toggle}
      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
        mode === "AI"
          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
          : "bg-amber-500 hover:bg-amber-600 text-white"
      }`}
    >
      {mode === "AI" ? "IA activa" : "Modo humano"}
    </button>
  );
}
