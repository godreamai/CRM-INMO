'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useTheme } from './ThemeProvider'
import { useUrgencyBanner } from './UrgencyBannerContext'
import { handleSmoothScroll } from '@/lib/smoothScroll'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { isBannerVisible } = useUrgencyBanner()
  const pathname = usePathname()

  // Detectar si estamos en la página principal
  const isHomePage = pathname === '/'
  // Detectar si estamos en la landing de venta (sin navegación)
  const isLandingPage = pathname === '/sistemadeventa247'

  // Función para manejar el click en los enlaces
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (isHomePage) {
      handleSmoothScroll(e, 120)
    } else {
      e.preventDefault()
      window.location.href = `/${hash}`
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      if (current < lastScrollY && current > 100) {
        setIsVisible(true)
      } else if (current > lastScrollY && current > 100) {
        setIsVisible(false)
      } else if (current < 100) {
        setIsVisible(true)
      }
      setLastScrollY(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header
      className="fixed left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-black/5 transition-all duration-300"
      style={{
        top: isBannerVisible ? '4.5rem' : '0',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        opacity: isVisible ? 1 : 0
      }}
    >
      <nav className="w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Go Dream Ai */}
            <a
              href="/"
              className="flex items-center gap-2 group pl-2 sm:pl-4"
            >
              {/* Ícono circular - visible en móvil, oculto en desktop */}
              <div className="sm:hidden w-10 h-10 rounded-xl bg-black overflow-hidden group-hover:scale-105 transition-transform shadow-sm">
                <Image
                  src="/images/logos/icon-app.png"
                  alt="Go Dream Ai"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {/* Logo completo - oculto en móvil, visible en desktop */}
              <Image
                src="/images/logos/gdai-negro.svg"
                alt="Go Dream AI - Arquitectura Operativa y Automatización Escalable"
                width={180}
                height={50}
                className="hidden sm:block h-10 sm:h-12 w-auto group-hover:scale-105 transition-transform"
                priority
              />
            </a>

            {/* Desktop Navigation */}
            {!isLandingPage && (
              <div className="hidden md:flex items-center gap-1">
                <a
                  href={isHomePage ? '#metodologia' : '/#metodologia'}
                  onClick={(e) => handleNavClick(e, '#metodologia')}
                  className="px-3 py-1.5 text-sm text-foreground/60 hover:text-foreground transition-colors rounded-md hover:bg-foreground/5"
                >
                  Cómo funciona
                </a>
                <a
                  href={isHomePage ? '#servicios' : '/#servicios'}
                  onClick={(e) => handleNavClick(e, '#servicios')}
                  className="px-3 py-1.5 text-sm text-foreground/60 hover:text-foreground transition-colors rounded-md hover:bg-foreground/5"
                >
                  Precios
                </a>
                <a
                  href={isHomePage ? '#casos' : '/#casos'}
                  onClick={(e) => handleNavClick(e, '#casos')}
                  className="px-3 py-1.5 text-sm text-foreground/60 hover:text-foreground transition-colors rounded-md hover:bg-foreground/5"
                >
                  Trabajos
                </a>
                <a
                  href={isHomePage ? '#faq' : '/#faq'}
                  onClick={(e) => handleNavClick(e, '#faq')}
                  className="px-3 py-1.5 text-sm text-foreground/60 hover:text-foreground transition-colors rounded-md hover:bg-foreground/5"
                >
                  FAQ
                </a>
              </div>
            )}

            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://wa.me/543364540036?text=Hola%2C%20quiero%20una%20herramienta%20digital%20para%20mi%20negocio"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-black/90 transition-all"
              >
                Quiero mi herramienta
              </a>
            </div>

            {/* Mobile Menu Button (oculto en landing de venta) */}
            <div className="md:hidden flex items-center gap-2">
              {!isLandingPage && (
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-foreground/80 hover:text-foreground p-2 transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu (oculto en landing de venta) */}
        {!isLandingPage && (
          <div
            className={`md:hidden overflow-hidden border-t border-border/50 dark:border-white/5 transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
              }`}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-1">
                <a
                  href={isHomePage ? '#metodologia' : '/#metodologia'}
                  onClick={(e) => { handleNavClick(e, '#metodologia'); setIsMenuOpen(false) }}
                  className="block px-3 py-2 text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-md transition-colors"
                >
                  Cómo funciona
                </a>
                <a
                  href={isHomePage ? '#servicios' : '/#servicios'}
                  onClick={(e) => { handleNavClick(e, '#servicios'); setIsMenuOpen(false) }}
                  className="block px-3 py-2 text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-md transition-colors"
                >
                  Precios
                </a>
                <a
                  href={isHomePage ? '#casos' : '/#casos'}
                  onClick={(e) => { handleNavClick(e, '#casos'); setIsMenuOpen(false) }}
                  className="block px-3 py-2 text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-md transition-colors"
                >
                  Trabajos
                </a>
                <a
                  href={isHomePage ? '#faq' : '/#faq'}
                  onClick={(e) => { handleNavClick(e, '#faq'); setIsMenuOpen(false) }}
                  className="block px-3 py-2 text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-md transition-colors"
                >
                  FAQ
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

