"use client";

import { MetricCard } from "@/components/dashboard/metric-card";
import { TopListings } from "@/components/dashboard/top-listings";
import { initialProperties } from "@/lib/mock-properties";
import { AGENT_NAME, AGENCY_NAME } from "@/lib/constants";
import type { Section } from "@/app/page";
import { Building2, Eye, MessageCircle, TrendingUp, ArrowRight } from "lucide-react";

interface OverviewSectionProps {
  onNavigate?: (section: Section) => void;
}

export function OverviewSection({ onNavigate }: OverviewSectionProps) {
  const totalViews = initialProperties.reduce((acc, p) => acc + p.views, 0);
  const totalContacts = initialProperties.reduce((acc, p) => acc + p.contactClicks, 0);
  const avgConversion = totalViews > 0 ? (totalContacts / totalViews) * 100 : 0;

  const today = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <div className="space-y-6">
      {/* Greeting banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-accent/10 via-card to-card border border-border rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground capitalize">{today}</p>
            <h2 className="text-2xl font-bold text-foreground mt-1">Hola, {AGENT_NAME}</h2>
            <p className="text-sm text-muted-foreground mt-1">{AGENCY_NAME}</p>
          </div>
          <button
            onClick={() => onNavigate?.("properties")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors duration-200 shrink-0"
          >
            <Building2 className="w-4 h-4" />
            Ver todas las propiedades
          </button>
        </div>
      </div>

      {/* Web data KPIs */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-muted-foreground">Datos de tu landing</p>
          <button
            onClick={() => onNavigate?.("webAnalytics")}
            className="flex items-center gap-1 text-xs text-accent hover:underline transition-all shrink-0"
          >
            Ver analitica completa <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Propiedades activas"
            value="128"
            change="+6.4%"
            changeType="positive"
            icon={Building2}
            delay={0}
          />
          <MetricCard
            title="Vistas totales"
            value={totalViews.toLocaleString("es-AR")}
            icon={Eye}
            delay={1}
          />
          <MetricCard
            title="Contactos WhatsApp"
            value={totalContacts.toLocaleString("es-AR")}
            icon={MessageCircle}
            delay={2}
          />
          <MetricCard
            title="Tasa de contacto"
            value={`${avgConversion.toFixed(1)}%`}
            icon={TrendingUp}
            delay={3}
          />
        </div>
      </div>

      <TopListings onNavigate={onNavigate} />
    </div>
  );
}
