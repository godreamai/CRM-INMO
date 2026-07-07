"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MailCheck, RefreshCw } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 800);
  };

  if (sent) {
    return (
      <AuthShell
        title="Revisá tu email"
        footer={
          <Link href="/login" className="text-accent font-medium hover:underline">
            Volver a iniciar sesión
          </Link>
        }
      >
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
            <MailCheck className="w-6 h-6 text-accent" />
          </div>
          <p className="text-sm text-muted-foreground">
            Te enviamos un link para restablecer tu contraseña a{" "}
            <span className="text-foreground font-medium">{email}</span>.
          </p>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Recuperar contraseña"
      subtitle="Te enviamos un link para crear una nueva"
      footer={
        <Link href="/login" className="text-accent font-medium hover:underline">
          Volver a iniciar sesión
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vos@inmobiliaria.com"
            className="bg-secondary border-border focus:border-accent"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar instrucciones"
          )}
        </Button>
      </form>
    </AuthShell>
  );
}
