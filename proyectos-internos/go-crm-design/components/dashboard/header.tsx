"use client";

import { AGENT_NAME, AGENCY_NAME } from "@/lib/constants";
import type { Section } from "@/app/page";
import { Calendar, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  activeSection: Section;
  onNavigate?: (section: Section) => void;
}

const sectionTitles: Record<Section, string> = {
  overview: "Resumen",
  webAnalytics: "Analitica Web",
  properties: "Propiedades",
  team: "Equipo",
  reports: "Reportes",
  settings: "Configuracion",
};

export function Header({ activeSection, onNavigate }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-30 flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-semibold text-foreground">
          {sectionTitles[activeSection]}
        </h1>
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Ultimos 30 dias</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-9 h-9 rounded-lg overflow-hidden bg-secondary ring-2 ring-transparent hover:ring-accent/50 transition-all duration-200">
              <div className="w-full h-full bg-accent/20 flex items-center justify-center text-xs font-semibold text-accent">
                AG
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="text-sm font-medium text-foreground">{AGENT_NAME} Perez</p>
              <p className="text-xs text-muted-foreground font-normal mt-0.5">{AGENCY_NAME}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onNavigate?.("settings")}>
              <Settings className="w-4 h-4 mr-2" />
              Configuracion
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push("/login")}
              className="text-destructive focus:text-destructive"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar sesion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
