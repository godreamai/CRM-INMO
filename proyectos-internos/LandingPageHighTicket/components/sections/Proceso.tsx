'use client'

import { MessageCircle, Palette, Rocket } from 'lucide-react'

const pasos = [
  {
    numero: '01',
    icon: MessageCircle,
    titulo: 'Nos contás de tu negocio',
    descripcion: 'Por WhatsApp: qué hacés, a quién le vendés y qué querés digitalizar. En menos de 24hs te mandamos una propuesta con precio, plazo y qué incluye. Sin costo de consulta.',
  },
  {
    numero: '02',
    icon: Palette,
    titulo: 'Construimos las dos partes',
    descripcion: 'El portal que van a ver tus clientes y el panel desde donde vos controlás todo. Con tu logo, tus colores y tu contenido. Te mostramos el avance para que apruebes cada detalle.',
  },
  {
    numero: '03',
    icon: Rocket,
    titulo: 'Online en 3 días. Vos al mando.',
    descripcion: 'Publicamos la herramienta con tu dominio. Te capacitamos para manejarla solo. A partir de ahí, corre sola y vos actualizás lo que necesitás cuando querés.',
  },
]

export default function Proceso() {
  return (
    <section id="metodologia" className="py-24 relative bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/[0.03] rounded-full text-[10px] font-black tracking-widest text-black/40 uppercase mb-6">
            Cómo funciona
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-black tracking-tight">
            De cero a funcionando{' '}
            <span className="text-black/30 font-medium italic">en 3 días.</span>
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto leading-relaxed">
            Sin reuniones eternas, sin tecnicismos, sin sorpresas. Vos contás lo que necesitás. Nosotros lo construimos.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Línea conectora - solo en desktop */}
            <div className="hidden md:block absolute top-12 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-[2px] bg-gradient-to-r from-black/10 via-lime-400/50 to-black/10" />

            {pasos.map((paso, index) => (
              <div key={index} className="flex flex-col items-center text-center relative">
                {/* Número + Ícono */}
                <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-2xl bg-black flex items-center justify-center shadow-xl shadow-black/10 relative z-10">
                    <paso.icon className="w-10 h-10 text-lime-400" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center z-20">
                    <span className="text-[10px] font-black text-black">{paso.numero}</span>
                  </div>
                </div>

                <h3 className="text-xl font-black mb-4 text-black tracking-tight">{paso.titulo}</h3>
                <p className="text-black/60 leading-relaxed font-medium text-sm">{paso.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
