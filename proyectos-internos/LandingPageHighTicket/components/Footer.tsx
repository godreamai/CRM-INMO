'use client'

import { Mail, Phone, MapPin, Rocket, ArrowRight, Cookie } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from './ThemeProvider'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const { theme } = useTheme()
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  // Función para manejar navegación a secciones
  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (isHomePage) {
      // Si estamos en home, hacer scroll suave
      e.preventDefault()
      const element = document.querySelector(sectionId)
      if (element) {
        const headerOffset = 120
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
    // Si no estamos en home, el href normal redirige a /#seccion
  }

  return (
    <footer className="relative bg-white border-t border-black/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo y descripción */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              {/* Ícono circular */}
              <div className="w-12 h-12 rounded-[1rem] bg-black overflow-hidden shadow-lg flex-shrink-0">
                <Image
                  src="/images/logos/icon-app.png"
                  alt="Go Dream Ai"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Logo texto */}
              <Image
                src="/images/logos/gdai-negro.svg"
                alt="Go Dream Ai"
                width={160}
                height={50}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-black/60 max-w-sm leading-relaxed font-medium">
              Diseñamos la <strong className="text-black">arquitectura operativa</strong> que permite a las empresas escalar sin aumentar la fricción ni la dependencia humana. Foco absoluto en rentabilidad.
            </p>
            <div className="pt-2">
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="space-y-6">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-black/30">Infraestructura</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={isHomePage ? '#servicios' : '/#servicios'}
                  onClick={(e) => handleSectionClick(e, '#servicios')}
                  className="text-black/60 hover:text-black font-bold text-sm transition-colors"
                >
                  Metodología Sprint
                </a>
              </li>
              <li>
                <a
                  href={isHomePage ? '#faq' : '/#faq'}
                  onClick={(e) => handleSectionClick(e, '#faq')}
                  className="text-black/60 hover:text-black font-bold text-sm transition-colors"
                >
                  Soporte y Consultoría
                </a>
              </li>
              <li>
                <a
                  href="/privacidad"
                  className="text-black/40 hover:text-black text-xs font-bold transition-colors"
                >
                  Legal & Privacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-6">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-black/30">Presencia Global</h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:go@godreamai.com" className="group flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black/[0.03] flex items-center justify-center group-hover:bg-lime-400 transition-colors">
                    <Mail className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-black/60 group-hover:text-black font-bold text-sm">go@godreamai.com</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/543364540036" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black/[0.03] flex items-center justify-center group-hover:bg-lime-400 transition-colors">
                    <Phone className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-black/60 group-hover:text-black font-bold text-sm">+54 9 336 454-0036</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black/[0.03] flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-black" />
                </div>
                <span className="text-black/30 font-bold text-sm tracking-widest uppercase">Remoto · Global</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-black/30 text-[10px] font-black uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Go Dream Ai — Arquitectura Sistémica
          </p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
              <span className="text-[10px] font-black text-black/40 uppercase tracking-widest">Sistemas Operativos 24/7</span>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('gdai_cookie_consent')
                window.location.reload()
              }}
              className="text-black/30 hover:text-black transition-colors"
            >
              <Cookie className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

