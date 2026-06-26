interface Props {
  role: "user" | "assistant" | "human";
  content: string;
  createdAt: number;
}

function formatTime(unixTs: number): string {
  return new Date(unixTs * 1000).toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function MessageBubble({ role, content, createdAt }: Props) {
  const isLeft = role === "user";

  const bubbleClass = isLeft
    ? "bg-white text-gray-900 border border-gray-200 self-start"
    : role === "assistant"
    ? "bg-emerald-600 text-white self-end"
    : "bg-amber-500 text-white self-end";

  const label =
    role === "user" ? null : role === "assistant" ? "IA" : "Humano";

  return (
    <div className={`flex flex-col max-w-[75%] ${isLeft ? "items-start" : "items-end self-end ml-auto"}`}>
      {label && (
        <span className="text-xs text-gray-400 mb-0.5 px-1">{label}</span>
      )}
      <div className={`rounded-2xl px-4 py-2 text-sm ${bubbleClass}`}>
        {content}
      </div>
      <span className="text-xs text-gray-500 mt-0.5 px-1">
        {formatTime(createdAt)}
      </span>
    </div>
  );
}
