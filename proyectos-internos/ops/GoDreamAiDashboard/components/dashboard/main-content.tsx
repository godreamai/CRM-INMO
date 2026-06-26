"use client";

import { useRouter } from "next/navigation";
import type { Section } from "@/lib/types";
import { OverviewContent } from "@/components/dashboard/content/overview-content";
import { SettingsContent } from "@/components/dashboard/content/settings-content";
import { OpportunitiesContent } from "@/components/dashboard/content/opportunities-content";
import { ContentCalendarContent } from "@/components/dashboard/content/content-calendar-content";
import { RefreshCw, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { AppSidebar } from "@/components/dashboard/app-sidebar";

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
    title: "Configuración",
    subtitle: "Alertas e Integraciones",
  },
};

export function MainContent({ activeSection, onNavigate, searchQuery }: MainContentProps) {
  const router = useRouter();
  const config = sectionConfig[activeSection];
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Header */}
      <header className="h-16 px-4 md:px-8 flex items-center justify-between border-b border-border bg-card shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          {/* Mobile nav trigger */}
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="md:hidden p-2 rounded-xl hover:bg-muted/60 transition-colors shrink-0"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="w-5 h-5 text-foreground/70" aria-hidden="true" />
          </button>
          <div className="min-w-0">
            <h1 className="text-base md:text-lg font-semibold text-foreground tracking-tight truncate">
              {config.title}
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground truncate hidden sm:block">
              {config.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
            onClick={() => router.refresh()}
            aria-label="Actualizar datos"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </header>

      {/* Mobile sidebar sheet */}
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-[280px] p-0 bg-card border-r border-border">
          <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
          <AppSidebar
            activeSection={activeSection}
            onSectionChange={(section) => {
              onNavigate?.(section);
              setMobileNavOpen(false);
            }}
          />
        </SheetContent>
      </Sheet>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div key={activeSection} className="animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
