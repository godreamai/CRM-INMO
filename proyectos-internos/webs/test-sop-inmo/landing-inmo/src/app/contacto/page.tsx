import { SITE, getWhatsAppUrl } from "@/content/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Contacta a Piedra & Zafa en ${SITE.city}. WhatsApp, telefono, email o visita la oficina.`,
};

export default function ContactoPage() {
  return (
    <div className="sec">
      <div className="wrap">
        <div className="md:grid md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5 mb-10 md:mb-0">
            <span className="label">Contacto</span>
            <h1 className="heading-lg mt-3 mb-5">Hablemos</h1>
            <p className="body-md mb-10">
              Escribinos por WhatsApp, llama o visita la oficina. Respondemos con
              opciones concretas, no con mensajes automaticos.
            </p>

            <div className="space-y-6">
              <a href={getWhatsAppUrl("Quiero consultar por una propiedad o servicio.")} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                <svg className="shrink-0 mt-0.5 text-success" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <div>
                  <p className="text-[0.9375rem] font-semibold group-hover:text-accent transition-colors">WhatsApp</p>
                  <p className="text-[0.8125rem] text-text-secondary">Menos de 2h en horario habil</p>
                </div>
              </a>

              <a href={`tel:${SITE.phone}`} className="flex items-start gap-3 group">
                <svg className="shrink-0 mt-0.5 text-accent" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <div>
                  <p className="text-[0.9375rem] font-semibold group-hover:text-accent transition-colors">Telefono</p>
                  <p className="text-[0.8125rem] text-text-secondary">0336 462 1890 — Lun a Vie 9-18h, Sab 9-13h</p>
                </div>
              </a>

              <a href={`mailto:${SITE.email}`} className="flex items-start gap-3 group">
                <svg className="shrink-0 mt-0.5 text-accent" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <div>
                  <p className="text-[0.9375rem] font-semibold group-hover:text-accent transition-colors">Email</p>
                  <p className="text-[0.8125rem] text-text-secondary">{SITE.email}</p>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <svg className="shrink-0 mt-0.5 text-accent" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <p className="text-[0.9375rem] font-semibold">Oficina</p>
                  <p className="text-[0.8125rem] text-text-secondary">{SITE.address}</p>
                  <p className="text-[0.6875rem] text-text-tertiary mt-0.5">Lun a Vie 9-18h, Sab 9-13h</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="p-6 md:p-8 bg-surface border border-border-subtle">
              <h2 className="heading-md mb-6 text-xl">Envia un mensaje</h2>
              <form action={getWhatsAppUrl("Quiero contactarlos:")} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-[0.8125rem] font-medium text-text mb-1.5">Nombre</label>
                  <input type="text" id="name" name="name" required className="w-full px-4 py-3 bg-bg border border-border text-[0.875rem] focus:border-accent focus:ring-1 focus:ring-accent transition-colors" placeholder="Tu nombre completo" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[0.8125rem] font-medium text-text mb-1.5">Telefono / WhatsApp</label>
                  <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 bg-bg border border-border text-[0.875rem] focus:border-accent focus:ring-1 focus:ring-accent transition-colors" placeholder="0336 4 XXXXXX" />
                </div>
                <div>
                  <label htmlFor="intent" className="block text-[0.8125rem] font-medium text-text mb-1.5">Que buscas?</label>
                  <select id="intent" name="intent" className="w-full px-4 py-3 bg-bg border border-border text-[0.875rem] focus:border-accent focus:ring-1 focus:ring-accent transition-colors">
                    <option value="comprar">Quiero comprar una propiedad</option>
                    <option value="alquilar">Quiero alquilar una propiedad</option>
                    <option value="vender">Quiero vender mi propiedad</option>
                    <option value="tasar">Quiero tasar mi propiedad</option>
                    <option value="otro">Otro motivo</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-[0.8125rem] font-medium text-text mb-1.5">Mensaje</label>
                  <textarea id="message" name="message" rows={4} className="w-full px-4 py-3 bg-bg border border-border text-[0.875rem] focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-y" placeholder="Zona, presupuesto, tipo de propiedad..." />
                </div>
                <button type="submit" className="btn-primary w-full justify-center">Enviar consulta</button>
                <p className="text-[0.6875rem] text-text-tertiary text-center">
                  Al enviar, aceptas que nos comuniquemos por WhatsApp o email para responder tu consulta.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
