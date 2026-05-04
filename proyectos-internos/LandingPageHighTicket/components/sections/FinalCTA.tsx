'use client'

import { ArrowRight, MessageCircle, Globe, Zap } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/543364540036?text=Hola%2C%20vi%20su%20perfil%20y%20me%20interesa%20automatizar%20los%20leads%20de%20mi%20inmobiliaria'

export default function FinalCTA() {
  return (
    <section id="contacto" className="py-32 relative overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-lime-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-black/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-[10px] font-black tracking-widest uppercase mb-8 shadow-xl">
              Respondemos en menos de 24hs
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-8xl font-black mb-8 leading-[0.95] text-black tracking-tighter">
              Tu inmobiliaria responde en 5 minutos.{' '}
              <span className="text-black/30">Aunque nadie esté en la oficina.</span>
            </h2>

            <p className="text-xl md:text-2xl text-black/60 max-w-3xl mx-auto leading-relaxed font-medium">
              Contanos de tu inmobiliaria por WhatsApp. En menos de 24hs te decimos si podemos ayudarte y cómo.{' '}
              <strong className="text-black">Sin costo de consulta.</strong>
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="glass-card p-10 rounded-3xl border border-black/5 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-lime-400" />
              </div>
              <h3 className="font-black text-lg mb-2 text-black">Sistema en 14 días</h3>
              <p className="text-sm text-black/50 font-medium">Bots configurados, integrados y funcionando. Sin que vos ni tu equipo tengan que hacer nada.</p>
            </div>

            <div className="glass-card p-10 rounded-3xl border border-black/5 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-lime-400" />
              </div>
              <h3 className="font-black text-lg mb-2 text-black">Garantía de funcionamiento</h3>
              <p className="text-sm text-black/50 font-medium">Si no funciona según lo acordado, no cobramos el 80% restante. Sin letra chica.</p>
            </div>

            <div className="glass-card p-10 rounded-3xl border border-black/5 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7 text-lime-400" />
              </div>
              <h3 className="font-black text-lg mb-2 text-black">Soporte mensual incluido</h3>
              <p className="text-sm text-black/50 font-medium">Nos escribís por WhatsApp y te respondemos. Sin tickets, sin esperas, sin bots.</p>
            </div>
          </div>

          {/* Credibilidad */}
          <div className="mb-10 mx-auto max-w-3xl">
            <div className="rounded-3xl border border-black/5 bg-black p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-lime-400 flex items-center justify-center">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <div>
                <p className="text-white font-black text-base mb-1">
                  Con 1 sola venta que no perdieras por responder tarde, recuperás la inversión del sistema varias veces.
                </p>
                <p className="text-white/50 font-medium text-sm leading-relaxed">
                  Una inmobiliaria promedio gana entre USD 2.400 y USD 8.000 por operación de venta. El sistema cuesta USD 180 a USD 320. El ROI es inmediato desde la primera operación que el sistema ayuda a no perder.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pb-10">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white rounded-2xl font-black text-lg md:text-xl hover:bg-black/90 transition-all shadow-2xl shadow-black/30 border border-black"
            >
              <MessageCircle className="w-5 h-5 text-lime-400" />
              Hablar por WhatsApp
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="mt-4 text-sm font-bold text-black/30 uppercase tracking-widest">
              Gratis · Sin compromiso · Respuesta en menos de 24hs
            </p>
          </div>

          {/* Footer info */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-[11px] font-black text-black/30 uppercase tracking-[0.2em] border-t border-black/5 pt-12">
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-lime-400" />
              <span>Go Dream AI</span>
            </div>
            <div className="flex items-center gap-2">
              <span>go@godreamai.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
