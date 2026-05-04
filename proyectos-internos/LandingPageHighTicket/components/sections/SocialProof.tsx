'use client'

import { Target, Zap, Shield, Sparkles } from 'lucide-react'

export default function SocialProof() {
    return (
        <section id="casos" className="py-32 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-lime-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-black/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight tracking-tighter text-black">
                            Sistemas que ya están <span className="text-black/30">corriendo solos</span>
                        </h2>
                        <p className="text-xl text-black/60 max-w-3xl mx-auto font-medium">
                            Empresas que pasaron de operar con fricción a tener infraestructura que escala.
                        </p>
                    </div>

                    <div className="space-y-16">
                        {/* BLOQUE 1 — Media Removal */}
                        <div className="relative">
                            <div className="absolute -top-4 left-8 z-20">
                                <span className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                    Caso real · Cliente activo
                                </span>
                            </div>

                            <div className="glass-card rounded-[3rem] p-8 md:p-12 border border-black/5 bg-white shadow-xl">
                                <div className="grid lg:grid-cols-2 gap-12 items-start">
                                    {/* Columna Izquierda (Contexto) */}
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-20 rounded-2xl bg-black flex items-center justify-center text-red-500 font-black text-2xl shadow-inner italic border border-white/10">
                                                MR
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-black text-black">Media Removal</h3>
                                                <div className="flex items-center gap-2 text-sm font-bold text-black/40 uppercase tracking-wider">
                                                    Sector: Gestión de Reputación Online
                                                </div>
                                                <div className="flex items-center gap-2 text-sm font-bold text-black/40 uppercase tracking-wider">
                                                    País: España 🇪🇸
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-lg text-black/70 font-medium border-l-2 border-lime-500 pl-6 italic">
                                            "Empresa especializada en proteger y limpiar la reputación digital de marcas"
                                        </p>

                                        <div className="pt-8 italic text-xl text-black/80 font-medium leading-relaxed bg-black/[0.02] p-8 rounded-3xl border border-black/5">
                                            "El sistema que construyeron nos permite ahorrar tiempo y recursos, ademas de escalar clientes y servicios sin tocar la arquitectura base."
                                            <span className="block mt-4 text-sm font-black uppercase tracking-widest text-black/30">— Media Removal</span>
                                        </div>
                                    </div>

                                    {/* Columna Derecha (El sistema) */}
                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="text-2xl font-black text-black mb-4">De scraping manual a sistema escalable</h4>
                                            <p className="text-black/60 font-medium leading-relaxed">
                                                Media Removal gestionaba sus procesos de monitorización de forma manual, con scraping no sistematizado y sin capacidad de adaptar su servicio a cada cliente. Diseñamos e implementamos un sistema operativo completo: CRM a medida con módulos adaptables por cliente, automatización del proceso de scraping, arquitectura que permite incorporar nuevas herramientas sin reescribir el sistema.
                                            </p>
                                        </div>

                                        <div className="grid sm:grid-cols-1 gap-4">
                                            <div className="flex items-center gap-4 p-5 rounded-2xl bg-black text-white">
                                                <Zap className="w-6 h-6 text-lime-400 flex-shrink-0" />
                                                <div>
                                                    <div className="font-black text-sm uppercase tracking-wider">Scraping automatizado</div>
                                                    <div className="text-white/50 text-xs font-bold uppercase">Proceso manual eliminado</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 p-5 rounded-2xl border border-black/5">
                                                <Target className="w-6 h-6 text-black flex-shrink-0" />
                                                <div>
                                                    <div className="font-black text-sm uppercase tracking-wider text-black">CRM adaptable</div>
                                                    <div className="text-black/30 text-xs font-bold uppercase">Un sistema por cliente, no por herramienta</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BLOQUE 2 — Caso NDA */}
                        <div className="relative">
                            <div className="absolute -top-4 left-8 z-20">
                                <span className="px-3 py-1 bg-gray-200 text-black/60 text-[10px] font-black uppercase tracking-widest rounded-full">
                                    Caso real · NDA activo
                                </span>
                            </div>

                            <div className="glass-card rounded-[3rem] p-8 md:p-12 border border-black/5 bg-black/[0.02]">
                                <div className="max-w-4xl mx-auto">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                                        <div>
                                            <h3 className="text-3xl font-black text-black mb-2 italic">Sector y nombre confidenciales</h3>
                                            <p className="text-black/40 font-bold uppercase tracking-widest text-xs">
                                                Por acuerdo de confidencialidad
                                            </p>
                                        </div>
                                        <div className="px-6 py-3 border border-black/10 rounded-2xl flex items-center gap-3">
                                            <Shield className="w-5 h-5 text-black/20" />
                                            <span className="text-xs font-black uppercase tracking-widest text-black/40 italic">Protección NDA</span>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <h4 className="text-3xl font-black text-black leading-[1.1]">
                                            Sistema de inteligencia operativa para empresa de servicios
                                        </h4>

                                        <p className="text-lg text-black/70 font-medium leading-relaxed">
                                            La empresa gestionaba sus datos operativos y de costes en herramientas dispersas, sin visibilidad centralizada ni capacidad de tomar decisiones basadas en evidencia. Diseñamos e implementamos un sistema completo: base de datos estructurada, automatización de reportes, y una aplicación web con login para que todo el equipo opere desde un único punto de control.
                                        </p>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {[
                                                'Datos operativos centralizados',
                                                'Reportes automáticos basados en evidencia',
                                                'App web con acceso por roles',
                                                'Procesos escalables sin rediseño'
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-black/5">
                                                    <div className="w-2 h-2 rounded-full bg-lime-500" />
                                                    <span className="text-sm font-bold text-black/80">{item}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <p className="text-[10px] text-black/30 font-bold uppercase tracking-[0.2em] text-center pt-8 border-t border-black/5">
                                            Los detalles del cliente están protegidos por NDA. Disponible para discutir el enfoque técnico y operativo en el diagnóstico.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
