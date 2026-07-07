"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  max: number;
}

export function PropertyImageUpload({ images, onChange, max }: PropertyImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const canAddMore = images.length < max;

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const remaining = max - images.length;
    if (remaining <= 0) return;
    const newImages = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, remaining)
      .map((f) => URL.createObjectURL(f));
    if (newImages.length > 0) onChange([...images, ...newImages]);
  };

  const removeImage = (index: number) => {
    const removed = images[index];
    if (removed.startsWith("blob:")) URL.revokeObjectURL(removed);
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, i) => (
          <div
            key={img}
            className="relative group aspect-square rounded-lg overflow-hidden border border-border bg-secondary"
          >
            <img
              src={img}
              alt={`Foto ${i + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.opacity = "0.15";
              }}
            />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-1 right-1 w-5 h-5 rounded-md bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {canAddMore && (
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              addFiles(e.dataTransfer.files);
            }}
            className={cn(
              "aspect-square rounded-lg border border-dashed flex flex-col items-center justify-center gap-1 cursor-pointer text-muted-foreground hover:text-accent hover:border-accent transition-colors",
              dragActive ? "border-accent text-accent bg-accent/5" : "border-border"
            )}
          >
            <Upload className="w-4 h-4" />
            <span className="text-[10px] font-medium text-center px-1">Subir foto</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => addFiles(e.target.files)}
            />
          </label>
        )}
      </div>
      <p className="text-xs text-muted-foreground/60 mt-2">
        {images.length}/{max} fotos · se suben desde tu equipo (JPG o PNG)
      </p>
    </div>
  );
}
