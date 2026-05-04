'use client'

import { Check, Zap, ArrowDown, Sparkles } from 'lucide-react'
import { handleSmoothScroll } from '@/lib/smoothScroll'

const features = [
  'Landing Page de Alta Conversión',
  'Bot de WhatsApp inteligente',
  'Filtro automático anti-curiosos',
  'Alertas inmediatas al celular',
  'CRM integrado (Base de datos)',
  'Soporte técnico ilimitado',
]

export default function Pricing() {
  return (
    <section id="precios" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-primary-dark/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-full text-sm font-semibold text-foreground/70 mb-6">
              <Sparkles className="w-4 h-4 text-accent-primary" />
              INVERSIÓN ÚNICA
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              El sistema que{' '}
              <span className="text-gradient">factura por vos</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Una inversión única. Sin pagos mensuales complicados. Solo mantenimiento mínimo para que todo funcione 24/7.
            </p>
          </div>

          {/* Main Content - Hero Style */}
          <div className="relative">
            {/* Service Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-primary-dark dark:from-accent-lime dark:to-accent-lime/80 flex items-center justify-center shadow-lg">
                  <Zap className="w-10 h-10 text-white dark:text-black" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                    Máquina de Ventas 24/7
                  </h3>
                  <p className="text-foreground/60 text-sm">
                    Tu vendedor robot que nunca descansa
                  </p>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="glass-effect rounded-xl p-5 flex items-start gap-4 hover:border-accent-primary/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent-primary/10 dark:bg-accent-lime/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-5 h-5 text-accent-primary dark:text-accent-lime" />
                  </div>
                  <span className="text-foreground font-medium pt-1">{feature}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="text-center mb-12">
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Captura leads, los califica y te avisa <strong className="text-foreground">SOLO cuando están listos para comprar</strong>. Sin perder tiempo con curiosos.
              </p>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <a
                href="https://calendly.com/candelappablo/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-accent-primary to-accent-primary-dark dark:from-accent-lime dark:to-accent-lime/90 text-white dark:text-black rounded-2xl font-bold text-xl md:text-2xl hover:scale-105 transition-all shadow-2xl hover:shadow-[0_0_40px_hsl(var(--primary-accent)/0.5)] mb-6"
              >
                Agendar llamada ahora
                <ArrowDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
              </a>

              <p className="text-sm md:text-base text-foreground/50 font-medium max-w-lg mx-auto mb-6 leading-relaxed">
                En el diagnóstico analizamos tu proceso manual más crítico. <span className="text-accent-primary">Si hay fit, te enviamos una propuesta de Sprint en 24h.</span>
              </p>

              <p className="mt-6 text-sm text-foreground/60 pt-6 border-t border-foreground/5 max-w-xs mx-auto">
                Llamada de 15 min. Sin compromiso. Sin tarjeta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

