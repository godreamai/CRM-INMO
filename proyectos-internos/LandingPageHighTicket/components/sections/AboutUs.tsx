'use client'

import { TrendingUp, DollarSign, Clock } from 'lucide-react'
import Image from 'next/image'

export default function AboutUs() {
  return (
    <section className="py-24 relative bg-white">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-[-10%] w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/[0.03] rounded-full text-[10px] font-black tracking-widest text-black/40 uppercase">
              El estándar Go Dream AI
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight leading-[1.1]">
              No necesitas más herramientas.<br />
              <span className="text-black/30">Necesitas que tus procesos trabajen solos.</span>
            </h2>

            <div className="space-y-6">
              <div className="space-y-4 text-lg text-black/60 leading-relaxed font-medium">
                <p>
                  Sin procesos automatizados, cada nuevo cliente aumenta la carga manual.
                  Diseñamos sistemas que amplían tu capacidad operativa sin aumentar tu equipo.
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual - Pro Glass Card Implementation */}
          <div className="relative">
            <div className="relative">
              {/* Subtle accent glow */}
              <div className="absolute inset-x-0 -top-20 h-40 bg-lime-500/10 blur-[100px] rounded-full mx-auto w-2/3" />

              <div className="relative glass-card rounded-[3rem] p-10 border border-black/5 bg-white/70 shadow-2xl backdrop-blur-2xl">
                <div className="space-y-10">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-[2rem] bg-black flex items-center justify-center p-4 shadow-2xl border border-white/10 group-hover:scale-105 transition-transform">
                      <Image
                        src="/images/logos/gdai-blanco.svg"
                        alt="Go Dream Ai"
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-black tracking-tighter leading-none mb-2">Go Dream AI</h3>
                      <p className="text-black/40 text-[10px] font-black uppercase tracking-[0.2em]">Operational Architecture Studio</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-black/5 to-transparent" />
                    <p className="text-xl text-black/70 font-bold leading-relaxed">
                      Transformamos operaciones manuales en <span className="text-lime-400">infraestructura automatizada</span>.
                    </p>
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-black/5 to-transparent" />
                  </div>

                  <div className="space-y-4">
                    {[
                      { title: 'Control total', desc: 'Centralizamos procesos y datos para que tengas visibilidad real de tu operación en tiempo real.' },
                      { title: 'Eficiencia estructural', desc: 'Eliminamos tareas manuales críticas, reducimos errores y liberamos capacidad operativa sin contratar más personas.' }
                    ].map((item, i) => (
                      <div key={i} className="glass-card p-5 rounded-2xl border border-black/5 bg-white shadow-sm hover:border-lime-500/30 transition-all duration-500">
                        <p className="text-black/60 text-sm font-medium leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <div className="flex items-center gap-2 mb-6">
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="flex-1 h-1.5 rounded-full bg-black/5 overflow-hidden">
                          <div className="h-full bg-lime-400 w-full" />
                        </div>
                      ))}
                    </div>
                    <p className="text-black/40 font-black text-[9px] uppercase tracking-widest text-center">
                      High-Level Systems Engineering
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

