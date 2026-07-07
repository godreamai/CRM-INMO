"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Building2,
  Search,
  Plus,
  MapPin,
  Mail,
  Phone,
  DollarSign,
  Calendar,
  ExternalLink,
  Star,
  TrendingUp,
  TrendingDown,
  Filter,
} from "lucide-react";

const customers = [
  {
    id: 1,
    name: "Sofia Ramirez",
    industry: "Compradora",
    tier: "Premium",
    location: "Palermo, CABA",
    contact: "Sofia Ramirez",
    email: "sofia@gmail.com",
    phone: "+54 11 4823-1234",
    totalRevenue: 320000,
    activeDeals: 2,
    healthScore: 92,
    trend: "up",
    lastContact: "Hace 2 dias",
  },
  {
    id: 2,
    name: "Carlos Mena",
    industry: "Inversor",
    tier: "Premium",
    location: "Belgrano, CABA",
    contact: "Carlos Mena",
    email: "cmena@inversiones.com",
    phone: "+54 11 5234-5678",
    totalRevenue: 850000,
    activeDeals: 3,
    healthScore: 88,
    trend: "up",
    lastContact: "Hoy",
  },
  {
    id: 3,
    name: "Lucia Ferreyra",
    industry: "Locataria",
    tier: "Activo",
    location: "Villa Crespo, CABA",
    contact: "Lucia Ferreyra",
    email: "lucia.f@outlook.com",
    phone: "+54 11 4345-6789",
    totalRevenue: 24000,
    activeDeals: 1,
    healthScore: 78,
    trend: "stable",
    lastContact: "Hace 3 dias",
  },
  {
    id: 4,
    name: "Martin Diaz",
    industry: "Comprador",
    tier: "Activo",
    location: "Recoleta, CABA",
    contact: "Martin Diaz",
    email: "martin.d@empresa.com",
    phone: "+54 11 4456-7890",
    totalRevenue: 185000,
    activeDeals: 1,
    healthScore: 65,
    trend: "down",
    lastContact: "Hace 2 semanas",
  },
  {
    id: 5,
    name: "Valeria Ortiz",
    industry: "Locataria",
    tier: "Nuevo",
    location: "Caballito, CABA",
    contact: "Valeria Ortiz",
    email: "vortiz@gmail.com",
    phone: "+54 11 4567-8901",
    totalRevenue: 11760,
    activeDeals: 1,
    healthScore: 88,
    trend: "up",
    lastContact: "Ayer",
  },
  {
    id: 6,
    name: "Roberto Salinas",
    industry: "Inversor",
    tier: "Premium",
    location: "Puerto Madero, CABA",
    contact: "Roberto Salinas",
    email: "rsalinas@fondos.com",
    phone: "+54 11 4678-9012",
    totalRevenue: 1250000,
    activeDeals: 4,
    healthScore: 95,
    trend: "up",
    lastContact: "Hoy",
  },
];

const tierColors: Record<string, string> = {
  Premium: "bg-accent/20 text-accent border-accent/30",
  Activo: "bg-chart-1/20 text-chart-1 border-chart-1/30",
  Nuevo: "bg-muted text-muted-foreground border-border",
};

export function CustomersSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.contact.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = !selectedTier || customer.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  const totalRevenue = customers.reduce((acc, c) => acc + c.totalRevenue, 0);
  const avgHealthScore = Math.round(
    customers.reduce((acc, c) => acc + c.healthScore, 0) / customers.length
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Clientes",
            value: customers.length.toString(),
            icon: Building2,
            color: "text-foreground",
          },
          {
            label: "Facturacion total",
            value: `$${(totalRevenue / 1000000).toFixed(2)}M`,
            icon: DollarSign,
            color: "text-accent",
          },
          {
            label: "Salud promedio",
            value: `${avgHealthScore}%`,
            icon: Star,
            color: "text-chart-3",
          },
          {
            label: "Operaciones activas",
            value: customers.reduce((acc, c) => acc + c.activeDeals, 0).toString(),
            icon: TrendingUp,
            color: "text-chart-1",
          },
        ].map((stat, index) => (
          <Card
            key={stat.label}
            className="border-border bg-card hover:border-muted-foreground/30 transition-all duration-300"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className={`text-2xl font-semibold mt-1 ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color} opacity-50`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar clientes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-[280px] bg-secondary border-border focus:border-accent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {["Premium", "Activo", "Nuevo"].map((tier) => (
              <Button
                key={tier}
                variant={selectedTier === tier ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTier(selectedTier === tier ? null : tier)}
                className={selectedTier === tier ? "bg-accent text-accent-foreground" : ""}
              >
                {tier}
              </Button>
            ))}
          </div>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Agregar cliente
        </Button>
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredCustomers.map((customer, index) => (
          <Card
            key={customer.id}
            className="border-border bg-card hover:border-accent/50 transition-all duration-300 group animate-in fade-in slide-in-from-bottom-2"
            style={{ animationDelay: `${index * 75}ms` }}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 bg-secondary">
                    <AvatarFallback className="bg-secondary text-foreground font-semibold">
                      {customer.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      {customer.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{customer.industry}</p>
                  </div>
                </div>
                <Badge className={`${tierColors[customer.tier]} border`}>
                  {customer.tier}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    {customer.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-3.5 h-3.5" />
                    {customer.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-3.5 h-3.5" />
                    {customer.phone}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Facturacion</span>
                    <span className="font-medium text-foreground">
                      ${customer.totalRevenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Operaciones</span>
                    <span className="font-medium text-foreground">{customer.activeDeals}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Ultimo contacto</span>
                    <span className="font-medium text-foreground">{customer.lastContact}</span>
                  </div>
                </div>
              </div>

              {/* Health Score */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Salud del cliente</span>
                  {customer.trend === "up" && (
                    <TrendingUp className="w-3.5 h-3.5 text-accent" />
                  )}
                  {customer.trend === "down" && (
                    <TrendingDown className="w-3.5 h-3.5 text-destructive" />
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${customer.healthScore}%`,
                        backgroundColor:
                          customer.healthScore >= 80
                            ? "var(--color-accent)"
                            : customer.healthScore >= 60
                            ? "var(--color-chart-3)"
                            : "var(--color-destructive)",
                      }}
                    />
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      customer.healthScore >= 80
                        ? "text-accent"
                        : customer.healthScore >= 60
                        ? "text-chart-3"
                        : "text-destructive"
                    }`}
                  >
                    {customer.healthScore}%
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  Agendar
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Mail className="w-3.5 h-3.5 mr-1.5" />
                  Correo
                </Button>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
