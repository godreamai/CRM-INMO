'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { Check, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Globe, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ConversionFormProps {
    onSuccess?: () => void
}

const ROLES = [
    'CEO / Founder',
    'COO / Director de Operaciones',
    'Responsable de Operaciones',
    'Otro (especifica)'
]

const TEAM_SIZES = [
    '1-2 personas',
    '3-5 personas',
    '6-15 personas',
    'Más de 15'
]

const TOOLS = [
    { id: 'sheets', label: 'Google Sheets / Excel' },
    { id: 'crm', label: 'CRM (HubSpot, Pipedrive, etc.)' },
    { id: 'calendly', label: 'Calendly' },
    { id: 'notion', label: 'Notion / ClickUp' },
    { id: 'zapier', label: 'Zapier / Make' },
    { id: 'other', label: 'Otra' }
]

const TIME_SLOTS = ['10:00', '11:00', '12:00', '16:00', '17:00']

// Reusable Custom Dropdown Component
function CustomDropdown({
    label,
    options,
    value,
    onChange,
    isValid,
    placeholder = "Selecciona..."
}: {
    label: string,
    options: string[],
    value: string,
    onChange: (val: string) => void,
    isValid: boolean,
    placeholder?: string
}) {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="space-y-2 relative" ref={containerRef}>
            <label className="block text-[10px] font-black uppercase tracking-widest text-black/40">{label}</label>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full bg-black/[0.03] border rounded-xl px-4 py-3 text-left transition-all duration-300 flex items-center justify-between group",
                    isOpen ? "border-lime-500 ring-2 ring-lime-500/10 bg-white shadow-lg" : "border-black/5 hover:border-black/10",
                    isValid && !isOpen ? "border-lime-500/30" : ""
                )}
            >
                <span className={cn("font-bold text-sm", !value ? "text-black/30" : "text-black")}>
                    {value || placeholder}
                </span>
                <div className="flex items-center gap-2">
                    {isValid && <Check className="w-4 h-4 text-lime-500" />}
                    <ChevronDown className={cn("w-4 h-4 text-black/20 transition-transform duration-300", isOpen && "rotate-180 text-black")} />
                </div>
            </button>

            {isOpen && (
                <div className="absolute z-[100] top-full left-0 right-0 mt-2 bg-white border border-black/5 rounded-2xl shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-200">
                    <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                        {options.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => {
                                    onChange(option)
                                    setIsOpen(false)
                                }}
                                className={cn(
                                    "w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between group",
                                    value === option
                                        ? "bg-lime-400 text-black"
                                        : "text-black/60 hover:bg-black/[0.03] hover:text-black"
                                )}
                            >
                                {option}
                                {value === option && <Check className="w-4 h-4" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default function ConversionForm({ onSuccess }: ConversionFormProps) {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        rol: '',
        equipo: '',
        procesoManual: '',
        herramientas: [] as string[],
        otraHerramienta: '',
        presupuesto: 'si' as 'si' | 'no',
        fecha: null as Date | null,
        hora: ''
    })

    const [touched, setTouched] = useState<Record<string, boolean>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    // Calendar Logic
    const [currentMonth, setCurrentMonth] = useState(new Date())

    const daysInMonth = useMemo(() => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)

        const days = []
        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(null)
        }
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i))
        }
        return days
    }, [currentMonth])

    const validateField = (name: string, value: any) => {
        switch (name) {
            case 'nombre':
                return value.trim().length >= 3
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            case 'rol':
            case 'equipo':
                return value !== ''
            case 'procesoManual':
                return value.trim().length >= 10
            case 'herramientas':
                return value.length > 0
            case 'fecha':
                return value !== null
            case 'hora':
                return value !== ''
            default:
                return true
        }
    }

    const isFormValid = useMemo(() => {
        return (
            validateField('nombre', formData.nombre) &&
            validateField('email', formData.email) &&
            validateField('rol', formData.rol) &&
            validateField('equipo', formData.equipo) &&
            validateField('procesoManual', formData.procesoManual) &&
            validateField('herramientas', formData.herramientas) &&
            validateField('fecha', formData.fecha) &&
            validateField('hora', formData.hora)
        )
    }, [formData])

    const getInputClass = (name: string, value: any) => {
        const base = "w-full bg-black/[0.03] border rounded-xl px-4 py-3 text-black placeholder:text-black/30 focus:outline-none transition-all duration-300 font-medium"
        if (!touched[name]) return cn(base, "border-black/5 focus:ring-2 focus:ring-lime-500/20")
        return validateField(name, value)
            ? cn(base, "border-lime-500/30 focus:ring-2 focus:ring-lime-500/10")
            : cn(base, "border-red-500/30 focus:ring-2 focus:ring-red-500/10")
    }

    const handleToolToggle = (id: string) => {
        setTouched(prev => ({ ...prev, herramientas: true }))
        setFormData(prev => ({
            ...prev,
            herramientas: prev.herramientas.includes(id)
                ? prev.herramientas.filter(t => t !== id)
                : [...prev.herramientas, id]
        }))
    }

    const isDayAvailable = (date: Date | null) => {
        if (!date) return false
        const day = date.getDay()
        return day >= 1 && day <= 5 && date >= new Date(new Date().setHours(0, 0, 0, 0))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isFormValid) return

        setIsSubmitting(true)

        try {
            const webhookUrl = 'https://godreamai.app.n8n.cloud/webhook-test/e71fb924-3d7c-4c47-9d93-2ecede413411'

            const payload = {
                ...formData,
                fecha: formData.fecha?.toISOString().split('T')[0],
                timestamp: new Date().toISOString(),
                source: typeof window !== 'undefined' ? window.location.pathname : 'conversion-form'
            }

            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            setIsSuccess(true)
            if (onSuccess) onSuccess()
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="glass-card bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl text-center space-y-6 animate-in fade-in zoom-in duration-500 border border-black/5">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-lime-400 text-black mb-4 animate-bounce">
                    <Check className="w-12 h-12 stroke-[3]" />
                </div>
                <h2 className="text-3xl font-black text-black tracking-tight italic">¡Diagnóstico confirmado!</h2>
                <p className="text-black/60 text-lg leading-relaxed max-w-sm mx-auto">
                    Te hemos enviado un email de confirmación con los detalles. Nos vemos el <span className="text-black font-bold">{formData.fecha?.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}</span> a las <span className="text-black font-bold">{formData.hora}</span>.
                </p>
                <div className="pt-6">
                    <a
                        href="/"
                        className="inline-block w-full bg-black text-white font-bold py-4 px-8 rounded-2xl transition-all hover:bg-black/90 shadow-xl shadow-black/10"
                    >
                        Volver al inicio
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="glass-card bg-white p-6 md:p-8 rounded-[2.5rem] shadow-2xl overflow-hidden text-black border border-black/5">
                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-black mb-2 tracking-tight">Reserva tu diagnóstico</h2>
                    <p className="text-black/40 text-sm">Rellena el formulario y elige tu horario.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Section: Basic Info */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Nombre completo</label>
                            <input
                                type="text"
                                required
                                placeholder="Tu nombre"
                                className={getInputClass('nombre', formData.nombre)}
                                value={formData.nombre}
                                onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                                onBlur={() => setTouched({ ...touched, nombre: true })}
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Email de empresa</label>
                            <input
                                type="email"
                                required
                                placeholder="tu@empresa.com"
                                className={getInputClass('email', formData.email)}
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                onBlur={() => setTouched({ ...touched, email: true })}
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <CustomDropdown
                            label="¿Cuál es tu rol?"
                            options={ROLES}
                            value={formData.rol}
                            onChange={(val) => {
                                setFormData({ ...formData, rol: val })
                                setTouched({ ...touched, rol: true })
                            }}
                            isValid={validateField('rol', formData.rol)}
                        />

                        <CustomDropdown
                            label="Tamaño del equipo"
                            options={TEAM_SIZES}
                            value={formData.equipo}
                            onChange={(val) => {
                                setFormData({ ...formData, equipo: val })
                                setTouched({ ...touched, equipo: true })
                            }}
                            isValid={validateField('equipo', formData.equipo)}
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">¿Qué proceso manual te cuesta más hoy?</label>
                        <textarea
                            required
                            rows={3}
                            placeholder="Ej: generación de reportes, gestión de pedidos, seguimiento de clientes en Sheets..."
                            className={cn(
                                "resize-none",
                                getInputClass('procesoManual', formData.procesoManual)
                            )}
                            value={formData.procesoManual}
                            onChange={e => setFormData({ ...formData, procesoManual: e.target.value })}
                            onBlur={() => setTouched({ ...touched, procesoManual: true })}
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">¿Qué herramientas usas actualmente?</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {TOOLS.map(tool => (
                                <button
                                    key={tool.id}
                                    type="button"
                                    onClick={() => handleToolToggle(tool.id)}
                                    className={cn(
                                        "px-3 py-3 rounded-xl border text-[11px] font-bold text-center transition-all duration-300",
                                        formData.herramientas.includes(tool.id)
                                            ? "bg-lime-400 border-lime-400 text-black shadow-lg shadow-lime-400/20 scale-[0.98]"
                                            : "bg-black/[0.03] border-black/5 text-black/40 hover:border-black/10 hover:bg-black/[0.05]"
                                    )}
                                >
                                    {tool.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">¿Tienes presupuesto aprobado?</label>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, presupuesto: 'si' })}
                                className={cn(
                                    "flex-1 py-3 rounded-xl border font-bold text-sm transition-all duration-300",
                                    formData.presupuesto === 'si'
                                        ? "bg-black border-black text-white shadow-lg shadow-black/10"
                                        : "bg-black/[0.03] border-black/5 text-black/40 hover:bg-black/[0.05]"
                                )}
                            >
                                Sí, tenemos presupuesto
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, presupuesto: 'no' })}
                                className={cn(
                                    "flex-1 py-3 rounded-xl border font-bold text-sm transition-all duration-300",
                                    formData.presupuesto === 'no'
                                        ? "bg-black border-black text-white shadow-lg shadow-black/10"
                                        : "bg-black/[0.03] border-black/5 text-black/40 hover:bg-black/[0.05]"
                                )}
                            >
                                Aún no está aprobado
                            </button>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-black/5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold flex items-center gap-2 italic">
                                <CalendarIcon className="w-4 h-4 text-lime-500" />
                                Elige tu horario
                            </h3>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                    className="p-2 rounded-lg bg-black/[0.03] hover:bg-black/[0.05] transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="text-[10px] font-black uppercase tracking-widest min-w-[100px] text-center">
                                    {currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                    className="p-2 rounded-lg bg-black/[0.03] hover:bg-black/[0.05] transition-colors"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-1 mb-6">
                            {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d, i) => (
                                <div key={i} className="text-[10px] font-black text-black/20 text-center py-2">
                                    {d}
                                </div>
                            ))}
                            {daysInMonth.map((date, i) => {
                                const isAvailable = isDayAvailable(date)
                                const isSelected = formData.fecha?.toDateString() === date?.toDateString()

                                return (
                                    <button
                                        key={i}
                                        type="button"
                                        disabled={!isAvailable}
                                        onClick={() => {
                                            if (date) {
                                                setFormData({ ...formData, fecha: date })
                                                setTouched({ ...touched, fecha: true })
                                            }
                                        }}
                                        className={cn(
                                            "aspect-square rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-center relative",
                                            !date && "opacity-0 pointer-events-none",
                                            date && !isAvailable && "text-black/10 cursor-not-allowed",
                                            date && isAvailable && !isSelected && "text-black hover:bg-black/5",
                                            isSelected && "bg-lime-400 text-black shadow-xl shadow-lime-400/30 scale-110 z-10 border border-black/5"
                                        )}
                                    >
                                        {date?.getDate()}
                                    </button>
                                )
                            })}
                        </div>

                        {formData.fecha && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
                                <div className="flex flex-wrap gap-2">
                                    {TIME_SLOTS.map(slot => (
                                        <button
                                            key={slot}
                                            type="button"
                                            onClick={() => {
                                                setFormData({ ...formData, hora: slot })
                                                setTouched({ ...touched, hora: true })
                                            }}
                                            className={cn(
                                                "px-4 py-2 rounded-xl border text-sm font-bold transition-all duration-300",
                                                formData.hora === slot
                                                    ? "bg-lime-400 border-lime-400 text-black shadow-xl shadow-lime-400/20"
                                                    : "bg-black/[0.03] border-black/5 text-black/40 hover:border-black/10"
                                            )}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-black/40">
                                    <Globe className="w-3 h-3" />
                                    <span>Zona horaria: Europe/Madrid — puedes cambiarla</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={!isFormValid || isSubmitting}
                            className={cn(
                                "w-full font-black py-5 rounded-2xl text-lg transition-all duration-700 flex items-center justify-center gap-3 relative overflow-hidden group",
                                isFormValid
                                    ? "bg-black hover:bg-black/80 text-white shadow-2xl shadow-black/20 scale-[1.01]"
                                    : "bg-black/10 text-black/20 cursor-not-allowed"
                            )}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                                    <span className="animate-pulse">Confirmando...</span>
                                </div>
                            ) : (
                                <>
                                    <span>Confirmar Diagnóstico Operativo →</span>
                                </>
                            )}
                        </button>
                        <p className="mt-4 text-center text-[10px] text-black/30 font-bold uppercase tracking-widest">
                            Sin compromiso. Si no hay fit, te lo digo en la primera llamada.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
