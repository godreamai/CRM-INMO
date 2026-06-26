# WhatsApp AI Bot

Asistente de atención al cliente vía WhatsApp con inteligencia artificial y dashboard de gestión en tiempo real.

## Para qué sirve

Pensado para negocios que reciben consultas por WhatsApp y no tienen capacidad de atender a todos los clientes manualmente. El bot responde de forma automática usando IA, guarda el historial de cada conversación y permite que un operador humano tome el control cuando sea necesario.

Casos de uso típicos: inmobiliarias, comercios, servicios profesionales, atención postventa.

## Cómo funciona

1. El bot se vincula a un número de WhatsApp escaneando un código QR desde el dashboard
2. Cuando un cliente escribe, el bot responde automáticamente usando un modelo de lenguaje (LLM)
3. Todas las conversaciones quedan registradas y se pueden ver en tiempo real desde el dashboard web
4. El operador puede cambiar cualquier chat a **modo humano** para responder manualmente, y volver a modo IA cuando termine

El bot solo responde mensajes entrantes — no inicia conversaciones por su cuenta.

## Stack técnico

| Capa | Tecnología |
|---|---|
| Bot de WhatsApp | [Baileys](https://github.com/WhiskeySockets/Baileys) — cliente WhatsApp Web no oficial |
| LLM | OpenAI API (GPT-4o-mini por defecto) con soporte para Z.AI como alternativa |
| Dashboard web | Next.js 16 + React 19 + Tailwind CSS |
| Base de datos | SQLite via `better-sqlite3` |
| Runtime | Node.js 22 + TypeScript + tsx |
| Package manager | pnpm |

## Estructura del proyecto

```
├── scripts/
│   ├── start-bot.ts       # Entry point del proceso bot
│   └── env-loader.ts      # Carga de variables de entorno
├── src/
│   ├── app/               # Next.js app router (dashboard + API routes)
│   ├── components/        # Componentes React (QRScreen, dashboard, etc.)
│   └── lib/
│       ├── baileys/       # Conexión y handler de mensajes WhatsApp
│       ├── db.ts          # Capa de base de datos (SQLite)
│       ├── openrouter.ts  # Cliente LLM (OpenAI / Z.AI)
│       └── system-prompt.ts # Prompt del asistente
└── data/                  # Base de datos SQLite (generada automáticamente)
```

## Configuración

Crear un archivo `.env` en la raíz con las siguientes variables:

```env
# Requerido: clave de OpenAI para el LLM
OPENAI_API_KEY=sk-...

# Opcional: modelo de OpenAI a usar (default: gpt-4o-mini)
OPENAI_MODEL=gpt-4o-mini

# Opcional: Z.AI como proveedor alternativo (tiene prioridad si se configura)
ZAI_API_KEY=...
ZAI_MODEL=glm-4.5-air
```

## Cómo correrlo

**Requisitos:** Node.js >= 20.9.0, pnpm

```bash
# Instalar dependencias
pnpm install

# Compilar el binding nativo de SQLite (solo la primera vez)
cd node_modules/.pnpm/better-sqlite3@11.10.0/node_modules/better-sqlite3
npx prebuild-install
cd ../../../../..

# Iniciar bot y dashboard juntos
pnpm run start:all
```

Abrir [http://localhost:3000](http://localhost:3000), escanear el QR con WhatsApp en **Dispositivos vinculados → Vincular dispositivo** y el bot queda activo.

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `pnpm run start:all` | Inicia bot y dashboard en paralelo |
| `pnpm run start:bot` | Solo el proceso bot |
| `pnpm run dev` | Solo el dashboard en modo desarrollo |
| `pnpm run build` | Build de producción del dashboard |

## Personalizar el prompt

El comportamiento del asistente se define en `src/lib/system-prompt.ts`. Editar ese archivo para adaptar el tono, el dominio de conocimiento y las instrucciones del bot al negocio específico.
