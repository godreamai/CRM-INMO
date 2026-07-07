"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TEAM_SEAT_LIMIT } from "@/lib/constants";
import { RefreshCw } from "lucide-react";

// Signup cerrado de momento: redirige a /login apenas se accede a la ruta.
export default function SignupPage() {
  const router = useRouter();
  const [agencyName, setAgencyName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/onboarding"), 800);
  };

  return (
    <AuthShell
      title="Creá tu cuenta"
      subtitle="Configurá el panel de tu inmobiliaria en minutos"
      footer={
        <>
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="text-accent font-medium hover:underline">
            Iniciar sesión
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="agencyName">Nombre de la inmobiliaria</Label>
          <Input
            id="agencyName"
            required
            value={agencyName}
            onChange={(e) => setAgencyName(e.target.value)}
            placeholder="Inmobiliaria Pérez"
            className="bg-secondary border-border focus:border-accent"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ownerName">Tu nombre</Label>
          <Input
            id="ownerName"
            required
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            placeholder="Juan Pérez"
            className="bg-secondary border-border focus:border-accent"
          />
        </div>

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

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-secondary border-border focus:border-accent"
          />
        </div>

        <p className="text-xs text-muted-foreground">
          Tu plan incluye hasta {TEAM_SEAT_LIMIT} agentes en tu equipo.
        </p>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Creando cuenta...
            </>
          ) : (
            "Crear cuenta"
          )}
        </Button>
      </form>
    </AuthShell>
  );
}
