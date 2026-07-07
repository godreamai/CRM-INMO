import { PROPERTIES, SITE, getWhatsAppUrl } from "@/content/data";
import Link from "next/link";
import type { Property } from "@/types";

function PropertyDetail({ property }: { property: Property }) {
  return (
    <article>
      <div className="image-frame aspect-[16/9] md:aspect-[2.5/1] relative">
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
        <span className="absolute top-4 left-4 tag !bg-warm-black !text-bg !border-warm-black">
          {property.operation === "venta" ? "Venta" : "Alquiler"}
        </span>
      </div>

      <div className="wrap py-10 md:py-14">
        <div className="max-w-3xl">
          <Link href="/propiedades" className="link-arrow mb-6 inline-flex">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Propiedades
          </Link>

          <h1 className="heading-lg mt-4 mb-3">{property.title}</h1>
          <p className="text-2xl font-bold text-accent-hover mb-6">{property.price}</p>

          <div className="flex flex-wrap gap-4 text-[0.8125rem] text-text-secondary mb-8 pb-8 border-b border-border-subtle">
            {property.surface && <span>{property.surface}</span>}
            {property.rooms > 0 && <span>{property.rooms} amb.</span>}
            {property.bathrooms > 0 && <span>{property.bathrooms} bano{property.bathrooms > 1 ? "s" : ""}</span>}
            <span>{property.zone}</span>
          </div>

          <div className="mb-10">
            <h2 className="heading-md text-lg mb-3">Descripcion</h2>
            <p className="body-md">{property.description}</p>
          </div>

          <div className="p-6 bg-surface border border-border-subtle">
            <h3 className="font-[var(--font-display)] text-lg font-semibold mb-3">Te interesa esta propiedad?</h3>
            <p className="text-[0.8125rem] text-text-secondary mb-5">Coordinamos una visita o te damos mas detalles. Sin compromiso.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppUrl(`Me interesa: ${property.title} (${property.operation} - ${property.price})`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center"
              >
                Consultar por WhatsApp
              </a>
              <a href={`tel:${SITE.phone}`} className="btn-ghost justify-center">Llamar</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }));
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const property = PROPERTIES.find((p) => p.slug === slug);

  if (!property) {
    return (
      <div className="wrap py-20 text-center">
        <h1 className="heading-md mb-4">Propiedad no encontrada</h1>
        <p className="text-text-secondary mb-8">La propiedad que buscas no existe o ya no esta disponible.</p>
        <Link href="/propiedades" className="link-arrow">Ver propiedades disponibles</Link>
      </div>
    );
  }

  return <PropertyDetail property={property} />;
}
