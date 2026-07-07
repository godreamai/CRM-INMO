"use client";

import { Mail, Phone } from "lucide-react";

const leads = [
  { name: "Sofia Ramirez", interest: "Apto 3 amb. Palermo", source: "Landing", time: "hace 12 min", status: "Nuevo" },
  { name: "Carlos Mena", interest: "Casa en Tigre", source: "Google Ads", time: "hace 34 min", status: "Contactado" },
  { name: "Lucia Ferreyra", interest: "Local comercial Microcentro", source: "Landing", time: "hace 1 h", status: "Nuevo" },
  { name: "Martin Diaz", interest: "PH Recoleta", source: "Instagram", time: "hace 2 h", status: "Calificado" },
  { name: "Valeria Ortiz", interest: "Monoambiente Caballito", source: "Landing", time: "hace 3 h", status: "Nuevo" },
];

const statusColors: Record<string, string> = {
  Nuevo: "bg-accent/15 text-accent",
  Contactado: "bg-chart-1/15 text-chart-1",
  Calificado: "bg-chart-3/15 text-chart-3",
};

export function RecentLeads() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-foreground">Leads recientes</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Ultimas consultas desde la landing</p>
        </div>
        <button className="text-xs text-accent hover:underline transition-all">Ver todos</button>
      </div>

      <div className="space-y-3">
        {leads.map((lead) => (
          <div
            key={lead.name}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-200"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 text-xs font-semibold text-accent">
                {lead.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{lead.name}</p>
                <p className="text-xs text-muted-foreground truncate">{lead.interest}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-2">
              <div className="hidden sm:flex items-center gap-1.5">
                <button className="w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                </button>
                <button className="w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[lead.status]}`}>
                {lead.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
