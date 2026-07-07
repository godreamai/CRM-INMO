"use client";

import { Eye, MapPin, CheckCircle2, FileEdit, EyeOff, MessageCircle, TrendingUp } from "lucide-react";
import { initialProperties } from "@/lib/mock-properties";
import type { Property } from "@/lib/mock-properties";
import { cn } from "@/lib/utils";

const typeColors: Record<Property["type"], string> = {
  Venta: "bg-chart-1/15 text-chart-1",
  Alquiler: "bg-accent/15 text-accent",
};

export function WebAnalyticsSection() {
  const properties = initialProperties;

  const topViewed = [...properties].sort((a, b) => b.views - a.views).slice(0, 5);

  const viewsByNeighborhood = Object.entries(
    properties.reduce<Record<string, number>>((acc, p) => {
      acc[p.neighborhood] = (acc[p.neighborhood] ?? 0) + p.views;
      return acc;
    }, {})
  )
    .map(([neighborhood, views]) => ({ neighborhood, views }))
    .sort((a, b) => b.views - a.views);

  const maxNeighborhoodViews = Math.max(1, ...viewsByNeighborhood.map((n) => n.views));

  const viewsByType = properties.reduce(
    (acc, p) => {
      acc[p.type] += p.views;
      return acc;
    },
    { Venta: 0, Alquiler: 0 } as Record<Property["type"], number>
  );
  const totalTypeViews = Math.max(1, viewsByType.Venta + viewsByType.Alquiler);

  const catalogStatus = properties.reduce(
    (acc, p) => {
      acc[p.publicationStatus] += 1;
      return acc;
    },
    { Publicada: 0, Borrador: 0, Oculta: 0 } as Record<Property["publicationStatus"], number>
  );

  const totalViews = properties.reduce((acc, p) => acc + p.views, 0);
  const totalContactClicks = properties.reduce((acc, p) => acc + p.contactClicks, 0);
  const avgConversion = totalViews > 0 ? (totalContactClicks / totalViews) * 100 : 0;

  const topContacted = [...properties]
    .sort((a, b) => b.contactClicks - a.contactClicks)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Catalog status */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm text-muted-foreground">Publicadas</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{catalogStatus.Publicada}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <FileEdit className="w-5 h-5 text-muted-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">Borrador</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{catalogStatus.Borrador}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <EyeOff className="w-5 h-5 text-warning" />
            </div>
            <span className="text-sm text-muted-foreground">Ocultas</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{catalogStatus.Oculta}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top viewed properties */}
        <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
          <div className="mb-5">
            <h3 className="text-base font-semibold text-foreground">Propiedades mas vistas</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Ranking por vistas en la landing</p>
          </div>
          <div className="space-y-3">
            {topViewed.map((property, i) => (
              <div
                key={property.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-200"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-xs font-bold text-accent shrink-0">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{property.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {property.neighborhood}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", typeColors[property.type])}>
                    {property.type}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Eye className="w-3.5 h-3.5" /> {property.views}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Views by operation type */}
        <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <div className="mb-5">
            <h3 className="text-base font-semibold text-foreground">Vistas por tipo de operacion</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Venta vs. Alquiler</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 text-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-chart-1" />
                Venta
              </span>
              <span className="font-semibold text-foreground">{viewsByType.Venta} vistas</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 text-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                Alquiler
              </span>
              <span className="font-semibold text-foreground">{viewsByType.Alquiler} vistas</span>
            </div>
            <div className="h-3 w-full rounded-full overflow-hidden flex bg-secondary">
              <div
                className="h-full bg-chart-1 transition-all duration-700"
                style={{ width: `${(viewsByType.Venta / totalTypeViews) * 100}%` }}
              />
              <div
                className="h-full bg-accent transition-all duration-700"
                style={{ width: `${(viewsByType.Alquiler / totalTypeViews) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{((viewsByType.Venta / totalTypeViews) * 100).toFixed(0)}%</span>
              <span>{((viewsByType.Alquiler / totalTypeViews) * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Views by neighborhood */}
      <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-250">
        <div className="mb-5">
          <h3 className="text-base font-semibold text-foreground">Vistas por barrio</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Que zonas concentran mas interes</p>
        </div>
        <div className="space-y-3">
          {viewsByNeighborhood.map((n) => (
            <div key={n.neighborhood}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-foreground">{n.neighborhood}</span>
                <span className="text-muted-foreground">{n.views} vistas</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-700"
                  style={{ width: `${(n.views / maxNeighborhoodViews) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts + conversion (Fase 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm text-muted-foreground">Total contactos (WhatsApp)</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{totalContactClicks}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-chart-1" />
            </div>
            <span className="text-sm text-muted-foreground">Conversion promedio (contactos/vistas)</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{avgConversion.toFixed(1)}%</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-350">
        <div className="mb-5">
          <h3 className="text-base font-semibold text-foreground">Clics en Contactar por propiedad</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Cuales fichas generan mas interes real, no solo vistas</p>
        </div>
        <div className="space-y-3">
          {topContacted.map((property, i) => {
            const conversion = property.views > 0 ? (property.contactClicks / property.views) * 100 : 0;
            return (
              <div
                key={property.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-200"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-xs font-bold text-accent shrink-0">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{property.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {property.views} vistas
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-2">
                  <span className="text-xs text-muted-foreground">{conversion.toFixed(1)}% conversion</span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
                    <MessageCircle className="w-3.5 h-3.5 text-accent" /> {property.contactClicks}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
