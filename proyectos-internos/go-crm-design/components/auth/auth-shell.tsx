"use client";

import type { ReactNode } from "react";
import { Building2 } from "lucide-react";

interface AuthShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-accent">
            <Building2 className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="font-bold text-xl text-foreground tracking-tight">
            Go<span className="text-accent">CRM</span>
          </span>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-xl font-semibold text-foreground text-center">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground text-center mt-1.5">{subtitle}</p>
          )}
          <div className="mt-6">{children}</div>
        </div>

        {footer && (
          <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
        )}
      </div>
    </div>
  );
}
