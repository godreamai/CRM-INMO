'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Script from 'next/script'

const faqs = [
  {
    question: '¿Tienen experiencia trabajando con inmobiliarias?',
    answer: 'Somos nuevos en el nicho inmobiliario específicamente, y por eso el precio de entrada es bajo. Nuestro sistema ya funciona en otros sectores y el tipo de automatización que implementamos es exactamente lo que necesitan: respuesta rápida, asignación de leads y seguimiento automático. Apostamos a los primeros clientes con garantía incluida.',
  },
  {
    question: '¿Qué pasa si WhatsApp me banea el número?',
    answer: 'Usamos un número secundario dedicado al bot, no tu número principal. El riesgo de baneo es bajo si se usa correctamente. Si en algún momento hay un problema, lo resolvemos nosotros dentro del soporte mensual incluido.',
  },
  {
    question: '¿Funciona con el CRM que ya uso?',
    answer: 'Sí. Integramos con los CRMs más usados en Argentina: Tokko Broker, Inmovilla, Wasi, EasyBroker. Si usás otro, lo evaluamos en la conversación inicial y te decimos si podemos integrarlo.',
  },
  {
    question: '¿Cuánto tiempo me va a llevar a mí configurar esto?',
    answer: 'Cero. Nosotros hacemos todo el setup en 14 días. Vos solo necesitás darnos acceso a tu número de WhatsApp Business y el mail donde llegan los leads. El resto lo manejamos nosotros.',
  },
  {
    question: '¿Qué pasa si el sistema no funciona como prometieron?',
    answer: 'Garantía completa: si el sistema no funciona según lo acordado, no cobramos el 80% restante del precio de setup. Solo cobrás el up front inicial si queremos dar vuelta atrás. Sin letra chica.',
  },
  {
    question: '¿Cuánto demora en empezar a funcionar?',
    answer: '14 días desde el kick-off. Día 1: accesos y configuración inicial. Días 2-3: bots conectados. Días 4-12: implementación completa. Días 13-14: deploy y te mostramos cómo usarlo. A partir del día 15, el sistema trabaja solo.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 relative bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/[0.03] rounded-full text-[10px] font-black tracking-widest text-black/40 uppercase mb-6">
            Preguntas frecuentes
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-black tracking-tight">
            Lo que siempre{' '}
            <span className="text-black/30">preguntan primero.</span>
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto font-medium">
            Respuestas directas para que decidas con toda la información.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl overflow-hidden border border-black/5"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-black/[0.02] transition-all"
              >
                <span className="font-black text-lg text-black pr-4 tracking-tight">{faq.question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${openIndex === index ? 'bg-black text-white' : 'bg-black/5 text-black'}`}>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-8 pb-8">
                  <p className="text-black/60 font-medium leading-[1.6] border-t border-black/5 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  )
}
