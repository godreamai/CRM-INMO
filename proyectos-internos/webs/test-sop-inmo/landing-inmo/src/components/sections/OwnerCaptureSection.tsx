import { getWhatsAppUrl, SITE } from "@/content/data";

export function OwnerCaptureSection() {
  return (
    <section className="sec-spacious bg-warm-black text-bg" id="vender">
      <div className="wrap">
        <div className="md:grid md:grid-cols-12 md:gap-12 items-center">
          <div className="md:col-span-7 mb-10 md:mb-0">
            <span className="label !text-accent !before:bg-accent">Propietarios</span>

            <h2 className="font-[var(--font-display)] text-2xl md:text-4xl font-bold leading-tight mt-3 mb-6 max-w-lg">
              &ldquo;No se si es el momento&rdquo; — por eso existe la tasacion sin compromiso
            </h2>

            <p className="text-[0.9375rem] text-bg/60 leading-relaxed mb-8 max-w-md">
              No te pedimos que vendas. Te damos un rango de valor basado en
              comparables reales de tu cuadra, tu zona, tu tipo de propiedad.
              Despues decidis vos. Sin costo, sin presion.
            </p>

            <div className="rule mb-8 bg-bg/10" />

            <p className="text-[0.8125rem] text-bg/40 mb-6">
              Si decidis vender con nosotros, esto incluye:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-lg">
              {[
                "Tasacion con comparables de la zona",
                "Fotografia profesional en la visita",
                "Publicacion en portales con seguimiento",
                "Acompanamiento hasta la escritura",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <svg className="shrink-0 mt-0.5 text-accent" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span className="text-[0.8125rem] text-bg/60">{item}</span>
                </div>
              ))}
            </div>

            <a
              href={getWhatsAppUrl("Quiero tasar mi propiedad sin compromiso.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !bg-bg !text-warm-black hover:!opacity-90"
            >
              Solicitar tasacion
            </a>
          </div>

          <div className="md:col-span-5">
            <div className="image-frame aspect-[3/4]">
              <div
                className="image-placeholder w-full h-full bg-warm-black-soft"
                style={{
                  backgroundImage: "url('/images/vender-bg.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                role="img"
                aria-label="Propiedad en venta"
              />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-[var(--font-display)] text-2xl font-bold text-bg/80">{SITE.propertiesSold}</span>
              <span className="text-[0.6875rem] text-bg/30">operaciones concretadas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
