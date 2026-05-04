'use client'

import { Check, MessageCircle, Globe, Database, ArrowRight } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/543364540036?text=Hola%2C%20vi%20su%20perfil%20y%20me%20interesa%20automatizar%20los%20leads%20de%20mi%20inmobiliaria'

const servicio1 = [
  'Bot WhatsApp: responde y asigna leads en < 5 min',
  'Bot correo: responde automático + seguimiento',
  'Panel de configuración de bots',
  'Integración con tu CRM actual (Tokko, Wasi, Inmovilla…)',
  'Setup completo a cargo nuestro',
  'Soporte mensual incluido',
]

const servicio2 = [
  'Todo lo del Servicio 1',
  'Chatbot en tu web: responde FAQs y deriva a WhatsApp',
  'Panel completo de configuración',
  'Add-on CRM propio disponible (+USD 150)',
  'Setup completo a cargo nuestro',
  'Soporte mensual incluido',
]

export default function Services() {
  return (
    <section id="servicios" className="py-24 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime-400/10 rounded-full text-[10px] font-bold tracking-[0.2em] text-lime-600 uppercase">
            Servicios
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
            Dos opciones. Precio claro.{' '}
            <span className="text-black/40">Sin sorpresas.</span>
          </h2>
          <p className="text-black/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Hablamos primero para confirmar que podemos ayudarte.{' '}
            <strong className="text-black">Si no hay fit real, te lo decimos directo.</strong>
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 mb-12">

          {/* Servicio 1 */}
          <div className="relative glass-card border border-black/10 bg-white shadow-lg shadow-black/5 rounded-[2rem] p-10 flex flex-col">
            <div className="absolute -top-3 left-8 px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg bg-black/80 text-white">
              Respuesta Automática
            </div>
            <div className="flex items-center gap-3 mb-1 mt-2">
              <MessageCircle className="w-6 h-6 text-lime-500" />
              <p className="text-4xl font-black text-black">USD 180</p>
            </div>
            <p className="text-xs font-bold text-black/30 uppercase tracking-widest mb-2">
              USD 36 para empezar · USD 144 al entregar
            </p>
            <p className="text-xs font-bold text-lime-600 uppercase tracking-widest mb-6">
              + USD 45 / mes (soporte y mantenimiento)
            </p>
            <p className="text-black/60 font-medium leading-relaxed mb-8 text-sm">
              Para inmobiliarias que ya tienen CRM o quieren automatizar la respuesta sin una gran inversión inicial.
            </p>
            <div className="border-t border-black/5 pt-6 mb-8 flex-1">
              <p className="text-[10px] font-black text-black/30 uppercase tracking-widest mb-4">Incluye</p>
              <div className="space-y-3">
                {servicio1.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-lime-400/20 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-black" />
                    </div>
                    <span className="text-sm font-medium text-black/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full py-4 px-6 rounded-2xl font-black flex items-center justify-center gap-3 bg-black/90 text-white transition-all duration-300 hover:bg-black hover:scale-[1.02]"
            >
              <span>Me interesa este</span>
              <ArrowRight className="w-4 h-4 text-lime-400 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Servicio 2 */}
          <div className="relative glass-card border-2 border-black bg-white shadow-2xl shadow-black/10 rounded-[2rem] p-10 flex flex-col">
            <div className="absolute -top-3 left-8 px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg bg-black text-lime-400">
              Sistema Completo ✦ Recomendado
            </div>
            <div className="flex items-center gap-3 mb-1 mt-2">
              <Globe className="w-6 h-6 text-lime-500" />
              <p className="text-4xl font-black text-black">USD 320</p>
            </div>
            <p className="text-xs font-bold text-black/30 uppercase tracking-widest mb-2">
              USD 64 para empezar · USD 256 al entregar
            </p>
            <p className="text-xs font-bold text-lime-600 uppercase tracking-widest mb-6">
              + USD 75 / mes (soporte y mantenimiento)
            </p>
            <p className="text-black/60 font-medium leading-relaxed mb-8 text-sm">
              El sistema completo: bots + chatbot en tu web + panel. Para quien quiere capturar todos los leads desde todos los canales.
            </p>
            <div className="border-t border-black/5 pt-6 mb-8 flex-1">
              <p className="text-[10px] font-black text-black/30 uppercase tracking-widest mb-4">Incluye</p>
              <div className="space-y-3">
                {servicio2.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-lime-400/30 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-black" />
                    </div>
                    <span className="text-sm font-medium text-black/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full py-4 px-6 rounded-2xl font-black flex items-center justify-center gap-3 bg-black text-white shadow-2xl shadow-black/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <span>Quiero el sistema completo</span>
              <ArrowRight className="w-4 h-4 text-lime-400 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Add-on CRM */}
        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-2xl p-6 border border-black/[0.05] flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
              <Database className="w-5 h-5 text-lime-400" />
            </div>
            <div>
              <p className="font-black text-black mb-1">
                Add-on: CRM propio para inmobiliarias{' '}
                <span className="text-lime-600 font-black">+USD 150 único</span>
              </p>
              <p className="text-sm text-black/50 font-medium">
                Si no tenés CRM, construimos uno a tu medida: gestión de leads, propiedades y agentes. Secciones base + 2 adicionales configurables. Solo disponible con el Servicio 2.
              </p>
            </div>
          </div>
        </div>

        {/* Garantía */}
        <div className="max-w-5xl mx-auto mt-6">
          <p className="text-center text-sm font-bold text-black/40 uppercase tracking-widest">
            Garantía: si el sistema no funciona según lo acordado, no cobramos el 80% restante.
          </p>
        </div>
      </div>
    </section>
  )
}
