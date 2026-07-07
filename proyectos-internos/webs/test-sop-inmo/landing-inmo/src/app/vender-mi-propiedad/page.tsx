import { getWhatsAppUrl, SITE } from "@/content/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vender mi propiedad",
  description: `Tasa tu propiedad en ${SITE.city} con datos reales de mercado. Sin compromiso, sin costo.`,
};

export default function VenderPage() {
  return (
    <div>
      <section className="sec bg-warm-black text-bg">
        <div className="wrap">
          <div className="md:grid md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <span className="label !text-accent !before:bg-accent">Propietarios</span>
              <h1 className="heading-lg !text-bg mt-3 mb-5 max-w-lg">
                &ldquo;No se si es el momento&rdquo; — por eso existe la tasacion sin compromiso
              </h1>
              <p className="body-lg !text-bg/60 mb-8 max-w-md">
                Te damos un rango de valor basado en comparables de tu cuadra, tu
                zona, tu tipo de propiedad. Despues decis vos. Sin costo, sin presion.
              </p>
              <a href={getWhatsAppUrl("Quiero tasar mi propiedad sin compromiso.")} target="_blank" rel="noopener noreferrer" className="btn-primary !bg-bg !text-warm-black hover:!opacity-90">
                Solicitar tasacion
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="sec bg-bg">
        <div className="wrap max-w-2xl">
          <h2 className="heading-md mb-8">Como funciona</h2>
          <div className="space-y-0 divide-y divide-border-subtle border-t border-b border-border-subtle">
            {[
              { step: "Nos contactas", desc: "Escribinos con la direccion y tipo de propiedad. No necesitas datos completos para empezar." },
              { step: "Evaluamos el mercado", desc: "Analizamos comparables en la zona, estado de la propiedad y condiciones del mercado actual." },
              { step: "Te entregamos un rango de valor", desc: "Sin compromiso, sin costo. Te explicamos como llegamos al numero y que variables inciden." },
              { step: "Si decis vender, te acompanamos", desc: "Fotografia profesional, publicacion en portales, gestion de visitas y acompanamiento hasta la escritura." },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 py-5">
                <span className="coor shrink-0 pt-1">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-[var(--font-display)] text-lg font-semibold mb-1">{item.step}</p>
                  <p className="text-[0.8125rem] text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
