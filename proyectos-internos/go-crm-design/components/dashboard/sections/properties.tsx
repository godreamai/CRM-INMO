"use client";

import { useState } from "react";
import { Plus, Search, SlidersHorizontal, MapPin, Bed, Bath, Maximize2, Eye, Pencil, Trash2, Video, Images, Map } from "lucide-react";
import { AddPropertyModal } from "@/components/dashboard/add-property-modal";
import { Lightbox } from "@/components/dashboard/lightbox";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import { getGoogleMapsEmbedUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";

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
}

const initialProperties: Property[] = [
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
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    status: "Disponible",
    publicationStatus: "Publicada",
    views: 842,
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
    status: "Disponible",
    publicationStatus: "Publicada",
    views: 728,
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
    status: "Reservada",
    publicationStatus: "Publicada",
    views: 615,
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
    status: "Disponible",
    publicationStatus: "Borrador",
    views: 590,
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
    status: "Disponible",
    publicationStatus: "Publicada",
    views: 504,
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
  },
];

const typeFilter = ["Todos", "Venta", "Alquiler"] as const;
const statusFilter = ["Todos", "Disponible", "Reservada", "Vendida"] as const;
const publicationFilter = ["Todas", "Publicada", "Borrador", "Oculta"] as const;

const statusColors: Record<Property["status"], string> = {
  Disponible: "bg-accent/15 text-accent",
  Reservada: "bg-chart-3/15 text-chart-3",
  Vendida: "bg-chart-4/15 text-chart-4",
};

const typeColors: Record<Property["type"], string> = {
  Venta: "bg-chart-1/15 text-chart-1",
  Alquiler: "bg-accent/15 text-accent",
};

const publicationColors: Record<Property["publicationStatus"], string> = {
  Publicada: "bg-accent/15 text-accent",
  Borrador: "bg-secondary text-muted-foreground",
  Oculta: "bg-warning/15 text-warning",
};

export function PropertiesSection() {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState<typeof typeFilter[number]>("Todos");
  const [activeStatus, setActiveStatus] = useState<typeof statusFilter[number]>("Todos");
  const [activePublication, setActivePublication] = useState<typeof publicationFilter[number]>("Todas");

  const filtered = properties.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase()) ||
      p.neighborhood.toLowerCase().includes(search.toLowerCase());
    const matchType = activeType === "Todos" || p.type === activeType;
    const matchStatus = activeStatus === "Todos" || p.status === activeStatus;
    const matchPublication = activePublication === "Todas" || p.publicationStatus === activePublication;
    return matchSearch && matchType && matchStatus && matchPublication;
  });

  const handleAdd = (property: Omit<Property, "id" | "views">) => {
    const newProp: Property = {
      ...property,
      id: String(Date.now()),
      views: 0,
    };
    setProperties((prev) => [newProp, ...prev]);
  };

  const handleDelete = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar propiedades..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-9 pr-4 w-56 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-accent transition-all duration-200"
            />
          </div>

          <div className="flex items-center gap-1 bg-secondary rounded-lg p-1 border border-border">
            {typeFilter.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-medium transition-all duration-200",
                  activeType === t
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-secondary rounded-lg p-1 border border-border">
            {statusFilter.map((s) => (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-medium transition-all duration-200",
                  activeStatus === s
                    ? "bg-card text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-secondary rounded-lg p-1 border border-border">
            {publicationFilter.map((p) => (
              <button
                key={p}
                onClick={() => setActivePublication(p)}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-medium transition-all duration-200",
                  activePublication === p
                    ? "bg-card text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-all duration-200 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Agregar propiedad
        </button>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <span><span className="text-foreground font-semibold">{filtered.length}</span> propiedades</span>
        <span><span className="text-foreground font-semibold">{properties.filter(p => p.type === "Venta").length}</span> en venta</span>
        <span><span className="text-foreground font-semibold">{properties.filter(p => p.type === "Alquiler").length}</span> en alquiler</span>
        <span><span className="text-foreground font-semibold">{properties.filter(p => p.publicationStatus === "Publicada").length}</span> publicadas</span>
      </div>

      {/* Property grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <SlidersHorizontal className="w-12 h-12 text-muted-foreground/40 mb-4" />
          <p className="text-muted-foreground font-medium">No se encontraron propiedades</p>
          <p className="text-sm text-muted-foreground/60 mt-1">Intenta ajustar los filtros o agregar una nueva propiedad</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showModal && (
        <AddPropertyModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}

function PropertyCard({
  property,
  onDelete,
}: {
  property: Property;
  onDelete: (id: string) => void;
}) {
  const [imgError, setImgError] = useState(false);
  const [lightbox, setLightbox] = useState<"gallery" | "video" | "map" | null>(null);

  const videoEmbedUrl = property.videoUrl ? getYouTubeEmbedUrl(property.videoUrl) : null;

  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden hover:border-accent/40 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-secondary">
        {!imgError ? (
          <img
            src={property.images[0]}
            alt={property.title}
            onClick={() => setLightbox("gallery")}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MapPin className="w-10 h-10 text-muted-foreground/30" />
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 max-w-[85%]">
          <span className={`text-xs px-2 py-1 rounded-full font-semibold backdrop-blur-sm ${typeColors[property.type]}`}>
            {property.type}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full font-semibold backdrop-blur-sm ${statusColors[property.status]}`}>
            {property.status}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full font-semibold backdrop-blur-sm ${publicationColors[property.publicationStatus]}`}>
            {property.publicationStatus}
          </span>
        </div>
        {property.images.length > 1 && (
          <button
            onClick={() => setLightbox("gallery")}
            className="absolute bottom-3 left-3 flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
          >
            <Images className="w-3.5 h-3.5" />
            {property.images.length} fotos
          </button>
        )}
        {videoEmbedUrl && (
          <button
            onClick={() => setLightbox("video")}
            className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
          >
            <Video className="w-3.5 h-3.5 text-accent" />
            Ver video
          </button>
        )}
        {/* Actions */}
        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="w-7 h-7 rounded-lg bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-accent transition-colors">
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(property.id)}
            className="w-7 h-7 rounded-lg bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-semibold text-foreground leading-tight">{property.title}</h3>
          <span className="text-base font-bold text-accent shrink-0 font-mono">{property.price}</span>
        </div>

        <div className="flex items-center justify-between gap-1 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1 truncate">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{property.address}</span>
          </span>
          <button
            onClick={() => setLightbox("map")}
            className="flex items-center gap-1 text-accent font-medium shrink-0 hover:underline"
          >
            <Map className="w-3 h-3" />
            Ver mapa
          </button>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
          {property.description}
        </p>

        {/* Specs */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground border-t border-border pt-3 mb-3">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5" /> {property.bedrooms} amb
            </span>
          )}
          <span className="flex items-center gap-1">
            <Bath className="w-3.5 h-3.5" /> {property.bathrooms} ban
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 className="w-3.5 h-3.5" /> {property.sqm} m²
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> {property.views} vistas
          </span>
          <span className="text-xs text-muted-foreground/60">{property.category}</span>
        </div>
      </div>

      {lightbox === "gallery" && (
        <Lightbox onClose={() => setLightbox(null)}>
          <div className="bg-card rounded-xl border border-border p-3 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${property.title} - foto ${i + 1}`}
                  className="w-full h-56 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </Lightbox>
      )}

      {lightbox === "video" && videoEmbedUrl && (
        <Lightbox onClose={() => setLightbox(null)}>
          <div className="aspect-video rounded-xl overflow-hidden border border-border bg-black">
            <iframe
              src={videoEmbedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Lightbox>
      )}

      {lightbox === "map" && (
        <Lightbox onClose={() => setLightbox(null)}>
          <iframe
            src={getGoogleMapsEmbedUrl(property.address)}
            className="w-full h-[480px] rounded-xl border border-border"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Lightbox>
      )}
    </div>
  );
}
