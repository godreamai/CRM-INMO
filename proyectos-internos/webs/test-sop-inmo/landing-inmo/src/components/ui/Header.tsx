"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS, getWhatsAppUrl } from "@/content/data";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-bg/95 backdrop-blur-sm">
      <div className="wrap flex items-center justify-between h-16">
        <Link href="/" className="flex items-baseline gap-1.5" aria-label="Inicio">
          <span className="font-[var(--font-display)] text-lg font-bold tracking-tight text-text">
            Piedra
          </span>
          <span className="text-accent font-[var(--font-display)] text-lg font-bold">&</span>
          <span className="font-[var(--font-display)] text-lg font-bold tracking-tight text-text">
            Zafa
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.8125rem] font-medium text-text-secondary hover:text-text transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={getWhatsAppUrl("Me interesa consultar por una propiedad.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !py-2 !px-4 !text-[0.75rem]"
          >
            WhatsApp
          </a>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 -mr-2"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {isOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <nav id="mobile-menu" className="md:hidden border-t border-border-subtle bg-bg" aria-label="Movil">
          <div className="wrap py-4 flex flex-col gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3 text-[0.9375rem] font-medium text-text-secondary hover:text-text transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={getWhatsAppUrl("Me interesa consultar por una propiedad.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-3 btn-primary justify-center"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
