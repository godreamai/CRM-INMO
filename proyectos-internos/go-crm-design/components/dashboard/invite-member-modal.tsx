"use client";

import { useState, useRef } from "react";
import { X, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrgMember } from "@/components/dashboard/team-members-context";

export type MemberRole = "Administrador" | "Agente";

interface InviteMemberModalProps {
  member?: OrgMember;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; role: MemberRole }) => void;
}

export function InviteMemberModal({ member, onClose, onSubmit }: InviteMemberModalProps) {
  const isEditing = !!member;
  const [name, setName] = useState(member?.name ?? "");
  const [email, setEmail] = useState(member?.email ?? "");
  const [role, setRole] = useState<MemberRole>((member?.role as MemberRole) ?? "Agente");
  const [error, setError] = useState("");
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  const handleSubmit = () => {
    if (!email.trim() || !email.includes("@")) {
      setError("Ingresá un email válido");
      return;
    }
    onSubmit({ name: name.trim(), email: email.trim(), role });
    onClose();
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-accent" />
            </div>
            <h2 className="text-base font-semibold text-foreground">
              {isEditing ? "Editar miembro" : "Invitar agente"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
              Nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre y apellido"
              className="w-full h-9 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-accent transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
              Email *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              placeholder="agente@inmobiliaria.com"
              className={cn(
                "w-full h-9 px-3 rounded-lg bg-secondary border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all",
                error ? "border-destructive focus:border-destructive" : "border-border focus:border-accent"
              )}
            />
            {error && <p className="text-xs text-destructive mt-1">{error}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Rol</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as MemberRole)}
              className="w-full h-9 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-accent"
            >
              <option value="Agente">Agente</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-secondary/30">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-all duration-200"
          >
            {isEditing ? "Guardar cambios" : "Enviar invitación"}
          </button>
        </div>
      </div>
    </div>
  );
}
