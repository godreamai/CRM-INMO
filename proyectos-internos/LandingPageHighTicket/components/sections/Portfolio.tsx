'use client'

import { ExternalLink, Star } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/543364540036?text=Hola%2C%20quiero%20una%20herramienta%20digital%20para%20mi%20negocio'

const demos = [
  {
    tipo: 'Menú Digital',
    nombre: 'La Parrilla de Rodrigo',
    ciudad: 'Rosario, Santa Fe',
    color: 'bg-orange-50',
    acento: 'bg-orange-500',
    iniciales: 'PR',
    descripcion: 'Menú digital con QR en cada mesa. Rodrigo actualiza precios y platos desde su celular en 2 minutos, sin llamar a nadie. Sus clientes ven siempre la carta actualizada.',
    resultado: 'Cero consultas de precio por WhatsApp desde el primer día',
    tags: ['Menú con QR', 'Panel propio', 'Actualización instantánea'],
  },
  {
    tipo: 'Agenda Online',
    nombre: 'Studio Canela',
    ciudad: 'Mar del Plata, Buenos Aires',
    color: 'bg-pink-50',
    acento: 'bg-pink-500',
    iniciales: 'SC',
    descripcion: 'Agenda online donde las clientas reservan turno solas, a cualquier hora. Canela controla su disponibilidad desde el panel y dejó de responder WhatsApp a las 11 de la noche.',
    resultado: 'Agenda completa las primeras 2 semanas sin atender ningún WhatsApp',
    tags: ['Reservas 24/7', 'Panel de turnos', 'Confirmación automática'],
  },
  {
    tipo: 'Catálogo con Panel',
    nombre: 'Indumentaria Mavi',
    ciudad: 'Córdoba Capital',
    color: 'bg-purple-50',
    acento: 'bg-purple-500',
    iniciales: 'MV',
    descripcion: 'Catálogo online donde las clientas ven talles, colores y disponibilidad antes de ir. Mavi carga los productos con foto, precio y stock desde su panel sin saber nada de tecnología.',
    resultado: 'Las clientas llegan al local sabiendo exactamente qué quieren comprar',
    tags: ['Catálogo online', 'Gestión de stock', 'Panel sin tecnicismos'],
  },
]

const testimonios = [
  {
    nombre: 'Rodrigo Peralta',
    negocio: 'La Parrilla de Rodrigo',
    texto: 'Antes mandaba fotos del menú por WhatsApp y nadie sabía cuál era la última. Ahora escanean el QR y listo. Lo actualizo yo solo desde el celular en dos minutos.',
    estrellas: 5,
  },
  {
    nombre: 'Camila Torres',
    negocio: 'Studio Canela',
    texto: 'Me cambió la vida. Antes me escribían a cualquier hora para sacar turno. Ahora la agenda se llena sola y yo decido cuándo trabajo. Super recomendable.',
    estrellas: 5,
  },
  {
    nombre: 'Maviel Romero',
    negocio: 'Indumentaria Mavi',
    texto: 'Pensé que iba a ser complicado manejar el catálogo yo sola. Me enseñaron en 20 minutos y ya lo manejo sin problema. Mis clientas adoran poder ver todo antes de venir.',
    estrellas: 5,
  },
]

export default function Portfolio() {
  return (
    <section id="casos" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-lime-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-black/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Portfolio */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/[0.03] rounded-full text-[10px] font-black tracking-widest text-black/40 uppercase mb-6">
            Ejemplos de trabajo
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-black tracking-tight">
            Herramientas que ya están{' '}
            <span className="text-black/30 font-medium italic">trabajando solas.</span>
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto font-medium">
            Negocios como el tuyo que dejaron de gestionar todo a mano y ahora tienen una herramienta que trabaja por ellos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {demos.map((demo, index) => (
            <div key={index} className="glass-card rounded-[2rem] overflow-hidden border border-black/[0.05]">
              {/* Preview simulado */}
              <div className={`${demo.color} h-40 flex items-center justify-center relative`}>
                <div className={`w-20 h-20 ${demo.acento} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-black text-2xl">{demo.iniciales}</span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="px-2 py-1 bg-black/10 rounded-full text-[9px] font-black uppercase tracking-widest text-black/50">
                    {demo.tipo}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-xl font-black text-black mb-1">{demo.nombre}</h3>
                <p className="text-xs font-bold text-black/30 uppercase tracking-widest mb-4">{demo.ciudad}</p>
                <p className="text-black/60 font-medium text-sm leading-relaxed mb-6">{demo.descripcion}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {demo.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-lime-400/10 text-lime-700 rounded-full text-[10px] font-black uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="p-4 bg-black rounded-xl">
                  <p className="text-xs font-black text-lime-400 uppercase tracking-widest">{demo.resultado}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonios */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-black tracking-tight">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonios.map((t, index) => (
            <div key={index} className="glass-card rounded-2xl p-8 border border-black/[0.05]">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.estrellas }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-lime-400 text-lime-400" />
                ))}
              </div>
              <p className="text-black/70 font-medium leading-relaxed mb-6 italic">"{t.texto}"</p>
              <div>
                <p className="font-black text-black text-sm">{t.nombre}</p>
                <p className="text-xs font-bold text-black/30 uppercase tracking-widest">{t.negocio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA intermedio */}
        <div className="text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-2xl font-black text-lg hover:bg-black/90 transition-all shadow-xl shadow-black/20"
          >
            Quiero una herramienta así para mi negocio
            <ExternalLink className="w-5 h-5 text-lime-400" />
          </a>
        </div>
      </div>
    </section>
  )
}
