'use client'

import { useEffect, useState, memo } from 'react'

// Componente de partículas flotantes - REDUCIDO a 8 partículas
const FloatingParticles = memo(function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    delay: number
    duration: number
  }>>([])

  useEffect(() => {
    // Generar partículas solo en cliente después del mount
    setParticles(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10,
      }))
    )
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-accent-primary/20 dark:bg-accent-primary/30 blur-sm animate-float-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  )
})

// Componente de gradiente animado - Simplificado con CSS
const AnimatedGradient = memo(function AnimatedGradient() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 dark:opacity-15 animate-gradient-shift"
        style={{
          background: 'radial-gradient(circle at 30% 50%, hsl(var(--primary-accent) / 0.3) 0%, transparent 50%)',
        }}
      />
    </div>
  )
})

// Componente de grid animado - Simplificado sin animación
const AnimatedGrid = memo(function AnimatedGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] dark:opacity-[0.02]">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-accent-primary"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
})

// Componente principal - Carga diferida de efectos
export default function VisualEffects() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') return

    // Diferir la carga de efectos visuales para no bloquear el render inicial
    if ('requestIdleCallback' in window) {
      const timer = window.requestIdleCallback(() => setMounted(true), { timeout: 200 })
      return () => {
        if (typeof timer === 'number') {
          window.cancelIdleCallback(timer)
        }
      }
    } else {
      // Fallback para navegadores que no soportan requestIdleCallback
      const timer = setTimeout(() => setMounted(true), 100)
      return () => clearTimeout(timer)
    }
  }, [])

  // No renderizar nada hasta que esté montado en el cliente
  if (typeof window === 'undefined' || !mounted) return null

  return (
    <>
      <AnimatedGradient />
      <AnimatedGrid />
      <FloatingParticles />
    </>
  )
}

// Exportar componentes individuales para uso opcional
export { FloatingParticles, AnimatedGradient, AnimatedGrid }
