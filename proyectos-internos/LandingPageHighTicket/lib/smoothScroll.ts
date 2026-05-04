/**
 * Función simple para hacer scroll suave usando scrollIntoView nativo
 * Más confiable y sencilla que la implementación anterior
 */
export function handleSmoothScroll(
  e: React.MouseEvent<HTMLAnchorElement>,
  offset: number = 120
) {
  const href = e.currentTarget.getAttribute('href')
  if (!href || !href.startsWith('#')) return

  e.preventDefault()
  const targetId = href.substring(1) // Remover el #
  const element = document.getElementById(targetId)
  
  if (!element) {
    // Si no encuentra el elemento, intenta navegar normalmente
    window.location.href = href
    return
  }

  // Calcular la posición con offset
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - offset

  // Usar scrollTo con behavior smooth (más confiable que scrollIntoView con offset)
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}

