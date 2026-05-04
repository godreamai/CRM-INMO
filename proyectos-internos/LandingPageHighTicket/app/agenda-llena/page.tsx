import UrgencyBannerLanding from '@/components/UrgencyBannerLanding'
import HeroLanding from '@/components/sections/HeroLanding'
import PainPointsLanding from '@/components/sections/PainPointsLanding'
import TheSolution from '@/components/sections/TheSolution'
import Pricing from '@/components/sections/Pricing'
import AgendaForm from '@/components/sections/AgendaForm'
import FAQ from '@/components/sections/FAQ'
import FinalCTALanding from '@/components/sections/FinalCTALanding'
import Image from 'next/image'

/**
 * Página de venta - Agenda Llena
 * 
 * Esta es la página que se muestra cuando la agenda está llena.
 * Accesible desde la ruta configurada en lib/routes.ts (por defecto: /agenda-llena)
 */
/* export default function AgendaLlenaPage() {
  return (
    <main className="min-h-screen bg-background">
      ... (contenido comentado)
    </main>
  )
} */

import { redirect } from 'next/navigation'

export default function AgendaLlenaPage() {
  redirect('https://calendly.com/candelappablo/30min')
}

