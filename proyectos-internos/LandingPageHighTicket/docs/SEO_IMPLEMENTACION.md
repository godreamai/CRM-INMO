# 📚 Documentación SEO - Go Dream Ai

> Template replicable para optimizar sitios Next.js en motores de búsqueda.

---

## ✅ RESUMEN DE IMPLEMENTACIONES

| Área | Estado | Archivo |
|------|--------|---------|
| Metadata completa | ✅ | `app/layout.tsx` |
| Open Graph | ✅ | `app/layout.tsx` |
| Twitter Cards | ✅ | `app/layout.tsx` |
| Schema.org (4 tipos) | ✅ | `app/layout.tsx` |
| Sitemap dinámico | ✅ | `app/sitemap.ts` |
| Robots.txt | ✅ | `app/robots.ts` |
| PWA Manifest | ✅ | `app/manifest.ts` |
| Headers de seguridad | ✅ | `next.config.js` |
| Optimización de imágenes | ✅ | `next.config.js` |
| Accesibilidad HTML | ✅ | Componentes |
| Analytics | ✅ | Vercel Analytics |

---

## 1. METADATA GLOBAL (`app/layout.tsx`)

### Configuración base

```tsx
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tudominio.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  
  // Título con template para subpáginas
  title: {
    default: 'Tu Título Principal — Keyword Principal',
    template: '%s | Tu Marca',
  },
  
  // Descripción (155-160 caracteres máximo)
  description: 'Descripción persuasiva con keywords principales. Incluir beneficio + diferenciador + CTA implícito.',
  
  // Keywords relevantes (10-15 máximo)
  keywords: [
    'keyword principal',
    'keyword secundaria',
    'keyword local',
    'keyword long-tail',
    // ...
  ],
  
  // Autoría
  authors: [{ name: 'Tu Marca' }],
  creator: 'Tu Marca',
  publisher: 'Tu Marca',
  
  // Deshabilitar detección automática
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Robots
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
  
  // Verificación de buscadores
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  
  // URL canónica
  alternates: {
    canonical: siteUrl,
  },
  
  // Categoría
  category: 'technology', // o 'business', 'education', etc.
  
  // Íconos
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  
  // PWA
  manifest: '/manifest.json',
  
  // Theme color
  other: {
    'theme-color': '#8b5cf6', // Color de tu marca
  },
}
```

### Open Graph (redes sociales)

```tsx
openGraph: {
  type: 'website',
  locale: 'es_ES',
  url: siteUrl,
  siteName: 'Tu Marca',
  title: 'Título para compartir en redes',
  description: 'Descripción corta y persuasiva para redes sociales.',
  images: [
    {
      url: `${siteUrl}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Descripción de la imagen',
    },
  ],
},
```

### Twitter Cards

```tsx
twitter: {
  card: 'summary_large_image',
  title: 'Título para Twitter',
  description: 'Descripción para Twitter (máx 200 caracteres)',
  images: [`${siteUrl}/og-image.png`],
  creator: '@tuusuario',
},
```

---

## 2. SCHEMA.ORG - DATOS ESTRUCTURADOS

### Schema Organization

```tsx
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Tu Marca',
  description: 'Descripción de tu empresa y qué hace.',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  sameAs: [
    'https://instagram.com/tumarca',
    'https://linkedin.com/company/tumarca',
    'https://twitter.com/tumarca',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'contacto@tudominio.com',
    telephone: '+54-9-XXX-XXX-XXXX',
    availableLanguage: ['Spanish'],
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AR',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Argentina',
  },
}
```

### Schema WebSite (con SearchAction)

```tsx
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Tu Marca',
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
```

### Schema LocalBusiness (SEO local)

```tsx
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService', // o 'LocalBusiness', 'Restaurant', etc.
  name: 'Tu Marca',
  description: 'Descripción del negocio local.',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/hero-image.png`,
  telephone: '+54-9-XXX-XXX-XXXX',
  email: 'contacto@tudominio.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Tu dirección',
    addressLocality: 'Ciudad',
    addressRegion: 'Provincia',
    postalCode: '0000',
    addressCountry: 'AR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -34.6037,
    longitude: -58.3816,
  },
  areaServed: [
    { '@type': 'Country', name: 'Argentina' },
    { '@type': 'Country', name: 'España' },
  ],
  priceRange: '$$', // $, $$, $$$, $$$$
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  sameAs: [
    'https://instagram.com/tumarca',
    'https://linkedin.com/company/tumarca',
  ],
}
```

### Schema Service (servicios)

```tsx
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Tu Tipo de Servicio',
  provider: {
    '@type': 'Organization',
    name: 'Tu Marca',
    url: siteUrl,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Argentina',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Catálogo de Servicios',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Servicio 1',
          description: 'Descripción del servicio 1.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Servicio 2',
          description: 'Descripción del servicio 2.',
        },
      },
    ],
  },
}
```

### Inyectar schemas en el body

```tsx
import Script from 'next/script'

// En el body del layout:
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
```

---

## 3. SITEMAP DINÁMICO (`app/sitemap.ts`)

```tsx
import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tudominio.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()
  
  return [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/agenda`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9, // Página de conversión = alta prioridad
    },
    {
      url: `${siteUrl}/servicios`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/privacidad`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3, // Páginas legales = baja prioridad
    },
    {
      url: `${siteUrl}/terminos`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
```

---

## 4. ROBOTS.TXT (`app/robots.ts`)

```tsx
import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tudominio.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
```

---

## 5. PWA MANIFEST (`app/manifest.ts`)

```tsx
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tu Marca - Tagline corto',
    short_name: 'Tu Marca',
    description: 'Descripción breve de tu app/web.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#8b5cf6', // Color de tu marca
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
```

---

## 6. NEXT.CONFIG.JS - OPTIMIZACIONES

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false, // Ocultar "X-Powered-By: Next.js"
  
  // Optimización de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Headers de seguridad (mejoran SEO y confianza)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // DNS Prefetch
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          // Evitar iframes maliciosos
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          // Prevenir MIME sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Protección XSS
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Política de referencia
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // HSTS - Fuerza HTTPS (CRÍTICO para SEO)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https://images.unsplash.com https://www.google-analytics.com",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; ')
          },
        ],
      },
      // Cache para assets estáticos
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

---

## 7. OPTIMIZACIÓN DE IMÁGENES

### Componente Next/Image

```tsx
import Image from 'next/image'

<Image
  src="/robot.png"
  alt="Descripción descriptiva con keywords" // ALT importante para SEO
  width={600}
  height={750}
  className="w-full h-auto object-contain"
  priority // Para imágenes above the fold
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..." // Placeholder blur
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
/>
```

### Preconnect para recursos externos

```tsx
// En layout.tsx, dentro de <head>
<link rel="preconnect" href="https://images.unsplash.com" />
<link rel="dns-prefetch" href="https://images.unsplash.com" />
```

---

## 8. ACCESIBILIDAD HTML (Mejora SEO)

### Semántica correcta

```tsx
// ✅ Correcto
<main>
  <section>
    <h1>Título principal (solo 1 por página)</h1>
    <h2>Subtítulos de sección</h2>
    <article>
      <h3>Títulos de artículos</h3>
    </article>
  </section>
</main>

// ❌ Incorrecto
<div>
  <div>
    <span className="titulo">Título</span>
  </div>
</div>
```

### Atributos importantes

```tsx
// Lang en html
<html lang="es">

// Alt en imágenes
<img alt="Descripción con keywords" />

// Aria labels en botones
<button aria-label="Abrir menú de navegación">
  <MenuIcon />
</button>

// Links descriptivos
<a href="/servicios">Ver todos los servicios</a> // ✅
<a href="/servicios">Click aquí</a> // ❌
```

---

## 9. VARIABLES DE ENTORNO

```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://tudominio.com
NEXT_PUBLIC_GOOGLE_VERIFICATION=tu_codigo_verificacion
NEXT_PUBLIC_YANDEX_VERIFICATION=tu_codigo_yandex
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 10. CHECKLIST DE ÍCONOS NECESARIOS

```
public/
├── favicon.ico (32x32)
├── icon.svg (cualquier tamaño, escalable)
├── apple-touch-icon.png (180x180)
├── icon-192.png (192x192 para PWA)
├── icon-512.png (512x512 para PWA)
├── og-image.png (1200x630 para Open Graph)
└── robot.png (imagen hero/mascota)
```

---

## 11. HERRAMIENTAS DE VALIDACIÓN

### Antes de lanzar, validar en:

1. **Google Rich Results Test**
   - https://search.google.com/test/rich-results
   - Validar schemas

2. **Facebook Sharing Debugger**
   - https://developers.facebook.com/tools/debug/
   - Validar Open Graph

3. **Twitter Card Validator**
   - https://cards-dev.twitter.com/validator
   - Validar Twitter Cards

4. **Google PageSpeed Insights**
   - https://pagespeed.web.dev/
   - Medir Core Web Vitals

5. **GTmetrix**
   - https://gtmetrix.com/
   - Performance general

6. **Lighthouse**
   - Chrome DevTools > Lighthouse
   - Auditoría completa

---

## 12. POST-LANZAMIENTO

### Google Search Console
1. Agregar propiedad
2. Verificar dominio
3. Enviar sitemap
4. Solicitar indexación

### Google Analytics 4
1. Crear propiedad
2. Configurar eventos de conversión
3. Conectar con Search Console

### Google Business Profile
1. Crear perfil de negocio
2. Agregar fotos y servicios
3. Solicitar reseñas

---

## 📊 MÉTRICAS OBJETIVO

| Métrica | Objetivo | Herramienta |
|---------|----------|-------------|
| Performance Score | >90 | Lighthouse |
| First Contentful Paint | <1.8s | PageSpeed |
| Largest Contentful Paint | <2.5s | PageSpeed |
| Time to Interactive | <3.8s | PageSpeed |
| Cumulative Layout Shift | <0.1 | PageSpeed |
| SEO Score | 100 | Lighthouse |
| Accessibility Score | >95 | Lighthouse |

---

> **Última actualización:** Diciembre 2024
> **Proyecto base:** Go Dream Ai (godreamai.com)





