import { getWhatsAppUrl } from "@/content/data";

const SIGNALS = [
  {
    signal: "Los leads entran pero nadie responde a tiempo",
    diagnosis: "No es un problema de marketing. Es un problema de sistema de respuesta.",
  },
  {
    signal: "Las comisiones se calculan en una planilla que solo entiende una persona",
    diagnosis: "Si esa persona se va, el proceso se para. Eso es un bus factor de 1.",
  },
  {
    signal: "El propietario llama cada semana para preguntar como va su propiedad",
    diagnosis: "No necesita una respuesta manual. Necesita un sistema que informe solo.",
  },
  {
    signal: "Los avisos en portales tienen precios o estados desactualizados",
    diagnosis: "Cada dia que un aviso vencido esta activo, pierde credibilidad con el proximo comprador real.",
  },
];

const METHOD = [
  { step: "Diagnostico", desc: "Identificamos el cuello de botella concreto, no el sintoma." },
  { step: "Seleccion", desc: "Filtramos opciones que matchean con lo que buscas. No te mostramos todo." },
  { step: "Visita", desc: "Coordinamos y te acompanamos. Senalamos detalle, contexto y puntos a evaluar." },
  { step: "Cierre", desc: "Oferta, boleto, escritura, entrega. Con matricula habilitante y proceso documentado." },
];

export function ProcessSection() {
  return (
    <section className="sec bg-bg">
      <div className="wrap">
        <div className="md:grid md:grid-cols-12 md:gap-12 mb-12">
          <div className="md:col-span-6">
            <span className="label">Senales</span>
            <h2 className="heading-lg mt-3">
              Si alguna de estas cosas te pasa, no es un problema de herramientas
            </h2>
          </div>
        </div>

        <div className="md:grid md:grid-cols-12 md:gap-8 mb-16 md:mb-24">
          {SIGNALS.map((item, i) => (
            <div key={i} className="md:col-span-3 mb-6 md:mb-0">
              <span className="coor block mb-2">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-[0.9375rem] font-semibold text-text leading-snug mb-2">
                &ldquo;{item.signal}&rdquo;
              </p>
              <p className="text-[0.8125rem] text-text-secondary leading-relaxed">
                {item.diagnosis}
              </p>
            </div>
          ))}
        </div>

        <div className="rule mb-12" />

        <div className="md:grid md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <span className="label">Metodo</span>
            <h3 className="heading-md mt-3 mb-4">
              4 pasos, cada uno con responsable y resultado
            </h3>
            <p className="body-md mb-6">
              No es un proceso magico. Es un metodo con pasos definidos, personas
              asignadas y entregables claros.
            </p>
            <a
              href={getWhatsAppUrl("Quiero conocer como trabajan antes de decidir.")}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow"
            >
              Preguntar por el proceso
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          <div className="md:col-span-8 mt-8 md:mt-0">
            <div className="space-y-0 divide-y divide-border-subtle border-t border-b border-border-subtle">
              {METHOD.map((item, i) => (
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
        </div>
      </div>
    </section>
  );
}
