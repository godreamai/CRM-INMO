import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './primereact-theme.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { UrgencyBannerProvider } from '@/components/UrgencyBannerContext'
import VisualEffects from '@/components/VisualEffects'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import CookieConsent from '@/components/CookieConsent'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://godreamai.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Go Dream Ai — Arquitectura Operativa y Automatización Escalable',
    template: '%s | Go Dream Ai',
  },
  description: 'Diseñamos la arquitectura operativa que reemplaza Excel, elimina el copypaste y te da control real de tu negocio. Sprints de automatización de 10-14 días para escalar sin contratar más personas.',
  keywords: [
    'arquitectura operativa',
    'automatización de procesos',
    'escalabilidad operativa',
    'sistemas internos',
    'eficiencia empresarial',
    'eliminar tareas manuales',
    'control de negocio',
    'sprints de automatización',
    'inteligencia artificial operativa',
    'optimización de procesos',
    'negocios escalables',
    'Argentina',
    'España',
    'México',
    'Latam',
    'EEUU',
    'Remote',
    'Global',
  ],
  authors: [{ name: 'Go Dream Ai' }],
  creator: 'Go Dream Ai',
  publisher: 'Go Dream Ai',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    siteName: 'Go Dream Ai',
    title: 'Go Dream Ai — Arquitectura Operativa y Automatización Escalable',
    description: 'Dejá de apagar incendios manuales. Diseñamos sistemas que te permiten recuperar tu tiempo y escalar con tranquilidad.',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Go Dream Ai - Arquitectura Operativa y Automatización',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Go Dream AI — Arquitectura Operativa y Automatización Escalable',
    description: 'Diseñamos la infraestructura que reemplaza el caos de Excel por automatización inteligente. Resultado tangible en 10–14 días.',
    images: [`${siteUrl}/og-image.png`],
    creator: '@godreamai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'technology',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#000000',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Go Dream Ai',
  description: 'Arquitectos operativos especializados en diseñar sistemas internos y automatizaciones escalables para empresas que quieren dejar de depender de procesos manuales.',
  url: siteUrl,
  logo: `${siteUrl}/icon-512.png`,
  sameAs: [
    'https://instagram.com/godreamai',
    'https://linkedin.com/company/godreamai',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'go@godreamai.com',
    telephone: '+54-9-336-454-0036',
    availableLanguage: ['Spanish'],
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AR',
  },
  areaServed: [
    { '@type': 'Country', name: 'Argentina' },
    { '@type': 'Country', name: 'España' },
    { '@type': 'Country', name: 'México' },
    { '@type': 'Country', name: 'Colombia' },
    { '@type': 'Country', name: 'Estados Unidos' },
    { '@type': 'Country', name: 'Chile' },
    { '@type': 'Country', name: 'Uruguay' },
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Go Dream Ai',
  url: siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

// LocalBusiness Schema - Mejora SEO local para Argentina
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Go Dream Ai',
  description: 'Especialistas en arquitectura operativa y automatización. Diseñamos sistemas que eliminan la fricción manual y permiten escalar sin contratar más personal.',
  url: siteUrl,
  logo: `${siteUrl}/icon-512.png`,
  image: `${siteUrl}/icon-512.png`,
  telephone: '+54-9-336-454-0036',
  email: 'go@godreamai.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AR',
    addressRegion: 'Argentina',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -34.6037, // Buenos Aires aprox
    longitude: -58.3816,
  },
  areaServed: [
    { '@type': 'Country', name: 'Argentina' },
    { '@type': 'Country', name: 'España' },
    { '@type': 'Country', name: 'México' },
    { '@type': 'Country', name: 'Colombia' },
    { '@type': 'Country', name: 'Estados Unidos' },
    { '@type': 'Country', name: 'Chile' },
    { '@type': 'Country', name: 'Uruguay' },
  ],
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '19:00',
  },
  sameAs: [
    'https://instagram.com/godreamai',
    'https://linkedin.com/company/godreamai',
  ],
}

// Service Schema - Para cada servicio principal
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Arquitectura Operativa y Automatización',
  provider: {
    '@type': 'Organization',
    name: 'Go Dream Ai',
    url: siteUrl,
  },
  areaServed: [
    { '@type': 'Country', name: 'Argentina' },
    { '@type': 'Country', name: 'España' },
    { '@type': 'Country', name: 'México' },
    { '@type': 'Country', name: 'Colombia' },
    { '@type': 'Country', name: 'Estados Unidos' },
    { '@type': 'Country', name: 'Chile' },
    { '@type': 'Country', name: 'Uruguay' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Sprints de Automatización',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Diagnóstico de Fricción Operativa',
          description: 'Identificación de cuellos de botella y procesos manuales críticos.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Diseño de Arquitectura Operativa',
          description: 'Planificación de sistemas internos que reemplazan hojas de cálculo y tareas repetitivas.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Sprint de Implementación (10-14 días)',
          description: 'Ejecución rápida y despliegue de sistemas automáticos escalables.',
        },
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.classList.remove('dark');
                  localStorage.setItem('theme', 'light');
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Google Analytics se carga dinámicamente después del consentimiento de cookies */}
      </head>
      <body className="bg-background text-foreground">
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
        <ThemeProvider>
          <UrgencyBannerProvider>
            <VisualEffects />
            {children}
          </UrgencyBannerProvider>
        </ThemeProvider>
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  )
}
