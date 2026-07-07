"use client";

import { useState } from "react";
import { Plus, Search, SlidersHorizontal, MapPin, Bed, Bath, Maximize2, Eye, MessageCircle, Pencil, Trash2, Video, Images, Map, ScanEye } from "lucide-react";
import { PropertyForm } from "@/components/dashboard/property-form";
import { Lightbox } from "@/components/dashboard/lightbox";
import { ImageCarousel } from "@/components/dashboard/image-carousel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import { getGoogleMapsEmbedUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";
import { initialProperties } from "@/lib/mock-properties";
import type { Property } from "@/lib/mock-properties";

export type { Property } from "@/lib/mock-properties";

const typeFilter = ["Todos", "Venta", "Alquiler"] as const;
const statusFilter = ["Todos", "Disponible", "Reservada", "Vendida"] as const;
const publicationFilter = ["Todas", "Publicada", "Borrador", "Oculta"] as const;

const statusColors: Record<Property["status"], string> = {
  Disponible: "bg-accent text-white",
  Reservada: "bg-chart-3 text-white",
  Vendida: "bg-chart-4 text-white",
};

const typeColors: Record<Property["type"], string> = {
  Venta: "bg-chart-1 text-white",
  Alquiler: "bg-accent text-white",
};

const publicationColors: Record<Property["publicationStatus"], string> = {
  Publicada: "bg-accent text-white",
  Borrador: "bg-muted-foreground text-background",
  Oculta: "bg-warning text-white",
};

export function PropertiesSection() {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [view, setView] = useState<"list" | "form">("list");
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit" | "view">("create");
  const [activeLightbox, setActiveLightbox] = useState<{
    propertyId: string;
    type: "gallery" | "video" | "map";
  } | null>(null);
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

  const handleAdd = (property: Omit<Property, "id" | "views" | "contactClicks">) => {
    const newProp: Property = {
      ...property,
      id: String(Date.now()),
      views: 0,
      contactClicks: 0,
    };
    setProperties((prev) => [newProp, ...prev]);
    setView("list");
  };

  const handleUpdate = (data: Omit<Property, "id" | "views" | "contactClicks">) => {
    if (!editingProperty) return;
    setProperties((prev) =>
      prev.map((p) => (p.id === editingProperty.id ? { ...p, ...data } : p))
    );
    setEditingProperty(null);
    setView("list");
  };

  const handleDelete = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const openAddForm = () => {
    setEditingProperty(null);
    setFormMode("create");
    setView("form");
  };

  const openEditForm = (property: Property) => {
    setEditingProperty(property);
    setFormMode("edit");
    setView("form");
  };

  const openViewForm = (property: Property) => {
    setEditingProperty(property);
    setFormMode("view");
    setView("form");
  };

  const closeForm = () => {
    setEditingProperty(null);
    setView("list");
  };

  if (view === "form") {
    return (
      <PropertyForm
        property={editingProperty ?? undefined}
        readOnly={formMode === "view"}
        onClose={closeForm}
        onSubmit={formMode === "edit" ? handleUpdate : handleAdd}
      />
    );
  }

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
          onClick={openAddForm}
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
              onView={openViewForm}
              onEdit={openEditForm}
              onDelete={handleDelete}
              lightbox={activeLightbox?.propertyId === property.id ? activeLightbox.type : null}
              onOpenLightbox={(type) => setActiveLightbox({ propertyId: property.id, type })}
              onCloseLightbox={() => setActiveLightbox(null)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PropertyCard({
  property,
  onView,
  onEdit,
  onDelete,
  lightbox,
  onOpenLightbox,
  onCloseLightbox,
}: {
  property: Property;
  onView: (property: Property) => void;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
  lightbox: "gallery" | "video" | "map" | null;
  onOpenLightbox: (type: "gallery" | "video" | "map") => void;
  onCloseLightbox: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  const videoEmbedUrl = property.videoUrl ? getYouTubeEmbedUrl(property.videoUrl) : null;

  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden hover:border-accent/40 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-secondary">
        {!imgError ? (
          <img
            src={property.images[0]}
            alt={property.title}
            onClick={() => onOpenLightbox("gallery")}
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
          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${typeColors[property.type]}`}>
            {property.type}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusColors[property.status]}`}>
            {property.status}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${publicationColors[property.publicationStatus]}`}>
            {property.publicationStatus}
          </span>
        </div>
        {property.images.length > 1 && (
          <button
            onClick={() => onOpenLightbox("gallery")}
            className="absolute bottom-3 left-3 flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
          >
            <Images className="w-3.5 h-3.5" />
            {property.images.length} fotos
          </button>
        )}
        {videoEmbedUrl && (
          <button
            onClick={() => onOpenLightbox("video")}
            className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
          >
            <Video className="w-3.5 h-3.5 text-accent" />
            Ver video
          </button>
        )}
        {/* Actions */}
        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onView(property)}
            className="w-7 h-7 rounded-lg bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-accent transition-colors"
          >
            <ScanEye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onEdit(property)}
            className="w-7 h-7 rounded-lg bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-accent transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="w-7 h-7 rounded-lg bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Eliminar esta propiedad?</AlertDialogTitle>
                <AlertDialogDescription>
                  Vas a eliminar &quot;{property.title}&quot;. Esta acción no se puede deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(property.id)}
                  className="bg-destructive text-white hover:bg-destructive/90"
                >
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
            onClick={() => onOpenLightbox("map")}
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
          <span className="flex items-center gap-1">
            <MessageCircle className="w-3.5 h-3.5" /> {property.contactClicks} contactos
          </span>
          <span className="text-xs text-muted-foreground/60">{property.category}</span>
        </div>
      </div>

      {lightbox === "gallery" && (
        <Lightbox onClose={onCloseLightbox}>
          <ImageCarousel images={property.images} alt={property.title} />
        </Lightbox>
      )}

      {lightbox === "video" && videoEmbedUrl && (
        <Lightbox onClose={onCloseLightbox}>
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
        <Lightbox onClose={onCloseLightbox}>
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
