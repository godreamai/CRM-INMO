'use client'

import { Link, Settings, Rocket } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/543364540036?text=Hola%2C%20vi%20su%20perfil%20y%20me%20interesa%20automatizar%20los%20leads%20de%20mi%20inmobiliaria'

const steps = [
  {
    number: '01',
    icon: Link,
    title: 'Conectamos tus portales',
    description: 'Zonaprop, Argenprop, Mercado Libre. Todos los leads que llegan por mail o formulario entran automáticamente al sistema. Nada se pierde.',
  },
  {
    number: '02',
    icon: Settings,
    title: 'Configuramos los bots',
    description: 'Bot de WhatsApp responde en menos de 5 minutos y asigna al agente correcto. Bot de correo hace el seguimiento. Chatbot en tu web captura los interesados.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'En 14 días, funciona solo',
    description: 'Sistema en producción. Cada lead registrado, cada conversación trazada, cada agente con su panel. Vos solo supervisás.',
  },
]

export default function WhatWeDo() {
  return (
    <section id="metodologia" className="py-24 relative bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/[0.03] rounded-full text-[10px] font-black tracking-widest text-black/40 uppercase mb-6">
            Cómo lo implementamos
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-black tracking-tight leading-tight">
            Tres pasos. Catorce días.{' '}
            <span className="text-black/30 font-medium italic">Sistema funcionando.</span>
          </h2>
          <p className="text-xl text-black/60 max-w-3xl mx-auto font-medium leading-relaxed">
            Nosotros hacemos todo el setup. Vos no necesitás saber de tecnología ni dedicarle tiempo.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className="glass-card rounded-[2rem] p-10 border border-black/5 bg-white/50 group hover:bg-black transition-all duration-500"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center group-hover:bg-lime-500 transition-colors duration-500">
                    <step.icon className="w-7 h-7 text-lime-400 group-hover:text-black transition-colors duration-500" />
                  </div>
                  <span className="text-4xl font-black text-black/10 group-hover:text-white/20 transition-colors duration-500">{step.number}</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-black mb-3 group-hover:text-white transition-colors duration-500 tracking-tight">{step.title}</h3>
                  <p className="text-black/50 group-hover:text-white/60 transition-colors duration-500 leading-relaxed font-medium text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block p-1 bg-black/[0.03] rounded-2xl">
            <div className="bg-white px-10 py-10 rounded-xl border border-black/5 shadow-sm">
              <p className="text-lg text-black font-medium mb-8">
                No tercerizan. No usan plantillas. <strong className="text-black border-b-2 border-lime-400">Nosotros construimos y configuramos todo.</strong>
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-10 py-5 bg-black text-white rounded-2xl font-black text-lg transition-all hover:scale-[1.02] shadow-2xl shadow-black/20"
              >
                Quiero saber si aplica para mi inmobiliaria
                <div className="w-8 h-[2px] bg-lime-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

