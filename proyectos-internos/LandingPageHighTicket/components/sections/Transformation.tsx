'use client'

import { XCircle, CheckCircle2 } from 'lucide-react'

const comparison = [
    {
        before: 'Lead llega de Zonaprop a las 9pm. Nadie lo ve hasta el día siguiente.',
        after: 'Respuesta automática en menos de 5 minutos. A cualquier hora.',
    },
    {
        before: 'Cada agente usa su WhatsApp personal. Sin control ni trazabilidad.',
        after: 'Asignación automática al agente disponible. Todo registrado en el sistema.',
    },
    {
        before: 'Mails de portales sin respuesta. Lead se enfría y cierra con la competencia.',
        after: 'Bot de correo responde y hace seguimiento automático hasta que el lead reacciona.',
    },
    {
        before: 'No sabés cuántos leads perdiste ni por qué.',
        after: 'Cada lead visible desde el primer contacto hasta el cierre.',
    },
]

export default function Transformation() {
    return (
        <section className="py-24 relative bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/[0.03] rounded-full text-[10px] font-black tracking-widest text-black/40 uppercase mb-6">
                        El Impacto Real
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight">
                        De perder leads a <span className="text-lime-500">no perder ninguno</span>
                    </h2>
                    <p className="text-black/60 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                        No es magia. Es un sistema que responde cuando vos no podés, registra todo y le da a tu equipo el contexto que necesita para cerrar.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/[0.05] border border-black/[0.05] rounded-[2rem] overflow-hidden shadow-2xl">
                        {/* Header Columnas */}
                        <div className="bg-white/50 p-6 text-center border-b border-black/[0.05] md:border-b-0 md:border-r">
                            <span className="text-xs font-black uppercase tracking-widest text-black/40">Antes: Caos Manual</span>
                        </div>
                        <div className="bg-white/50 p-6 text-center">
                            <span className="text-xs font-black uppercase tracking-widest text-lime-600">Después: Go Dream AI</span>
                        </div>

                        {/* Filas de Comparación */}
                        {comparison.map((item, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-2 col-span-1 md:col-span-2 group">
                                {/* Lado Antes */}
                                <div className="bg-white p-8 md:p-10 border-b md:border-r border-black/[0.05] group-hover:bg-black/[0.01] transition-colors">
                                    <div className="flex gap-4">
                                        <XCircle className="w-6 h-6 text-black/20 flex-shrink-0" />
                                        <p className="text-black/50 font-medium leading-relaxed italic">{item.before}</p>
                                    </div>
                                </div>
                                {/* Lado Después */}
                                <div className="bg-white p-8 md:p-10 group-hover:bg-lime-400/[0.02] transition-colors">
                                    <div className="flex gap-4">
                                        <CheckCircle2 className="w-6 h-6 text-lime-500 flex-shrink-0" />
                                        <p className="text-black font-bold leading-relaxed">{item.after}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <div className="inline-flex items-center gap-6 text-sm font-black uppercase tracking-[0.2em] text-black/30">
                            <div className="h-[1px] w-12 bg-black/10" />
                            El sistema trabaja. Vos cerrás operaciones.
                            <div className="h-[1px] w-12 bg-black/10" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
