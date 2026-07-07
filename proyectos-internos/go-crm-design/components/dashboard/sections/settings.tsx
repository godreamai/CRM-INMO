"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Shield,
  Palette,
  Globe,
  Key,
  RefreshCw,
  Check,
  Building2,
  Upload,
} from "lucide-react";
import { TEAM_SEAT_LIMIT, AGENCY_NAME, AGENCY_LOGO_URL } from "@/lib/constants";
import { fetchUsdArsRate } from "@/lib/exchange-rate";
import { cn } from "@/lib/utils";

const ORG_SEATS_USED = 6;

export function SettingsSection() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currency, setCurrency] = useState<"usd" | "eur" | "ars">("ars");
  const [usdRate, setUsdRate] = useState<number | null>(null);
  const [rateEditedManually, setRateEditedManually] = useState(false);
  const [rateLoading, setRateLoading] = useState(false);
  const [rateError, setRateError] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  const loadUsdRate = () => {
    setRateLoading(true);
    setRateError(false);
    fetchUsdArsRate()
      .then(({ value }) => {
        setUsdRate(value);
        setRateEditedManually(false);
      })
      .catch(() => setRateError(true))
      .finally(() => setRateLoading(false));
  };

  const handleCurrencyChange = (value: string) => {
    setCurrency(value as typeof currency);
    if (value === "usd" && usdRate === null) {
      loadUsdRate();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Configuracion</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Administra tus preferencias de cuenta e integraciones
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-secondary border border-border p-1">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-card data-[state=active]:text-foreground"
          >
            <User className="w-4 h-4 mr-2" />
            Perfil
          </TabsTrigger>
          <TabsTrigger
            value="organization"
            className="data-[state=active]:bg-card data-[state=active]:text-foreground"
          >
            <Building2 className="w-4 h-4 mr-2" />
            Organización
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-card data-[state=active]:text-foreground"
          >
            <Shield className="w-4 h-4 mr-2" />
            Seguridad
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-medium">Informacion personal</CardTitle>
              <CardDescription>Actualiza tus datos personales y preferencias</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20 bg-secondary">
                  <AvatarFallback className="bg-accent text-accent-foreground text-2xl font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    Cambiar foto
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG o GIF. Maximo 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input
                    id="firstName"
                    defaultValue="Juan"
                    className="bg-secondary border-border focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    defaultValue="Perez"
                    className="bg-secondary border-border focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="juan.perez@inmobiliaria.com"
                    className="bg-secondary border-border focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Rol</Label>
                  <Select defaultValue="manager">
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="manager">Gerente comercial</SelectItem>
                      <SelectItem value="rep">Agente inmobiliario</SelectItem>
                      <SelectItem value="viewer">Solo lectura</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Zona horaria</Label>
                <Select defaultValue="art">
                  <SelectTrigger className="bg-secondary border-border w-full md:w-[300px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="art">Argentina (GMT-3)</SelectItem>
                    <SelectItem value="clt">Chile (GMT-4)</SelectItem>
                    <SelectItem value="cet">Espana (GMT+1)</SelectItem>
                    <SelectItem value="cst">Mexico (GMT-6)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-medium">Preferencias de visualizacion</CardTitle>
              <CardDescription>Personaliza como se muestran los datos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Modo oscuro</p>
                    <p className="text-sm text-muted-foreground">Usar tema oscuro para la interfaz</p>
                  </div>
                </div>
                {mounted && (
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Formato de moneda</p>
                    <p className="text-sm text-muted-foreground">Mostrar moneda segun tu region</p>
                  </div>
                </div>
                <Select value={currency} onValueChange={handleCurrencyChange}>
                  <SelectTrigger className="w-[120px] bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ars">ARS ($)</SelectItem>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {currency === "usd" && (
                <div className="rounded-lg border border-border bg-secondary/40 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Cotizacion USD → ARS{rateEditedManually ? " (editada manualmente)" : ""}
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={loadUsdRate}
                      disabled={rateLoading}
                      className="h-7 px-2 text-xs"
                    >
                      <RefreshCw className={cn("w-3.5 h-3.5 mr-1", rateLoading && "animate-spin")} />
                      Actualizar
                    </Button>
                  </div>
                  {rateError && usdRate === null && (
                    <p className="text-xs text-destructive">
                      No se pudo obtener la cotizacion automaticamente. Cargala manualmente.
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">$1 USD =</span>
                    <Input
                      type="number"
                      value={usdRate ?? ""}
                      onChange={(e) => {
                        setUsdRate(e.target.value ? Number(e.target.value) : null);
                        setRateEditedManually(true);
                      }}
                      placeholder="0.00"
                      className="h-8 w-28 bg-secondary border-border focus:border-accent text-sm"
                    />
                    <span className="text-sm text-muted-foreground">ARS</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Guardar cambios
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        {/* Organization Tab */}
        <TabsContent value="organization" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-medium">Datos de la inmobiliaria</CardTitle>
              <CardDescription>Informacion que aparece en tus reportes y en el panel del equipo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-xl bg-secondary border border-border flex items-center justify-center shrink-0 overflow-hidden">
                  {AGENCY_LOGO_URL ? (
                    <img src={AGENCY_LOGO_URL} alt={AGENCY_NAME} className="w-full h-full object-cover" />
                  ) : (
                    <Building2 className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Upload className="w-3.5 h-3.5 mr-1.5" />
                    Cambiar logo
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG o GIF. Maximo 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="agencyName">Nombre de la inmobiliaria</Label>
                  <Input
                    id="agencyName"
                    defaultValue={AGENCY_NAME}
                    className="bg-secondary border-border focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agencyWebsite">Sitio web</Label>
                  <Input
                    id="agencyWebsite"
                    defaultValue="www.inmobiliariaperez.com"
                    className="bg-secondary border-border focus:border-accent"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="agencyAddress">Direccion</Label>
                  <Input
                    id="agencyAddress"
                    defaultValue="Av. Santa Fe 1234, CABA"
                    className="bg-secondary border-border focus:border-accent"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-medium">Plan y equipo</CardTitle>
              <CardDescription>Cupos de agentes incluidos en tu plan actual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Plan Estandar</span>
                <Badge className="bg-accent/20 text-accent border-accent/30">Activo</Badge>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-muted-foreground">Cupos de agentes</span>
                  <span className="font-medium text-foreground">
                    {ORG_SEATS_USED} / {TEAM_SEAT_LIMIT} usados
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-500"
                    style={{ width: `${Math.min((ORG_SEATS_USED / TEAM_SEAT_LIMIT) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-medium">Contrasena y autenticacion</CardTitle>
              <CardDescription>Administra la seguridad de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Contrasena actual</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    className="bg-secondary border-border focus:border-accent max-w-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Contrasena nueva</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    className="bg-secondary border-border focus:border-accent max-w-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar contrasena nueva</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="bg-secondary border-border focus:border-accent max-w-md"
                  />
                </div>
                <Button variant="outline">Actualizar contrasena</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-medium">Autenticacion en dos pasos</CardTitle>
              <CardDescription>Agrega una capa extra de seguridad a tu cuenta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Key className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Aplicacion autenticadora</p>
                    <p className="text-sm text-muted-foreground">
                      Usa una app autenticadora para los codigos de 2FA
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-accent/20 text-accent border-accent/30">Activado</Badge>
                  <Button variant="outline" size="sm">
                    Administrar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-medium">Sesiones activas</CardTitle>
              <CardDescription>Administra los dispositivos donde iniciaste sesion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { device: "Notebook oficina", location: "Buenos Aires, AR", current: true, time: "Ahora" },
                  { device: "iPhone 15", location: "Buenos Aires, AR", current: false, time: "Hace 2 horas" },
                  { device: "Chrome en Windows", location: "Rosario, AR", current: false, time: "Hace 1 dia" },
                ].map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border animate-in fade-in slide-in-from-left-2"
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {session.device}
                          {session.current && (
                            <Badge className="ml-2 bg-accent/20 text-accent border-accent/30 text-xs">
                              Actual
                            </Badge>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {session.location} • {session.time}
                        </p>
                      </div>
                    </div>
                    {!session.current && (
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        Revocar
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
