'use client'

import { useState, useEffect } from 'react'
import { Cookie, Shield } from 'lucide-react'
import { usePathname } from 'next/navigation'

// Tipos de consentimiento
type ConsentStatus = 'pending' | 'accepted' | 'rejected'

interface ConsentData {
  status: ConsentStatus
  timestamp: string
  version: string // Versión de la política (si la actualizás, podés pedir consentimiento de nuevo)
}

const CONSENT_VERSION = '1.0'
const STORAGE_KEY = 'gdai_cookie_consent'

// Declarar tipos globales (opcionales porque pueden no estar cargados)
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: ((...args: unknown[]) => void) & {
      push?: (args: unknown) => void
      loaded?: boolean
      version?: string
      queue?: unknown[]
      callMethod?: (...args: unknown[]) => void
    }
    _fbq?: unknown
  }
}

// Función para cargar Google Analytics dinámicamente
const loadGoogleAnalytics = () => {
  // Verificar si ya está cargado
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') return

  // Crear script de gtag.js
  const script = document.createElement('script')
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-G96WL1GEX4'
  script.async = true
  document.head.appendChild(script)

  // Inicializar gtag
  script.onload = () => {
    window.dataLayer = window.dataLayer || []
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args)
    }
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', 'G-G96WL1GEX4', {
      // Registrar que hubo consentimiento
      'cookie_consent': 'granted'
    })

    // Evento para registrar el consentimiento (queda en GA como prueba)
    gtag('event', 'cookie_consent_granted', {
      'event_category': 'consent',
      'event_label': 'cookies_accepted',
      'value': 1
    })
  }
}

export default function CookieConsent() {
  const pathname = usePathname()
  const [showBanner, setShowBanner] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // No mostrar cookies en la landing de venta
  const isLandingPage = pathname === '/sistemadeventa247'
  if (isLandingPage) return null

  useEffect(() => {
    // Verificar si ya hay consentimiento guardado
    const storedConsent = localStorage.getItem(STORAGE_KEY)

    if (storedConsent) {
      try {
        const consent: ConsentData = JSON.parse(storedConsent)

        // Si la versión cambió, pedir consentimiento de nuevo
        if (consent.version !== CONSENT_VERSION) {
          setShowBanner(true)
          setTimeout(() => setIsVisible(true), 50) // Pequeño delay para la transición CSS
          return
        }

        // Si ya aceptó, cargar Analytics
        if (consent.status === 'accepted') {
          loadGoogleAnalytics()
        }
        // Si rechazó, no mostramos banner ni cargamos GA
        return
      } catch {
        // Si hay error parseando, mostrar banner
        setShowBanner(true)
        setTimeout(() => setIsVisible(true), 50) // Pequeño delay para la transición CSS
        return
      }
    }

    // No hay consentimiento guardado, mostrar banner
    setShowBanner(true)
    setTimeout(() => setIsVisible(true), 1500) // Mostrar después de un tiempo si no hay consentimiento
  }, [])

  const saveConsent = (status: ConsentStatus) => {
    const consentData: ConsentData = {
      status,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData))
  }

  const handleAccept = () => {
    saveConsent('accepted')
    loadGoogleAnalytics()
    setIsVisible(false)
    setTimeout(() => setShowBanner(false), 300)
  }

  const handleReject = () => {
    saveConsent('rejected')
    setIsVisible(false)
    setTimeout(() => setShowBanner(false), 300)
  }

  if (!showBanner) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-background/95 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-2xl p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Ícono y texto */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-primary-dark/10 flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-accent-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Usamos cookies</h3>
              </div>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Utilizamos cookies de análisis (Google Analytics) para entender cómo usás nuestro sitio y mejorar tu experiencia.
                <a
                  href="/privacidad"
                  className="text-accent-primary hover:underline ml-1"
                >
                  Política de privacidad
                </a>
              </p>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={handleReject}
                className="px-4 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground border border-foreground/20 hover:border-foreground/40 rounded-xl transition-all"
              >
                Rechazar
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 text-sm font-bold bg-gradient-to-r from-accent-primary to-accent-primary-dark text-white dark:text-gray-950 rounded-xl hover:scale-105 transition-transform shadow-lg shadow-accent-primary/20"
              >
                Aceptar cookies
              </button>
            </div>
          </div>

          {/* Badge de seguridad */}
          <div className="mt-3 pt-3 border-t border-foreground/5 flex items-center gap-2 text-xs text-foreground/50">
            <Shield className="w-3 h-3" />
            <span>Tu privacidad es importante. No vendemos ni compartimos tus datos personales.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente para gestionar preferencias (para agregar en footer o settings)
export function CookiePreferencesButton() {
  const handleOpenPreferences = () => {
    // Limpiar consentimiento para volver a mostrar el banner
    localStorage.removeItem(STORAGE_KEY)
    window.location.reload()
  }

  return (
    <button
      onClick={handleOpenPreferences}
      className="text-sm text-foreground/60 hover:text-foreground transition-colors"
    >
      Preferencias de cookies
    </button>
  )
}
