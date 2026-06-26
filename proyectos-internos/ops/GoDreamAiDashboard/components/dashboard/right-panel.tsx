"use client";

import {
  Activity,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Sparkles,
  Zap,
  Calendar,
  MessageSquare,
  Video as VideoIcon,
  Target,
  BarChart3,
  LogOut,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getOpportunityCounts, getRecentActivity } from "@/lib/opportunities";
import { supabase } from "@/lib/supabase";
import type { Section, ActivityItem } from "@/lib/types";
import { useRouter } from "next/navigation";

interface UserProfile {
  id: string;
  full_name?: string | null;
  email?: string | null;
  user_metadata?: { full_name?: string };
}

interface StateConfig {
  icon: LucideIcon;
  color: string;
  bg: string;
  label: string;
}

const STATE_CONFIG: Record<string, StateConfig> = {
  nuevo: { icon: Sparkles, color: "text-blue-500", bg: "bg-blue-500/10", label: "Nuevos" },
  conexion: { icon: Zap, color: "text-orange-500", bg: "bg-orange-500/10", label: "Conexión" },
  agenda: { icon: Calendar, color: "text-teal-500", bg: "bg-teal-500/10", label: "Agendados" },
  r1: { icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-500/10", label: "R1 Realizada" },
  r2: { icon: VideoIcon, color: "text-indigo-500", bg: "bg-indigo-500/10", label: "R2 / Propuesta" },
  cliente: { icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10", label: "Clientes" },
  seguimiento: { icon: Clock, color: "text-slate-500", bg: "bg-slate-500/10", label: "Seguimiento" },
  descalificado: { icon: XCircle, color: "text-amber-500", bg: "bg-amber-500/10", label: "No cualificado" },
};

const METRIC_STATES = ["nuevo", "conexion", "agenda", "r1", "r2", "cliente", "seguimiento", "descalificado"];

const formatRelativeTime = (date: string) => {
  const diffSec = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diffSec < 60) return "Ahora";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h`;
  return `${Math.floor(diffSec / 86400)}d`;
};

export function RightPanel({ activeSection }: { activeSection: Section }) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  // Fetch user once on mount
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user: authUser } }) => {
      if (!authUser) return;
      supabase
        .from("profiles")
        .select("id, full_name, email")
        .eq("id", authUser.id)
        .single()
        .then(({ data: profile }) => {
          setUser(
            profile ?? {
              id: authUser.id,
              email: authUser.email,
              user_metadata: authUser.user_metadata,
            }
          );
        });
    });
  }, []);

  // Fetch counts + activity (refresh every 60s)
  useEffect(() => {
    const fetchData = async () => {
      if (activeSection === "opportunities" || activeSection === "overview") {
        const data = await getOpportunityCounts();
        setCounts(data);
      }
      const activityData = await getRecentActivity(6);
      setActivity(activityData as ActivityItem[]);
    };

    fetchData();
    const interval = setInterval(fetchData, 60_000);
    return () => clearInterval(interval);
  }, [activeSection]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const displayName =
    user?.full_name ??
    user?.user_metadata?.full_name ??
    user?.email?.split("@")[0] ??
    "Sesión Activa";

  return (
    <aside className="hidden xl:flex w-[300px] h-screen bg-card border-l border-border flex-col shrink-0 overflow-hidden shadow-2xl z-10">
      {/* User header */}
      <div className="p-6 border-b border-border bg-muted/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-black text-primary uppercase"
              aria-hidden="true"
            >
              {user?.email?.charAt(0) ?? "U"}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 leading-none mb-1">
                Usuario
              </p>
              <p className="text-sm font-black text-foreground truncate max-w-[120px]">{displayName}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-rose-500/10 text-muted-foreground/40 hover:text-rose-500 rounded-lg transition-colors"
            aria-label="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex items-center justify-between mb-2 pt-4 border-t border-border/50">
          <h3 className="text-[12px] font-black uppercase tracking-widest text-muted-foreground/40">
            Resumen Estratégico
          </h3>
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" aria-hidden="true" />
            LIVE
          </span>
        </div>
        <p className="text-sm font-black text-foreground uppercase tracking-tight">
          {activeSection === "opportunities" ? "Pipeline de Ventas" : "Performance Global"}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeSection === "opportunities" ? (
          <div className="p-6 space-y-6">
            <div className="grid gap-3">
              {METRIC_STATES.map((state) => {
                const config = STATE_CONFIG[state];
                if (!config) return null;
                const Icon = config.icon;
                const value = counts[state] ?? 0;

                return (
                  <div
                    key={state}
                    className="flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 rounded-[22px] border border-transparent hover:border-border/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn("p-2.5 rounded-[14px]", config.bg)}>
                        <Icon className={cn("w-4 h-4", config.color)} aria-hidden="true" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground/50 leading-none mb-1">
                          {config.label}
                        </span>
                        <span className="text-lg font-black text-foreground tracking-tighter">{value}</span>
                      </div>
                    </div>
                    <div className="w-12 h-1 bg-muted rounded-full overflow-hidden" aria-hidden="true">
                      <div
                        className={cn("h-full transition-all duration-1000", config.color.replace("text-", "bg-"))}
                        style={{ width: `${Math.min(value, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-5 bg-primary/5 rounded-[28px] border border-primary/10 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-primary" aria-hidden="true" />
                <h4 className="text-xs font-black uppercase tracking-wider text-primary">Insight IA</h4>
              </div>
              <p className="text-[13px] font-medium text-primary/80 leading-relaxed">
                Revisá los leads estancados en conexión. Es buen momento para activar el seguimiento R1.
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border">
            <div className="p-6 space-y-4">
              <div className="p-5 rounded-[28px] bg-muted/30 border border-border/50">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
                    Meta del Mes
                  </p>
                  <span className="text-xs font-black text-primary">65%</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2" role="progressbar" aria-valuenow={65} aria-valuemin={0} aria-valuemax={100}>
                  <div className="h-full bg-primary w-[65%] rounded-full" />
                </div>
                <p className="text-[11px] font-bold text-foreground/60">32 de 50 Clientes Nuevos</p>
              </div>

              <div className="p-5 rounded-[28px] bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-500/10 rounded-xl">
                    <Zap className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-emerald-500/80">
                    Velocidad de Venta
                  </p>
                </div>
                <p className="text-xl font-black text-foreground tracking-tighter">12.4 Días</p>
                <p className="text-[10px] font-bold text-emerald-600/60 mt-1">1.2 días más rápido que ayer</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/40 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5" aria-hidden="true" />
                  Historial Reciente
                </span>
                <Sparkles className="w-3 h-3 text-primary animate-pulse" aria-hidden="true" />
              </h3>
              <div className="space-y-6">
                {activity.length === 0 ? (
                  <p className="text-[11px] text-muted-foreground/30 font-bold uppercase tracking-widest text-center py-4 italic">
                    Sin actividad reciente
                  </p>
                ) : (
                  activity.map((item) => (
                    <div key={item.id} className="flex gap-4 items-start">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full mt-2 shrink-0",
                          item.new_state === "cliente" ? "bg-emerald-500" : "bg-primary"
                        )}
                        aria-hidden="true"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-black text-foreground mb-0.5 leading-tight">
                          {item.lead_name ?? "Prospecto"}
                        </p>
                        <p className="text-[10px] font-medium text-muted-foreground/60 mb-1.5">
                          De{" "}
                          <span className="uppercase text-muted-foreground/40">{item.old_state ?? "Nuevo"}</span>{" "}
                          pasa a{" "}
                          <span className="uppercase font-black text-primary/80">{item.new_state}</span>
                        </p>
                        <div className="flex items-center justify-between bg-muted/20 p-2 rounded-xl border border-border/30">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <div
                              className="w-4 h-4 rounded-full bg-card flex items-center justify-center text-[7px] font-black text-primary border border-border/50 shrink-0"
                              aria-hidden="true"
                            >
                              {item.user_name?.charAt(0) ?? "D"}
                            </div>
                            <p className="text-[9px] font-black text-foreground truncate">
                              {item.user_name ?? "Dashboard"}
                            </p>
                          </div>
                          <span className="text-[9px] font-bold text-muted-foreground/40 whitespace-nowrap">
                            {formatRelativeTime(item.changed_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="p-6 space-y-4">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/40 flex items-center gap-2">
                <Users className="w-3.5 h-3.5" aria-hidden="true" />
                Top Performers
              </h3>
              <p className="text-[11px] text-muted-foreground/30 font-medium italic">
                Datos de rendimiento disponibles desde el historial de pipeline.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-border bg-muted/5">
        <Button className="w-full rounded-2xl h-12 font-black text-[12px] uppercase tracking-widest gap-2 shadow-xl shadow-primary/20">
          <BarChart3 className="w-4 h-4" aria-hidden="true" />
          Descargar Reporte
        </Button>
      </div>
    </aside>
  );
}
