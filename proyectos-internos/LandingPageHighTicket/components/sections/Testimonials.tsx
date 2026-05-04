'use client'

import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const testimonials = [
  {
    name: 'María González',
    role: 'CEO en TechFlow Solutions',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    quote: 'Conversiones x3 en el primer mes. Entrega en 48 horas.',
    rating: 5,
  },
  {
    name: 'Carlos Mendoza',
    role: 'Fundador de EcoMarket',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    quote: 'ROI inmediato. Las automatizaciones nos ahorran horas diarias.',
    rating: 5,
  },
  {
    name: 'Ana Rodríguez',
    role: 'Directora de Marketing en FitZone Pro',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    quote: '500+ leads en 2 semanas. Profesionales y rápidos.',
    rating: 5,
  },
  {
    name: 'Roberto Silva',
    role: 'CEO en FinanceHub',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    quote: 'Negocio escalado x5. Inversión recuperada en menos de un mes.',
    rating: 5,
  },
  {
    name: 'Laura Martínez',
    role: 'Fundadora de EduLearn Platform',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    quote: 'Inscripciones +250%. Todo automatizado desde el día 1.',
    rating: 5,
  },
  {
    name: 'Diego Fernández',
    role: 'Director en HealthCare Connect',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    quote: 'Costos operativos -40%. Resultados excepcionales.',
    rating: 5,
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(1)

  // Calcular cuántos items mostrar según el tamaño de pantalla
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3) // Desktop: 3 items
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2) // Tablet: 2 items
      } else {
        setItemsPerView(1) // Mobile: 1 item
      }
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  const maxIndex = Math.max(0, testimonials.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const newMaxIndex = Math.max(0, testimonials.length - itemsPerView)
      return prev >= newMaxIndex ? 0 : prev + 1
    })
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const newMaxIndex = Math.max(0, testimonials.length - itemsPerView)
      return prev <= 0 ? newMaxIndex : prev - 1
    })
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Ajustar currentIndex cuando cambia itemsPerView
  useEffect(() => {
    const newMaxIndex = Math.max(0, testimonials.length - itemsPerView)
    if (currentIndex > newMaxIndex) {
      setCurrentIndex(newMaxIndex)
    }
  }, [itemsPerView, currentIndex])

  // Auto-play cada 5 segundos
  useEffect(() => {
    if (maxIndex <= 0) return // No auto-play si solo hay una página

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const newMaxIndex = Math.max(0, testimonials.length - itemsPerView)
        return prev >= newMaxIndex ? 0 : prev + 1
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [itemsPerView, maxIndex])

  return (
    <section id="testimonios" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-600/5 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-semibold text-foreground/70 mb-4">
            RESULTADOS REALES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            No prometemos. <span className="text-gradient">Demostramos.</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            +200 negocios ya facturan en automático con Go Dream Ai. Estos son algunos de sus resultados:
          </p>
        </div>

        {/* Carrusel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Contenedor del carrusel */}
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="grid gap-6 transition-all duration-500 ease-in-out"
              style={{
                gridTemplateColumns: `repeat(${itemsPerView}, 1fr)`,
                transform: `translateX(0)`, // Simplificado, ya que estamos cortando el array
              }}
            >
              {testimonials
                .slice(currentIndex, currentIndex + itemsPerView)
                .map((testimonial, slideIndex) => (
                  <div
                    key={`${currentIndex}-${slideIndex}`}
                    className="glass-effect rounded-2xl p-6 hover:border-gray-500/30 transition-colors animate-fade-in"
                  >
                    <Quote className="w-8 h-8 text-foreground/40 mb-4" />

                    <p className="text-foreground/90 mb-6 leading-relaxed font-medium">
                      {testimonial.quote}
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={testimonial.image}
                          alt={`Foto de ${testimonial.name}, ${testimonial.role}`}
                          fill
                          className="object-cover"
                          sizes="48px"
                          loading="lazy"
                          quality={85}
                        />
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-foreground/60">{testimonial.role}</div>
                      </div>
                    </div>

                    <div className="flex gap-1 mt-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-accent-primary text-sm">★</span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Controles de navegación */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Botón anterior */}
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full glass-effect flex items-center justify-center hover:bg-foreground/10 transition-colors group"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="w-5 h-5 text-foreground/60 group-hover:text-foreground transition-colors" />
            </button>

            {/* Dots indicadores */}
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${currentIndex === index
                    ? 'bg-lime-400 w-8'
                    : 'bg-foreground/20 hover:bg-foreground/40'
                    }`}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>

            {/* Botón siguiente */}
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full glass-effect flex items-center justify-center hover:bg-foreground/10 transition-colors group"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="w-5 h-5 text-foreground/60 group-hover:text-foreground transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

