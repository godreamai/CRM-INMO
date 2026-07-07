"use client";

import { useState, useRef } from "react";
import { X, Upload, Building2, MapPin, DollarSign, Bed, Bath, Maximize2, FileText, Tag, Video, Plus, Trash2, Map } from "lucide-react";
import type { Property } from "@/components/dashboard/sections/properties";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import { getGoogleMapsEmbedUrl } from "@/lib/maps";
import { MAX_PROPERTY_IMAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface AddPropertyModalProps {
  onClose: () => void;
  onAdd: (property: Omit<Property, "id" | "views">) => void;
}

const categories = ["Departamento", "Casa", "PH", "Loft", "Local", "Oficina", "Terreno"];
const neighborhoods = [
  "Palermo", "Belgrano", "Recoleta", "Caballito", "Villa Crespo",
  "Almagro", "San Telmo", "Microcentro", "Puerto Madero", "Flores",
  "Tigre", "Nordelta", "Vicente Lopez", "San Isidro", "Otro",
];
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80";

type FormData = {
  title: string;
  type: Property["type"];
  category: string;
  price: string;
  address: string;
  neighborhood: string;
  bedrooms: string;
  bathrooms: string;
  sqm: string;
  description: string;
  videoUrl: string;
  status: Property["status"];
  publicationStatus: Property["publicationStatus"];
};

const defaultForm: FormData = {
  title: "",
  type: "Venta",
  category: "Departamento",
  price: "",
  address: "",
  neighborhood: "Palermo",
  bedrooms: "2",
  bathrooms: "1",
  sqm: "",
  description: "",
  videoUrl: "",
  status: "Disponible",
  publicationStatus: "Borrador",
};

export function AddPropertyModal({ onClose, onAdd }: AddPropertyModalProps) {
  const [form, setForm] = useState<FormData>(defaultForm);
  const [images, setImages] = useState<string[]>([""]);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [step, setStep] = useState<1 | 2>(1);
  const [mapAddress, setMapAddress] = useState("");
  const backdropRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const updateImage = (index: number, value: string) => {
    setImages((prev) => prev.map((img, i) => (i === index ? value : img)));
  };

  const addImage = () => {
    if (images.length >= MAX_PROPERTY_IMAGES) return;
    setImages((prev) => [...prev, ""]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const videoEmbedUrl = form.videoUrl.trim() ? getYouTubeEmbedUrl(form.videoUrl.trim()) : null;

  const validateStep1 = () => {
    const e: typeof errors = {};
    if (!form.title.trim()) e.title = "Requerido";
    if (!form.price.trim()) e.price = "Requerido";
    if (!form.address.trim()) e.address = "Requerido";
    if (!form.sqm.trim()) e.sqm = "Requerido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: typeof errors = {};
    if (!form.description.trim()) e.description = "Requerido";
    if (form.videoUrl.trim() && !getYouTubeEmbedUrl(form.videoUrl.trim())) {
      e.videoUrl = "Pegá un link de YouTube válido (youtube.com o youtu.be)";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = () => {
    if (!validateStep2()) return;
    const cleanedImages = images.map((i) => i.trim()).filter(Boolean);
    onAdd({
      title: form.title,
      type: form.type,
      category: form.category,
      price: form.price,
      address: form.address,
      neighborhood: form.neighborhood,
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      sqm: Number(form.sqm),
      description: form.description,
      images: cleanedImages.length > 0 ? cleanedImages : [DEFAULT_IMAGE],
      videoUrl: form.videoUrl.trim() || undefined,
      status: form.status,
      publicationStatus: form.publicationStatus,
    });
    onClose();
  };

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  const filledImages = images.filter((i) => i.trim());

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Agregar propiedad</h2>
              <p className="text-xs text-muted-foreground">Paso {step} de 2</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex gap-1 px-6 pt-4">
          {([1, 2] as const).map((s) => (
            <div
              key={s}
              className={cn(
                "h-1 rounded-full flex-1 transition-all duration-300",
                s <= step ? "bg-accent" : "bg-border"
              )}
            />
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="px-6 py-5 space-y-4">
            {/* Type, Status & Publication row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  <Tag className="w-3 h-3 inline mr-1" />Tipo
                </label>
                <div className="flex gap-1 bg-secondary rounded-lg p-1 border border-border">
                  {(["Venta", "Alquiler"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => set("type", t)}
                      className={cn(
                        "flex-1 py-1.5 rounded-md text-xs font-medium transition-all",
                        form.type === t
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Estado</label>
                <select
                  value={form.status}
                  onChange={(e) => set("status", e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-accent"
                >
                  <option>Disponible</option>
                  <option>Reservada</option>
                  <option>Vendida</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Publicación</label>
                <select
                  value={form.publicationStatus}
                  onChange={(e) => set("publicationStatus", e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-accent"
                >
                  <option>Borrador</option>
                  <option>Publicada</option>
                  <option>Oculta</option>
                </select>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                <Building2 className="w-3 h-3 inline mr-1" />Titulo de la propiedad *
              </label>
              <input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Ej: PH en Palermo Hollywood con terraza"
                className={cn(
                  "w-full h-9 px-3 rounded-lg bg-secondary border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all",
                  errors.title ? "border-destructive focus:border-destructive" : "border-border focus:border-accent"
                )}
              />
              {errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
            </div>

            {/* Category & Neighborhood */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Categoria</label>
                <select
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-accent"
                >
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Barrio</label>
                <select
                  value={form.neighborhood}
                  onChange={(e) => set("neighborhood", e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-accent"
                >
                  {neighborhoods.map((n) => <option key={n}>{n}</option>)}
                </select>
              </div>
            </div>

            {/* Price & Address */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  <DollarSign className="w-3 h-3 inline mr-1" />Precio *
                </label>
                <input
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  placeholder="$200,000"
                  className={cn(
                    "w-full h-9 px-3 rounded-lg bg-secondary border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all",
                    errors.price ? "border-destructive" : "border-border focus:border-accent"
                  )}
                />
                {errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  <Maximize2 className="w-3 h-3 inline mr-1" />Superficie (m²) *
                </label>
                <input
                  type="number"
                  value={form.sqm}
                  onChange={(e) => set("sqm", e.target.value)}
                  placeholder="80"
                  className={cn(
                    "w-full h-9 px-3 rounded-lg bg-secondary border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all",
                    errors.sqm ? "border-destructive" : "border-border focus:border-accent"
                  )}
                />
                {errors.sqm && <p className="text-xs text-destructive mt-1">{errors.sqm}</p>}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                <MapPin className="w-3 h-3 inline mr-1" />Direccion *
              </label>
              <input
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                onBlur={() => setMapAddress(form.address)}
                placeholder="Thames 1842, Palermo, CABA"
                className={cn(
                  "w-full h-9 px-3 rounded-lg bg-secondary border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all",
                  errors.address ? "border-destructive" : "border-border focus:border-accent"
                )}
              />
              {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
            </div>

            {/* Map preview */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                <Map className="w-3 h-3 inline mr-1" />Ubicación en el mapa
              </label>
              {mapAddress.trim().length > 4 ? (
                <div className="rounded-lg overflow-hidden border border-border h-40">
                  <iframe
                    src={getGoogleMapsEmbedUrl(mapAddress)}
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border h-24 flex items-center justify-center text-xs text-muted-foreground text-center px-4">
                  Completá la dirección (y salí del campo) para previsualizar el mapa
                </div>
              )}
            </div>

            {/* Rooms */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  <Bed className="w-3 h-3 inline mr-1" />Ambientes
                </label>
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={form.bedrooms}
                  onChange={(e) => set("bedrooms", e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  <Bath className="w-3 h-3 inline mr-1" />Banos
                </label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={form.bathrooms}
                  onChange={(e) => set("bathrooms", e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-accent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="px-6 py-5 space-y-4">
            {/* Description */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                <FileText className="w-3 h-3 inline mr-1" />Descripcion *
              </label>
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Describe las caracteristicas de la propiedad, amenities, estado, orientacion..."
                rows={4}
                className={cn(
                  "w-full px-3 py-2.5 rounded-lg bg-secondary border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 resize-none transition-all leading-relaxed",
                  errors.description ? "border-destructive" : "border-border focus:border-accent"
                )}
              />
              {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
            </div>

            {/* Photos (max MAX_PROPERTY_IMAGES) */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                <Upload className="w-3 h-3 inline mr-1" />
                Fotos ({filledImages.length}/{MAX_PROPERTY_IMAGES})
              </label>
              <div className="space-y-2">
                {images.map((img, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={img}
                      onChange={(e) => updateImage(i, e.target.value)}
                      placeholder="https://... (opcional)"
                      className="flex-1 h-9 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-accent transition-all"
                    />
                    {images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-secondary transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addImage}
                disabled={images.length >= MAX_PROPERTY_IMAGES}
                className="mt-2 flex items-center gap-1.5 text-xs text-accent font-medium disabled:opacity-40 disabled:pointer-events-none"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar foto
              </button>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Hasta {MAX_PROPERTY_IMAGES} fotos. Si no cargás ninguna, se usa una imagen por defecto.
              </p>

              {filledImages.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {filledImages.map((img, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden border border-border bg-secondary">
                      <img
                        src={img}
                        alt={`Foto ${i + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.opacity = "0.15";
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Video URL (YouTube embed) */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                <Video className="w-3 h-3 inline mr-1" />Video de YouTube (opcional, 1 video)
              </label>
              <input
                value={form.videoUrl}
                onChange={(e) => set("videoUrl", e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className={cn(
                  "w-full h-9 px-3 rounded-lg bg-secondary border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all",
                  errors.videoUrl ? "border-destructive" : "border-border focus:border-accent"
                )}
              />
              {errors.videoUrl && <p className="text-xs text-destructive mt-1">{errors.videoUrl}</p>}
              {videoEmbedUrl && (
                <div className="rounded-lg overflow-hidden border border-border aspect-video mt-2">
                  <iframe src={videoEmbedUrl} className="w-full h-full" allowFullScreen loading="lazy" />
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="bg-secondary/60 rounded-lg p-3 border border-border space-y-1.5">
              <p className="text-xs font-medium text-foreground mb-2">Resumen</p>
              <div className="grid grid-cols-2 gap-y-1 text-xs text-muted-foreground">
                <span>Tipo: <span className="text-foreground">{form.type}</span></span>
                <span>Estado: <span className="text-foreground">{form.status}</span></span>
                <span>Publicación: <span className="text-foreground">{form.publicationStatus}</span></span>
                <span>Categoria: <span className="text-foreground">{form.category}</span></span>
                <span>Precio: <span className="text-accent font-medium">{form.price || "—"}</span></span>
                <span>Barrio: <span className="text-foreground">{form.neighborhood}</span></span>
                <span>Superficie: <span className="text-foreground">{form.sqm || "—"} m²</span></span>
                <span>Fotos: <span className="text-foreground">{filledImages.length || 1}</span></span>
                <span>Video: <span className="text-foreground">{videoEmbedUrl ? "Sí" : "No"}</span></span>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-secondary/30 sticky bottom-0">
          <button
            onClick={step === 1 ? onClose : () => setStep(1)}
            className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
          >
            {step === 1 ? "Cancelar" : "Atras"}
          </button>
          <button
            onClick={step === 1 ? handleNext : handleSubmit}
            className="px-5 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-all duration-200"
          >
            {step === 1 ? "Siguiente" : "Agregar propiedad"}
          </button>
        </div>
      </div>
    </div>
  );
}
