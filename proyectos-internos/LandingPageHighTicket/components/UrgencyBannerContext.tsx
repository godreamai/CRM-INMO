'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface UrgencyBannerContextType {
  isBannerVisible: boolean
  setIsBannerVisible: (visible: boolean) => void
}

const UrgencyBannerContext = createContext<UrgencyBannerContextType | undefined>(undefined)

export function UrgencyBannerProvider({ children }: { children: ReactNode }) {
  const [isBannerVisible, setIsBannerVisible] = useState(false)

  return (
    <UrgencyBannerContext.Provider value={{ isBannerVisible, setIsBannerVisible }}>
      {children}
    </UrgencyBannerContext.Provider>
  )
}

export function useUrgencyBanner() {
  const context = useContext(UrgencyBannerContext)
  if (context === undefined) {
    throw new Error('useUrgencyBanner must be used within an UrgencyBannerProvider')
  }
  return context
}

