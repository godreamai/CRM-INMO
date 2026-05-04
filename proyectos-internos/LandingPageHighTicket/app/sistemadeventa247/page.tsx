import UrgencyBannerLanding from '@/components/UrgencyBannerLanding'
import HeroLanding from '@/components/sections/HeroLanding'
import PainPointsLanding from '@/components/sections/PainPointsLanding'
import TheSolution from '@/components/sections/TheSolution'
import SocialProof from '@/components/sections/SocialProof'
import Pricing from '@/components/sections/Pricing'
import AgendaForm from '@/components/sections/AgendaForm'
import FAQ from '@/components/sections/FAQ'
import FinalCTALanding from '@/components/sections/FinalCTALanding'
import Image from 'next/image'

export default function SistemaVenta247Page() {
  return (
    <main className="min-h-screen bg-background">
      <UrgencyBannerLanding />
      <HeroLanding />
      <PainPointsLanding />
      <TheSolution />
      <SocialProof />
      <Pricing />
      <section id="formulario" className="py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Agendá tu llamada{' '}
                <span className="text-gradient">gratis de 15 minutos</span>
              </h2>
              <p className="text-xl text-foreground/70">
                Descubrí cómo tu negocio puede vender 24/7 sin que levantes un dedo.
              </p>
            </div>
            <AgendaForm
              buttonText="Agendar llamada"
              showMicrocopy={true}
            />
          </div>
        </div>
      </section>
      <FAQ />
      <FinalCTALanding />

      {/* Footer simple con logo */}
      <footer className="py-8 border-t border-border/50 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Image
              src="/images/logos/gdai-blanco.svg"
              alt="Go Dream Ai"
              width={140}
              height={40}
              className="h-10 w-auto dark:block hidden"
            />
            <Image
              src="/images/logos/gdai-negro.svg"
              alt="Go Dream Ai"
              width={140}
              height={40}
              className="h-10 w-auto dark:hidden block"
            />
          </div>
        </div>
      </footer>
    </main>
  )
}

