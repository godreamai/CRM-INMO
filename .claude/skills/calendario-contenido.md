---
name: calendario-contenido
description: Genera calendario de contenido mensual completo para Go Dream AI. Produce CSV importable al dashboard (content_calendar Supabase). Sigue estructura semanal de .Marca/, fórmula HOOK→AGITACIÓN→REENCUADRE→SISTEMA→CTA y distribución de pilares.
metadata:
  type: skill
  version: 1.0
---

# Skill: Calendario de Contenido GDAI

## Invocación

`/calendario-contenido [mes] [año]`

Sin parámetros → mes siguiente al actual.

## Output

CSV en `.Marca/contenido/calendario-[mes]-[año].csv`

---

## Paso a paso OBLIGATORIO

### 1. Leer antes de generar (siempre, en paralelo)

- `.Marca/Mapa_Maestro_Contenidos_Web_Automatizacion_Software.md` → **FUENTE DE TEMAS OBLIGATORIA.** 18 temas, subtemas generales + aplicación inmobiliaria, 9 enfoques. Cada pieza del calendario debe tener tema y subtema asignados desde este mapa. No inventar temas fuera de él.
- `.Marca/brand.md` → identidad, colores, voz, CTA principal
- `.Marca/config.md` → reglas de lenguaje, pilares con %, CTAs variantes
- `.Marca/calendario-base.md` → frecuencia, estructura semanal, banco de dolores
- `.Marca/formula-narrativa.md` → fórmula, banco de 17 hooks

### 1.5. Seleccionar temas del mapa maestro

Antes de escribir una sola pieza, mapear qué tema y subtema del mapa cubre cada día del mes.

- Distribuir los 18 temas de forma que no se repita el mismo en la misma semana.
- Priorizar temas 1–5 (web, captación, seguimiento, WhatsApp, automatización interna) para el pilar DOLOR.
- Temas 6–7 (software a medida, CRM) para AUTORIDAD y TRANSFORMACION.
- Temas 13 y 15 (errores frecuentes, mitos) para OBJECION.
- Temas 8, 16 (conversión, confianza) para TRANSFORMACION.
- Para cada pieza registrar en el campo `descripcion_visual` el tema y subtema de origen (ej: `Tema 3 – Seguimiento comercial / Clientes olvidados en conversaciones`).

### 2. Calcular el mes

- Primer día del mes y su día de semana
- Iterar lunes a sábado por cada semana completa
- Domingo = descanso, no generar contenido

### 3. Estructura semanal por día

| Día | Feed Instagram | Historias |
|---|---|---|
| Lunes | Reel DOLOR | Secuencia 5-6 stories DOLOR |
| Martes | Carrusel AUTORIDAD o TRANSFORMACION | Secuencia 5-6 stories |
| Miércoles | Reel AUTORIDAD (DEMO/SISTEMA) | Secuencia 5-6 stories |
| Jueves | Carrusel DOLOR/TRANSFORMACION (antes-después o checklist) | Secuencia 5-6 stories |
| Viernes | Reel OBJECION | Secuencia 4-5 stories OBJECION |
| Sábado | Carrusel DOLOR o TRANSFORMACION | Secuencia 4-5 stories suave |
| Domingo | — | — |

### 4. Distribución de pilares (respetar siempre)

- DOLOR 40% → Lunes reels, Jueves carrusel, historias lunes/jueves
- TRANSFORMACION 25% → Martes carrusel, Sábado carrusel, historias martes/sábado
- AUTORIDAD 20% → Miércoles reels, Martes carrusel (alternado con TRANSFORMACION)
- OBJECION 10% → Viernes reels + historias viernes
- FUNDADOR 5% → Historias sábado (humanizar, proceso, origen GDAI)

### 5. Fórmula narrativa por pieza

HOOK → AGITACIÓN → REENCUADRE → SISTEMA → CTA

**HOOK**: 1 frase. Que duela o sorprenda. Máx 8 palabras para reels. Sin "Hola soy Pablo".
**AGITACIÓN**: ciclo de caos concreto. Máx 3 puntos. El ICP se reconoce.
**REENCUADRE**: "El problema no es X. Es Y." — causa raíz, no síntoma.
**SISTEMA**: qué hace GDAI. Concreto. Sin prometer magia. Sin IA como argumento.
**CTA**: "Comentá DEMO" o variante. Para historias: "Respondé esta historia."

### 6. Reglas de tono (críticas)

- Voseo siempre: "tenés", "tu equipo", "tu inmobiliaria"
- Traducir toda jerga técnica: CRM→"el sistema", bot→"respuesta automática", dashboard→"panel"
- Nunca: API, n8n, webhook, pipeline, funnel, automatización sin contexto
- Nunca: precio en público, IA como hype, frases corporativas
- Caption IG: siempre cierra con CTA. Link en primer comentario (nunca en cuerpo).

### 7. Banco de hooks (rotar, no repetir en el mismo mes)

- "¿Sabés cuántos leads activos tenés ahora mismo? Si dudaste, ese es el problema."
- "El 63% de las consultas en inmobiliarias no reciben respuesta el mismo día."
- "No te falta publicidad. No te faltan consultas. Te falta responder antes que la competencia."
- "Tu broker tardó 2 horas en responder. El cliente ya firmó con otro."
- "El error de WhatsApp que te cuesta 2 ventas por mes."
- "Si tardás más de 5 minutos en responder, tenés 21 veces menos chances de cerrar."
- "Hay dos inmobiliarias: la que apaga incendios y la que tiene un sistema."
- "Más publicidad no te salva si perdés los leads que ya tenés."
- "Vender sin sistema es como anotar visitas en servilletas. Se vuelan con el viento."
- "'Tengo 200 chats y no sé a quién contesté.' Si te pasa, mirá esto."
- "Escalar no debería significar contratar más personas para gestionar el mismo caos."
- "Cada vez que alguien copia un dato de una herramienta a otra, pagás un impuesto invisible."
- "El 41% de las inmobiliarias nunca responde un lead de su propia web."
- "917 minutos. Ese es el tiempo promedio que tarda un agente en responder un lead nuevo."
- "Si un agente se va mañana, ¿qué le pasa a sus contactos?"
- "Cuando el vendedor se va, se lleva los contactos. A menos que tengas esto."

### 8. Objeciones a desmontar (rotar una por viernes)

- "Mi inmobiliaria es chica, no necesito esto" → contraargumento: las agencias chicas pierden proporcionalmente más
- "Mis vendedores ya usan WhatsApp" → contraargumento: usar WhatsApp ≠ tener sistema
- "Ya tengo Excel" → contraargumento: Excel no avisa, no sigue, no escala
- "No quiero obligarlos a cargar datos" → contraargumento: el sistema captura solo, no depende del vendedor
- "No tengo tantos leads" → contraargumento: el problema no es cantidad sino retención
- "No quiero pagar por otro software" → contraargumento: el sprint no es software, es arquitectura

### 9. Guion de reel (estructura de tiempo)

```
[0-3s]   HOOK — la frase más fuerte. Sin intro.
[3-15s]  AGITACIÓN — el ciclo de caos. Máx 3 puntos concretos.
[15-25s] REENCUADRE — "El problema no es X. Es Y."
[25-35s] SISTEMA + CTA — qué hace GDAI. Comentá DEMO.
```

### 10. Guion de historia (estructura de secuencia)

```
Story 1-2: Contexto del día. Afirmación o pregunta que abre el tema.
Story 3:   Encuesta nativa IG o pregunta directa.
Story 4-5: Insight o mini demo. Texto concreto.
Story 6:   CTA. Link al reel del día o caja de respuestas abierta.
```

Escribir el guion de historias como:
`Story 1: [texto] / Story 2: [texto] / Story 3: ENCUESTA - [pregunta] [OpA | OpB] / Story 4: [texto] / Story 5: [texto] / Story 6: CTA - [texto]`

### 11. Guion de carrusel (slide a slide)

```
Slide 1:   Título que genera dolor o curiosidad. Sin explicar.
Slide 2-3: Agitación. Una idea por slide. Pocas palabras.
Slide 4:   Reencuadre. Causa raíz real.
Slide 5:   Sistema. Antes/después o pasos concretos.
Slide 6:   CTA. "Guardá esto" o "Comentá DEMO".
```

Escribir el guion de carrusel como:
`Slide 1: [título] / Slide 2: [texto] / Slide 3: [texto] / Slide 4: [texto] / Slide 5: [texto] / Slide 6: [CTA]`

---

## Formato del CSV

### Encabezados (orden exacto)

```
tipo,pilar,fecha_publicacion,estado,hook,agitacion,reencuadre,sistema,cta,caption,hashtags,descripcion_visual,formato_produccion,guion,duracion_seg,imagen_url,prompt_imagen
```

### Reglas de formato CSV

- Todos los campos de texto: entre comillas dobles `"`
- Comillas internas dentro de un campo: escapar como `""` (doble)
- **hashtags**: separados por `|` (pipe). Ej: `#inmobiliaria|#inmobiliariasargentina|#godreamai`
- **caption**: usar `\n` literal para saltos de línea (no real newlines)
- **duracion_seg**: número entero solo para reels. Vacío para el resto.
- **slides / secuencia**: NO incluir (el dashboard los ignora en import, los hardcodea a null)
- **estado**: siempre `borrador` para calendarios nuevos
- **imagen_url**: dejar vacío (se carga después de producción)

### Tipos válidos del dashboard

`reel` | `carrusel` | `historia` | `post_ig`

### Pilares válidos

`DOLOR` | `TRANSFORMACION` | `AUTORIDAD` | `OBJECION` | `FUNDADOR`

### Formatos de producción válidos

`cara_camara` | `pantalla` | `carrusel_diseno` | `solo_texto`

---

## Volumen de referencia por mes (4 semanas)

| Tipo | Cantidad | Días |
|---|---|---|
| Reel DOLOR | 4 | Lunes |
| Reel AUTORIDAD (DEMO) | 4 | Miércoles |
| Reel OBJECION | 4 | Viernes |
| Carrusel AUTORIDAD/TRANSFORMACION | 4 | Martes |
| Carrusel DOLOR/TRANSFORMACION | 4 | Jueves |
| Carrusel DOLOR/TRANSFORMACION | 4 | Sábado |
| historia (secuencia diaria) | 24 | Lun-Sáb |
| **TOTAL** | **44** | |

---

## Ruta de output

Guardar siempre en: `.Marca/contenido/calendario-[mes en minúsculas]-[año].csv`

Ejemplos:
- `.Marca/contenido/calendario-junio-2026.csv`
- `.Marca/contenido/calendario-julio-2026.csv`
- `.Marca/contenido/calendario-agosto-2026.csv`

Crear el folder si no existe.

---

## Cómo importar al dashboard

1. Abrir el dashboard → sección Contenido
2. Clic en botón "Importar CSV" (arriba a la derecha de la tabla)
3. Seleccionar el archivo `calendario-[mes]-[año].csv`
4. El dashboard valida: tipo, pilar, fecha (YYYY-MM-DD) y hook (obligatorios)
5. Las piezas se cargan con estado `borrador` listas para revisión y aprobación

---

## Qué NUNCA incluir en el contenido

- Precios en público
- IA, API, n8n, webhook, Zapier en copy público
- Frases corporativas: "transformación digital", "ecosistema", "sinergia"
- CTAs genéricos: "Seguime", "Dale like si te gustó", "Link en bio" como único CTA
- Contenido sin relación directa al nicho inmobiliario
- Días de marketing genérico (Día del padre, etc.) sin conexión al dolor del ICP
- "Hola soy [nombre]" como apertura — el hook va primero, siempre
