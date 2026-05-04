'use client'

import React from 'react'
import ConversionForm from '@/components/sections/ConversionForm'
import { Check, X, Timer, Target, Briefcase } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

/* export default function AgendaPage() {
  return (
    <main className="min-h-screen bg-white text-black selection:bg-lime-400/30 overflow-x-hidden">
      ... (contenido comentado)
    </main>
  )
} */

import { redirect } from 'next/navigation'

export default function AgendaPage() {
  redirect('https://calendly.com/candelappablo/30min')
}
