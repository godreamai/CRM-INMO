'use client'

import { X, AlertCircle, Clock, ArrowRight } from 'lucide-react'
import { useUrgencyBanner } from './UrgencyBannerContext'

export default function UrgencyBanner() {
  const { isBannerVisible, setIsBannerVisible } = useUrgencyBanner()

  if (!isBannerVisible) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] bg-black text-white border-b border-white/10 shadow-2xl transition-all duration-700 ease-in-out opacity-0 translate-y-[-100%] animate-slide-down-fade"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center py-4 relative">

          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-400"></span>
            </div>
            <span className="text-[10px] font-black tracking-widest uppercase text-white/40">Sistemas Activos</span>
          </div>

          {/* Main Message */}
          <div className="flex flex-col items-center gap-1 text-center">
            <h4 className="text-[11px] md:text-sm font-black tracking-tight leading-none uppercase">
              Disponibilidad Crítica: <span className="text-lime-400">2 Cupos Restantes</span>
            </h4>
            <p className="text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest">
              Arquitectura Operativa de Alto Nivel
            </p>
          </div>

          {/* CTA & Actions */}
          <div className="flex items-center justify-end gap-6">
            <a
              href="https://calendly.com/candelappablo/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 group"
            >
              <span className="text-[11px] font-black uppercase tracking-widest border-b border-lime-400/50 group-hover:border-lime-400 transition-all">
                Asegurar Cupo
              </span>
              <ArrowRight className="w-3 h-3 text-lime-400 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Close button with high-end feel */}
            <button
              onClick={() => setIsBannerVisible(false)}
              className="p-1 text-white/20 hover:text-white transition-colors"
              aria-label="Cerrar banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

