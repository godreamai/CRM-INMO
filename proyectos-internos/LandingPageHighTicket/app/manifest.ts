import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://godreamai.com'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Go Dream Ai - Tu Negocio Vendiendo 24/7',
    short_name: 'Go Dream Ai',
    description: 'Sistemas de captación con IA que venden por vos mientras dormís. Resultados en 24-72 horas.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['business', 'productivity'],
    lang: 'es',
    dir: 'ltr',
    orientation: 'portrait-primary',
  }
}

