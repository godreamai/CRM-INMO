import { SITE, TEAM, TESTIMONIALS } from "@/content/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros",
  description: `Mas de ${SITE.yearsInBusiness} anos en ${SITE.city}. Conoce nuestro equipo y forma de trabajar.`,
};

export default function NosotrosPage() {
  return (
    <div>
      <section className="sec bg-warm-black text-bg">
        <div className="wrap">
          <div className="md:grid md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <span className="label !text-accent !before:bg-accent">Nosotros</span>
              <h1 className="heading-lg !text-bg mt-3 mb-5">
                {SITE.yearsInBusiness} anos en {SITE.city}. {SITE.propertiesSold} operaciones concretadas.
              </h1>
              <p className="body-lg !text-bg/60 max-w-lg">
                No somos un catalogo infinito. Somos un equipo local que filtra,
                acompana y responde. Cada propiedad publicada esta verificada y cada
                cliente recibe un proceso claro.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec bg-bg">
        <div className="wrap">
          <span className="label">Equipo</span>
          <h2 className="heading-md mt-3 mb-8">Profesionales con matricula y conocimiento del mercado local</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((m) => (
              <div key={m.name}>
                <div className="w-20 h-20 image-frame mb-4">
                  <div
                    className="image-placeholder bg-surface"
                    style={{
                      backgroundImage: m.image ? `url('${m.image}')` : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    role="img"
                    aria-label={m.name}
                  />
                </div>
                <p className="font-[var(--font-display)] text-lg font-semibold">{m.name}</p>
                <p className="text-[0.8125rem] text-text-secondary mt-0.5">{m.role}</p>
                {m.license && <p className="text-[0.6875rem] text-text-tertiary mt-0.5">{m.license}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec-compact bg-surface">
        <div className="wrap max-w-2xl">
          <span className="label">Clientes</span>
          <h2 className="heading-md mt-3 mb-8">Lo que dicen los que ya pasaron por aca</h2>
          <div className="space-y-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i}>
                <blockquote className="pull-quote mb-3">{t.text}</blockquote>
                <div className="flex items-center gap-3 pl-6">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <svg key={j} width="11" height="11" viewBox="0 0 24 24" fill={j < t.rating ? "var(--accent)" : "var(--border)"} stroke="none" aria-hidden="true">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-[0.75rem] text-text-secondary">{t.name}</span>
                  <span className="text-[0.6875rem] text-text-tertiary">{t.operation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
