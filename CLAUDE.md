# CLAUDE.md — Go Dream AI
> Cerebro operativo del proyecto. Fuente de verdad para cualquier IA que trabaje aquí.

---

## 1. VISIÓN GENERAL DEL NEGOCIO

**Go Dream AI** es un estudio de arquitectura operativa boutique.

- **Qué hace:** Diseña y construye infraestructura automatizada para que empresas escalen sin contratar más gente ni aumentar fricción.
- **Qué NO es:** Agencia de marketing, generación de leads, software factory, vendedor de herramientas.
- **Frase núcleo:** *"Arreglamos cómo funciona la empresa por dentro."*

**Problemas que resuelve:**
- Operaciones que dependen de Excel / Google Sheets
- Copy-paste manual entre herramientas desconectadas
- Reportes que llegan tarde y con errores
- Dependencia de personas clave (bus factor = 1)
- Techo de crecimiento: para escalar hay que contratar más operativos

**Resultado que entrega:**
- Procesos automáticos con datos estructurados
- Integraciones activas entre herramientas existentes
- Panel de métricas en tiempo real
- Sistema documentado que corre solo

---

## 2. OFERTA DE SERVICIOS

### Producto principal: Sprint de Automatización (10–14 días)

| Fase | Qué ocurre |
|---|---|
| Días 1–2 | Diagnóstico de fricción (causa raíz, no síntoma) |
| Día 3 | Diseño de arquitectura (datos → flujo → ejecución → control) |
| Días 4–10 | Implementación: integraciones, worker, base de datos, panel |
| Días 11–12 | Testeo en condiciones reales |
| Días 13–14 | Deploy + documentación + walkthrough al cliente |
| Post-deploy | Soporte 30 días |

**Características clave:**
- Alcance cerrado desde el día 1. Sin scope creep.
- Entregable real: sistema funcionando, no presentación.
- El cliente valida, no ejecuta. Su tiempo es mínimo.
- Capacidad: 1–2 Sprints por mes (modelo boutique).

**Upsell:** Retainer mensual de evolución del sistema post-Sprint.

**Diferencial vs mercado:**
- vs. CRMs verticales (Tokko, Inmovilla, Wasi) → productos, no servicios. No conectan con WhatsApp, comisiones ni reportes.
- vs. Agencias de marketing inmobiliario → Meta Ads + chatbots de calificación, sin tocar back-office
- vs. Freelancers generalistas → sin posicionamiento vertical ni casos verificables
- vs. "Lo hacemos interno" → documentación entregada desde el día 1, sin fricción de onboarding

### Los tres Sprints (cliente elige según su dolor principal)

**Sprint A — Speed-to-Lead**
Problema: leads entran por Zonaprop / Argenprop y nadie los llama a tiempo. El comprador ya firmó con otra agencia.
Qué entregamos:
→ Sistema de recepción y asignación automática de leads por canal
→ Primer contacto vía WhatsApp Business API en menos de 5 minutos, automático
→ Pipeline visible con estado de cada lead en tiempo real
→ Alertas al agente cuando un lead no recibe seguimiento
→ Documentación + soporte post-deploy 30 días

**Sprint B — Motor de Comisiones**
Problema: cálculo de splits entre agentes y oficina se hace en Excel con fórmulas que nadie documenta.
Qué entregamos:
→ Sistema de registro de operaciones conectado al CRM existente
→ Cálculo automático de splits y comisiones por agente y por oficina
→ Integración con facturación local (IIBB, IVA según corresponda)
→ Panel de comisiones en tiempo real por agente y por mes
→ Documentación + soporte post-deploy 30 días

**Sprint C — Reporte Automático al Propietario**
Problema: el propietario llama cada semana para preguntar cómo va su propiedad. Alguien del equipo arma la respuesta a mano.
Qué entregamos:
→ Sistema de extracción automática de datos del CRM por propiedad
→ Reporte semanal/mensual generado y enviado automáticamente por WhatsApp o email
→ Contenido: visitas recibidas, leads interesados, estado de la operación
→ Panel interno de control de envíos
→ Documentación + soporte post-deploy 30 días

---

## 3. ICP — CLIENTE IDEAL

**Mercado actual:** Agencias inmobiliarias en Argentina
**Próxima expansión:** España, México, Chile (una vez validado en Argentina)

**Empresa:**
- Agencia inmobiliaria en operación
- Equipo de 3 a 30 agentes
- Mínimo 2 años operando
- Ya usan algún CRM: Tokko Broker, Inmovilla, Wasi, EasyBroker u otro
- Reciben leads por portales: Zonaprop, Argenprop, Mercado Libre
- Operan con procesos manuales: Excel, WhatsApp personal, llamadas sin registro

**Decisor:**
- Dueño / Founder / Director de la agencia
- Director comercial / Gerente de operaciones

**Señales de compra (dolor activo):**
- "Los leads entran pero los agentes tardan en responder"
- "Las comisiones las calculamos en Excel y siempre hay errores"
- "Los propietarios nos llaman para preguntar cómo va su propiedad"
- "Si un agente se va, se lleva sus contactos en el celular"
- "Tenemos CRM pero igual seguimos con fricción y procesos manuales"

**CRMs del nicho (conocerlos para hablar el idioma del cliente):**
| CRM | Mercado | Gap clave |
|---|---|---|
| Tokko Broker | Argentina, LATAM | Sin conector nativo estable con Make/Zapier |
| Inmovilla | España | Sin WhatsApp Business API oficial |
| Wasi | Colombia, LATAM | Reportes al propietario muy básicos |
| EasyBroker | México | Sin integración nativa con automatización |
| Sooprema | España, LATAM | Sin conector Make/Zapier/n8n |

**NO es ICP:**
- Agencias unipersonales
- Nuevas aperturas sin procesos instalados
- PropTechs con equipo técnico propio
- Empresas que buscan marketing o generación de leads
- Empresas con IT team dedicado

---

## 4. LINEAMIENTOS DE COMUNICACIÓN

### Tono de voz

| Atributo | Descripción |
|---|---|
| Directo | Sin rodeos. Al punto desde la primera frase. |
| Diagnóstico | Habla como especialista que identifica causa raíz, no síntoma. |
| Confiado | No promete magia. Promete sistemas que funcionan. |
| Empático con el dolor | Entiende el caos, pero no lo normaliza: lo resuelve. |
| Técnico pero accesible | Usa términos técnicos siempre con contexto para un CEO. |

**Tuteo:** "tenés", "tu equipo", "tu operación" (LatAm) / "tienes", "tu" (España).

### Vocabulario que SÍ usar
- Sistemas, arquitectura, datos, procesos, control, escalabilidad
- Fricción operativa, causa raíz, fuente de verdad, trazabilidad
- Sprint, alcance cerrado, worker, deploy, métricas en tiempo real
- Números concretos: "10–14 días", "4 horas/semana", "bus factor"
- Flechas para listas: `→`

### Vocabulario PROHIBIDO
- "Soluciones innovadoras", "transformación digital", "potenciamos tus resultados"
- "Impulsamos tu negocio con IA", "somos apasionados por la tecnología"
- "Funnels", "growth", "vender en automático", "facturar 24/7"
- Voz pasiva, jerga técnica sin contexto (API, webhook, trigger sin explicar)
- Emojis decorativos en exceso (máx 1–2 por pieza si refuerzan el mensaje)

### Frases de marca — usar con frecuencia
> "Tu empresa no está frenada por ventas. Está frenada por procesos manuales."

> "Tu inmobiliaria no pierde operaciones por falta de leads. Las pierde porque nadie responde a tiempo."

> "Eso no es automatización. Es operación frágil con botones."

> "No se soluciona contratando más agentes. Se soluciona diseñando el sistema."

> "Tener CRM y Excel no es tener arquitectura operativa."

> "La agencia que reporta automáticamente retiene más exclusivas. Sin que nadie tenga que hacer nada."

> "Sistemas que corren solos."

> "Alcance cerrado. Resultado real."

> "La diferencia no es la herramienta. Es la arquitectura."

---

## 5. SISTEMA DE GENERACIÓN DE CONTENIDO

### Estructura narrativa base (aplicar a TODO el contenido)

```
1. GANCHO     → Incomoda o nombra el dolor exacto. Primera línea decide si siguen leyendo.
2. AGITACIÓN  → Describe el ciclo o síntoma con detalle concreto.
3. REENCUADRE → Nombra la causa raíz real (no es un problema de herramientas, es de arquitectura).
4. SOLUCIÓN   → Qué hace Go Dream AI y en cuánto tiempo.
5. CTA        → Acción concreta y de baja fricción (diagnóstico, no "contratar").
```

### Los 3 tipos de post LinkedIn

| Día | Tipo | Regla clave |
|---|---|---|
| Lunes | **Dolor** | El ICP se reconoce. NO mencionar Go Dream AI. El dolor habla solo. |
| Miércoles | **Educativo** | Enseña arquitectura vs. herramientas. Formato carrusel ideal. |
| Viernes | **Prueba social** | Antes → después con números. Puente más directo al CTA de diagnóstico. |

### Reglas de publicación LinkedIn
- Publicar entre 9:00 y 10:00h
- Responder TODOS los comentarios en las primeras 2 horas
- Links (Calendly) van en el PRIMER COMENTARIO, nunca en el cuerpo
- Sin nombre de marca en posts de dolor

### Hooks validados (reutilizar como referencia de estilo)
- *"Tu empresa no está frenada por ventas. Está frenada por un Sheets que nadie quiere tocar."*
- *"'Si falta una persona, se para todo.' Eso no es un problema de RRHH. Es un problema de sistema."*
- *"Tienes métricas. Pero el dashboard llega el martes. Y las decisiones se toman el lunes."*
- *"'Ya usamos Zapier para eso.' Lo que encontramos cuando miramos por dentro."*
- *"Escalar no debería significar contratar más personas para gestionar el mismo caos."*
- *"Cada vez que alguien copia un dato de una herramienta a otra, estás pagando un impuesto invisible."*

### Pilares de contenido
1. **Diagnóstico operativo** — Ayuda al ICP a nombrar su problema (Excel, reportes tardíos, dependencia de personas)
2. **Educación sistémica** — Diferencia entre automatizar tareas vs. diseñar sistemas; qué son las 4 capas
3. **Casos reales** — Antes/después con métricas concretas
4. **Oferta y proceso** — Cómo funciona el Sprint, qué incluye, qué esperar

---

## 6. SISTEMA DE VENTAS

**Embudo:**
```
LinkedIn / Outreach / Referidos
        ↓
    Web (filtra, no vende)
        ↓
    Calendly → "Diagnóstico Operativo" (30 min)
        ↓
    Llamada de diagnóstico (detectar problema real + fit)
        ↓
    Propuesta en <24h (máx 1 página: problema / alcance / precio)
        ↓
    Follow-up: D+0 propuesta / D+2 recordatorio / D+5 Loom / D+10 cierre
        ↓
    Firma + pago → Onboarding → Sprint → Deploy → Retainer (opcional)
```

**Reglas críticas de ventas:**
- La web no vende. La llamada vende.
- La llamada es diagnóstico, no pitch ni demo.
- Nunca cortar sin próximo paso definido.
- Propuesta siempre en menos de 24h.
- Si no hay fit, se dice directo.

**Preguntas clave en diagnóstico:**
- ¿Qué proceso te genera más fricción?
- ¿Qué pasa si falla ese proceso?
- ¿Cuánto te cuesta en horas y errores?
- ¿Intentaron resolverlo antes?
- ¿Cuándo necesitás esto resuelto?

**Fórmula ROI para calificar (usar en llamada):**
```
Horas manuales/semana × costo/hora × 4 semanas = costo mensual
Costo mensual × 12 = costo anual
Comparar vs. inversión del Sprint → si ROI > 2x en año 1, hay fit
```

**Herramientas:** Calendly (agenda), Loom (pre-call y follow-up), Notion (proyecto), Docusign (contrato), WhatsApp/Slack (comunicación).

---

## 7. REGLAS PARA LA IA

### Comportamiento general
- **Siempre** hablar en términos de sistemas, datos, procesos, control, escalabilidad.
- **Nunca** prometer resultados de marketing, ventas automáticas o growth.
- **Nunca** usar IA como argumento de venta central ("con IA vas a...").
- **Nunca** generar contenido genérico o teórico. Todo debe ser concreto y accionable.
- Si algo no está en los archivos del proyecto, no inventarlo.

### Al generar contenido (posts, copies, propuestas)
1. Empezar por el dolor concreto del ICP, no por el servicio.
2. Usar la estructura: Gancho → Agitación → Reencuadre → Solución → CTA.
3. Frases cortas. Flechas `→` para listas. Números reales.
4. CTA siempre de baja fricción: "hablemos", "diagnóstico gratuito", no "contratar".
5. Si es post de LinkedIn: respetar el tipo del día (dolor / educativo / prueba social).

### Al generar propuestas comerciales
1. Formato máximo 1 página.
2. Estructura: problema (en palabras del cliente) → alcance del Sprint → precio + cómo empezar.
3. No agregar servicios fuera del Sprint sin que el cliente lo pida.
4. No prometer resultados de negocio, sí prometer entregables técnicos concretos.

### Al diseñar automatizaciones
1. Diagnosticar causa raíz antes de proponer solución.
2. Arquitectura de 4 capas: Datos → Flujo → Ejecución → Control.
3. Priorizar fuente de verdad única antes de automatizar.
4. Todo sistema debe ser: auditable, documentado, independiente de personas.
5. Trabajar con el stack actual del cliente siempre que sea posible.

### Al analizar leads
Calificar según:
- ¿Es CEO/Founder/COO con poder de decisión?
- ¿La empresa ya opera (no está en etapa 0)?
- ¿Tiene fricción operativa concreta y nombrable?
- ¿Puede responder cuánto le cuesta el problema?
- ¿Busca operación o busca marketing/leads?

Si no pasa esos filtros → no es ICP, no forzar el proceso.

---

## 8. CASOS DE USO RÁPIDOS

### Generar un post de LinkedIn

**Input mínimo necesario:** tipo de post (dolor/educativo/prueba social) + tema o dolor a trabajar.

**Proceso:**
1. Construir hook que nombre el dolor exacto en 1 línea.
2. Desarrollar cuerpo con flechas `→`, frases cortas, reencuadre a arquitectura.
3. Cerrar con pregunta que incomode o CTA de baja fricción.
4. Si es prueba social: incluir antes → después con números.
5. Si es educativo: usar estructura de lista numerada o 4 capas.
6. Nunca incluir link en el cuerpo. Indicar que va en primer comentario.

### Crear propuesta comercial

**Input mínimo necesario:** notas de la llamada de diagnóstico (proceso, herramientas, dolor, resultado esperado).

**Proceso:**
1. Reformular el problema en las palabras del cliente.
2. Definir alcance cerrado: qué proceso se automatiza, qué se entrega.
3. Calcular ROI estimado con la fórmula de horas × costo.
4. Indicar precio + cómo empezar + cupos disponibles.
5. Máximo 1 página.

### Diseñar una automatización

**Input mínimo necesario:** proceso actual (herramientas, pasos manuales, quién lo hace, frecuencia).

**Proceso:**
1. Mapear causa raíz (no automatizar el síntoma).
2. Definir fuente de verdad única.
3. Diseñar las 4 capas: Datos / Flujo / Ejecución / Control.
4. Especificar: base de datos, integraciones core, worker programado, panel de métricas.
5. Documentar para que cualquiera lo opere sin el implementador.

### Analizar un lead

**Input mínimo necesario:** información del prospecto (rol, empresa, contexto, mensaje recibido).

**Proceso:**
1. Verificar si cumple criterios ICP (empresa con operación, decisor, fricción nombrable).
2. Identificar señales de compra (palabras clave de dolor operativo).
3. Detectar red flags (busca marketing, empresa en etapa 0, no tiene procesos).
4. Sugerir respuesta o mensaje de outreach alineado al tono de marca.

---

---

## 9. PRICING

| Etapa | Setup | Estructura de pago | Mantenimiento |
|---|---|---|---|
| Clientes 1 al 3 | USD 300 | USD 60 upfront + USD 240 al entregar | USD 50/mes x 3 meses |
| Clientes 4 en adelante | USD 600 | USD 120 upfront + USD 480 al entregar | USD 100/mes |

**Garantía:** si el sistema no funciona como acordamos, no se cobra el 80% restante.

**Costos de herramientas externas** (WhatsApp Business API, plataformas de automatización): a cargo del cliente directamente.

**Reglas de pricing:**
- El precio es el mismo independientemente del Sprint elegido (A, B o C).
- No negociar hacia abajo. Si no hay ROI claro, no es ICP.
- Contexto ROI para calificar: una agencia que pierde 1–2 operaciones/mes por respuesta lenta regala entre USD 6.000 y 20.000 en comisiones. El Sprint vale USD 300.
- El mantenimiento es opcional pero se ofrece en todos los cierres.

---

## 10. STACK TECNOLÓGICO

### Herramientas que usamos para construir

| Capa | Stack |
|---|---|
| Automatización / workflows | n8n |
| Backend / lógica custom | Node.js o C# (según complejidad) |
| Base de datos | Supabase (PostgreSQL) |
| Scraping / extracción de datos | Apify |
| Integraciones externas | APIs directas de cada herramienta |
| IA / modelos de lenguaje | APIs de modelos (OpenAI, Claude, etc.), RAG, Ollama para casos on-premise |

### Criterios de elección de stack
- **n8n** es el punto de entrada para la mayoría de automatizaciones. Preferido sobre Make/Zapier por control, self-hosting y capacidad técnica.
- **Supabase** como fuente de verdad central. Todos los proyectos que manejan datos persistentes van ahí.
- **Node o C#** cuando la lógica de negocio es demasiado compleja para manejarla en n8n.
- **Apify** para scraping o extracción de datos de fuentes sin API.
- **IA (APIs, RAG, Ollama):** se evalúa caso a caso. No se vende como feature principal — se integra cuando resuelve un problema concreto.
  - APIs de modelos: cuando el cliente necesita procesamiento de lenguaje (clasificación, resumen, generación)
  - RAG: cuando el cliente tiene base de conocimiento interna que necesita ser consultable
  - Ollama: casos extremos donde el cliente requiere privacidad total o no puede depender de APIs externas

### Herramientas del cliente que integramos (stack común de ICP)
HubSpot, Google Sheets, Airtable, Notion, Calendly, Gmail, Slack, WhatsApp Business, Zapier/Make (legacy a reemplazar), cualquier herramienta con API REST.

### Qué NO usamos
- Zapier / Make como arquitectura principal (sí como integración legacy si el cliente ya lo tiene)
- Herramientas sin API o sin posibilidad de integración
- Soluciones que generan dependencia del proveedor sin posibilidad de exportar datos

---

## 11. SISTEMA DE OUTREACH

### Pipeline de adquisición

```
Clay (versión free) → extracción y enriquecimiento de leads
        ↓
Dashboard interno → carga manual en Supabase (businesses + decision_makers)
        ↓
LinkedIn → outreach manual por estado del pipeline
        ↓
Calendly → llamada agendada (estado: agenda)
        ↓
R1 → R2 → Cliente
```

**Herramientas:**
- **Clay (free):** búsqueda y enriquecimiento de leads. Se exportan y se cargan manualmente al dashboard.
- **Dashboard propio** (`/proyectos-internos/ops/GoDreamAiDashboard`): Next.js + Supabase. Gestiona businesses, decision_makers, pipeline de oportunidades y calendario de contenido.
- **LinkedIn:** canal principal de outreach, operado manualmente.

### Estados del pipeline (tal como están en el dashboard)

| Estado | Significado | Acción esperada |
|---|---|---|
| `nuevo` | Lead cargado, sin contacto | Enviar solicitud de conexión |
| `conexion` | Solicitud enviada | Esperar aceptación |
| `mensaje` | Conexión aceptada, primer mensaje enviado | Esperar respuesta |
| `conversacion` | Respondió, hay intercambio | Calificar y llevar al diagnóstico |
| `agenda` | Llamada agendada en Calendly | Preparar diagnóstico |
| `r1` | Primera reunión realizada | Enviar propuesta o agendar R2 |
| `r2` | Segunda reunión / seguimiento | Cierre o descalificación |
| `cliente` | Sprint cerrado | Onboarding → Sprint |
| `seguimiento` | Cliente activo en retainer | Mantener relación |
| `descalificado` | No es ICP o no hay fit | Archivar con motivo |
| `rechazado` | Tenía fit pero dijo que no | Archivar, posible recontacto futuro |

**Tablas en Supabase:**
- `businesses`: empresa (nombre, industria, tamaño, LinkedIn, dominio)
- `decision_makers`: contacto (nombre, rol, LinkedIn, estado del pipeline, SDR asignado)
- `opportunity_history`: historial de cambios de estado por contacto
- `alert_settings`: alertas por días sin movimiento en cada estado
- `content`: calendario de contenido (hook, copy, CTA, tipo, fecha, estado)

### Mensaje de conexión LinkedIn (base)

```
Hola [Nombre], ¿cómo estás?

Estoy hablando con agencias inmobiliarias que están
creciendo y tienen fricción en la operación: leads que
no se responden a tiempo, comisiones en Excel, propietarios
que llaman para preguntar.

Me interesa conectar con perfiles como el tuyo.
```

**Reglas del mensaje:**
- No mencionar Go Dream AI ni el servicio en el primer mensaje.
- No pedir nada. El objetivo es la conexión, no vender.
- Personalizar el nombre siempre.
- Si hay contexto específico (CRM que usan, portales, cantidad de agentes), adaptar la segunda línea.

### Seguimiento post-conexión

**Estado actual (Abril 2026):** outreach en etapa muy temprana, 2 contactos totales.
Un lead respondió y dijo que hablaban después de Semana Santa — al recontactar, dejó en visto.
No hay datos suficientes de qué funciona. Los mensajes abajo son hipótesis a validar.

Una vez que acepta la conexión:

**Mensaje 1 (día 1–2 post-conexión):**
```
Gracias por conectar, [Nombre].

Veo que estás en [sector/rol]. Curioso: ¿cómo tienen
organizado hoy el lado operativo? ¿Todo corre sobre
herramientas sueltas o ya tienen algo integrado?
```

**Mensaje 2 — si no responde en 4–5 días (valor primero, sin pedir nada):**
```
[Nombre], te comparto algo que le resonó a mucha gente
esta semana por si te sirve:

[Pegar el texto del post de dolor más reciente]

Sin más.
```

**Mensaje 3 — si respondió o hubo interacción:**
```
[Nombre], si querés, te propongo 30 minutos para
revisar juntos qué procesos tienen más fricción en
tu operación.

Si hay algo concreto para resolver, te cuento cómo
lo encaramos. Si no, al menos salís con un diagnóstico.

¿Tenés espacio esta semana o la que viene?
```

**Nota sobre leads que dicen "hablamos después":**
Cuando alguien pospone ("hablamos después de X"), recontactar una sola vez pasada la fecha.
Si no responde o deja en visto → mover a `seguimiento` en el dashboard, no insistir.
El volumen de outreach resuelve más que el seguimiento agresivo a uno solo.

### Criterios de calificación antes de hacer outreach
Antes de contactar a un lead, verificar:
- Rol: Dueño / Founder / Director comercial / Gerente de la agencia
- Empresa: agencia inmobiliaria en operación (no nueva apertura)
- Tamaño: 3–30 agentes
- Antigüedad: mínimo 2 años operando
- Señales: usan CRM (Tokko, Inmovilla, Wasi, EasyBroker), reciben leads por portales, procesos manuales visibles

---

## 12. MAPA DE ARCHIVOS DEL PROYECTO

> Leer esta sección al inicio. Cada archivo tiene un rol específico — no solapar ni duplicar.

---

### Raíz

| Archivo | Qué contiene |
|---|---|
| `CLAUDE.md` | Este archivo. Fuente de verdad del negocio, ventas, ICP, comunicación, stack y outreach. Leer al inicio de cualquier sesión. |

---

### `.Marca/` — Sistema de contenido

Todo lo necesario para crear contenido de GDAI. Leer los 6 archivos antes de generar cualquier pieza.

| Archivo | Qué contiene | Cuándo usarlo |
|---|---|---|
| `Mapa_Maestro_Contenidos_Web_Automatizacion_Software.md` | **FUENTE DE TEMAS.** 18 temas maestros, 4 pilares, subtemas generales y aplicación a inmobiliarias, 9 enfoques posibles (diagnóstico, consecuencia, educación, solución, comparación, caso práctico, mito, checklist, opinión), 5 niveles de conciencia. Todo el contenido debe desprenderse de aquí. | **Siempre, antes de elegir cualquier tema.** La skill `/calendario-contenido` y cualquier pieza suelta deben seleccionar tema y subtema de este mapa. |
| `brand.md` | Identidad: qué es GDAI, a quién le habla, propuesta de valor, colores, tipografía, voz, vocabulario permitido/prohibido, CTA principal. | Siempre. Base de cualquier pieza. |
| `config.md` | Reglas de lenguaje: voseo, palabras que se reemplazan, frases de tono, frases prohibidas, estructura por formato (Reel/Carrusel/Stories/LinkedIn), pilares con % de frecuencia, CTAs variantes, herramientas de producción disponibles. | Al escribir cualquier copy o guión. |
| `calendario-base.md` | Frecuencia semanal, estructura día a día, fórmula de cada formato con tiempos, banco de dolores por pilar, métricas que importan, qué nunca publicar. | Al planificar semanas o generar batches de contenido. |
| `formula-narrativa.md` | Fórmula maestra HOOK→AGITACIÓN→REENCUADRE→SISTEMA→CTA aplicada a cada formato. Banco de 17 hooks en rioplatense. Tono exacto. Fase actual: crecimiento 0→500 seguidores. Qué cambia al llegar a 200–500. | Al construir cualquier pieza desde cero. |
| `estrategias-plataforma.md` | **LEER SIEMPRE.** Estrategias de plataforma aprendidas por Pablo (mentor, prueba propia, referencia). Tap-tap Stories, hooks por slide, etc. Se actualiza continuamente. | Al planificar o generar cualquier pieza de contenido. |
| `Prompt generar historia o carrucel.txt` | Prompt para generar imágenes con avatar (Stories/Carruseles). Reglas de formato, colores, texto en pantalla. | Al generar piezas visuales con IA de imagen. |
| `investigacion gpt y claude/` | Análisis de creadores de referencia (Cubría, Doglio, Orozco, Teo Egaña, Nahue Urso, etc.). Ya está destilado en `formula-narrativa.md`. | Solo si necesitás revisar la fuente de algún patrón. |

---

### `.Context/` — Contexto operativo

No es contenido — es el "por qué" detrás de lo que comunicamos.

| Archivo | Qué contiene | Cuándo usarlo |
|---|---|---|
| `Context.md` | Contexto v2.0: servicios con precios, stack, ICP, no-ICP, modelo de negocio, ROI del cliente, objeciones con respuestas, diferenciadores. | Al generar propuestas o responder objeciones. |
| `ventayonboarding.md` | Embudo completo: awareness→web→WhatsApp→cierre. Cualificación. Propuesta. Follow-up día a día. Onboarding paso a paso. | Al manejar leads o preparar onboarding. |
| `analisis-linkedin-outbound.md` | Benchmarks LinkedIn 2025. Funnel en 3 escenarios. Diagnóstico de qué falla. Recomendaciones primeros 30 días. | Al planificar outreach o evaluar resultados del canal. |

---

### `clientes/` — Un proyecto por cliente

| Elemento | Qué contiene |
|---|---|
| `template-cliente/` | Plantilla base. Copiar para cada cliente nuevo. |
| `template-cliente/context.md` | Brief del cliente: empresa, proceso, herramientas, dolor, resultado esperado. |
| `template-cliente/sprint.md` | Alcance cerrado, arquitectura, timeline, checklist de entregables. |
| `template-cliente/propuesta.md` | Propuesta comercial lista para enviar (1 página). |
| `template-cliente/notas-llamadas.md` | Registro cronológico de calls y diagnóstico. |
| `leads_san_nicolas.csv` | 24 inmobiliarias de San Nicolás con nombre, teléfono, web, rating. Base de outreach local. |

**Al abrir un proyecto de cliente:** leer `context.md` → `notas-llamadas.md` → `sprint.md` en ese orden.

---

### `proyectos-internos/` — Productos propios

| Carpeta | Qué contiene |
|---|---|
| `whatsapp-bot-Baileys/` | Bot WhatsApp con Baileys (API no oficial). MVP del servicio. Next.js + SQLite. Autenticación activa en `/auth`. |
| `whatsapp-bot-EvolutionApi/` | Bot WhatsApp con Evolution API. Segunda iteración, más estable. |
| `GDAI-whatsapp-crm-EvoApi/` | CRM propio integrado con Evolution API. Monorepo con docs de arquitectura y progreso. |
| `LandingPageHighTicket/` | Landing page de GDAI. Next.js + Tailwind. Chatbot de ventas. Deployada en Vercel. |
| `ops/GoDreamAiDashboard/` | Dashboard interno. Next.js + Supabase. Gestiona leads, pipeline y calendario de contenido. |
| `referencias/` | Librerías de referencia para desarrollo (midudev picks 2023–2025). Solo uso técnico. |

---

### `.Plantillas/` — Contenido ya publicado

Carruseles producidos. Referencia de estilo visual validado.

| Carpeta | Qué es |
|---|---|
| `10-dias-sprint-real/` | Carrusel "10 días, sprint real". 8 slides. |
| `Automatizar no es disenar sistemas/` | Carrusel diferencia automatización vs. arquitectura. 5 slides. |
| `zapier-no-es-una-automatizacion-real/` | Carrusel limitaciones de Zapier. 5 slides. |
| `tu-empresa-no-tiene-un-problema-de-arquitectura/` | Carrusel diagnóstico operativo. 6 slides. |
| `gdai-carousel.html` / `gdai-viernes10-caso-real.html` | Templates HTML para generar slides programáticamente. |

---

**Convención de nombres para clientes:** kebab-case. Ej: `clientes/cartey-inmobiliaria/`

---

---

## 17. DATOS DEL SECTOR INMOBILIARIO (para contenido y ventas)

Datos verificados. Usar en posts, outreach, propuestas y llamadas sin necesitar casos propios todavía.

- El agente promedio tarda **917 minutos (más de 15 horas)** en responder un lead nuevo — Inman 2025
- El **78%** de los compradores trabaja con el primer agente que responde — NAR 2025
- El **41%** de las inmobiliarias nunca responde un lead de su propia web — Roof AI
- Solo el **9%** responde en menos de 5 minutos — Roof AI
- El **48%** de los agentes no hace ningún seguimiento después de la primera llamada — HubSpot
- Responder en menos de 5 minutos hace **21 veces más probable** calificar el lead — MIT Lead Response Management
- La calidad del lead cae un **80%** después de los primeros 5 minutos — Harvard Business Review
- España tiene más de **66.200 agencias inmobiliarias** activas — DBK/INFORMA 2024
- El **73%** de profesionales inmobiliarios planea adoptar nuevas tecnologías a corto plazo — PwC PropTech Trends 2024
- El **62%** de las búsquedas inmobiliarias en España ocurren entre las 19:00 y las 23:00, cuando las oficinas están cerradas

**Dolores validados con datos:**
→ Dolor A (respuesta lenta): 917 min promedio vs. 5 min necesarios = diferencia de 21x en conversión
→ Dolor B (comisiones en Excel): ningún CRM hispano resuelve comisiones con integración fiscal local
→ Dolor C (reportes al propietario): ningún CRM hispano automatiza bien el reporte al propietario vendedor

---

*Go Dream AI — go@godreamai.com — godreamai.com*
*Versión 2.0 — Mayo 2026 — Nicho: agencias inmobiliarias Argentina*
