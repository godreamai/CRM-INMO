# Plan: Mejora Estética Landing Page — Go Dream AI

**Objetivo:** Elevar calidad visual de la landing para maximizar conversión de dueños de inmobiliarias argentinas → WhatsApp.  
**Stack actual:** Next.js · Tailwind v3 · Lucide React · sin Framer Motion  
**Dials activos:** DESIGN_VARIANCE=8 · MOTION_INTENSITY=6 · VISUAL_DENSITY=4

---

## Problemas identificados

| # | Problema | Archivo | Regla violada |
|---|----------|---------|---------------|
| 1 | Font **Inter** en toda la app | `layout.tsx`, `globals.css`, `tailwind.config.js` | PROHIBIDO — usar Outfit/Geist/Satoshi |
| 2 | Hero **centrado** (`text-center`, `items-center`) | `Hero.tsx` | PROHIBIDO con DESIGN_VARIANCE=8 |
| 3 | FinalCTA: **3 cards iguales** `md:grid-cols-3` | `FinalCTA.tsx` | PROHIBIDO — "3-column card layout" |
| 4 | Color **purple** registrado en config | `tailwind.config.js` | Violación "Lila Ban" |
| 5 | Emoji `✦` en badge de Services | `Services.tsx` | ANTI-EMOJI POLICY |
| 6 | Emoji `🇪🇸` en SocialProof | `SocialProof.tsx` | ANTI-EMOJI POLICY |
| 7 | Animaciones con `ease-in-out` lineal | `globals.css`, `tailwind.config.js` | CSS premium debe usar `cubic-bezier` |
| 8 | PainPoints: 4 cards iguales 2×2 | `PainPoints.tsx` | Monótono, sin jerarquía editorial |

---

## Tareas — en orden de impacto

### PASO 1 — Base tipográfica y config [ ]
**Archivos:** `tailwind.config.js` · `app/layout.tsx` · `app/globals.css`

- [ ] Reemplazar `Inter` por `Outfit` (Google Fonts, disponible via `next/font/google`)
- [ ] Actualizar `--font-inter` → `--font-outfit` en `globals.css` y `tailwind.config.js`
- [ ] Eliminar `accent.purple` y `accent.purple-dark` del config (Lila Ban)
- [ ] Actualizar animaciones en config: `ease-in-out` → `cubic-bezier(0.16, 1, 0.3, 1)`
- [ ] Estandarizar accent único: `lime-400` (#cdff00) en todo el config

---

### PASO 2 — Hero: centrado → split-screen asimétrico [ ]
**Archivo:** `components/sections/Hero.tsx`

**Estructura objetivo:**
```
[LEFT 55%]                          [RIGHT 45%]
badge                               ┌─────────────────────┐
H1 alineado izquierda               │  Mockup Chat WA     │
subtítulo max-w-[48ch]              │  [Lead] 09:47pm     │
CTA WhatsApp                        │  "Consulto por..."  │
microcopy 3 items vertical          │                     │
                                    │  [Bot] 09:47pm ✓✓  │
                                    │  "Hola! Gracias..." │
                                    └─────────────────────┘
```

- [ ] Layout: `grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-16 items-center`
- [ ] Texto: left-aligned, `tracking-tighter`, `leading-[1.05]`
- [ ] Visual derecho: mockup de conversación WhatsApp con CSS puro + animación CSS `fade-in` secuencial en los mensajes (sin Framer)
- [ ] Mobile: single column, visual debajo del texto
- [ ] Usar `min-h-[100dvh]` (ya está, mantener)

---

### PASO 3 — PainPoints: cards → editorial list [ ]
**Archivo:** `components/sections/PainPoints.tsx`

**Estructura objetivo:**
- Header alineado izquierda (no centrado)
- Items como lista `divide-y border-black/[0.06]` — sin card boxes
- Cada item: número grande `text-[80px] font-black text-black/[0.04]` a la izquierda + contenido a la derecha
- Hover: `border-l-2 border-lime-400 pl-6 transition` en el contenido
- Quote de ROI al final: full-width, fondo negro, texto blanco

---

### PASO 4 — FinalCTA: 3 cards → layout asimétrico 60/40 [ ]
**Archivo:** `components/sections/FinalCTA.tsx`

**Estructura objetivo:**
```
[LEFT 60%]                    [RIGHT 40%]
H2 grande izquierda           ┌───────────────┐
descripción                   │ Sistema 14d   │
                              ├───────────────┤
CTA WhatsApp prominente       │ Garantía 80%  │
                              ├───────────────┤
microcopy                     │ Soporte WA    │
                              └───────────────┘
                              ROI block negro
```

- [ ] Grid `lg:grid-cols-[3fr_2fr]`
- [ ] Items del lado derecho: lista `divide-y` — sin cards con sombra, solo `border-black/[0.06]`
- [ ] ROI block debajo del grid, full-width, fondo negro

---

### PASO 5 — Cleanup de emojis [ ]

- [ ] `Services.tsx` línea 89: `Sistema Completo ✦ Recomendado` → `Sistema Completo · Recomendado`
- [ ] `SocialProof.tsx` línea 48: `España 🇪🇸` → `España` + ícono Lucide `Globe` small

---

### PASO 6 — Refinamientos menores (si hay tiempo) [ ]

- [ ] `Transformation.tsx`: header centrado → left-aligned; la tabla de comparación ya está bien estructuralmente
- [ ] `Header.tsx`: CTA text "Quiero mi herramienta" → "Hablar por WhatsApp" (consistencia)
- [ ] `globals.css`: `.glass-card:hover` añadir `transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1)`

---

## Notas técnicas

- **No instalar nuevas dependencias** — Framer Motion no está, MOTION_INTENSITY=6 se cubre con CSS transitions premium
- **Phosphor Icons no está instalado** → seguir usando Lucide React
- **Tailwind v3** confirmado en package.json → no usar sintaxis v4
- **Lucide** está en `^0.554.0` — usar imports directos por nombre
- **Font Outfit**: importar con `next/font/google`, subsets `['latin']`, variable `--font-outfit`

---

## Para retomar

Decirle al agente: *"continuá el plan de mejora estética de la landing"* y referir a este archivo.  
El agente puede leer el estado de los checkboxes `[ ]` / `[x]` para saber dónde está parado.
