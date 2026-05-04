'use client'

import { Clock, MessageSquare, CalendarX, Lock } from 'lucide-react'
import { handleSmoothScroll } from '@/lib/smoothScroll'

const painPoints = [
  {
    icon: Clock,
    title: 'Perdés ventas mientras dormís',
    description: 'Cada mensaje sin contestar es plata que se va a tu competencia. Y ellos ya tienen un robot que responde 24/7.',
  },
  {
    icon: MessageSquare,
    title: 'Tu WhatsApp es un cementerio de oportunidades',
    description: 'Leads enterrados entre grupos de familia y memes. Cuando los encontrás, ya se enfriaron. Cada lead frío = dinero quemado.',
  },
  {
    icon: CalendarX,
    title: 'No-shows que te destruyen la agenda',
    description: 'Reservan, no vienen, no avisan. Perdés tiempo, plata y paciencia. Sin recordatorios automáticos, esto nunca va a cambiar.',
  },
  {
    icon: Lock,
    title: 'Sos esclavo de tu propio negocio',
    description: 'Si no estás vos, no se vende. ¿Vacaciones? ¿Enfermarte? Imposible. Necesitás un sistema que trabaje PARA vos, no AL REVÉS.',
  },
]

export default function PainPointsLanding() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ¿Te suena{' '}
            <span className="text-gradient">familiar?</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            El 87% de los negocios pierden ventas por estos errores. <strong className="text-foreground">La buena noticia: tienen solución.</strong>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="glass-effect rounded-2xl p-8 hover:border-gray-500/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700/30 to-gray-600/20 flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-6 h-6 text-foreground/60" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{point.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{point.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-foreground/80 mb-6">
            <strong className="text-accent-primary">Plot twist:</strong> Tu competencia ya automatizó todo esto. ¿Y vos?
          </p>
          <a
            href="https://calendly.com/candelappablo/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-primary-dark rounded-lg font-semibold text-lg hover:scale-105 transition-transform neon-glow-subtle dark:text-gray-950 text-white"
          >
            Ver la solución →
          </a>
        </div>
      </div>
    </section>
  )
}

