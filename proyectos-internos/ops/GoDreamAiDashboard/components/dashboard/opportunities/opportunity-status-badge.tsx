"use client";

import { cn } from "@/lib/utils";
import { OPPORTUNITY_STATE_LABELS, type OpportunityState } from "@/lib/types";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const STATUS_STYLES: Record<OpportunityState, string> = {
  nuevo: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  conexion: "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20",
  mensaje: "bg-cyan-500/10 text-cyan-600 hover:bg-cyan-500/20",
  conversacion: "bg-violet-500/10 text-violet-600 hover:bg-violet-500/20",
  agenda: "bg-teal-500/10 text-teal-600 hover:bg-teal-500/20",
  r1: "bg-purple-500/10 text-purple-600 hover:bg-purple-500/20",
  r2: "bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20",
  cliente: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20",
  seguimiento: "bg-slate-500/10 text-slate-600 hover:bg-slate-500/20",
  rechazado: "bg-rose-500/10 text-rose-600 hover:bg-rose-500/20",
  descalificado: "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20",
};

interface OpportunityStatusBadgeProps {
  state: OpportunityState;
  onUpdate: (newState: OpportunityState) => void;
}

export function OpportunityStatusBadge({ state, onUpdate }: OpportunityStatusBadgeProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "rounded-full h-8 px-4 gap-2 border-none shadow-none text-[10px] font-bold uppercase tracking-tight",
            STATUS_STYLES[state] ?? STATUS_STYLES.nuevo
          )}
        >
          {OPPORTUNITY_STATE_LABELS[state] ?? "Nuevo"}
          <ChevronDown className="w-3 h-3 opacity-50" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-[180px] rounded-xl border-border/50 shadow-lg">
        {Object.entries(OPPORTUNITY_STATE_LABELS).map(([value, label]) => (
          <DropdownMenuItem
            key={value}
            className="text-[11px] font-semibold h-9 px-4 focus:bg-primary/5 focus:text-primary cursor-pointer"
            onClick={() => onUpdate(value as OpportunityState)}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
