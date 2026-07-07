"use client";

import React from "react"

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  PieChart as PieChartIcon,
  BarChart3,
  Clock,
  ChevronRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const conversionData = [
  { month: "Ene", rate: 18 },
  { month: "Feb", rate: 22 },
  { month: "Mar", rate: 19 },
  { month: "Abr", rate: 25 },
  { month: "May", rate: 23 },
  { month: "Jun", rate: 28 },
  { month: "Jul", rate: 26 },
  { month: "Ago", rate: 31 },
  { month: "Sep", rate: 29 },
  { month: "Oct", rate: 32 },
  { month: "Nov", rate: 35 },
  { month: "Dic", rate: 38 },
];

const reports = [
  { id: "1", name: "Resumen mensual de ventas", type: "Ventas", date: "20 Ene 2024", status: "ready" },
  { id: "2", name: "Analisis de desempeno Q4", type: "Rendimiento", date: "18 Ene 2024", status: "ready" },
  { id: "3", name: "Proyeccion de operaciones", type: "Proyeccion", date: "15 Ene 2024", status: "ready" },
  { id: "4", name: "Productividad del equipo", type: "Equipo", date: "12 Ene 2024", status: "generating" },
  { id: "5", name: "Analisis de fuentes de leads", type: "Marketing", date: "10 Ene 2024", status: "ready" },
];

function ReportCard({
  title,
  description,
  icon: Icon,
  color,
  index,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  index: number;
}) {
  return (
    <div
      className="group bg-card border border-border rounded-xl p-5 hover:border-accent/50 cursor-pointer transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
    >
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-4", color)}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground mb-4">{description}</p>
      <button className="flex items-center gap-1 text-xs text-accent font-medium group-hover:gap-2 transition-all duration-200">
        Ver informe
        <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
}

export function ReportsSection() {
  const [chartsLoaded, setChartsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setChartsLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Quick report cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ReportCard
          title="Resumen de ventas"
          description="Facturacion mensual y metricas de operaciones"
          icon={BarChart3}
          color="bg-chart-1/10 text-chart-1"
          index={0}
        />
        <ReportCard
          title="Tasa de conversion"
          description="Analisis de rendimiento del embudo"
          icon={TrendingUp}
          color="bg-accent/10 text-accent"
          index={1}
        />
        <ReportCard
          title="Fuentes de leads"
          description="Desglose de atribucion por canal"
          icon={PieChartIcon}
          color="bg-chart-3/10 text-chart-3"
          index={2}
        />
        <ReportCard
          title="Proyeccion"
          description="Predicciones de ingresos y metas"
          icon={Calendar}
          color="bg-chart-5/10 text-chart-5"
          index={3}
        />
      </div>

      {/* Conversion rate trend */}
      <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-foreground">Tendencia de conversion</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Conversion mensual de lead a operacion</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-success font-medium">
            <TrendingUp className="w-4 h-4" />
            +111% interanual
          </div>
        </div>
        <div className={`h-[250px] transition-opacity duration-700 ${chartsLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={conversionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
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
                formatter={(value: number) => [`${value}%`, "Tasa de conversion"]}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="var(--color-accent)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent reports table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h3 className="text-base font-semibold text-foreground">Informes recientes</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Tus informes generados</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
            <FileText className="w-4 h-4" />
            Generar nuevo
          </button>
        </div>
        <div className="divide-y divide-border">
          {reports.map((report, index) => (
            <div
              key={report.id}
              className="flex items-center justify-between px-5 py-4 hover:bg-secondary/30 transition-colors duration-150 cursor-pointer animate-in fade-in slide-in-from-left-2"
              style={{ animationDelay: `${(index + 6) * 50}ms`, animationFillMode: "both" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{report.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="px-1.5 py-0.5 rounded bg-secondary">{report.type}</span>
                    <span>•</span>
                    <span>{report.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {report.status === "generating" ? (
                  <div className="flex items-center gap-2 text-xs text-warning">
                    <Clock className="w-4 h-4 animate-pulse" />
                    Generando...
                  </div>
                ) : (
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200">
                    <Download className="w-4 h-4" />
                    Descargar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
