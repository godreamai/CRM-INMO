'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// Cargar el Chatbot de forma diferida después de que la página esté lista
const Chatbot = dynamic(() => import('./Chatbot'), {
  ssr: false,
  loading: () => null,
})

export default function ChatbotWrapper() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Cargar el chatbot después de que la página esté completamente interactiva
    // Usar requestIdleCallback para no bloquear el hilo principal
    const loadChatbot = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => setShouldLoad(true), { timeout: 3000 })
      } else {
        setTimeout(() => setShouldLoad(true), 2000)
      }
    }

    // Esperar a que el documento esté listo
    if (document.readyState === 'complete') {
      loadChatbot()
    } else {
      window.addEventListener('load', loadChatbot)
      return () => window.removeEventListener('load', loadChatbot)
    }
  }, [])

  if (!shouldLoad) return null

  return <Chatbot />
}
