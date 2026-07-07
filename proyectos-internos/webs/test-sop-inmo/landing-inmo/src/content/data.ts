import type { Property, Zone, TeamMember, Testimonial, FAQItem } from "@/types";

export const SITE = {
  name: "Piedra & Zafa",
  city: "San Nicolás",
  province: "Buenos Aires",
  phone: "+5493364621890",
  whatsapp: "5493364621890",
  email: "info@piedrayzafa.com.ar",
  address: "Belgrano 245, San Nicolás",
  matricula: "PCI 1234 — Colegio de Corredores de la Prov. de Bs. As.",
  yearsInBusiness: 12,
  propertiesSold: 184,
  social: {
    instagram: "https://instagram.com/piedrayzafa",
    facebook: "https://facebook.com/piedrayzafa",
  },
};

export const NAV_LINKS = [
  { label: "Propiedades", href: "/propiedades" },
  { label: "Zonas", href: "/#zonas" },
  { label: "Vender", href: "/vender-mi-propiedad" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

export const PROPERTIES: Property[] = [
  {
    id: "1",
    slug: "depto-mitre-al-200-2amb",
    title: "Mitre al 200 — 2 ambientes con balcón",
    operation: "alquiler",
    type: "departamento",
    zone: "Centro",
    price: "$250.000/mes",
    surface: "45 m²",
    rooms: 2,
    bathrooms: 1,
    image: "/images/prop-1.jpg",
    featured: true,
    description: "Segundo piso por escalera. Living con balcón al frente sobre Mitre, cocina integrada con barra, baño completo refaccionado hace 2 años. Piso porcelanato en toda la unidad.",
  },
  {
    id: "2",
    slug: "casa-sarmiento-800-norte",
    title: "Sarmiento 800 — Casa 3 dormitorios, Barrio Norte",
    operation: "venta",
    type: "casa",
    zone: "Barrio Norte",
    price: "USD 120.000",
    surface: "120 m² cubiertos",
    rooms: 4,
    bathrooms: 2,
    image: "/images/prop-2.jpg",
    featured: true,
    description: "Lote 10x30. Living comedor con estufa a leña, cocina renovada con muebles de melamina, dormitorio principal en suite. Quincho con parrilla y patio con riego. Cochera semicubierta.",
  },
  {
    id: "3",
    slug: "local-rivadavia-540-comercial",
    title: "Rivadavia 540 — Local a la calle, zona bancaria",
    operation: "alquiler",
    type: "local",
    zone: "Centro",
    price: "$450.000/mes",
    surface: "65 m²",
    rooms: 1,
    bathrooms: 1,
    image: "/images/prop-3.jpg",
    featured: true,
    description: "Local con vitrina de 4 metros sobre Rivadavia, entre San Martín y Nación. Piso cerámico, aire split, baño propio. Zona de alto tránsito peatonal y vehicular.",
  },
  {
    id: "5",
    slug: "depto-rivera-piso-8-3amb",
    title: "Rivera — Piso 8 con vista al Paraná",
    operation: "venta",
    type: "departamento",
    zone: "Rivera",
    price: "USD 95.000",
    surface: "70 m²",
    rooms: 3,
    bathrooms: 1,
    image: "/images/prop-5.jpg",
    featured: true,
    description: "Tercer edificio desde la costanera. Balcón terraza con vista panorámica al río y la isla. Dormitorios con placard, baño completo, cocina independiente. Cochera descubierta opcional.",
  },
  {
    id: "7",
    slug: "casa-quinta-la-emilia-parque",
    title: "La Emilia — Casa quintana con parque y pileta",
    operation: "venta",
    type: "casa",
    zone: "La Emilia",
    price: "USD 150.000",
    surface: "180 m² cubiertos",
    rooms: 4,
    bathrooms: 2,
    image: "/images/prop-7.jpg",
    featured: true,
    description: "Parcela de 800 m² con parque arbolado (2 tipas, 1 limonero). Pileta de 8x4 con solarium. Living con hogar, cocina comedor con vista al jardín, galería cubierta de 20 m².",
  },
  {
    id: "10",
    slug: "casa-villa-amelia-3dorm",
    title: "Villa Amelia — Casa de 3 dormitorios sobre Ascasubi",
    operation: "venta",
    type: "casa",
    zone: "Villa Amelia",
    price: "USD 85.000",
    surface: "95 m²",
    rooms: 3,
    bathrooms: 1,
    image: "/images/prop-10.jpg",
    featured: true,
    description: "Lote 8x25. Living con piso ceramicón, cocina comedor con ventanal al contrafrente, 3 dormitorios (el principal con placard empotrado). Fondo libre de 6 metros con lavadero.",
  },
  {
    id: "4",
    slug: "terreno-barrio-sur-10x30",
    title: "Barrio Sur — Lote 10x30, todos los servicios",
    operation: "venta",
    type: "terreno",
    zone: "Barrio Sur",
    price: "USD 45.000",
    surface: "300 m²",
    rooms: 0,
    bathrooms: 0,
    image: "/images/prop-4.jpg",
    featured: false,
    description: "Lote en esquina sobre calle colectora. Red de gas natural, cloacas y electricidad en la vereda. A 3 cuadras de colectivo urbano. Barrio en crecimiento con obras recientes.",
  },
  {
    id: "12",
    slug: "depto-san-martin-300-pb",
    title: "San Martín 300 — Depto PB con patio propio",
    operation: "venta",
    type: "departamento",
    zone: "Centro",
    price: "USD 75.000",
    surface: "65 m²",
    rooms: 3,
    bathrooms: 1,
    image: "/images/prop-12.jpg",
    featured: false,
    description: "Planta baja con patio de 4x3 exclusivo. Living comedor con pisos de pinotea restaurados, cocina independiente con ventilación, 2 dormitorios con placard. Bajo escalera con depósito.",
  },
];

export const ZONES: Zone[] = [
  {
    id: "centro",
    name: "Centro",
    slug: "centro",
    description: "De la Peatonal a la plaza San Martín. Comercios, bancos, la municipalidad y los edificios más altos de la ciudad. Donde todo pasa y donde se decide el precio por metro cuadrado de referencia.",
    image: "/images/zone-centro.jpg",
    propertyCount: 4,
  },
  {
    id: "barrio-norte",
    name: "Barrio Norte",
    slug: "barrio-norte",
    description: "Entre el hospital y la ruta. Casas de familia con jardín, edificios nuevos con cochera y la salida más rápida a la autopista Rosario-Bs. As. Residencial, tranquilo, con servicios.",
    image: "/images/zone-norte.jpg",
    propertyCount: 1,
  },
  {
    id: "rivera",
    name: "Rivera del Paraná",
    slug: "rivera",
    description: "La costanera y las barrancas. Los edificios con orientación noreste miran la isla y atajan los mejores atardeceres de la ciudad. Pocas unidades, mucha demanda.",
    image: "/images/zone-rivera.jpg",
    propertyCount: 1,
  },
  {
    id: "la-emilia",
    name: "La Emilia",
    slug: "la-emilia",
    description: "El barrio con identidad propia. Casas quintanas, calles anchas arboladas, el club, la escuela y la tranquilidad de vivir a 10 minutos del centro sin sentir el centro.",
    image: "/images/zone-emilia.jpg",
    propertyCount: 1,
  },
];

export const TEAM: TeamMember[] = [
  {
    name: "Martín Piedra",
    role: "Corredor inmobiliario — Director",
    license: "PCI 1234",
    image: "/images/team-martin.jpg",
  },
  {
    name: "Lucía Zafa",
    role: "Asesora inmobiliaria",
    license: "PCI 5678",
    image: "/images/team-lucia.jpg",
  },
  {
    name: "Tomás Ríos",
    role: "Asesor comercial — Alquileres",
    image: "/images/team-tomas.jpg",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Carolina M.",
    text: "Nos mostraron 4 propiedades y una era la correcta. En 3 semanas ya estábamos firmando el boleto. Lo que valoro es que no nos hicieron perder tiempo.",
    rating: 5,
    operation: "Compra en Barrio Norte",
  },
  {
    name: "Ricardo P.",
    text: "El rango de tasación coincidió con lo que después ofrecieron los compradores. No hubo sorpresas. Eso es lo que pedís de un corredor.",
    rating: 5,
    operation: "Venta en Centro",
  },
  {
    name: "Laura G.",
    text: "Alquilé un local sobre Rivadavia y me acompañaron con el contrato, la habilitación municipal y hasta con contactos del barrio. Eso no hace cualquiera.",
    rating: 4,
    operation: "Alquiler comercial",
  },
];

export const FAQ: FAQItem[] = [
  {
    question: "¿Cuánto tardan en responder una consulta?",
    answer: "Menos de 2 horas en horario hábil. Si escribis de noche o fin de semana, contestamos a primera hora del dia siguiente. No hay bot ni cadena automatica.",
  },
  {
    question: "¿Cobran honorarios el comprador o el vendedor?",
    answer: "En compra-venta, cada parte abona 3% sobre el precio de operacion (reglamento del Colegio de Corredores). En alquileres, el inquilino abona un mes de alquiler. Te lo explicamos con claridad antes de cualquier compromiso.",
  },
  {
    question: "¿Puedo publicar mi propiedad con ustedes si ya esta en otro lado?",
    answer: "Si, siempre que no tengas un contrato de exclusividad vigente con otra inmobiliaria. Evaluamos tu propiedad y la incorporamos a nuestra cartera con fotografia y descripcion profesional.",
  },
  {
    question: "¿Tienen propiedades que no aparecen en la web?",
    answer: "Algunos propietarios prefieren difusion reservada. Si no encontras lo que buscas en el listado, escribinos y te contamos si hay opciones que se ajusten a tu busqueda.",
  },
  {
    question: "¿La tasacion tiene algun costo?",
    answer: "No. Hacemos una evaluacion con datos de mercado, zona y caracteristicas de la propiedad. Es gratuita y sin obligacion de contratar nuestros servicios.",
  },
];

export function getWhatsAppUrl(context: string): string {
  const message = encodeURIComponent(
    `Hola, vi la web de Piedra & Zafa. ${context}`
  );
  return `https://wa.me/${SITE.whatsapp}?text=${message}`;
}
