import { ZONES, getWhatsAppUrl } from "@/content/data";

export function ZonesSection() {
  return (
    <section className="sec bg-surface" id="zonas">
      <div className="wrap">
        <div className="md:grid md:grid-cols-12 md:gap-8 mb-12">
          <div className="md:col-span-6">
            <span className="label">Zonas</span>
            <h2 className="heading-lg mt-3 mb-4">
              No es lo mismo la Peatonal que la costanera
            </h2>
            <p className="body-lg">
              Conocemos los precios por cuadra, los tiempos de venta por barrio
              y que tipo de comprador busca cada zona. Eso no se inventa: se
              trabaja.
            </p>
          </div>
        </div>

        <div className="space-y-12 md:space-y-16">
          {ZONES.map((zone, i) => (
            <article key={zone.id} className="md:grid md:grid-cols-12 md:gap-8 md:items-center">
              <div className={`image-frame aspect-[16/9] md:aspect-[3/2] md:col-span-5 mb-5 md:mb-0 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <div
                  className="image-placeholder w-full h-full bg-surface-raised"
                  style={{
                    backgroundImage: zone.image ? `url('${zone.image}')` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  role="img"
                  aria-label={`Zona ${zone.name}`}
                />
              </div>
              <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-1 md:pr-8" : "md:pl-4"}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="coor">{String(i + 1).padStart(2, "0")}</span>
                  <span className="rule-accent" />
                  <span className="text-xs text-text-tertiary">{zone.propertyCount} propiedade{zone.propertyCount !== 1 ? "s" : ""}</span>
                </div>
                <h3 className="heading-md mb-3">{zone.name}</h3>
                <p className="body-md mb-5">{zone.description}</p>
                <a
                  href={getWhatsAppUrl(`Me interesa la zona ${zone.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow"
                >
                  Ver propiedades en {zone.name}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
