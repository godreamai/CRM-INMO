import { TEAM, TESTIMONIALS, SITE } from "@/content/data";

export function TrustSection() {
  return (
    <section className="sec bg-surface" id="nosotros">
      <div className="wrap">
        <div className="md:grid md:grid-cols-12 md:gap-12 mb-12">
          <div className="md:col-span-6">
            <span className="label">Confianza</span>
            <h2 className="heading-lg mt-3">
              {SITE.yearsInBusiness} anos en {SITE.city}. No es promesa, es trayectoria.
            </h2>
          </div>
        </div>

        <div className="md:grid md:grid-cols-12 md:gap-12 mb-16">
          <div className="md:col-span-5">
            <div className="space-y-6">
              {TEAM.map((member) => (
                <div key={member.name} className="flex items-start gap-4">
                  <div className="w-12 h-12 image-frame shrink-0">
                    <div
                      className="image-placeholder bg-surface-raised"
                      style={{
                        backgroundImage: member.image ? `url('${member.image}')` : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      role="img"
                      aria-label={member.name}
                    />
                  </div>
                  <div>
                    <p className="text-[0.9375rem] font-semibold">{member.name}</p>
                    <p className="text-[0.8125rem] text-text-secondary">{member.role}</p>
                    {member.license && (
                      <p className="text-[0.6875rem] text-text-tertiary mt-0.5">{member.license}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-bg border border-border-subtle">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-text-tertiary mb-1.5">Matricula</p>
              <p className="text-[0.8125rem] text-text-secondary">{SITE.matricula}</p>
              <p className="text-[0.8125rem] text-text-secondary">{SITE.address}</p>
            </div>
          </div>

          <div className="md:col-span-7 mt-10 md:mt-0">
            <div className="space-y-8">
              {TESTIMONIALS.map((t, i) => (
                <div key={i}>
                  <blockquote className="pull-quote mb-3">
                    {t.text}
                  </blockquote>
                  <div className="flex items-center gap-3 pl-6">
                    <div className="flex items-center gap-0.5" aria-label={`${t.rating} de 5 estrellas`}>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <svg key={j} width="11" height="11" viewBox="0 0 24 24" fill={j < t.rating ? "var(--accent)" : "var(--border)"} stroke="none" aria-hidden="true">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-[0.75rem] text-text-secondary">{t.name}</span>
                    <span className="text-[0.6875rem] text-text-tertiary">{t.operation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
