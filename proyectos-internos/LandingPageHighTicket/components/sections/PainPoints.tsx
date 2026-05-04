'use client'

import { Clock, Users, Mail, BarChart2 } from 'lucide-react'

const painPoints = [
  {
    icon: Clock,
    title: 'Llegó el lead a las 11pm. Lo viste al otro día.',
    description: 'Para cuando alguien de tu equipo lo contactó, el comprador ya había hablado con otra inmobiliaria y cerrado la visita. Perdiste la operación sin enterarte.',
  },
  {
    icon: Users,
    title: 'Cada agente atiende desde su WhatsApp personal.',
    description: 'No sabés qué conversaciones tiene cada uno, qué leads están activos, ni cuántos se cayeron. No hay trazabilidad. No hay control.',
  },
  {
    icon: Mail,
    title: 'Los mails de Zonaprop y Mercado Libre llegan. Nadie los mira a tiempo.',
    description: 'El lead mandó una consulta desde el portal. Vos tenés el mail pero no hay proceso para responderlo rápido. Se enfrió solo.',
  },
  {
    icon: BarChart2,
    title: 'No sabés cuántos leads perdiste este mes.',
    description: 'Sin sistema, sin registro. No podés mejorar lo que no medís. Y cada lead que se pierde es una comisión que no vas a ver.',
  },
]

export default function PainPoints() {
  return (
    <section className="py-24 relative bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/[0.03] rounded-full text-[10px] font-black tracking-widest text-black/40 uppercase mb-6">
            El problema real
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-black tracking-tight">
            Tu inmobiliaria recibe leads.{' '}
            <span className="text-black/30 font-medium italic">Pero los pierde antes de responderlos.</span>
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto leading-relaxed">
            No es un problema de cantidad de leads. Es un problema de velocidad de respuesta.{' '}
            <strong className="text-black">Eso tiene solución en 14 días.</strong>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="glass-card rounded-[2rem] p-10 border border-black/[0.03] bg-white/40 group overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center flex-shrink-0 shadow-lg shadow-black/10 group-hover:bg-lime-400 transition-colors duration-500">
                  <point.icon className="w-7 h-7 text-lime-400 group-hover:text-black transition-colors duration-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-3 text-black text-center sm:text-left">{point.title}</h3>
                  <p className="text-black/60 leading-relaxed font-medium text-center sm:text-left">{point.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block p-1 bg-black/[0.03] rounded-2xl">
            <div className="bg-white px-10 py-10 rounded-xl border border-black/5 shadow-sm">
              <p className="text-xl text-black font-medium mb-4">
                Con 1 sola operación que no hubieras perdido por responder tarde,{' '}
                <strong className="text-black border-b-2 border-lime-400">recuperás la inversión del sistema varias veces.</strong>
              </p>
              <p className="text-black/40 font-medium italic">
                ¿Te identificás? — Hablemos hoy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
