# Deploy en Vercel - Go Dream Ai

Guía para desplegar Go Dream Ai en Vercel.

## 🚀 Pasos para Deploy

### 1. Conectar Repositorio

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click en **"Add New Project"**
3. Conecta tu repositorio GitHub
4. Selecciona el proyecto

### 2. Configurar Variables de Entorno

En **Settings → Environment Variables**, agrega las siguientes variables:

#### Variables Requeridas (Mínimas)

```env
# URL del sitio
NEXT_PUBLIC_SITE_URL=https://godreamai.com

# Webhook n8n para Chatbot (producción)
NEXT_PUBLIC_N8N_WEBHOOK_URL_PRODUCTION=https://n8n.srv1150223.hstgr.cloud/webhook/06cef041-60fe-48a6-a2f0-d34d1899b6dc

# Webhook n8n para Chatbot (desarrollo - opcional)
NEXT_PUBLIC_N8N_WEBHOOK_URL_DEV=https://n8n.srv1150223.hstgr.cloud/webhook-test/06cef041-60fe-48a6-a2f0-d34d1899b6dc
```

#### Variables Opcionales (Formularios)

Si quieres usar un webhook diferente para los formularios de agenda:

```env
# Webhook n8n para Formularios (producción)
NEXT_PUBLIC_N8N_WEBHOOK_FORM_PRODUCTION=https://tu-webhook-n8n.com/webhook/formulario-produccion

# Webhook n8n para Formularios (desarrollo)
NEXT_PUBLIC_N8N_WEBHOOK_FORM_DEV=https://tu-webhook-n8n.com/webhook-test/formulario-desarrollo

# Webhook genérico (si no quieres separar por entorno)
NEXT_PUBLIC_N8N_WEBHOOK_FORM=https://tu-webhook-n8n.com/webhook/formulario
```

**Nota:** Si no configuras los webhooks de formularios, se usarán automáticamente los del Chatbot como respaldo.

### 3. Deploy

Click en **"Deploy"**. Vercel ejecutará:

1. `pnpm install`
2. `pnpm build`
3. Deploy

## ✅ Verificación Post-Deploy

- [ ] Build sin errores
- [ ] Web carga correctamente
- [ ] Formulario de agenda funciona
- [ ] Chatbot responde

## 📝 Dominio Personalizado

1. Ve a **Settings → Domains**
2. Agrega `godreamai.com`
3. Configura DNS en tu registrador:
   - Tipo: CNAME
   - Nombre: @
   - Valor: cname.vercel-dns.com

---

**Go Dream Ai** - godreamai.com

Última actualización: Diciembre 2024
