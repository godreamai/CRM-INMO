"use client";

import { Eye } from "lucide-react";

const listings = [
  { title: "PH en Palermo Hollywood", price: "$320,000", views: 842, type: "Venta" },
  { title: "Apto 2 amb. Belgrano", price: "$185,000", views: 728, type: "Venta" },
  { title: "Casa en Nordelta", price: "$5,200 /mes", views: 615, type: "Alquiler" },
  { title: "Loft en Puerto Madero", price: "$450,000", views: 590, type: "Venta" },
  { title: "Monoambiente Villa Crespo", price: "$980 /mes", views: 504, type: "Alquiler" },
];

const typeColors: Record<string, string> = {
  Venta: "bg-chart-1/15 text-chart-1",
  Alquiler: "bg-accent/15 text-accent",
};

export function TopListings() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-foreground">Propiedades mas vistas</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Top 5 del ultimo mes</p>
        </div>
        <button className="text-xs text-accent hover:underline transition-all">Ver todas</button>
      </div>

      <div className="space-y-3">
        {listings.map((listing, i) => (
          <div
            key={listing.title}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-200"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-xs font-bold text-accent shrink-0">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{listing.title}</p>
                <p className="text-xs text-muted-foreground font-mono">{listing.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-2">
              <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> {listing.views}
                </span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[listing.type]}`}>
                {listing.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
