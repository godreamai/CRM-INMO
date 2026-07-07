"use client";

import { useState, useEffect } from "react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { LandingTrafficChart } from "@/components/dashboard/charts/landing-traffic-chart";
import { ConversionFunnelChart } from "@/components/dashboard/charts/conversion-funnel-chart";
import { MousePointerClick, TrendingUp, Users, Eye } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const sourceData = [
  { name: "Directo", value: 35, color: "var(--color-chart-1)" },
  { name: "Referidos", value: 25, color: "var(--color-accent)" },
  { name: "Organico", value: 20, color: "var(--color-chart-3)" },
  { name: "Pauta paga", value: 15, color: "var(--color-chart-4)" },
  { name: "Redes sociales", value: 5, color: "var(--color-chart-5)" },
];

export function WebAnalyticsSection() {
  const [chartsLoaded, setChartsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setChartsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Metric cards - web KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Visitas al sitio"
          value="18,492"
          change="+14.2%"
          changeType="positive"
          icon={Eye}
          delay={0}
        />
        <MetricCard
          title="Leads generados"
          value="1,284"
          change="+9.8%"
          changeType="positive"
          icon={Users}
          delay={1}
        />
        <MetricCard
          title="Tasa de conversion"
          value="6.94%"
          change="+1.3%"
          changeType="positive"
          icon={TrendingUp}
          delay={2}
        />
        <MetricCard
          title="Clics en propiedades"
          value="7,631"
          change="-2.1%"
          changeType="negative"
          icon={MousePointerClick}
          delay={3}
        />
      </div>

      {/* Traffic + funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LandingTrafficChart />
        </div>
        <ConversionFunnelChart />
      </div>

      {/* Lead sources */}
      <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-6">
          <h3 className="text-base font-semibold text-foreground">Origen de los leads</h3>
          <p className="text-sm text-muted-foreground mt-0.5">De donde llegan los visitantes de tu sitio</p>
        </div>
        <div className="flex items-center gap-8">
          <div className={`w-[180px] h-[180px] transition-opacity duration-700 ${chartsLoaded ? "opacity-100" : "opacity-0"}`}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-3">
            {sourceData.map((source, index) => (
              <div
                key={source.name}
                className="flex items-center justify-between animate-in fade-in slide-in-from-right-2"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                  <span className="text-sm text-foreground">{source.name}</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{source.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
