'use client'

import { ArrowDown, TrendingUp, Zap, Clock, Shield, Rocket } from 'lucide-react'
import { handleSmoothScroll } from '@/lib/smoothScroll'

export default function FinalCTALanding() {
  return (
    <section id="contacto" className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-accent-primary/10 to-accent-primary-dark/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-accent-primary-dark/10 to-accent-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-sm font-semibold text-red-500 mb-6">
              ⚠️ SOLO 3 ESPACIOS ESTE MES
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Cada día sin sistema es{' '}
              <span className="text-gradient">dinero que perdés</span>
            </h2>

            <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Mientras leés esto, tu competencia está cerrando ventas automáticamente. <strong className="text-foreground">¿Hasta cuándo vas a esperar?</strong>
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/0 border border-foreground/10 hover:border-accent-primary/30 transition-all group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-primary/20 to-accent-primary-dark/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8 text-accent-primary" />
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg mb-1">Listo en 24-72h</div>
                <div className="text-sm text-foreground/60">Empezá a vender ya</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/0 border border-foreground/10 hover:border-accent-primary/30 transition-all group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-primary/20 to-accent-primary-dark/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-accent-primary" />
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg mb-1">ROI garantizado</div>
                <div className="text-sm text-foreground/60">Resultados medibles</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/0 border border-foreground/10 hover:border-accent-primary/30 transition-all group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-primary/20 to-accent-primary-dark/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-accent-primary" />
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg mb-1">Sin riesgo</div>
                <div className="text-sm text-foreground/60">Si no funciona, no pagás</div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-12">
            <a
              href="https://calendly.com/candelappablo/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-accent-primary to-accent-primary-dark rounded-2xl font-bold text-xl md:text-2xl hover:shadow-2xl transition-all neon-glow-subtle dark:text-gray-950 text-white hover:scale-105 active:scale-95 mb-6"
            >
              <Rocket className="w-7 h-7" />
              Agendar llamada ahora
              <ArrowDown className="w-7 h-7" />
            </a>

            <p className="text-lg text-foreground/60 font-medium max-w-2xl mx-auto mb-8">
              En el diagnóstico analizamos tu proceso manual más crítico. <span className="text-accent-primary">Si hay fit, te enviamos una propuesta de Sprint en 24h.</span>
            </p>

            <p className="mt-4 text-sm text-foreground/50 pt-6 border-t border-foreground/5 max-w-xs mx-auto">
              Llamada de 15 min. Sin compromiso. Sin tarjeta.
            </p>
          </div>

          {/* Footer Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-foreground/50">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent-primary" />
              <span>Respuesta en &lt;24h</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-foreground/30" />
            <div className="flex items-center gap-2">
              <span>📧</span>
              <span>go@godreamai.com</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-foreground/30" />
            <div className="flex items-center gap-2">
              <span>🌐</span>
              <span>godreamai.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


