"use client";

import type { Section } from "@/app/page";
import { OverviewContent } from "@/components/dashboard/content/overview-content";
import { SettingsContent } from "@/components/dashboard/content/settings-content";
import { OpportunitiesContent } from "@/components/dashboard/content/opportunities-content";
import { ContentCalendarContent } from "@/components/dashboard/content/content-calendar-content";
import { Bell, Calendar, RefreshCw, Plus, AlertCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MainContentProps {
  activeSection: Section;
  onNavigate?: (section: Section, search?: string) => void;
  searchQuery?: string;
}

const sectionConfig: Record<Section, { title: string; subtitle: string }> = {
  overview: {
    title: "Dashboard Estratégico",
    subtitle: "Métricas de Conversión y Alertas en Tiempo Real",
  },
  opportunities: {
    title: "Oportunidades",
    subtitle: "Gestión de Prospección y Clientes",
  },
  "content-calendar": {
    title: "Estrategia de Contenido",
    subtitle: "Planificación Semanal y Producción",
  },
  settings: {
    title: "Settings",
    subtitle: "Configuration & Integrations",
  },
};

export function MainContent({ activeSection, onNavigate, searchQuery }: MainContentProps) {
  const config = sectionConfig[activeSection];

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewContent onNavigate={onNavigate} />;
      case "opportunities":
        return <OpportunitiesContent initialSearch={searchQuery} />;
      case "content-calendar":
        return <ContentCalendarContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return <OverviewContent onNavigate={onNavigate} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Header */}
      <header className="h-16 px-8 flex items-center justify-between border-b border-border bg-card shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-foreground tracking-tight">
            {config.title}
          </h1>
          <p className="text-sm text-muted-foreground">{config.subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Refresh */}
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div key={activeSection} className="animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
