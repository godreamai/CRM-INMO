"use client";

import { useState } from "react";
import Link from "next/link";
import { PROPERTIES, getWhatsAppUrl } from "@/content/data";
import type { Property } from "@/types";

type OpFilter = "todos" | "venta" | "alquiler";
type TypeFilter = "todos" | "departamento" | "casa" | "terreno" | "local" | "oficina";

const TYPE_LABELS: Record<TypeFilter, string> = {
  todos: "Todas", departamento: "Deptos", casa: "Casas",
  terreno: "Terrenos", local: "Locales", oficina: "Oficinas",
};

function PropRow({ property }: { property: Property }) {
  return (
    <article className="group">
      <div className="image-frame aspect-[16/9] relative mb-4">
        <div
          className="image-placeholder absolute inset-0 bg-surface"
          style={{
            backgroundImage: property.image ? `url('${property.image}')` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          role="img"
          aria-label={property.title}
        />
        <span className="absolute top-3 left-3 tag !bg-warm-black !text-bg !border-warm-black">
          {property.operation === "venta" ? "Venta" : "Alquiler"}
        </span>
      </div>
      <h3 className="font-[var(--font-display)] text-lg font-semibold leading-snug mb-1.5 group-hover:text-accent transition-colors">
        {property.title}
      </h3>
      <p className="text-lg font-bold text-accent-hover mb-2">{property.price}</p>
      <div className="flex gap-3 text-xs text-text-tertiary mb-3">
        {property.surface && <span>{property.surface}</span>}
        {property.rooms > 0 && <span>{property.rooms} amb.</span>}
        <span>{property.zone}</span>
      </div>
      <div className="flex gap-4">
        <Link href={`/propiedad/${property.slug}`} className="link-arrow">Ver detalle</Link>
        <a href={getWhatsAppUrl(`Me interesa: ${property.title}`)} target="_blank" rel="noopener noreferrer" className="link-arrow !text-warm-black">Consultar</a>
      </div>
    </article>
  );
}

export default function PropiedadesPage() {
  const [opFilter, setOpFilter] = useState<OpFilter>("todos");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("todos");

  const filtered = PROPERTIES.filter((p) => {
    if (opFilter !== "todos" && p.operation !== opFilter) return false;
    if (typeFilter !== "todos" && p.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="sec">
      <div className="wrap">
        <span className="label">Catalogo</span>
        <h1 className="heading-lg mt-3 mb-4">Todas las propiedades</h1>
        <p className="body-lg mb-8">Propiedades reales con disponibilidad verificada. Si no encontras lo que buscas, escribinos.</p>

        <div className="flex flex-wrap gap-2 mb-10">
          {(["todos", "venta", "alquiler"] as OpFilter[]).map((key) => (
            <button
              key={key}
              onClick={() => setOpFilter(key)}
              className={`px-3 py-1.5 text-[0.75rem] font-medium tracking-wide uppercase ${opFilter === key ? "bg-warm-black text-bg" : "bg-surface text-text-secondary hover:text-text"}`}
            >
              {key === "todos" ? "Todas" : key === "venta" ? "Venta" : "Alquiler"}
            </button>
          ))}
          <span className="w-px h-6 bg-border-subtle self-center mx-1" />
          {(Object.keys(TYPE_LABELS) as TypeFilter[]).map((key) => (
            <button
              key={key}
              onClick={() => setTypeFilter(key)}
              className={`px-3 py-1.5 text-[0.75rem] font-medium tracking-wide uppercase ${typeFilter === key ? "bg-warm-black text-bg" : "bg-surface text-text-secondary hover:text-text"}`}
            >
              {TYPE_LABELS[key]}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
            {filtered.map((p) => <PropRow key={p.id} property={p} />)}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-text-secondary mb-4">No hay propiedades con estos filtros.</p>
            <a href={getWhatsAppUrl("Busco una propiedad que no aparece.")} target="_blank" rel="noopener noreferrer" className="link-arrow">Contanos que buscas</a>
          </div>
        )}
      </div>
    </div>
  );
}
