'use client'

// Efecto de texto con gradiente animado
export function AnimatedGradientText({
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={`inline-block bg-clip-text text-transparent bg-gradient-to-r from-accent-primary via-accent-primary-light to-accent-primary-dark pb-2 animate-gradient-xy ${className}`}
      style={{
        backgroundSize: '200% 200%',
      }}
    >
      {children}
    </span>
  )
}

// Efecto de texto con brillo que se mueve
export function ShimmerText({
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
    </span>
  )
}

// Efecto de texto con partículas que aparecen
export function ParticleText({
  text,
  className = ''
}: {
  text: string
  className?: string
}) {
  const letters = text.split('')

  return (
    <span className={`inline-flex ${className}`}>
      {letters.map((letter, index) => (
        <span
          key={index}
          className="inline-block transition-transform hover:scale-125 hover:text-accent-primary"
          style={{
            animation: `fadeInUp 0.5s ease forwards ${index * 0.05}s`,
            opacity: 0,
            transform: 'translateY(20px)'
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </span>
  )
}

// Efecto de texto con borde animado
export function GlowText({
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={`relative inline-block animate-pulse-glow ${className}`}>
      {children}
    </span>
  )
}

