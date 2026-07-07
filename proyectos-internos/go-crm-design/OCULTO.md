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

---

## 2026-07-07 — Header: campanita de notificaciones

- **Dónde:** `components/dashboard/header.tsx`
- **Qué se sacó:** el botón con el ícono `Bell` (campanita) y su puntito verde de "hay novedades" (`animate-pulse`), ubicado a la izquierda del avatar del usuario.
- **Para restaurar:** volver a importar `Bell` de `lucide-react` y agregar este bloque justo antes del `DropdownMenu` del avatar:
  ```tsx
  <button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200">
    <Bell className="w-5 h-5" />
    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full animate-pulse" />
  </button>
  ```

---

## 2026-07-07 — Configuración → Seguridad: "Autenticación en dos pasos" y "Sesiones activas"

- **Dónde:** `components/dashboard/sections/settings.tsx`, tab "Seguridad".
- **Qué se sacó:** las dos `Card` completas. Queda solo la tarjeta de cambio de contraseña.
- **"Autenticación en dos pasos" tenía:** card con ícono `Key`, "Aplicacion autenticadora", badge "Activado" y botón "Administrar".
- **"Sesiones activas" tenía:** lista de 3 dispositivos mock (Notebook oficina, iPhone 15, Chrome en Windows) con ubicación, hora y botón "Revocar" (excepto en la sesión actual).
- **Import que se sacó:** `Key` de `lucide-react` (quedó sin uso). `Globe` se mantuvo porque lo sigue usando "Formato de moneda".
- **Para restaurar:** las dos `Card` completas están en el historial de este archivo justo antes de este commit/edit.

---

## 2026-07-07 — Equipo: tab "Rendimiento" (métricas y facturación)

- **Dónde:** `components/dashboard/sections/team.tsx`
- **Decisión del negocio:** el módulo de Equipo pasa a ser solo gestión de acceso (agregar hasta 3 miembros, editarlos, eliminarlos o bloquearlos). Nada de métricas ni datos financieros por agente.
- **Qué se sacó:** el tab completo "Rendimiento" y el sistema de tabs que lo contenía (ahora `TeamSection` es una sola vista, sin `Tabs`).
  - KPIs: Facturación del equipo, Operaciones cerradas, Cumplimiento de meta.
  - Gráfico de barras "Facturación vs Meta" (revenue vs quota por agente, recharts).
  - Grid de tarjetas por agente con: revenue, deals cerrados, % de cumplimiento de meta, indicador de cambio (+/-), trofeo para el top 3.
  - Interfaces/datos: `TeamMember`, array mock `teamMembers` (con revenue/quota/deals/rank), `performanceData`, componentes `TeamMemberCard` y `PerformanceTab`.
- **Qué se agregó en su lugar (dentro de "Miembros"):**
  - Acción **Editar** por miembro (reutiliza `InviteMemberModal` en modo edición, ahora con campo Nombre).
  - Acción **Bloquear/Reactivar acceso** (nuevo estado `"Bloqueado"` en `OrgMember`, función `toggleBlock` en `team-members-context.tsx`).
  - Límite de plan bajado de 6 a 3 (`TEAM_SEAT_LIMIT` en `lib/constants.ts`).
- **Para restaurar:** el tab "Rendimiento" completo está en el historial de este archivo justo antes de este commit/edit. Si se recupera, hay que volver a envolver `TeamSection` en `Tabs` con "Rendimiento" y "Miembros".
