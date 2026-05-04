'use client'

import { Clock } from 'lucide-react'
import Image from 'next/image'
import { handleSmoothScroll } from '@/lib/smoothScroll'

export default function UrgencyBannerLanding() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] bg-accent-lime text-gray-950 border-b-2 border-gray-950/20 shadow-lg animate-slide-down-fade opacity-0 translate-y-[-100%]"
      style={{ animationDelay: '0s', animationFillMode: 'forwards', animationDuration: '0.5s' }}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-center md:justify-between gap-4 py-4">
          {/* Logo - Solo visible en desktop */}
          <div className="hidden md:flex flex-shrink-0">
            <Image
              src="/images/logos/gdai-negro.svg"
              alt="Go Dream Ai"
              width={120}
              height={35}
              className="h-8 w-auto"
              priority
            />
          </div>

          {/* Mensaje principal - Centrado en mobile */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 text-xs sm:text-sm md:text-base font-bold text-center">
            <span className="flex items-center gap-2 justify-center">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 animate-pulse flex-shrink-0" strokeWidth={3} />
              <span>🔥 TU COMPETENCIA YA VENDE EN AUTOMÁTICO — ¿Y VOS?</span>
            </span>
            <span className="hidden sm:inline font-normal">•</span>
            <a
              href="https://calendly.com/candelappablo/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline font-extrabold transition-all hover:scale-105 inline-block"
            >
              Agendar llamada ahora (solo 3 lugares) →
            </a>
          </div>

          {/* Espacio vacío para balance - Solo en desktop */}
          <div className="hidden md:block w-[120px] flex-shrink-0" />
        </div>
      </div>
    </div>
  )
}

