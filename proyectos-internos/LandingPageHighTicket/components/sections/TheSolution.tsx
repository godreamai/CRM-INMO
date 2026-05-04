'use client'

import { Magnet, Filter, BellRing, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: Magnet,
    title: '1. Arquitectura',
    description: 'Estructuramos tus datos y conectamos tus herramientas críticas (CRM, Sheets, Calendly) sin parches.',
  },
  {
    icon: Filter,
    title: '2. Ejecución',
    description: 'Los procesos se ejecutan solos, eliminando tareas manuales repetitivas y el copypaste de datos.',
  },
  {
    icon: BellRing,
    title: '3. Control',
    description: 'Obtenés métricas en tiempo real en un panel claro para tomar decisiones basadas en datos, no en intuición.',
  },
]

export default function TheSolution() {
  return (
    <section className="py-24 relative bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/[0.03] rounded-full text-[10px] font-black tracking-widest text-black/40 uppercase mb-6">
            Metodología de Alto Nivel
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight">
            Arquitectura Operativa <span className="text-black/30">Escalable</span>
          </h2>
          <p className="text-black/60 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            No instalamos herramientas por moda. Diseñamos la infraestructura sólida que te devuelve el control real sobre tu empresa:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative max-w-6xl mx-auto">
          {/* Línea conectora (solo desktop) - Rediseñada para look pro */}
          <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[1px] bg-black/5 z-0" />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-[120px] h-[120px] rounded-[2.5rem] bg-white border border-black/[0.05] flex items-center justify-center mb-8 shadow-[0_15px_40px_rgba(0,0,0,0.03)] group hover:border-lime-500 transition-all duration-500">
                <step.icon className="w-12 h-12 text-black group-hover:scale-110 transition-transform duration-500" />
              </div>

              <h3 className="text-2xl font-black text-black mb-4 tracking-tight">{step.title}</h3>
              <p className="text-black/50 leading-relaxed max-w-xs font-medium">
                {step.description}
              </p>

              {/* Flecha móvil (solo visible en mobile entre pasos) */}
              {index < steps.length - 1 && (
                <div className="md:hidden mt-8 text-black/10">
                  <ArrowRight className="w-6 h-6 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

