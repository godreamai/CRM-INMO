/**
 * Configuración de rutas de la aplicación
 * 
 * Puedes cambiar fácilmente las rutas desde aquí sin tener que buscar
 * en todo el código dónde se usan.
 */

export const ROUTES = {
  // Ruta principal de la landing
  HOME: '/',
  
  // Ruta de la página de agenda principal (página normal)
  // AGENDA: '/agenda',
  
  // Ruta de la página de venta (agenda llena)
  // Cambia este valor para modificar la ruta de acceso a la página de venta
  // AGENDA_LLENA: '/agenda-llena',
  
  // Otras rutas
  PRIVACIDAD: '/privacidad',
  TERMINOS: '/terminos',
  SISTEMA_VENTA_247: '/sistemadeventa247',
} as const

// Tipo para autocompletado
export type RouteKey = keyof typeof ROUTES

// Función helper para obtener rutas
export const getRoute = (key: RouteKey): string => {
  return ROUTES[key]
}


