"use client";

import { useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface LightboxProps {
  onClose: () => void;
  children: ReactNode;
  maxWidthClassName?: string;
}

export function Lightbox({ onClose, children, maxWidthClassName = "max-w-3xl" }: LightboxProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  return createPortal(
    <div
      ref={backdropRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
    >
      <div className={`relative w-full ${maxWidthClassName} animate-in zoom-in-95 duration-200`}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 w-8 h-8 flex items-center justify-center rounded-lg bg-card/90 text-foreground hover:bg-card transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
