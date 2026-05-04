# Go Dream Ai - Landing Page

Landing page optimizada para conversión de Go Dream Ai, agencia especializada en sistemas de captación y automatización de ventas con IA.

**🌐 Sitio web:** [godreamai.com](https://godreamai.com)

## 🚀 Características

- **Next.js 16** con React 18
- **TypeScript** para type safety
- **Tailwind CSS** para estilos
- **Framer Motion** para animaciones
- **Diseño optimizado para conversión** con psicología de ventas
- **Responsive** y mobile-first
- **Efectos visuales modernos** (glassmorphism, neon glow, gradients)

## 📦 Instalación

**IMPORTANTE: Este proyecto utiliza pnpm como gestor de paquetes.**

Primero instala pnpm si no lo tienes:
```bash
npm install -g pnpm
```

Luego instala las dependencias:
```bash
pnpm install
```

**Nota:** Prisma Client se genera automáticamente al instalar las dependencias. No necesitas ejecutar comandos adicionales.

### Configurar variables de entorno

Copia el archivo de ejemplo y configura tus variables de entorno:

```bash
cp env.local.example .env.local
```

Completa `.env.local` con:
- `DATABASE_URL` (Vercel Postgres)
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_SITE_URL`
- `N8N_WEBHOOK_URL`

## 🧭 CRM MVP (Vercel Postgres + Prisma + NextAuth)

1. Base de datos: usa Vercel Postgres. Aplica el esquema Prisma (`prisma/schema.prisma`) con `prisma db push` desde local con `DATABASE_URL` configurada.
2. Inicia con `pnpm install` y `pnpm dev`.
3. Autenticación: `/login` con NextAuth (credenciales en tabla `User` con `passwordHash`).
4. Dashboard: `/dashboard` muestra métricas básicas por organización (total, nuevos, convertidos) vía Prisma.
5. Webhook n8n: `POST /api/webhooks/n8n` con `organization_alias`, `nombre`, `email`, `telefono`, `tipo_negocio`, `principal_obstaculo`, `urgencia`, `source`.
6. Logout: NextAuth en `/api/auth/signout` (o botón en el layout).

## 🏃 Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Build

```bash
pnpm build
pnpm start
```

## 📁 Estructura del Proyecto

```
nexus-page/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globales
├── components/
│   ├── Header.tsx          # Navegación
│   ├── Footer.tsx          # Footer
│   └── sections/           # Secciones de la landing
│       ├── Hero.tsx
│       ├── PainPoints.tsx
│       ├── AboutUs.tsx
│       ├── WhatWeDo.tsx
│       ├── Services.tsx
│       ├── Portfolio.tsx
│       ├── Brands.tsx
│       ├── Testimonials.tsx
│       ├── FAQ.tsx
│       └── FinalCTA.tsx
└── design-structure.json   # Estructura de diseño
```

## 🎨 Secciones Incluidas

1. **Hero** - Dolor + Promesa + CTA
2. **Pain Points** - Profundización en el dolor del cliente
3. **About Us** - Quiénes somos (Nexus AI)
4. **What We Do** - Metodología y proceso
5. **Services** - Jupiter, Saturno, Vía Láctea
6. **Portfolio** - Proyectos falsos pero creíbles
7. **Brands** - Marcas falsas (carrusel)
8. **Testimonials** - Testimonios falsos
9. **FAQ** - Preguntas frecuentes
10. **Final CTA** - Llamada a la acción reforzada

## 🎯 Optimización para Conversión

- Copywriting orientado a resultados
- CTAs estratégicamente ubicados
- Prueba social (testimonios, proyectos)
- Reducción de fricción
- Diseño que guía la atención

## 🔍 SEO Implementado

Este proyecto tiene una implementación completa de SEO:

| Área | Archivo | Descripción |
|------|---------|-------------|
| Metadata | `app/layout.tsx` | Title, description, keywords, Open Graph, Twitter Cards |
| Schema.org | `app/layout.tsx` | Organization, WebSite, LocalBusiness, Service |
| Sitemap | `app/sitemap.ts` | Sitemap dinámico para Google |
| Robots | `app/robots.ts` | Configuración de crawlers |
| PWA | `app/manifest.ts` | Manifest para instalación |
| Headers | `next.config.js` | Headers de seguridad y cache |

**📚 Documentación completa:** Ver [docs/SEO_IMPLEMENTACION.md](./docs/SEO_IMPLEMENTACION.md)

## 📈 Documentación Disponible

| Documento | Descripción |
|-----------|-------------|
| [SEO_IMPLEMENTACION.md](./docs/SEO_IMPLEMENTACION.md) | Template completo de SEO para replicar en otros proyectos |
| [PROPUESTAS_CRECIMIENTO.md](./docs/PROPUESTAS_CRECIMIENTO.md) | Estrategias de crecimiento, Meta Ads, contenido orgánico |
| [GUIA_INSTALACION.md](./docs/GUIA_INSTALACION.md) | Guía de instalación del proyecto |
| [DEPLOY_VERCEL.md](./docs/DEPLOY_VERCEL.md) | Configuración de deploy en Vercel |

## 🛡️ Seguridad

El formulario de contacto incluye múltiples capas de protección:

- ✅ Rate limiting (5 solicitudes por IP cada 15 minutos)
- ✅ Validaciones estrictas de formato y longitud
- ✅ Honeypot field para detectar bots
- ✅ Detección de spam
- ✅ Protección contra duplicados (24 horas)
- ✅ Sanitización de datos

Para más detalles, consulta la [Documentación de Seguridad](./docs/SEGURIDAD.md).

## 📝 Licencia

Privado - Go Dream Ai (godreamai.com)

123
