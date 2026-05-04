"use client";

import {
  Activity,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Sparkles,
  Zap,
  Calendar,
  MessageSquare,
  Video as VideoIcon,
  ChevronRight,
  Target,
  BarChart3,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getOpportunityCounts, getRecentActivity } from "@/lib/opportunities";
import { OPPORTUNITY_STATE_LABELS, type OpportunityState } from "@/lib/types";
import type { Section } from "@/app/page";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Helper for relative time
const formatRelativeTime = (date: string) => {
  const now = new Date();
  const then = new Date(date);
  const diff = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diff < 60) return 'Ahora';
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
};

const STATE_CONFIG: Record<string, any> = {
  nuevo: {
    icon: Sparkles,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    label: 'Nuevos'
  },
  conexion: {
    icon: Zap,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    label: 'Conexión'
  },
  agenda: {
    icon: Calendar,
    color: 'text-teal-500',
    bg: 'bg-teal-500/10',
    label: 'Agendados'
  },
  r1: {
    icon: MessageSquare,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    label: 'R1 Realizada'
  },
  r2: {
    icon: VideoIcon,
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
    label: 'R2 / Propuesta'
  },
  cliente: {
    icon: CheckCircle,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    label: 'Clientes'
  },
  seguimiento: {
    icon: Clock,
    color: 'text-slate-500',
    bg: 'bg-slate-500/10',
    label: 'Seguimiento'
  },
  descalificado: {
    icon: XCircle,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    label: 'No cualificado'
  }
};

const METRIC_STATES = ['nuevo', 'conexion', 'agenda', 'r1', 'r2', 'cliente', 'seguimiento', 'descalificado'];

const salesActivity = [
  {
    id: 1,
    type: "conversion",
    title: "Nueva R2 Agendada",
    client: "Eduardo G.",
    time: "2 min ago",
    status: "positive",
  },
  {
    id: 2,
    type: "alert",
    title: "Lead en riesgo de frío",
    client: "Nico H.",
    time: "15 min ago",
    status: "warning",
  },
  {
    id: 3,
    type: "success",
    title: "Contrato Firmado",
    client: "Marta V.",
    time: "1 hour ago",
    status: "success",
  },
  {
    id: 4,
    type: "conversion",
    title: "Primer contacto exitoso",
    client: "Tomás P.",
    time: "2 hours ago",
    status: "positive",
  },
];

const topSdrs = [
  { id: 1, name: "Mauro", closed: 12, rate: "85%", initials: "M" },
  { id: 2, name: "Sarah", closed: 9, rate: "72%", initials: "S" },
  { id: 3, name: "Nassa", closed: 8, rate: "90%", initials: "N" },
];

export function RightPanel({ activeSection }: { activeSection: Section }) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [activity, setActivity] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function init() {
      // Get User
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();

        setUser(profile || authUser);
      }

      // Get Counts
      if (activeSection === 'opportunities' || activeSection === 'overview') {
        const data = await getOpportunityCounts();
        setCounts(data);
      }

      // Get Activity
      const activityData = await getRecentActivity(6);
      setActivity(activityData);
    }
    init();

    const interval = setInterval(init, 60000);
    return () => clearInterval(interval);
  }, [activeSection]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <aside className="w-[300px] h-screen bg-card border-l border-border flex flex-col shrink-0 overflow-hidden shadow-2xl z-10">
      <div className="p-6 border-b border-border bg-muted/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-black text-primary uppercase">
              {user?.email?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 leading-none mb-1">Usuario</p>
              <p className="text-sm font-black text-foreground truncate max-w-[120px]">
                {user?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Sesión Activa'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-rose-500/10 text-muted-foreground/40 hover:text-rose-500 rounded-lg transition-colors group"
            title="Cerrar Sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between mb-2 pt-4 border-t border-border/50">
          <h3 className="text-[12px] font-black uppercase tracking-widest text-muted-foreground/40">Resumen Estratégico</h3>
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            LIVE
          </span>
        </div>
        <p className="text-sm font-black text-foreground uppercase tracking-tight">
          {activeSection === 'opportunities' ? 'Pipeline de Ventas' : 'Performance Global'}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {activeSection === 'opportunities' ? (
          <div className="p-6 space-y-6">
            {/* Main Stats Grid */}
            <div className="grid gap-3">
              {METRIC_STATES.map((state) => {
                const config = STATE_CONFIG[state];
                const Icon = config.icon;
                const value = counts[state] || 0;

                return (
                  <div
                    key={state}
                    className="group relative flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 rounded-[22px] border border-transparent hover:border-border/50 transition-all cursor-default"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn("p-2.5 rounded-[14px]", config.bg)}>
                        <Icon className={cn("w-4 h-4", config.color)} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground/50 leading-none mb-1">
                          {config.label}
                        </span>
                        <span className="text-lg font-black text-foreground tracking-tighter">
                          {value}
                        </span>
                      </div>
                    </div>

                    <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn("h-full transition-all duration-1000", config.color.replace('text-', 'bg-'))}
                        style={{ width: `${Math.min((value / 100) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Insights Card */}
            <div className="p-5 bg-primary/5 rounded-[28px] border border-primary/10 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-primary" />
                <h4 className="text-xs font-black uppercase tracking-wider text-primary">Insight IA</h4>
              </div>
              <p className="text-[13px] font-medium text-primary/80 leading-relaxed">
                Mauro tiene <span className="font-bold underline">12 personas</span> en fase de conexión. Es buen momento para activar el seguimiento R1.
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {/* Sales Velocity / Goals */}
            <div className="p-6 space-y-4">
              <div className="flex flex-col gap-4">
                <div className="p-5 rounded-[28px] bg-muted/30 border border-border/50">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Meta del Mes</p>
                    <span className="text-xs font-black text-primary">65%</span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-primary w-[65%] rounded-full shadow-[0_0_12px_rgba(var(--primary),0.5)]" />
                  </div>
                  <p className="text-[11px] font-bold text-foreground/60">32 de 50 Clientes Nuevos</p>
                </div>

                <div className="p-5 rounded-[28px] bg-emerald-500/5 border border-emerald-500/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-emerald-500/10 rounded-xl">
                      <Zap className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-emerald-500/80">Velocidad de Venta</p>
                  </div>
                  <p className="text-xl font-black text-foreground tracking-tighter">12.4 Días</p>
                  <p className="text-[10px] font-bold text-emerald-600/60 mt-1">1.2 días más rápido que ayer</p>
                </div>
              </div>
            </div>

            {/* Smart Sales Feed - ACTIVE HISTORY */}
            <div className="p-6 space-y-4">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/40 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5" />
                  Historial Reciente
                </span>
                <Sparkles className="w-3 h-3 text-primary animate-pulse" />
              </h3>
              <div className="space-y-6">
                {activity.length === 0 ? (
                  <p className="text-[11px] text-muted-foreground/30 font-bold uppercase tracking-widest text-center py-4 italic">Sin actividad reciente</p>
                ) : activity.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start group relative">
                    <div className={cn(
                      "w-2 h-2 rounded-full mt-2 shrink-0 shadow-sm",
                      item.new_state === 'cliente' ? 'bg-emerald-500' : 'bg-primary'
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-black text-foreground mb-0.5 leading-tight">
                        {item.lead_name || 'Prospecto'}
                      </p>
                      <p className="text-[10px] font-medium text-muted-foreground/60 mb-1.5 flex items-center gap-1">
                        De <span className="uppercase text-muted-foreground/40">{item.old_state || 'Nuevo'}</span> pása a <span className="uppercase font-black text-primary/80">{item.new_state}</span>
                      </p>

                      <div className="flex items-center justify-between gap-2 bg-muted/20 p-2 rounded-xl border border-border/30">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-[7px] font-black text-primary border border-border/50 shrink-0">
                            {item.user_name?.charAt(0) || 'D'}
                          </div>
                          <p className="text-[9px] font-black text-foreground truncate shrink">
                            {item.user_name || 'Dash UI'}
                          </p>
                        </div>
                        <span className="text-[9px] font-bold text-muted-foreground/40 whitespace-nowrap">{formatRelativeTime(item.changed_at)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performers SDR */}
            <div className="p-6 space-y-4">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/40 flex items-center gap-2">
                <Users className="w-3.5 h-3.5" />
                Top Performers
              </h3>
              <div className="space-y-3">
                {topSdrs.map((sdr, i) => (
                  <div key={sdr.id} className="flex items-center justify-between p-3 rounded-2xl bg-muted/20 hover:bg-muted/40 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-border/50 flex items-center justify-center text-[10px] font-black text-primary">
                        {sdr.initials}
                      </div>
                      <div>
                        <p className="text-[12px] font-black text-foreground">{sdr.name}</p>
                        <p className="text-[10px] font-bold text-muted-foreground/50">{sdr.rate} Cierre</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[12px] font-black text-primary">{sdr.closed}</p>
                      <p className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-widest">Done</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="p-6 border-t border-border bg-muted/5">
        <Button className="w-full rounded-2xl h-12 font-black text-[12px] uppercase tracking-widest gap-2 shadow-xl shadow-primary/20">
          <BarChart3 className="w-4 h-4" />
          Descargar Reporte IA
        </Button>
      </div>
    </aside>
  );
}
