"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { TEAM_SEAT_LIMIT } from "@/lib/constants";

export type MemberRole = "Administrador" | "Agente";

export interface OrgMember {
  id: string;
  name: string;
  email: string;
  role: "Dueño" | MemberRole;
  status: "Activo" | "Invitación pendiente";
}

const initialMembers: OrgMember[] = [
  { id: "owner", name: "Juan Pérez", email: "juan.perez@inmobiliaria.com", role: "Dueño", status: "Activo" },
  { id: "1", name: "Gabriela Torres", email: "gtorres@gocrm.com", role: "Agente", status: "Activo" },
  { id: "2", name: "Marcos Vidal", email: "mvidal@gocrm.com", role: "Agente", status: "Activo" },
  { id: "3", name: "Paula Sena", email: "psena@gocrm.com", role: "Agente", status: "Activo" },
  { id: "4", name: "Diego Ruiz", email: "druiz@gocrm.com", role: "Agente", status: "Activo" },
  { id: "5", name: "Camila Rios", email: "crios@gocrm.com", role: "Agente", status: "Activo" },
  { id: "6", name: "Nico Ferreiro", email: "nferreiro@gocrm.com", role: "Agente", status: "Invitación pendiente" },
];

interface TeamMembersContextValue {
  members: OrgMember[];
  seatsUsed: number;
  seatLimit: number;
  inviteMember: (email: string, role: MemberRole) => void;
  removeMember: (id: string) => void;
}

const TeamMembersContext = createContext<TeamMembersContextValue | null>(null);

export function TeamMembersProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<OrgMember[]>(initialMembers);

  const seatsUsed = members.filter((m) => m.role !== "Dueño").length;

  const inviteMember = (email: string, role: MemberRole) => {
    setMembers((prev) => [
      ...prev,
      { id: String(Date.now()), name: email.split("@")[0], email, role, status: "Invitación pendiente" },
    ]);
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <TeamMembersContext.Provider
      value={{ members, seatsUsed, seatLimit: TEAM_SEAT_LIMIT, inviteMember, removeMember }}
    >
      {children}
    </TeamMembersContext.Provider>
  );
}

export function useTeamMembers() {
  const ctx = useContext(TeamMembersContext);
  if (!ctx) throw new Error("useTeamMembers debe usarse dentro de TeamMembersProvider");
  return ctx;
}
