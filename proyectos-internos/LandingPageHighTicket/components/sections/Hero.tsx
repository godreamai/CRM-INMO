'use client'

import { ArrowRight, MessageCircle } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/543364540036?text=Hola%2C%20vi%20su%20perfil%20y%20me%20interesa%20automatizar%20los%20leads%20de%20mi%20inmobiliaria'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 md:pt-44 lg:pt-48 xl:pt-48 2xl:pt-28 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-black/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-10">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-black/5 bg-black/[0.02] rounded-full text-xs font-bold tracking-widest text-black/60 uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
              Automatización de leads · Para inmobiliarias
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] text-black tracking-tight">
              Cada lead que no respondés en 5 minutos,{' '}
              <span className="text-black/40 italic font-medium">se lo lleva otra inmobiliaria.</span>
            </h1>

            {/* Subtitle */}
            <div className="flex flex-col items-center space-y-8">
              <p className="text-lg lg:text-xl xl:text-2xl text-black/70 leading-relaxed max-w-3xl">
                Implementamos un sistema que{' '}
                <strong className="text-black">responde automático por WhatsApp y correo</strong>,
                asigna al agente correcto y no pierde ningún lead.{' '}
                Funcionando en 14 días.
              </p>

              <div className="flex items-center gap-3 py-2">
                <div className="w-12 h-[2px] bg-lime-500" />
                <p className="text-lg md:text-xl font-bold text-black">
                  Sin que vos ni tu equipo tengan que hacer nada.
                </p>
                <div className="w-12 h-[2px] bg-lime-500" />
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-6">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-black/90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-black/10 border border-black"
              >
                <MessageCircle className="w-5 h-5 text-lime-400" />
                Hablar por WhatsApp
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-lime-400" />
              </a>

              <p className="text-sm md:text-base text-black/50 font-medium max-w-2xl">
                Respondemos en menos de 24hs. <span className="text-black/80">Sin costo de consulta.</span>
              </p>
            </div>

            {/* Microcopy */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-black/5 w-full max-w-4xl">
              <div className="flex items-center justify-center gap-2 text-sm text-black/60 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                Sistema funcionando en 14 días
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-black/60 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                Sin saber nada de tecnología
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-black/60 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                Garantía de funcionamiento
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
