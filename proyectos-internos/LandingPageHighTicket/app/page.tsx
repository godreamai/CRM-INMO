import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('@/components/sections/Hero'))
const PainPoints = dynamic(() => import('@/components/sections/PainPoints'))
const Transformation = dynamic(() => import('@/components/sections/Transformation'))
const WhatWeDo = dynamic(() => import('@/components/sections/WhatWeDo'))
const SocialProof = dynamic(() => import('@/components/sections/SocialProof'))
const Services = dynamic(() => import('@/components/sections/Services'))
const FAQ = dynamic(() => import('@/components/sections/FAQ'))
const FinalCTA = dynamic(() => import('@/components/sections/FinalCTA'))

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <PainPoints />
      <Transformation />
      <WhatWeDo />
      <SocialProof />
      <Services />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
