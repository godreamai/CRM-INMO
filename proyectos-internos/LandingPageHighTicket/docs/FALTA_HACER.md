# Tareas Pendientes - Configuración de Variables de Entorno

## 📋 Variables de Entorno Pendientes

Este documento contiene la información sobre las variables de entorno que necesitas completar en tu archivo `.env` para que el proyecto funcione correctamente.

---

## 🔧 Variables Requeridas (Mínimas)

Estas variables son **obligatorias** para que el proyecto funcione:

### 1. Configuración del Sitio

```env
NEXT_PUBLIC_SITE_URL=https://godreamai.com
```

**Estado:** ✅ Ya configurada (o usar el valor por defecto)

---

### 2. Webhooks N8N - Chatbot

#### Producción
```env
NEXT_PUBLIC_N8N_WEBHOOK_CHAT_PRODUCTION=https://tu-webhook-n8n.com/webhook/CHAT-PRODUCCION
```

**Estado:** ⚠️ **PENDIENTE** - Necesitas obtener la URL del webhook de n8n para el Chatbot en producción

#### Desarrollo
```env
NEXT_PUBLIC_N8N_WEBHOOK_CHAT_DEV=https://tu-webhook-n8n.com/webhook-test/CHAT-DESARROLLO
```

**Estado:** ⚠️ **PENDIENTE** - Necesitas obtener la URL del webhook de n8n para el Chatbot en desarrollo

---

### 3. Webhooks N8N - Formulario de Agenda

#### Producción
```env
NEXT_PUBLIC_N8N_WEBHOOK_FORM_PRODUCTION=https://tu-webhook-n8n.com/webhook/FORMULARIO-PRODUCCION
```

**Estado:** ⚠️ **PENDIENTE** - Necesitas obtener la URL del webhook de n8n para los formularios en producción

#### Desarrollo
```env
NEXT_PUBLIC_N8N_WEBHOOK_FORM_DEV=https://tu-webhook-n8n.com/webhook-test/FORMULARIO-DESARROLLO
```

**Estado:** ⚠️ **PENDIENTE** - Necesitas obtener la URL del webhook de n8n para los formularios en desarrollo

---

## 📝 Archivo .env Completo (Plantilla)

Copia este contenido a tu archivo `.env` y reemplaza las URLs con tus webhooks reales:

```env
# ============================================
# CONFIGURACIÓN DEL SITIO
# ============================================
NEXT_PUBLIC_SITE_URL=https://godreamai.com

# ============================================
# WEBHOOKS N8N - CHATBOT
# ============================================
# Webhook de producción para el Chatbot
NEXT_PUBLIC_N8N_WEBHOOK_CHAT_PRODUCTION=https://tu-webhook-n8n.com/webhook/CHAT-PRODUCCION

# Webhook de desarrollo para el Chatbot
NEXT_PUBLIC_N8N_WEBHOOK_CHAT_DEV=https://tu-webhook-n8n.com/webhook-test/CHAT-DESARROLLO

# ============================================
# WEBHOOKS N8N - FORMULARIO DE AGENDA
# ============================================
# Webhook de producción para Formularios
NEXT_PUBLIC_N8N_WEBHOOK_FORM_PRODUCTION=https://tu-webhook-n8n.com/webhook/FORMULARIO-PRODUCCION

# Webhook de desarrollo para Formularios
NEXT_PUBLIC_N8N_WEBHOOK_FORM_DEV=https://tu-webhook-n8n.com/webhook-test/FORMULARIO-DESARROLLO
```

---

## 🔍 Cómo Obtener las URLs de los Webhooks de n8n

1. **Accede a tu instancia de n8n**
2. **Crea o localiza tus workflows:**
   - Un workflow para el Chatbot
   - Un workflow para los Formularios de Agenda
3. **Obtén la URL del webhook:**
   - Haz clic en el nodo "Webhook" de tu workflow
   - Copia la URL que aparece (ejemplo: `https://n8n.tudominio.com/webhook/abc123...`)
4. **Distingue entre producción y desarrollo:**
   - Si tienes dos instancias de n8n (producción y desarrollo), usa URLs diferentes
   - Si solo tienes una instancia, puedes usar la misma URL o crear workflows separados

---

## ⚠️ Notas Importantes

- **Variables `NEXT_PUBLIC_*`:** Estas variables son accesibles en el cliente (navegador), por lo que no deben contener información sensible
- **Fallback automático:** Si no configuras los webhooks de formularios, se usarán automáticamente los del Chatbot como respaldo
- **Valores por defecto:** El código tiene valores por defecto hardcodeados, pero es mejor usar variables de entorno para mayor flexibilidad
- **En Vercel:** Recuerda configurar estas mismas variables en **Settings → Environment Variables** cuando hagas el deploy

---

## ✅ Checklist

- [ ] Obtener URL del webhook del Chatbot (producción)
- [ ] Obtener URL del webhook del Chatbot (desarrollo)
- [ ] Obtener URL del webhook de Formularios (producción)
- [ ] Obtener URL del webhook de Formularios (desarrollo)
- [ ] Completar el archivo `.env` con todas las URLs
- [ ] Probar el Chatbot en desarrollo
- [ ] Probar el Formulario de Agenda en desarrollo
- [ ] Configurar las variables en Vercel para producción
- [ ] Probar el Chatbot en producción
- [ ] Probar el Formulario de Agenda en producción

---

**Última actualización:** Diciembre 2024

---

## 💾 Capacidad de Base de Datos Vercel (256 MB Gratis)

### 📊 Cálculo de Capacidad para Leads

**Campos por registro de formulario:**
- `nombre`: ~30 caracteres (~30 bytes)
- `email`: ~40 caracteres (~40 bytes)
- `telefono`: ~15 caracteres (~15 bytes)
- `tipoNegocio`: ~20 caracteres (~20 bytes)
- `principalObstaculo`: ~30 caracteres (~30 bytes)
- `urgencia`: ~10 caracteres (~10 bytes)
- `timestamp`: ~24 caracteres (~24 bytes)
- `source`: ~20 caracteres (~20 bytes)

**Total por registro:** ~189 bytes de datos + overhead de PostgreSQL (~88 bytes) = **~277 bytes por lead**

### 🎯 Capacidad Estimada

**Con 256 MB (268,435,456 bytes):**
- **~970,000 registros de leads** (solo formularios)
- **~580,000 conversaciones de chatbot** (si guardas mensajes completos)
- **~485,000 leads + conversaciones mixtas** (escenario realista)

### 💡 Recomendaciones para Incluir en el Costo de Mantenimiento

**Plan Gratuito (256 MB):**
- ✅ **Adecuado para:** Hasta ~50,000 leads/año (~1,000 leads/mes)
- ✅ **Ideal para:** Clientes pequeños/medianos
- ✅ **Costo adicional:** $0/mes

**Si superan el límite:**
- **Plan Pro:** $20/mes por usuario
- **Almacenamiento adicional:** ~$0.20 por GB/mes
- **Ejemplo:** Si necesitan 1 GB adicional = $0.20/mes

### 📈 Escalabilidad

**Para calcular cuándo necesitarán más espacio:**
- **1,000 leads/mes** = ~12,000 leads/año = ~3.3 MB/año
- **Con 256 MB:** Duración aproximada de **~77 años** solo con leads
- **Con conversaciones de chatbot:** Duración aproximada de **~40-50 años**

### ✅ Conclusión

**256 MB es más que suficiente** para la mayoría de clientes. Puedes incluirlo en el costo de mantenimiento sin preocuparte por límites a corto/medio plazo. Solo necesitarás escalar si un cliente tiene un volumen muy alto de tráfico (más de 10,000 leads/mes).

---

