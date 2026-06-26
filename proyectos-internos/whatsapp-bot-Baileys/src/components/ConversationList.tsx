"use client";

interface Conversation {
  id: number;
  phone: string;
  name: string | null;
  mode: "AI" | "HUMAN";
  last_message_at: number | null;
  last_message_preview: string | null;
}

interface Props {
  conversations: Conversation[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

function relativeTime(unixTs: number | null): string {
  if (!unixTs) return "";
  const diffMs = Date.now() - unixTs * 1000;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "ahora";
  if (mins < 60) return `hace ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs} h`;
  return `hace ${Math.floor(hrs / 24)} d`;
}

export function ConversationList({ conversations, selectedId, onSelect }: Props) {
  if (conversations.length === 0) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-gray-500 text-sm p-4">
        Sin conversaciones todavía.
        <br />
        Esperando mensajes entrantes.
      </div>
    );
  }

  return (
    <ul className="flex flex-col overflow-y-auto h-full">
      {conversations.map((c) => (
        <li
          key={c.id}
          onClick={() => onSelect(c.id)}
          className={`flex flex-col gap-1 px-4 py-3 cursor-pointer border-b border-gray-800 transition-colors ${
            selectedId === c.id ? "bg-gray-800" : "hover:bg-gray-800/50"
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium text-sm text-white truncate">
              {c.name ?? c.phone}
            </span>
            <span
              className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-semibold ${
                c.mode === "AI"
                  ? "bg-emerald-600/20 text-emerald-400"
                  : "bg-amber-500/20 text-amber-400"
              }`}
            >
              {c.mode}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-gray-400 truncate">
              {c.last_message_preview ?? "—"}
            </span>
            <span className="text-xs text-gray-500 shrink-0">
              {relativeTime(c.last_message_at)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
