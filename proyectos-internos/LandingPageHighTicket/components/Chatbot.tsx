'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import Image from 'next/image'

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

// Seleccionar la URL del webhook según el entorno
const getWebhookUrl = () => {
  if (process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL_PRODUCTION) {
    if (process.env.NODE_ENV === 'production') {
      return process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL_PRODUCTION
    }
  }

  if (process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL_DEV && process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL_DEV
  }

  if (process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL) {
    return process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
  }

  if (process.env.NODE_ENV === 'production') {
    return 'https://n8n.srv1150223.hstgr.cloud/webhook/06cef041-60fe-48a6-a2f0-d34d1899b6dc'
  }

  return 'https://n8n.srv1150223.hstgr.cloud/webhook-test/06cef041-60fe-48a6-a2f0-d34d1899b6dc'
}

const N8N_WEBHOOK_URL = getWebhookUrl()

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! 👋 Soy el asistente de Go Dream Ai. ¿Querés saber cómo podemos automatizar tus ventas?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: currentInput,
        }),
      })

      if (!response.ok) {
        throw new Error('Error al obtener respuesta del servidor')
      }

      const data = await response.json()

      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.msg || 'Lo siento, no pude procesar tu mensaje.',
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden hover:shadow-accent-primary/50 transition-all hover:scale-110 active:scale-95 bg-gradient-to-br from-accent-primary to-accent-primary-dark"
        aria-label="Abrir chat"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Image
              src="/images/logos/icon-app.png"
              alt="Chat con Go Dream Ai"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </button>

      {/* Interfaz del chat */}
      <div
        className={`fixed inset-4 md:inset-auto md:bottom-24 md:right-6 z-50 w-auto md:w-96 h-[calc(100vh-2rem)] md:h-[600px] max-h-[600px] bg-background border border-foreground/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl transition-all duration-300 ${isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-4 opacity-0 pointer-events-none'
          }`}
      >
        {/* Header */}
        <div className="px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-accent-primary/10 to-accent-primary-dark/5 border-b border-foreground/10 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/logos/icon-app.png"
                alt="Go Dream Ai"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base text-foreground">Go Dream Ai</h3>
              <p className="text-xs text-accent-primary">🟢 En línea</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1 hover:bg-foreground/5 rounded-lg transition-colors"
            aria-label="Cerrar chat"
          >
            <X className="w-5 h-5 text-foreground/60" />
          </button>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 min-h-0">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.isUser
                    ? 'bg-gradient-to-r from-accent-primary to-accent-primary-dark text-white rounded-br-sm'
                    : 'bg-foreground/5 text-foreground rounded-bl-sm'
                  }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-1 ${message.isUser ? 'text-white/70' : 'text-foreground/40'}`}>
                  {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-foreground/5 text-foreground rounded-bl-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-xs text-foreground/60">Escribiendo...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 md:p-4 border-t border-foreground/10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-3 md:px-4 py-2 md:py-3 bg-foreground/5 border border-foreground/10 rounded-xl text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-accent-primary to-accent-primary-dark flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0 hover:scale-105 active:scale-95"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}


