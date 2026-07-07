"use client";

const funnel = [
  { label: "Visitas", value: 18492, pct: 100, color: "bg-chart-1" },
  { label: "Vistas de propiedad", value: 7631, pct: 41, color: "bg-chart-2" },
  { label: "Consultas", value: 2940, pct: 16, color: "bg-accent" },
  { label: "Leads calificados", value: 1284, pct: 7, color: "bg-chart-3" },
  { label: "Cierres", value: 312, pct: 1.7, color: "bg-chart-4" },
];

export function ConversionFunnelChart() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 h-[380px] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-foreground">Embudo de conversion</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Del sitio web al cierre</p>
      </div>

      <div className="flex flex-col gap-3">
        {funnel.map((step, i) => (
          <div key={step.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium">{step.label}</span>
              <span className="text-foreground font-semibold tabular-nums">
                {step.value.toLocaleString()}
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${step.color} transition-all duration-700`}
                style={{ width: `${step.pct}%`, transitionDelay: `${i * 100}ms` }}
              />
            </div>
            <p className="text-xs text-muted-foreground/70">{step.pct}% del total</p>
          </div>
        ))}
      </div>
    </div>
  );
}
