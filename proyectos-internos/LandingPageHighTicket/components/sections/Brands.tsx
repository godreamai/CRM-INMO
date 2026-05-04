'use client'

// Usaremos herramientas de integración y productividad
const technologies = [
  'Google Sheets',
  'HubSpot',
  'Calendly',
  'Make',
  'n8n',
  'Supabase',
  'PostgreSQL',
  'Airtable',
  'Slack',
  'Google Cloud',
  'Zapier',
  'Notion',
  'Pipedrive',
  'REST APIs',
]

const metrics = [
  { value: 'Alcance cerrado', label: 'Sin scope creep' },
  { value: '10–14 días', label: 'Resultado tangible garantizado' },
  { value: '30 días', label: 'Soporte post-deploy incluido' },
]

export default function Brands() {
  // Duplicar para efecto infinito
  const duplicatedTech = [...technologies, ...technologies, ...technologies]

  return (
    <section className="py-20 relative bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-black mb-4 tracking-tight">
            Nos integramos con tu stack actual. <span className="text-black/30">Sin cambiar todo desde cero.</span>
          </h2>
          <p className="text-black/40 text-sm md:text-base font-medium max-w-2xl mx-auto">
            Trabajamos con las herramientas que ya usás. Las conectamos, estructuramos y automatizamos.
          </p>
        </div>

        <div className="relative w-full overflow-hidden mb-8">
          {/* Subtle Grains or Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="flex items-center gap-24 py-4 animate-scroll-sidebar">
            {duplicatedTech.map((tech, index) => (
              <div
                key={`${tech}-${index}`}
                className="flex-shrink-0 text-black/15 hover:text-black/80 transition-all duration-700 text-3xl md:text-4xl font-black tracking-tighter whitespace-nowrap select-none italic"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-20">
          <p className="text-[11px] font-black text-black/20 uppercase tracking-[0.2em]">
            Si tu empresa ya usa alguna de estas herramientas, probablemente podamos conectarlas en el Sprint sin reemplazar nada.
          </p>
        </div>

        {/* Global Metrics - Qualitative */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-black/5 pt-16">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <span className="text-2xl md:text-3xl font-black text-black mb-2 tracking-tighter">
                {metric.value}
              </span>
              <span className="text-[10px] font-black text-black/30 uppercase tracking-widest">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-sidebar {
          display: flex;
          width: fit-content;
          animation: scroll 40s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-scroll-sidebar {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}
