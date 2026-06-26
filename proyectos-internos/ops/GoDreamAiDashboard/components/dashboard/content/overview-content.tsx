"use client";

import { useState, useEffect } from "react";
import {
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Zap,
  Target,
  Users,
  Calendar,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { getRealMetrics, getPriorityAlerts } from "@/lib/opportunities";
import { cn } from "@/lib/utils";
import type { Section, MetricsSummary, PriorityAlert } from "@/lib/types";

export function OverviewContent({ onNavigate }: { onNavigate?: (s: Section, search?: string) => void }) {
  const [metrics, setMetrics] = useState<MetricsSummary | null>(null);
  const [alerts, setAlerts] = useState<PriorityAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    async function loadData() {
      try {
        const [m, a] = await Promise.all([getRealMetrics(), getPriorityAlerts()]);
        setMetrics(m);
        setAlerts(a);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary/30" aria-label="Cargando datos" />
      </div>
    );
  }

  const totalPages = Math.ceil(alerts.length / ITEMS_PER_PAGE);
  const paginatedAlerts = alerts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const metricCards = [
    {
      label: "Total Oportunidades",
      value: metrics?.totalOpportunities ?? 0,
      change: "+12%",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Tasa de Agendamiento",
      value: `${metrics?.schedulingRate.toFixed(1) ?? "0.0"}%`,
      change: "+2.4%",
      icon: Calendar,
      color: "text-teal-500",
      bgColor: "bg-teal-500/10",
    },
    {
      label: "Tasa de Cierre",
      value: `${metrics?.closingRate.toFixed(1) ?? "0.0"}%`,
      change: "+1.2%",
      icon: Target,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Leads en Flow",
      value: metrics?.totalInFlow ?? 0,
      change: "Activos",
      icon: Zap,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="bg-card rounded-2xl p-5 border border-border shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={cn("p-2.5 rounded-xl", metric.bgColor)}>
                  <Icon className={cn("w-5 h-5", metric.color)} aria-hidden="true" />
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">
                  <TrendingUp className="w-3 h-3" aria-hidden="true" />
                  <span>{metric.change}</span>
                </div>
              </div>
              <p className="text-2xl font-black text-foreground mb-1 tracking-tighter">{metric.value}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50">{metric.label}</p>
            </div>
          );
        })}
      </div>

      {/* Priority Alerts */}
      <div className="bg-card rounded-[32px] p-6 md:p-8 border border-border/50 shadow-sm flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <div>
            <h3 className="text-xl font-black text-foreground tracking-tight">Lista de Prioridades</h3>
            <p className="text-sm text-muted-foreground">
              Leads que requieren acción inmediata ({alerts.length} en total)
            </p>
          </div>
          <div className="bg-orange-500/10 text-orange-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 w-fit">
            <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
            {alerts.length} ALERTAS
          </div>
        </div>

        <div className="flex-1 space-y-4">
          {paginatedAlerts.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground/30 font-bold uppercase tracking-widest">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-10" aria-hidden="true" />
              Todo al día
            </div>
          ) : (
            paginatedAlerts.map((alert, i) => (
              <div
                key={`${alert.opportunity_id}-${i}`}
                role="button"
                tabIndex={0}
                className="flex items-center justify-between p-4 md:p-5 bg-muted/20 hover:bg-muted/40 rounded-[24px] border border-transparent hover:border-border/50 transition-all cursor-pointer group"
                onClick={() => onNavigate?.("opportunities", alert.full_name)}
                onKeyDown={(e) => e.key === "Enter" && onNavigate?.("opportunities", alert.full_name)}
                aria-label={`Ver oportunidad de ${alert.full_name}`}
              >
                <div className="flex items-center gap-4 md:gap-5 min-w-0">
                  <div
                    className={cn(
                      "w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-lg md:text-xl shadow-lg shrink-0",
                      alert.severity === "high"
                        ? "bg-rose-500 text-white shadow-rose-200"
                        : "bg-orange-500 text-white shadow-orange-200"
                    )}
                    aria-hidden="true"
                  >
                    {alert.full_name?.charAt(0) ?? "L"}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-black text-foreground text-[14px] md:text-[15px] truncate">{alert.full_name}</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 truncate">
                      <span className="font-bold uppercase tracking-widest text-primary/60">{alert.state}</span>
                      <span aria-hidden="true">•</span>
                      <span className="italic truncate">&ldquo;{alert.message}&rdquo;</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden md:block">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Límite</p>
                    <p className="text-xs font-bold text-foreground">{alert.limit} días</p>
                  </div>
                  <div className="p-3 bg-card rounded-xl shadow-sm border border-border/50 text-muted-foreground group-hover:text-primary group-hover:bg-primary/5 transition-colors">
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-border/50">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
              Página {currentPage} de {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-4 py-2 rounded-xl bg-muted/30 hover:bg-muted/50 text-xs font-black uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Anterior
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-xs font-black uppercase tracking-widest text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
