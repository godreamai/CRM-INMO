"use client";

import { useState } from "react";
import Link from "next/link";
import { PROPERTIES, getWhatsAppUrl } from "@/content/data";
import type { Property } from "@/types";

type OpFilter = "todos" | "venta" | "alquiler";

function PropertyRow({ property, index }: { property: Property; index: number }) {
  const isLarge = index === 0;
  return (
    <article className={`group ${isLarge ? "md:col-span-2" : ""}`}>
      <div className={`${isLarge ? "aspect-[16/9]" : "aspect-[4/3]"} image-frame relative`}>
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

      <div className="pt-4">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3 className="font-[var(--font-display)] text-base md:text-lg font-semibold leading-snug group-hover:text-accent transition-colors duration-150">
            {property.title}
          </h3>
        </div>
        <p className="text-lg font-bold text-accent-hover mb-2">{property.price}</p>
        <div className="flex items-center gap-3 text-xs text-text-tertiary mb-3">
          {property.surface && <span>{property.surface}</span>}
          {property.rooms > 0 && <span>{property.rooms} amb.</span>}
          <span>{property.zone}</span>
        </div>
        <p className="body-md !text-[0.8125rem] leading-relaxed mb-4 line-clamp-2">
          {property.description}
        </p>
        <div className="flex gap-3">
          <Link
            href={`/propiedad/${property.slug}`}
            className="link-arrow"
          >
            Ver detalle
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <a
            href={getWhatsAppUrl(`Me interesa: ${property.title}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow !text-warm-black"
            aria-label={`Consultar por ${property.title}`}
          >
            Consultar
          </a>
        </div>
      </div>
    </article>
  );
}

export function PropertiesSection() {
  const [filter, setFilter] = useState<OpFilter>("todos");

  const featured = PROPERTIES.filter((p) => p.featured);
  const filtered = filter === "todos" ? featured : featured.filter((p) => p.operation === filter);

  return (
    <section className="sec" id="propiedades">
      <div className="wrap">
        <div className="md:grid md:grid-cols-12 md:gap-8 mb-10 md:mb-14">
          <div className="md:col-span-7">
            <span className="label">Seleccion actual</span>
            <h2 className="heading-lg mt-3 mb-4">
              Propiedades verificadas, no avisos de archivo
            </h2>
            <p className="body-lg">
              Cada propiedad que publicamos tiene disponibilidad confirmada,
              precio actualizado y descripcion honesta. Si tiene render, lo
              aclaramos.
            </p>
          </div>
          <div className="md:col-span-5 flex items-end justify-start md:justify-end mt-6 md:mt-0">
            <div className="flex gap-1" role="tablist" aria-label="Filtrar operacion">
              {(["todos", "venta", "alquiler"] as OpFilter[]).map((key) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={filter === key}
                  onClick={() => setFilter(key)}
                  className={`px-3.5 py-2 text-[0.75rem] font-medium tracking-wide uppercase transition-colors duration-150 ${
                    filter === key
                      ? "bg-warm-black text-bg"
                      : "bg-surface text-text-secondary hover:text-text"
                  }`}
                >
                  {key === "todos" ? "Todas" : key === "venta" ? "Venta" : "Alquiler"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
            {filtered.map((property, i) => (
              <PropertyRow key={property.id} property={property} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-text-secondary text-lg mb-4">
              No hay propiedades destacadas en esta categoria.
            </p>
            <a
              href={getWhatsAppUrl("Busco una propiedad que no aparece en el listado.")}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow"
            >
              Contanos que buscas y lo buscamos
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        )}

        <div className="mt-10 md:mt-14">
          <Link href="/propiedades" className="link-arrow">
            Ver todas las propiedades
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
