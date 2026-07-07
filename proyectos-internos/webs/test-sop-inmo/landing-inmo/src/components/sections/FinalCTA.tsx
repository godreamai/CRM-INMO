import { getWhatsAppUrl, SITE } from "@/content/data";

export function FinalCTA() {
  return (
    <section className="sec-compact bg-surface">
      <div className="wrap text-center">
        <span className="coor block mb-3">Siguiente paso</span>
        <h2 className="heading-md mb-4">
          Escribinos con zona, presupuesto y operacion
        </h2>
        <p className="body-md mx-auto text-center mb-8 max-w-md">
          Te respondemos con opciones reales y pasos concretos. Sin compromiso,
          sin presionar.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href={getWhatsAppUrl("Quiero consultar por propiedades disponibles.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            WhatsApp
          </a>
          <a
            href={`tel:${SITE.phone}`}
            className="btn-ghost"
          >
            Llamar
          </a>
        </div>
      </div>
    </section>
  );
}
