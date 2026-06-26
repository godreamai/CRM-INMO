# Formato CSV — Calendario de Contenido GDAI

## Columnas

El CSV debe tener exactamente estas columnas (en cualquier orden, los nombres son exactos):

| Columna | Obligatorio | Tipo | Valores válidos |
|---|---|---|---|
| `tipo` | ✅ | texto | `reel` · `carrusel` · `historia` · `post_ig` · `post_linkedin` |
| `pilar` | ✅ | texto | `DOLOR` · `TRANSFORMACION` · `AUTORIDAD` · `OBJECION` · `FUNDADOR` |
| `fecha_publicacion` | ✅ | fecha | `YYYY-MM-DD` (ej: `2026-06-02`) |
| `hook` | ✅ | texto | Primera línea del contenido. Sin límite de caracteres. |
| `estado` | — | texto | `borrador` · `aprobado` · `publicado` (default: `borrador`) |
| `agitacion` | — | texto | Segunda parte de la fórmula narrativa |
| `reencuadre` | — | texto | Causa raíz / reencuadre del problema |
| `sistema` | — | texto | Cómo Go Dream AI lo resuelve |
| `cta` | — | texto | Llamada a la acción (ej: "Agendá un diagnóstico gratuito") |
| `caption` | — | texto | Texto completo publicable |
| `hashtags` | — | texto | Separados por `\|` (ej: `#automatizacion\|#inmobiliaria\|#n8n`) |
| `descripcion_visual` | — | texto | Descripción del visual o arte para el diseñador |
| `formato_produccion` | — | texto | `cara_camara` · `pantalla` · `carrusel_diseno` · `solo_texto` |
| `guion` | — | texto | Solo Reels. Script con marcas de tiempo. |
| `duracion_seg` | — | número | Solo Reels. Entero entre 10 y 90. |
| `imagen_url` | — | texto | URL pública de la imagen generada (si ya existe) |
| `prompt_imagen` | — | texto | Prompt usado para generar la imagen con IA |

---

## Reglas

- Encoding: **UTF-8**
- Separador: **coma** (`,`)
- Primera fila: nombres de columnas exactos (case-sensitive)
- Campos con comas o saltos de línea: encerrar entre comillas dobles `"..."`
- Campos vacíos: dejar en blanco (no escribir NULL ni vacío entre comillas)
- `fecha_publicacion`: siempre en formato `YYYY-MM-DD`
- `tipo` y `pilar`: exactamente como están en la tabla de valores válidos (minúsculas para tipo, MAYÚSCULAS para pilar)

---

## Ejemplo

```csv
tipo,pilar,fecha_publicacion,hook,estado,cta,agitacion,formato_produccion
reel,DOLOR,2026-06-02,"Tu inmobiliaria no pierde operaciones por falta de leads. Las pierde porque nadie responde a tiempo.",borrador,"Agendá un diagnóstico gratuito","El comprador llama a 3 agencias. La primera que responde se lleva la operación. La tuya responde en 15 horas.",cara_camara
carrusel,AUTORIDAD,2026-06-04,"Tener CRM y Excel no es tener arquitectura operativa.",borrador,"Hablemos","Slide 1: el síntoma. Slide 2: la causa raíz. Slide 3: las 4 capas. Slide 4: qué cambia.",carrusel_diseno
post_linkedin,OBJECION,2026-06-06,"'Ya usamos Zapier para eso.' Lo que encontramos cuando miramos por dentro.",borrador,"¿Querés que miremos el tuyo?","3 triggers, 1 zap roto y nadie sabe quién lo hizo.",solo_texto
historia,TRANSFORMACION,2026-06-07,"Antes: Excel con splits que nadie entiende. Después: panel en tiempo real que corre solo.",aprobado,,,"",pantalla
```

---

## Columnas mínimas para una importación rápida

Si querés cargar ideas rápido sin completar todo, el mínimo funcional es:

```csv
tipo,pilar,fecha_publicacion,hook
reel,DOLOR,2026-06-09,Tu empresa no está frenada por ventas. Está frenada por procesos manuales.
```

El estado quedará en `borrador` por defecto y podés completar el resto desde el dashboard.

---

## Pilares — referencia rápida

| Pilar | Cuándo usarlo | Día sugerido |
|---|---|---|
| `DOLOR` | El ICP se reconoce. No mencionar GDAI. | Lunes |
| `AUTORIDAD` | Enseña arquitectura vs. herramientas | Miércoles |
| `TRANSFORMACION` | Antes → después con números | Viernes |
| `OBJECION` | Responde objeciones frecuentes | Cualquiera |
| `FUNDADOR` | Perspectiva personal / detrás de escena | Cualquiera |

---

*Dashboard GoDreamAI — go@godreamai.com*
