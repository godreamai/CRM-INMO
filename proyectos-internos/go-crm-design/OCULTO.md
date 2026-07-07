# Registro de secciones ocultas

Log de todo lo que se saca de la vista en el CRM para no perder rastro. Cada entrada dice qué se ocultó, dónde vivía y qué tenía adentro, para poder reconstruirlo rápido si hay que traerlo de vuelta.

---

## 2026-07-07 — Configuración: tabs "Notificaciones" e "Integraciones"

- **Dónde:** `components/dashboard/sections/settings.tsx`
- **Qué se sacó:** los dos `TabsTrigger` + sus `TabsContent` completos (código eliminado, no comentado — recuperable desde el historial de este archivo o desde este log).
- **Tabs actuales que quedan:** Perfil, Organización, Seguridad.

**Tab "Notificaciones" tenía:**
- Tabla de preferencias con columnas Email/Push por tipo de aviso:
  - Cambios en operaciones, Actividad del equipo, Alertas de pipeline, Proyecciones, Estado de clientes.

**Tab "Integraciones" tenía:**
- Grid de servicios conectables (mock, sin backend real):
  - Tokko Broker, WhatsApp Business, Zonaprop/Argenprop, Gmail, Google Calendar, Facturación electrónica (AFIP/IIBB).
- Cada tarjeta con estado Conectado/No conectado, botón Sincronizar/Desconectar o Conectar.

**Para restaurar:** volver a agregar los dos `TabsTrigger` (iconos `Bell` y `Link2` de lucide-react) al `TabsList`, y los dos bloques `TabsContent` con los arrays `notificationSettings` e `integrations` (borrados del archivo). También hay que devolver el estado `notifications` + función `toggleNotification`.
