import Link from "next/link";
import { SITE, NAV_LINKS } from "@/content/data";

export function Footer() {
  const y = new Date().getFullYear();

  return (
    <footer className="bg-warm-black text-bg">
      <div className="wrap sec-compact">
        <div className="rule mb-10 bg-bg/10" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-baseline gap-1.5 mb-4">
              <span className="font-[var(--font-display)] text-xl font-bold tracking-tight">Piedra</span>
              <span className="font-[var(--font-display)] text-xl font-bold text-accent">&</span>
              <span className="font-[var(--font-display)] text-xl font-bold tracking-tight">Zafa</span>
            </Link>
            <p className="text-sm text-bg/50 leading-relaxed max-w-xs mb-4">
              Inmobiliaria en {SITE.city}. Seleccion local, visitas coordinadas
              y acompanamiento claro. Sin avisos vencidos.
            </p>
            <p className="text-xs text-bg/30">{SITE.matricula}</p>
          </div>

          <div className="md:col-span-3">
            <p className="label !text-bg/30 !mb-4 before:!bg-bg/30">{SITE.city}</p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-bg/60 hover:text-bg transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="label !text-bg/30 !mb-4 before:!bg-bg/30">Contacto</p>
            <address className="not-italic space-y-2 text-sm text-bg/60">
              <p>{SITE.address}</p>
              <p>
                <a href={`tel:${SITE.phone}`} className="hover:text-bg transition-colors">
                  0336 462 1890
                </a>
              </p>
              <p>
                <a href={`mailto:${SITE.email}`} className="hover:text-bg transition-colors">
                  {SITE.email}
                </a>
              </p>
            </address>
            <div className="flex gap-3 mt-4">
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="text-bg/30 hover:text-bg transition-colors" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="text-bg/30 hover:text-bg transition-colors" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="rule mt-10 mb-6 bg-bg/10" />
        <p className="text-[0.6875rem] text-bg/25">
          &copy; {y} Piedra & Zafa Inmobiliaria. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
