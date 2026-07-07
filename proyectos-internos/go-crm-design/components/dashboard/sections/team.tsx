"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTeamMembers, type OrgMember } from "@/components/dashboard/team-members-context";
import { Mail, UserPlus, Crown, Pencil, Lock, Unlock, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { InviteMemberModal } from "@/components/dashboard/invite-member-modal";

const roleColors: Record<OrgMember["role"], string> = {
  "Dueño": "bg-accent/15 text-accent border-accent/30",
  "Administrador": "bg-chart-1/15 text-chart-1 border-chart-1/30",
  "Agente": "bg-secondary text-muted-foreground border-border",
};

const statusColors: Record<OrgMember["status"], string> = {
  "Activo": "bg-success/15 text-success border-success/30",
  "Invitación pendiente": "bg-warning/15 text-warning border-warning/30",
  "Bloqueado": "bg-destructive/15 text-destructive border-destructive/30",
};

export function TeamSection() {
  const { members, seatsUsed, seatLimit, inviteMember, updateMember, removeMember, toggleBlock } =
    useTeamMembers();
  const [showInvite, setShowInvite] = useState(false);
  const [editingMember, setEditingMember] = useState<OrgMember | null>(null);

  const atLimit = seatsUsed >= seatLimit;

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Cupos de tu plan</span>
          <span className="text-sm font-semibold text-foreground">
            {seatsUsed} / {seatLimit} miembros usados
          </span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              atLimit ? "bg-destructive" : "bg-accent"
            )}
            style={{ width: `${Math.min((seatsUsed / seatLimit) * 100, 100)}%` }}
          />
        </div>
        {atLimit && (
          <p className="text-xs text-destructive mt-2">
            Alcanzaste el límite de miembros de tu plan ({seatLimit}). Quitá o cancelá una invitación para liberar un cupo.
          </p>
        )}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h3 className="text-base font-semibold text-foreground">Miembros del equipo</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Administrá quién tiene acceso al panel</p>
          </div>
          <button
            onClick={() => setShowInvite(true)}
            disabled={atLimit}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 disabled:opacity-40 disabled:pointer-events-none transition-all duration-200"
          >
            <UserPlus className="w-4 h-4" />
            Agregar miembro
          </button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8 bg-secondary">
                      <AvatarFallback className="bg-secondary text-foreground text-xs font-semibold">
                        {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground flex items-center gap-1.5">
                      {member.name}
                      {member.role === "Dueño" && <Crown className="w-3.5 h-3.5 text-accent" />}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    {member.email}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge className={cn("border", roleColors[member.role])}>{member.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={cn("border", statusColors[member.status])}>{member.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {member.role !== "Dueño" && (
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => setEditingMember(member)}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Editar
                      </button>
                      {member.status !== "Invitación pendiente" && (
                        <button
                          onClick={() => toggleBlock(member.id)}
                          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-warning transition-colors"
                        >
                          {member.status === "Bloqueado" ? (
                            <>
                              <Unlock className="w-3.5 h-3.5" />
                              Reactivar
                            </>
                          ) : (
                            <>
                              <Lock className="w-3.5 h-3.5" />
                              Bloquear
                            </>
                          )}
                        </button>
                      )}
                      <button
                        onClick={() => removeMember(member.id)}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        {member.status === "Invitación pendiente" ? "Cancelar invitación" : "Quitar"}
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showInvite && (
        <InviteMemberModal
          onClose={() => setShowInvite(false)}
          onSubmit={({ name, email, role }) => inviteMember(name, email, role)}
        />
      )}

      {editingMember && (
        <InviteMemberModal
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onSubmit={({ name, email, role }) => updateMember(editingMember.id, { name, email, role })}
        />
      )}
    </div>
  );
}
