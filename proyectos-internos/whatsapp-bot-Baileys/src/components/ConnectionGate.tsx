"use client";

import { useState } from "react";
import { QRScreen } from "./QRScreen";
import { DashboardHeader } from "./DashboardHeader";
import { ConversationList } from "./ConversationList";
import { ConversationPanel } from "./ConversationPanel";

interface Conversation {
  id: number;
  phone: string;
  name: string | null;
  mode: "AI" | "HUMAN";
  last_message_at: number | null;
  last_message_preview: string | null;
}

export function ConnectionGate() {
  const [phone, setPhone] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  function handleConnected(connectedPhone: string) {
    setPhone(connectedPhone);
    loadConversations();
    // Polling de conversaciones cada 2s
    setInterval(loadConversations, 2000);
  }

  async function loadConversations() {
    try {
      const res = await fetch("/api/conversations");
      if (res.ok) {
        const data = await res.json() as Conversation[];
        setConversations(data);
      }
    } catch {}
  }

  function handleDisconnect() {
    setPhone(null);
    setConversations([]);
    setSelectedId(null);
  }

  function handleModeChange(id: number, mode: "AI" | "HUMAN") {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, mode } : c))
    );
  }

  function handleDelete(id: number) {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  if (!phone) {
    return <QRScreen onConnected={handleConnected} />;
  }

  const selectedConv = conversations.find((c) => c.id === selectedId) ?? null;

  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader phone={phone} onDisconnect={handleDisconnect} />

      <div className="flex flex-1 overflow-hidden">
        {/* Lista lateral */}
        <aside className="w-80 shrink-0 border-r border-gray-800 flex flex-col">
          <div className="px-4 py-3 border-b border-gray-800">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Conversaciones
            </h2>
          </div>
          <ConversationList
            conversations={conversations}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </aside>

        {/* Panel derecho */}
        <main className="flex-1 overflow-hidden">
          {selectedConv ? (
            <ConversationPanel
              conversation={selectedConv}
              onModeChange={handleModeChange}
              onDelete={handleDelete}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-500 text-sm">
              Seleccioná una conversación para ver los mensajes.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
