export interface Property {
  id: string;
  slug: string;
  title: string;
  operation: "venta" | "alquiler";
  type: "departamento" | "casa" | "terreno" | "local" | "oficina";
  zone: string;
  price: string;
  surface: string;
  rooms: number;
  bathrooms: number;
  image: string;
  featured: boolean;
  description: string;
}

export interface Zone {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  propertyCount: number;
}

export interface TeamMember {
  name: string;
  role: string;
  license?: string;
  image: string;
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
  operation: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}
