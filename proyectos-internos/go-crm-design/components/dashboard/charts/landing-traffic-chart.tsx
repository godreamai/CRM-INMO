"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { week: "Sem 1", visits: 3200, leads: 180 },
  { week: "Sem 2", visits: 4100, leads: 240 },
  { week: "Sem 3", visits: 3800, leads: 210 },
  { week: "Sem 4", visits: 5300, leads: 320 },
  { week: "Sem 5", visits: 4900, leads: 295 },
  { week: "Sem 6", visits: 6200, leads: 410 },
  { week: "Sem 7", visits: 5800, leads: 380 },
  { week: "Sem 8", visits: 7100, leads: 490 },
  { week: "Sem 9", visits: 6700, leads: 445 },
  { week: "Sem 10", visits: 8200, leads: 560 },
  { week: "Sem 11", visits: 7900, leads: 530 },
  { week: "Sem 12", visits: 9400, leads: 640 },
];

export function LandingTrafficChart() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-[380px] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-foreground">Trafico de la landing</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Visitas y leads generados por semana</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-chart-1" />
            <span className="text-muted-foreground">Visitas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="text-muted-foreground">Leads</span>
          </div>
        </div>
      </div>

      <div className={`h-[280px] transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="visitsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-popover)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "var(--color-foreground)", fontWeight: 600 }}
              itemStyle={{ color: "var(--color-muted-foreground)" }}
            />
            <Area
              type="monotone"
              dataKey="visits"
              name="Visitas"
              stroke="var(--color-chart-1)"
              strokeWidth={2}
              fill="url(#visitsGradient)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="leads"
              name="Leads"
              stroke="var(--color-accent)"
              strokeWidth={2}
              fill="url(#leadsGradient)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
