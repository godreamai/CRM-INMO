"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2, MessageSquare, Send, User } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { supabase } from "@/lib/supabase";
import { getOpportunityNotes, createOpportunityNote } from "@/lib/opportunities";
import type { DecisionMaker, OpportunityNote } from "@/lib/types";

interface OpportunityNotesSheetProps {
  opportunity: DecisionMaker | null;
  onClose: () => void;
}

export function OpportunityNotesSheet({ opportunity, onClose }: OpportunityNotesSheetProps) {
  const [notes, setNotes] = useState<OpportunityNote[]>([]);
  const [loading, setLoading] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [sending, setSending] = useState(false);
  const [currentUserName, setCurrentUserName] = useState("Usuario");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setCurrentUserId(user.id);
        setCurrentUserName(
          user.user_metadata?.full_name ??
          user.user_metadata?.alias ??
          user.email ??
          "Usuario"
        );
      }
    });
  }, []);

  useEffect(() => {
    if (!opportunity) return;
    setLoading(true);
    getOpportunityNotes(opportunity.id)
      .then(setNotes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [opportunity]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [notes]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim() || !opportunity) return;
    setSending(true);
    try {
      const newNote = await createOpportunityNote({
        opportunity_id: opportunity.id,
        text: noteText.trim(),
        user_id: currentUserId,
        user_name: currentUserName,
      });
      setNotes((prev) => [...prev, newNote]);
      setNoteText("");
    } catch {
      toast.error("Error al enviar la nota");
    } finally {
      setSending(false);
    }
  };

  return (
    <Sheet open={!!opportunity} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent className="w-full sm:max-w-[420px] flex flex-col p-0 gap-0">
        <SheetHeader className="px-6 py-5 border-b border-border/30 shrink-0">
          <SheetTitle className="text-[15px] font-bold text-foreground/80 truncate">
            Notas — {opportunity?.full_name ?? "Oportunidad"}
          </SheetTitle>
          <p className="text-[12px] text-muted-foreground/50 font-medium mt-0.5">
            {opportunity?.company_domain ?? opportunity?.businesses?.domain ?? ""}
          </p>
        </SheetHeader>

        <ScrollArea className="flex-1 px-4 py-4">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="w-6 h-6 animate-spin text-primary/30" aria-label="Cargando notas" />
            </div>
          ) : notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 gap-2 text-muted-foreground/40">
              <MessageSquare className="w-8 h-8 opacity-30" aria-hidden="true" />
              <span className="text-[13px] font-medium">Sin notas aún</span>
            </div>
          ) : (
            <div className="space-y-4">
              {notes.map((note) => {
                const isMe = note.user_name === currentUserName;
                return (
                  <div key={note.id} className={cn("flex gap-2.5", isMe ? "flex-row-reverse" : "flex-row")}>
                    <div className="w-7 h-7 rounded-full bg-muted/60 flex items-center justify-center shrink-0 mt-1" aria-hidden="true">
                      <User className="w-3.5 h-3.5 text-muted-foreground/50" />
                    </div>
                    <div className={cn("max-w-[75%] space-y-1", isMe ? "items-end" : "items-start")}>
                      <div className={cn("flex items-center gap-2", isMe ? "flex-row-reverse" : "flex-row")}>
                        <span className="text-[11px] font-bold text-muted-foreground/50">{note.user_name}</span>
                        <span className="text-[10px] text-muted-foreground/30">
                          {new Date(note.created_at).toLocaleString("es-ES", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div
                        className={cn(
                          "px-3.5 py-2.5 rounded-2xl text-[13px] font-medium leading-relaxed",
                          isMe
                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                            : "bg-muted/50 text-foreground/80 rounded-tl-sm"
                        )}
                      >
                        {note.text}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>
          )}
        </ScrollArea>

        <form onSubmit={handleSend} className="px-4 py-4 border-t border-border/30 flex gap-2 shrink-0">
          <Input
            placeholder="Escribe una nota..."
            className="flex-1 bg-muted/30 border-none rounded-2xl h-11 text-[13px] font-medium px-4"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            disabled={sending}
            aria-label="Escribe una nota"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!noteText.trim() || sending}
            className="h-11 w-11 rounded-2xl bg-primary hover:bg-primary/90 shrink-0"
            aria-label="Enviar nota"
          >
            {sending ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="w-4 h-4" aria-hidden="true" />
            )}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
