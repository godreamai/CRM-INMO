'use client'

import { useState, useRef, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { CheckCircle2, ChevronDown, Check, Calendar } from 'lucide-react'

interface FormData {
  nombre: string
  email: string
  telefono: string
  tipoNegocio: string
  principalObstaculo: string
  urgencia: string
  honeypot: string
}

interface FormErrors {
  nombre?: string
  email?: string
  telefono?: string
  tipoNegocio?: string
  principalObstaculo?: string
  urgencia?: string
}

interface AgendaFormProps {
  buttonText?: string
  showMicrocopy?: boolean
}

const TIPOS_NEGOCIO = [
  { value: 'inmobiliaria', label: 'Inmobiliaria' },
  { value: 'clinica', label: 'Clínica / Consultorio' },
  { value: 'coaching', label: 'Coaching / Formación' },
  { value: 'estetica', label: 'Estética / Belleza' },
  { value: 'otro', label: 'Otro' },
]

const OBSTACULOS = [
  { value: 'no-respondo-rapido', label: 'Pierdo clientes por no responder rápido' },
  { value: 'no-capto-leads', label: 'No sé cómo captar leads en internet' },
  { value: 'competencia', label: 'Mi competencia me saca clientes' },
  { value: 'otro', label: 'Otro (consulta general)' },
]

const URGENCIAS = [
  { value: 'hot', label: 'Necesito solucionarlo ESTA SEMANA', badge: 'URGENTE' },
  { value: 'warm', label: 'Quiero antes de fin de año', badge: 'MODERADO' },
  { value: 'cold', label: 'Estoy explorando opciones', badge: 'EXPLORANDO' },
]

// Helper para obtener el label de una opción
const getLabel = (value: string, options: Array<{ value: string; label: string }>) => {
  return options.find(opt => opt.value === value)?.label || 'Selecciona una opción'
}

// Función para obtener la URL del webhook de n8n para formularios
const getFormWebhookUrl = () => {
  if (process.env.NEXT_PUBLIC_N8N_WEBHOOK_FORM_PRODUCTION) {
    if (process.env.NODE_ENV === 'production') {
      return process.env.NEXT_PUBLIC_N8N_WEBHOOK_FORM_PRODUCTION
    }
  }

  if (process.env.NEXT_PUBLIC_N8N_WEBHOOK_FORM_DEV && process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_N8N_WEBHOOK_FORM_DEV
  }

  if (process.env.NEXT_PUBLIC_N8N_WEBHOOK_FORM) {
    return process.env.NEXT_PUBLIC_N8N_WEBHOOK_FORM
  }

  if (process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL_PRODUCTION && process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL_PRODUCTION
  }

  if (process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL_DEV && process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL_DEV
  }

  if (process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL) {
    return process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
  }

  console.warn('No se encontró webhook configurado para formularios. Usando webhook por defecto.')
  return 'https://godreamai.app.n8n.cloud/webhook-test/e71fb924-3d7c-4c47-9d93-2ecede413411'
}

export default function AgendaForm({ buttonText = 'Agendar mi demo gratis', showMicrocopy = true }: AgendaFormProps = {}) {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    tipoNegocio: '',
    principalObstaculo: '',
    urgencia: '',
    honeypot: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [dropdownsOpen, setDropdownsOpen] = useState({
    tipoNegocio: false,
    principalObstaculo: false,
    urgencia: false,
  })

  const dropdownRefs = {
    tipoNegocio: useRef<HTMLDivElement>(null),
    principalObstaculo: useRef<HTMLDivElement>(null),
    urgencia: useRef<HTMLDivElement>(null),
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.entries(dropdownRefs).forEach(([key, ref]) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setDropdownsOpen(prev => ({ ...prev, [key]: false }))
        }
      })
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres'
    } else if (formData.nombre.length > 100) {
      newErrors.nombre = 'El nombre no puede exceder 100 caracteres'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El correo no es válido'
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido'
    } else {
      const digitsOnly = formData.telefono.replace(/\D/g, '')
      if (digitsOnly.length < 7) {
        newErrors.telefono = 'El teléfono debe tener al menos 7 dígitos'
      }
    }

    if (!formData.tipoNegocio) {
      newErrors.tipoNegocio = 'Selecciona un tipo de negocio'
    }

    if (!formData.principalObstaculo) {
      newErrors.principalObstaculo = 'Selecciona tu principal obstáculo'
    }

    if (!formData.urgencia) {
      newErrors.urgencia = 'Selecciona el nivel de urgencia'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.honeypot) return

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const webhookUrl = getFormWebhookUrl()
      if (!webhookUrl) throw new Error('Webhook URL no configurada')

      const payload = {
        nombre: formData.nombre.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim(),
        tipoNegocio: formData.tipoNegocio,
        principalObstaculo: formData.principalObstaculo,
        urgencia: formData.urgencia,
        timestamp: new Date().toISOString(),
        source: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
      }

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      setIsSuccess(true)
      setTimeout(() => {
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          tipoNegocio: '',
          principalObstaculo: '',
          urgencia: '',
          honeypot: '',
        })
        setIsSuccess(false)
      }, 3000)
    } catch (error) {
      console.error('Error al enviar el formulario:', error)
      alert('Hubo un error al enviar el formulario. Por favor, intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field !== 'honeypot' && errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field as keyof FormErrors]: undefined }))
    }
  }

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.startsWith('54')) {
      const rest = numbers.slice(2)
      if (rest.length > 0) {
        return `+54 9 ${rest.slice(0, 2)} ${rest.slice(2, 6)}-${rest.slice(6, 10)}`.trim().replace(/-$/, '')
      }
      return '+54 9'
    }
    if (numbers.length > 0) {
      return `+54 9 ${numbers.slice(0, 2)} ${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`.trim().replace(/-$/, '')
    }
    return '+54 9 '
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    handleChange('telefono', formatted)
  }

  const toggleDropdown = (key: keyof typeof dropdownsOpen) => {
    setDropdownsOpen(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const selectOption = (key: 'tipoNegocio' | 'principalObstaculo' | 'urgencia', value: string) => {
    handleChange(key, value)
    setDropdownsOpen(prev => ({ ...prev, [key]: false }))
  }

  return (
    <div className="w-full">
      <div className="p-6 md:p-8">
        {isSuccess ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-lime-400 to-lime-600 mb-6">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">¡Gracias por contactarnos!</h3>
            <p className="text-foreground/70">
              Te contactaremos en menos de 2 horas.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label htmlFor="nombre" className="block text-xs font-black uppercase tracking-widest text-black/40">
                Nombre completo
              </label>
              <InputText
                id="nombre"
                value={formData.nombre}
                onChange={(e) => handleChange('nombre', e.target.value)}
                placeholder="Ej. Juan Pérez"
                className={`w-full !rounded-xl !p-4 !bg-black/[0.03] !border-none !text-black placeholder:text-black/20 font-medium ${errors.nombre ? 'p-invalid' : ''}`}
              />
              {errors.nombre && (
                <small className="text-red-500 text-[10px] font-bold uppercase">{errors.nombre}</small>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-black/40">
                Correo corporativo
              </label>
              <InputText
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="tu@empresa.com"
                className={`w-full !rounded-xl !p-4 !bg-black/[0.03] !border-none !text-black placeholder:text-black/20 font-medium ${errors.email ? 'p-invalid' : ''}`}
              />
              {errors.email && (
                <small className="text-red-500 text-[10px] font-bold uppercase">{errors.email}</small>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="telefono" className="block text-xs font-black uppercase tracking-widest text-black/40">
                WhatsApp de contacto
              </label>
              <InputText
                id="telefono"
                value={formData.telefono}
                onChange={handlePhoneChange}
                placeholder="+54 9 [...]"
                className={`w-full !rounded-xl !p-4 !bg-black/[0.03] !border-none !text-black placeholder:text-black/20 font-medium ${errors.telefono ? 'p-invalid' : ''}`}
              />
              {errors.telefono && (
                <small className="text-red-500 text-[10px] font-bold uppercase">{errors.telefono}</small>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase tracking-widest text-black/40">
                Tipo de negocio
              </label>
              <div ref={dropdownRefs.tipoNegocio} className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown('tipoNegocio')}
                  className={`w-full p-4 pr-12 rounded-xl bg-black/[0.03] border transition-all duration-200 text-left ${errors.tipoNegocio
                    ? 'border-red-500'
                    : dropdownsOpen.tipoNegocio
                      ? 'border-black ring-2 ring-black/5'
                      : 'border-transparent hover:bg-black/[0.05]'
                    }`}
                >
                  <span className={`font-medium ${formData.tipoNegocio ? 'text-black' : 'text-black/20'}`}>
                    {formData.tipoNegocio ? getLabel(formData.tipoNegocio, TIPOS_NEGOCIO) : 'Selecciona una categoría...'}
                  </span>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${dropdownsOpen.tipoNegocio
                      ? 'bg-black text-white rotate-180'
                      : 'bg-black/5 text-black'
                      }`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </div>
                </button>
                <div className={`absolute z-50 w-full mt-2 bg-white rounded-2xl border border-black/5 shadow-2xl overflow-hidden transition-all duration-200 ${dropdownsOpen.tipoNegocio ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                  {TIPOS_NEGOCIO.map((tipo) => (
                    <button
                      key={tipo.value}
                      type="button"
                      onClick={() => selectOption('tipoNegocio', tipo.value)}
                      className={`w-full p-4 flex items-center gap-3 text-left transition-all duration-150 ${formData.tipoNegocio === tipo.value
                        ? 'bg-black text-white'
                        : 'hover:bg-black/5 text-black'
                        }`}
                    >
                      <span className="flex-1 font-bold text-sm tracking-tight">{tipo.label}</span>
                      {formData.tipoNegocio === tipo.value && (
                        <Check className="w-4 h-4 text-lime-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              {errors.tipoNegocio && (
                <small className="text-red-500 text-[10px] font-bold uppercase">{errors.tipoNegocio}</small>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase tracking-widest text-black/40">
                Principal Obstáculo
              </label>
              <div ref={dropdownRefs.principalObstaculo} className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown('principalObstaculo')}
                  className={`w-full p-4 pr-12 rounded-xl bg-black/[0.03] border transition-all duration-200 text-left ${errors.principalObstaculo
                    ? 'border-red-500'
                    : dropdownsOpen.principalObstaculo
                      ? 'border-black ring-2 ring-black/5'
                      : 'border-transparent hover:bg-black/[0.05]'
                    }`}
                >
                  <span className={`font-medium ${formData.principalObstaculo ? 'text-black' : 'text-black/20'}`}>
                    {formData.principalObstaculo ? getLabel(formData.principalObstaculo, OBSTACULOS) : '¿Qué te frena hoy?'}
                  </span>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${dropdownsOpen.principalObstaculo
                      ? 'bg-black text-white rotate-180'
                      : 'bg-black/5 text-black'
                      }`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </div>
                </button>
                <div className={`absolute z-50 w-full mt-2 bg-white rounded-2xl border border-black/5 shadow-2xl overflow-hidden transition-all duration-200 ${dropdownsOpen.principalObstaculo ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                  {OBSTACULOS.map((obstaculo) => (
                    <button
                      key={obstaculo.value}
                      type="button"
                      onClick={() => selectOption('principalObstaculo', obstaculo.value)}
                      className={`w-full p-4 flex items-center gap-3 text-left transition-all duration-150 ${formData.principalObstaculo === obstaculo.value
                        ? 'bg-black text-white'
                        : 'hover:bg-black/5 text-black'
                        }`}
                    >
                      <span className="flex-1 font-bold text-sm tracking-tight">{obstaculo.label}</span>
                      {formData.principalObstaculo === obstaculo.value && (
                        <Check className="w-4 h-4 text-lime-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              {errors.principalObstaculo && (
                <small className="text-red-500 text-[10px] font-bold uppercase">{errors.principalObstaculo}</small>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase tracking-widest text-black/40">
                Nivel de Prioridad
              </label>
              <div ref={dropdownRefs.urgencia} className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown('urgencia')}
                  className={`w-full p-4 pr-12 rounded-xl bg-black/[0.03] border transition-all duration-200 text-left ${errors.urgencia
                    ? 'border-red-500'
                    : dropdownsOpen.urgencia
                      ? 'border-black ring-2 ring-black/5'
                      : 'border-transparent hover:bg-black/[0.05]'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-medium flex-1 ${formData.urgencia ? 'text-black' : 'text-black/20'}`}>
                      {formData.urgencia ? getLabel(formData.urgencia, URGENCIAS) : '¿Qué tan pronto quieres empezar?'}
                    </span>
                    {formData.urgencia && (
                      <span className={`px-2 py-1 rounded text-xs font-bold ${formData.urgencia === 'hot' ? 'bg-red-500 text-white' :
                        formData.urgencia === 'warm' ? 'bg-orange-500 text-white' :
                          'bg-blue-500 text-white'
                        }`}>
                        {URGENCIAS.find(u => u.value === formData.urgencia)?.badge}
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${dropdownsOpen.urgencia
                      ? 'bg-black text-white rotate-180'
                      : 'bg-black/5 text-black'
                      }`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </div>
                </button>
                <div className={`absolute z-50 w-full mt-2 bg-white rounded-2xl border border-black/5 shadow-2xl overflow-hidden transition-all duration-200 ${dropdownsOpen.urgencia ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                  {URGENCIAS.map((urgencia) => (
                    <button
                      key={urgencia.value}
                      type="button"
                      onClick={() => selectOption('urgencia', urgencia.value)}
                      className={`w-full p-4 flex items-center gap-3 text-left transition-all duration-150 ${formData.urgencia === urgencia.value
                        ? 'bg-black text-white'
                        : 'hover:bg-black/5 text-black'
                        }`}
                    >
                      <span className="flex-1 font-bold text-sm tracking-tight">{urgencia.label}</span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black tracking-widest uppercase ${urgencia.value === 'hot' ? 'bg-red-500 text-white' :
                        urgencia.value === 'warm' ? 'bg-orange-500 text-white' :
                          'bg-black/10 text-black/40'
                        }`}>
                        {urgencia.badge}
                      </span>
                      {formData.urgencia === urgencia.value && (
                        <Check className="w-4 h-4 text-lime-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              {errors.urgencia && (
                <small className="text-red-500 text-[10px] font-bold uppercase">{errors.urgencia}</small>
              )}
            </div>

            <input
              type="text"
              name="website"
              value={formData.honeypot}
              onChange={(e) => handleChange('honeypot', e.target.value)}
              style={{
                position: 'absolute',
                left: '-9999px',
                opacity: 0,
                pointerEvents: 'none',
              }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="space-y-4 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-lime-400 text-black font-black py-5 rounded-2xl text-lg transition-all hover:bg-lime-500 shadow-xl shadow-lime-500/20 flex items-center justify-center gap-3 group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="inline-block w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    {buttonText}
                  </>
                )}
              </button>
              {showMicrocopy && (
                <p className="text-center text-[10px] font-black uppercase tracking-widest text-black/30 flex items-center justify-center gap-2">
                  <span className="text-lime-500">✓</span>
                  Respuesta en menos de 2 horas
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
