import { SITE, getWhatsAppUrl } from "@/content/data";

export function Hero() {
  return (
    <section className="relative min-h-[85dvh] md:min-h-[90dvh] flex items-end bg-warm-black text-bg overflow-hidden">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/70 to-warm-black/40" aria-hidden="true" />

      <div className="wrap relative z-10 pb-12 md:pb-16 pt-32 md:pt-0">
        <div className="md:grid md:grid-cols-12 md:gap-8 md:items-end">
          <div className="md:col-span-8 lg:col-span-7">
            <span className="coor text-bg/40 block mb-4">
              {SITE.city}, {SITE.province} — 33&deg;20&apos;S 60&deg;14&apos;W
            </span>

            <h1 className="heading-lg !text-bg !text-[clamp(2.25rem,6vw,3.75rem)] mb-5">
              La propiedad correcta en San Nicolás, sin recorrer avisos vencidos
            </h1>

            <p className="body-lg !text-bg/60 mb-10 max-w-xl">
              Filtramos las propiedades que valen la pena, coordinamos las
              visitas y te acompanamos hasta la escritura. Si lo que busca no
              esta en el listado, lo buscamos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a
                href={getWhatsAppUrl("Estoy buscando una propiedad en San Nicolás.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !bg-bg !text-warm-black hover:!opacity-90"
              >
                Contar que busco
              </a>
              <a
                href="/vender-mi-propiedad"
                className="btn-ghost !border-bg/25 !text-bg/80 hover:!border-bg/60 hover:!text-bg"
              >
                Quiero tasar mi propiedad
              </a>
            </div>

            <p className="text-[0.6875rem] text-bg/30 max-w-sm">
              Te pedimos zona, operacion y rango. Te respondemos con opciones
              concretas, no con cadenas automaticas.
            </p>
          </div>

          <div className="hidden md:flex md:col-span-4 lg:col-span-5 flex-col items-end justify-end gap-4">
            <div className="text-right">
              <p className="font-[var(--font-display)] text-4xl font-bold text-bg/90">{SITE.propertiesSold}</p>
              <p className="text-xs text-bg/40 mt-1">operaciones en {SITE.yearsInBusiness} anos</p>
            </div>
            <div className="rule-accent !bg-bg/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
