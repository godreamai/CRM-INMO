"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { TEAM_SEAT_LIMIT } from "@/lib/constants";
import { Building2, Upload, Plus, Trash2, UserPlus } from "lucide-react";

type Invite = { email: string; role: "Administrador" | "Agente" };

const emptyInvite: Invite = { email: "", role: "Agente" };

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [agencyName, setAgencyName] = useState("");
  const [invites, setInvites] = useState<Invite[]>([{ ...emptyInvite }]);

  const updateInvite = (index: number, patch: Partial<Invite>) => {
    setInvites((prev) => prev.map((inv, i) => (i === index ? { ...inv, ...patch } : inv)));
  };

  const addInvite = () => {
    if (invites.length >= TEAM_SEAT_LIMIT) return;
    setInvites((prev) => [...prev, { ...emptyInvite }]);
  };

  const removeInvite = (index: number) => {
    setInvites((prev) => prev.filter((_, i) => i !== index));
  };

  const finish = () => router.push("/");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-accent">
            <Building2 className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="font-bold text-xl text-foreground tracking-tight">
            Go<span className="text-accent">CRM</span>
          </span>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="px-8 pt-6">
            <div className="flex gap-1 mb-6">
              {([1, 2] as const).map((s) => (
                <div
                  key={s}
                  className={cn(
                    "h-1 rounded-full flex-1 transition-all duration-300",
                    s <= step ? "bg-accent" : "bg-border"
                  )}
                />
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="px-8 pb-8 space-y-5">
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  Contanos sobre tu inmobiliaria
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Estos datos aparecen en tus reportes y en el panel de tu equipo.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-secondary border border-border flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-muted-foreground" />
                </div>
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Subir logo (opcional)
                </button>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-muted-foreground">
                  Nombre de la inmobiliaria
                </label>
                <input
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  placeholder="Inmobiliaria Pérez"
                  className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-accent transition-all"
                />
              </div>

              <div className="rounded-lg border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
                Plan Estándar — incluye hasta <span className="text-foreground font-medium">{TEAM_SEAT_LIMIT} agentes</span> en tu equipo.
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setStep(2)}
                  disabled={!agencyName.trim()}
                  className="px-5 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 disabled:opacity-40 disabled:pointer-events-none transition-all duration-200"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="px-8 pb-8 space-y-5">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Invitá a tu equipo</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Podés hacerlo ahora o más tarde desde Configuración → Equipo.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Invitaciones</span>
                <span className="text-foreground font-medium">
                  {invites.length} / {TEAM_SEAT_LIMIT} cupos
                </span>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {invites.map((invite, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="email"
                      value={invite.email}
                      onChange={(e) => updateInvite(index, { email: e.target.value })}
                      placeholder="agente@inmobiliaria.com"
                      className="flex-1 h-9 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-accent transition-all"
                    />
                    <select
                      value={invite.role}
                      onChange={(e) =>
                        updateInvite(index, { role: e.target.value as Invite["role"] })
                      }
                      className="h-9 px-2 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-accent"
                    >
                      <option value="Agente">Agente</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => removeInvite(index)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-secondary transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addInvite}
                disabled={invites.length >= TEAM_SEAT_LIMIT}
                className="flex items-center gap-1.5 text-sm text-accent font-medium hover:gap-2 transition-all disabled:opacity-40 disabled:pointer-events-none"
              >
                <Plus className="w-4 h-4" />
                Agregar otro
              </button>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={finish}
                  className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
                >
                  Saltar por ahora
                </button>
                <button
                  onClick={finish}
                  className="flex items-center gap-2 px-5 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-all duration-200"
                >
                  <UserPlus className="w-4 h-4" />
                  Enviar invitaciones y entrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
