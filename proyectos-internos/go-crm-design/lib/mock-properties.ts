import { DEFAULT_PROPERTY_VIDEO_URL } from "@/lib/constants";

export interface Property {
  id: string;
  title: string;
  type: "Venta" | "Alquiler";
  category: string;
  price: string;
  address: string;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  description: string;
  images: string[];
  videoUrl?: string;
  status: "Disponible" | "Reservada" | "Vendida";
  publicationStatus: "Publicada" | "Borrador" | "Oculta";
  views: number;
  contactClicks: number;
}

export const initialProperties: Property[] = [
  {
    id: "1",
    title: "PH en Palermo Hollywood",
    type: "Venta",
    category: "PH",
    price: "$320,000",
    address: "Thames 1842, Palermo",
    neighborhood: "Palermo",
    bedrooms: 3,
    bathrooms: 2,
    sqm: 140,
    description: "Hermoso PH de 3 ambientes con terraza propia, cocina integrada y luminoso living.",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    ],
    videoUrl: DEFAULT_PROPERTY_VIDEO_URL,
    status: "Disponible",
    publicationStatus: "Publicada",
    views: 842,
    contactClicks: 96,
  },
  {
    id: "2",
    title: "Apartamento 2 amb. Belgrano",
    type: "Venta",
    category: "Departamento",
    price: "$185,000",
    address: "Cramer 2341, Belgrano",
    neighborhood: "Belgrano",
    bedrooms: 2,
    bathrooms: 1,
    sqm: 68,
    description: "Moderno departamento con amenities, piscina y seguridad 24hs en edificio premium.",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80"],
    videoUrl: DEFAULT_PROPERTY_VIDEO_URL,
    status: "Disponible",
    publicationStatus: "Publicada",
    views: 728,
    contactClicks: 54,
  },
  {
    id: "3",
    title: "Casa en Nordelta",
    type: "Alquiler",
    category: "Casa",
    price: "$5,200 /mes",
    address: "Av. Los Lagos 1200, Nordelta",
    neighborhood: "Tigre",
    bedrooms: 4,
    bathrooms: 3,
    sqm: 280,
    description: "Amplia casa en barrio privado con jardín, pileta y cochera doble. Ideal familias.",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80",
    ],
    videoUrl: DEFAULT_PROPERTY_VIDEO_URL,
    status: "Reservada",
    publicationStatus: "Publicada",
    views: 615,
    contactClicks: 88,
  },
  {
    id: "4",
    title: "Loft en Puerto Madero",
    type: "Venta",
    category: "Loft",
    price: "$450,000",
    address: "Pierina Dealessi 750, Puerto Madero",
    neighborhood: "Puerto Madero",
    bedrooms: 1,
    bathrooms: 1,
    sqm: 95,
    description: "Exclusivo loft con vista al rio, terminaciones de lujo y acceso directo al dique.",
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80"],
    videoUrl: DEFAULT_PROPERTY_VIDEO_URL,
    status: "Disponible",
    publicationStatus: "Borrador",
    views: 590,
    contactClicks: 0,
  },
  {
    id: "5",
    title: "Monoambiente Villa Crespo",
    type: "Alquiler",
    category: "Departamento",
    price: "$980 /mes",
    address: "Corrientes 5412, Villa Crespo",
    neighborhood: "Villa Crespo",
    bedrooms: 1,
    bathrooms: 1,
    sqm: 38,
    description: "Coqueto monoambiente con balcon, muy luminoso y cerca del subte. Ideal para profesionales.",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80"],
    videoUrl: DEFAULT_PROPERTY_VIDEO_URL,
    status: "Disponible",
    publicationStatus: "Publicada",
    views: 504,
    contactClicks: 61,
  },
  {
    id: "6",
    title: "Local comercial Microcentro",
    type: "Alquiler",
    category: "Local",
    price: "$3,800 /mes",
    address: "Florida 856, Microcentro",
    neighborhood: "Microcentro",
    bedrooms: 0,
    bathrooms: 1,
    sqm: 120,
    description: "Amplio local en peatonal Florida, excelente vidriera y alto trafico peatonal.",
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80"],
    status: "Disponible",
    publicationStatus: "Oculta",
    views: 412,
    contactClicks: 15,
  },
];
