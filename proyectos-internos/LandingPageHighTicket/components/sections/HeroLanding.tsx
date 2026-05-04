'use client'

import { ArrowDown, Zap, Target, Bot } from 'lucide-react'
import { handleSmoothScroll } from '@/lib/smoothScroll'
import { AnimatedGradientText, GlowText } from '@/components/TextEffects'

export default function HeroLanding() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 md:pt-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gray-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gray-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className="space-y-8 text-center md:text-left"
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-full text-sm font-semibold text-foreground/70 animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              <Zap className="w-4 h-4 text-accent-primary" />
              SISTEMA DE VENTAS 24/7
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-center md:text-left animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              <GlowText>
                <AnimatedGradientText>
                  Tu negocio vendiendo mientras dormís
                </AnimatedGradientText>
              </GlowText>
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg sm:text-xl text-foreground/70 leading-relaxed max-w-2xl text-center md:text-left mx-auto md:mx-0 animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              <strong className="text-foreground">Basta de perder clientes</strong> por no responder rápido. Creamos un sistema con IA que captura, califica y cierra ventas por vos —sin que levantes un dedo.
            </p>

            {/* CTA Button */}
            <div
              className="flex flex-col gap-6 animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href="https://calendly.com/candelappablo/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-primary-dark rounded-lg font-semibold text-lg hover:scale-105 transition-transform neon-glow-subtle flex items-center justify-center gap-2 dark:text-gray-950 text-white w-full sm:w-auto"
                >
                  Agendar llamada
                  <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </a>
              </div>

              <p className="text-sm text-foreground/50 font-medium max-w-lg text-center md:text-left mx-auto md:mx-0 leading-relaxed">
                En el diagnóstico analizamos tu proceso manual más crítico. <span className="text-accent-primary">Si hay fit, te enviamos una propuesta de Sprint en 24h.</span>
              </p>
            </div>

            {/* Microcopy */}
            <p
              className="text-sm text-foreground/50 flex flex-wrap items-center gap-2 justify-center md:justify-start animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-accent-primary" />
                Listo en 24-72 horas
              </span>
              <span className="text-foreground/30">•</span>
              <span className="flex items-center gap-1">
                <Target className="w-4 h-4 text-accent-primary" />
                ROI garantizado
              </span>
              <span className="text-foreground/30">•</span>
              <span className="flex items-center gap-1">
                <Bot className="w-4 h-4 text-accent-primary" />
                IA que vende por vos
              </span>
            </p>
          </div>

          {/* Right Visual */}
          <div
            className="relative flex items-center justify-center animate-fade-in"
          >
            <div className="relative w-full max-w-sm md:max-w-md lg:max-w-xl h-[400px] md:h-[500px] lg:h-[750px] flex items-center justify-center">
              {/* Background glow effect */}
              <div className="hidden lg:block absolute inset-0 bg-gradient-to-br from-gray-600/20 via-gray-500/15 to-gray-700/20 rounded-full blur-3xl animate-float" />

              {/* Robot Image */}
              {/* <div
                className="relative z-10 animate-float-slow"
                style={{
                  filter: 'drop-shadow(0 25px 50px rgba(139, 92, 246, 0.4)) drop-shadow(0 15px 30px rgba(139, 92, 246, 0.3)) drop-shadow(0 5px 15px rgba(139, 92, 246, 0.2))',
                }}
              >
                <Image
                  src="/robot.png"
                  alt="Go Dream Ai - Sistema de ventas automático"
                  width={600}
                  height={750}
                  className="w-full h-auto object-contain"
                  priority
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
