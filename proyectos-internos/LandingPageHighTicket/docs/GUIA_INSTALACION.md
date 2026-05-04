# Guía de Instalación - Go Dream Ai

Esta guía te ayudará a configurar y ejecutar el proyecto Go Dream Ai en tu entorno local.

## Requisitos Previos

- **Node.js** (versión 18 o superior)
- **pnpm** (gestor de paquetes requerido)
- **Git**

## Instalación de pnpm

```bash
npm install -g pnpm
```

Verificar:
```bash
pnpm --version
```

## Pasos de Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd nexus-page
```

### 2. Instalar dependencias

**IMPORTANTE: Usar pnpm, no npm o yarn.**

```bash
pnpm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# ============================================
# CONFIGURACIÓN DEL SITIO
# ============================================
NEXT_PUBLIC_SITE_URL=https://godreamai.com

# ============================================
# WEBHOOKS N8N - CHATBOT
# ============================================
# Webhook de producción para el Chatbot
NEXT_PUBLIC_N8N_WEBHOOK_URL_PRODUCTION=https://n8n.srv1150223.hstgr.cloud/webhook/06cef041-60fe-48a6-a2f0-d34d1899b6dc

# Webhook de desarrollo para el Chatbot
NEXT_PUBLIC_N8N_WEBHOOK_URL_DEV=https://n8n.srv1150223.hstgr.cloud/webhook-test/06cef041-60fe-48a6-a2f0-d34d1899b6dc

# Webhook genérico (opcional, si no quieres separar por entorno)
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.srv1150223.hstgr.cloud/webhook/06cef041-60fe-48a6-a2f0-d34d1899b6dc

# ============================================
# WEBHOOKS N8N - FORMULARIO DE AGENDA (Opcional)
# ============================================
# Si no configuras estos, se usarán los webhooks del Chatbot automáticamente

# Webhook de producción para Formularios
NEXT_PUBLIC_N8N_WEBHOOK_FORM_PRODUCTION=https://n8n.srv1150223.hstgr.cloud/webhook/formulario-produccion

# Webhook de desarrollo para Formularios
NEXT_PUBLIC_N8N_WEBHOOK_FORM_DEV=https://n8n.srv1150223.hstgr.cloud/webhook-test/formulario-desarrollo

# Webhook genérico para Formularios
NEXT_PUBLIC_N8N_WEBHOOK_FORM=https://n8n.srv1150223.hstgr.cloud/webhook/formulario
```

**Nota:** Las variables con `NEXT_PUBLIC_` son accesibles en el cliente (navegador). Si no configuras los webhooks de formularios, se usarán los del Chatbot como respaldo.

### 4. Ejecutar el servidor de desarrollo

```bash
pnpm dev
```

El proyecto estará en `http://localhost:3000`

## Scripts Disponibles

```bash
pnpm dev      # Servidor de desarrollo
pnpm build    # Build de producción
pnpm start    # Servidor de producción
pnpm lint     # Verificar errores de código
```

## Estructura del Proyecto

```
├── app/                    # Rutas y páginas (Next.js App Router)
│   ├── agenda/            # Página de formulario de contacto
│   ├── globals.css        # Estilos globales + Tailwind
│   ├── layout.tsx         # Layout principal + SEO
│   └── page.tsx           # Landing page principal
├── components/            # Componentes React
│   ├── sections/          # Secciones de la landing
│   ├── Chatbot.tsx        # Chatbot
│   ├── Header.tsx         # Navegación
│   └── Footer.tsx         # Pie de página
├── lib/                   # Utilidades
├── public/                # Assets estáticos
│   └── images/logos/      # Logos de Go Dream Ai
└── docs/                  # Documentación
```

## Tecnologías

- **Next.js 16** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Framer Motion** - Animaciones
- **PrimeReact** - Componentes UI

## Solución de Problemas

### Puerto 3000 en uso
```bash
PORT=3001 pnpm dev
```

### Limpiar y reinstalar
```bash
rm -rf node_modules .next
pnpm install
```

---

**Go Dream Ai** - godreamai.com | go@godreamai.com

Última actualización: Diciembre 2024
