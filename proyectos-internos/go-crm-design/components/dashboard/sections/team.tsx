"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TEAM_SEAT_LIMIT } from "@/lib/constants";
import {
  Trophy,
  Target,
  TrendingUp,
  TrendingDown,
  Mail,
  Phone,
  MoreHorizontal,
  UserPlus,
  Crown,
  X,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { InviteMemberModal, type MemberRole } from "@/components/dashboard/invite-member-modal";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  deals: number;
  revenue: number;
  quota: number;
  change: number;
  rank: number;
}

const teamMembers: TeamMember[] = [
  { id: "1", name: "Gabriela Torres", role: "Agente Senior", email: "gtorres@gocrm.com", avatar: "GT", deals: 24, revenue: 487500, quota: 450000, change: 15, rank: 1 },
  { id: "2", name: "Marcos Vidal", role: "Agente Inmobiliario", email: "mvidal@gocrm.com", avatar: "MV", deals: 19, revenue: 356200, quota: 400000, change: 8, rank: 2 },
  { id: "3", name: "Paula Sena", role: "Agente Senior", email: "psena@gocrm.com", avatar: "PS", deals: 17, revenue: 312800, quota: 350000, change: 12, rank: 3 },
  { id: "4", name: "Diego Ruiz", role: "Agente Inmobiliario", email: "druiz@gocrm.com", avatar: "DR", deals: 15, revenue: 289400, quota: 350000, change: -5, rank: 4 },
  { id: "5", name: "Camila Rios", role: "Agente Inmobiliario", email: "crios@gocrm.com", avatar: "CR", deals: 14, revenue: 267100, quota: 300000, change: 9, rank: 5 },
];

const performanceData = [
  { name: "Gabriela", revenue: 487, quota: 450 },
  { name: "Marcos", revenue: 356, quota: 400 },
  { name: "Paula", revenue: 312, quota: 350 },
  { name: "Diego", revenue: 289, quota: 350 },
  { name: "Camila", revenue: 267, quota: 300 },
];

interface OrgMember {
  id: string;
  name: string;
  email: string;
  role: "Dueño" | "Administrador" | "Agente";
  status: "Activo" | "Invitación pendiente";
}

const initialOrgMembers: OrgMember[] = [
  { id: "owner", name: "Juan Pérez", email: "juan.perez@inmobiliaria.com", role: "Dueño", status: "Activo" },
  { id: "1", name: "Gabriela Torres", email: "gtorres@gocrm.com", role: "Agente", status: "Activo" },
  { id: "2", name: "Marcos Vidal", email: "mvidal@gocrm.com", role: "Agente", status: "Activo" },
  { id: "3", name: "Paula Sena", email: "psena@gocrm.com", role: "Agente", status: "Activo" },
  { id: "4", name: "Diego Ruiz", email: "druiz@gocrm.com", role: "Agente", status: "Activo" },
  { id: "5", name: "Camila Rios", email: "crios@gocrm.com", role: "Agente", status: "Activo" },
  { id: "6", name: "Nico Ferreiro", email: "nferreiro@gocrm.com", role: "Agente", status: "Invitación pendiente" },
];

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
  const quotaPercentage = (member.revenue / member.quota) * 100;
  const isAboveQuota = quotaPercentage >= 100;

  return (
    <div
      className="group bg-card border border-border rounded-xl p-5 hover:border-accent/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/80 to-chart-1 flex items-center justify-center text-sm font-bold text-accent-foreground">
              {member.avatar}
            </div>
            {member.rank <= 3 && (
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-warning flex items-center justify-center">
                <Trophy className="w-3 h-3 text-background" />
              </div>
            )}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">{member.name}</h4>
            <p className="text-xs text-muted-foreground">{member.role}</p>
          </div>
        </div>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary opacity-0 group-hover:opacity-100 transition-all duration-200">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Revenue</p>
          <p className="text-lg font-bold text-foreground">${(member.revenue / 1000).toFixed(0)}k</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Deals Closed</p>
          <p className="text-lg font-bold text-foreground">{member.deals}</p>
        </div>
      </div>

      {/* Quota progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-muted-foreground">Quota Attainment</span>
          <span className={cn("font-medium", isAboveQuota ? "text-success" : "text-foreground")}>
            {quotaPercentage.toFixed(0)}%
          </span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-700", isAboveQuota ? "bg-success" : "bg-accent")}
            style={{ width: `${Math.min(quotaPercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Change indicator */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors">
            <Mail className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors">
            <Phone className="w-4 h-4" />
          </button>
        </div>
        <div className={cn("flex items-center gap-1 text-sm font-medium", member.change >= 0 ? "text-success" : "text-destructive")}>
          {member.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {member.change >= 0 ? "+" : ""}{member.change}%
        </div>
      </div>
    </div>
  );
}

function PerformanceTab() {
  const [chartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setChartLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const totalRevenue = teamMembers.reduce((acc, m) => acc + m.revenue, 0);
  const totalDeals = teamMembers.reduce((acc, m) => acc + m.deals, 0);
  const avgQuotaAttainment = teamMembers.reduce((acc, m) => acc + (m.revenue / m.quota) * 100, 0) / teamMembers.length;

  return (
    <div className="space-y-6">
      {/* Header stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm text-muted-foreground">Facturacion del equipo</span>
          </div>
          <p className="text-2xl font-bold text-foreground">${(totalRevenue / 1000000).toFixed(2)}M</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-chart-1" />
            </div>
            <span className="text-sm text-muted-foreground">Operaciones cerradas</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{totalDeals}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-success" />
            </div>
            <span className="text-sm text-muted-foreground">Cumplimiento de meta</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{avgQuotaAttainment.toFixed(0)}%</p>
        </div>
      </div>

      {/* Performance chart */}
      <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-foreground">Facturacion vs Meta</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Comparativa individual de agentes</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-chart-1" />
              <span className="text-muted-foreground">Ingresos (k)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
              <span className="text-muted-foreground">Meta (k)</span>
            </div>
          </div>
        </div>
        <div className={`h-[250px] transition-opacity duration-700 ${chartLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                tickFormatter={(value) => `$${value}k`}
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-popover)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "var(--color-foreground)", fontWeight: 600 }}
                itemStyle={{ color: "var(--color-muted-foreground)" }}
                formatter={(value: number) => [`$${value}k`, ""]}
              />
              <Bar dataKey="quota" fill="var(--color-muted-foreground)" fillOpacity={0.2} radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Team members grid */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-4">Agentes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

const roleColors: Record<OrgMember["role"], string> = {
  "Dueño": "bg-accent/15 text-accent border-accent/30",
  "Administrador": "bg-chart-1/15 text-chart-1 border-chart-1/30",
  "Agente": "bg-secondary text-muted-foreground border-border",
};

function MembersTab() {
  const [members, setMembers] = useState<OrgMember[]>(initialOrgMembers);
  const [showInvite, setShowInvite] = useState(false);

  const seatsUsed = members.filter((m) => m.role !== "Dueño").length;
  const atLimit = seatsUsed >= TEAM_SEAT_LIMIT;

  const handleInvite = (email: string, role: MemberRole) => {
    setMembers((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: email.split("@")[0],
        email,
        role,
        status: "Invitación pendiente",
      },
    ]);
  };

  const handleRemove = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Cupos de tu plan</span>
          <span className="text-sm font-semibold text-foreground">
            {seatsUsed} / {TEAM_SEAT_LIMIT} agentes usados
          </span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              atLimit ? "bg-destructive" : "bg-accent"
            )}
            style={{ width: `${Math.min((seatsUsed / TEAM_SEAT_LIMIT) * 100, 100)}%` }}
          />
        </div>
        {atLimit && (
          <p className="text-xs text-destructive mt-2">
            Alcanzaste el límite de agentes de tu plan ({TEAM_SEAT_LIMIT}). Quitá o cancelá una invitación para liberar un cupo.
          </p>
        )}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h3 className="text-base font-semibold text-foreground">Miembros del equipo</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Administrá quién tiene acceso al panel</p>
          </div>
          <button
            onClick={() => setShowInvite(true)}
            disabled={atLimit}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 disabled:opacity-40 disabled:pointer-events-none transition-all duration-200"
          >
            <UserPlus className="w-4 h-4" />
            Invitar agente
          </button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8 bg-secondary">
                      <AvatarFallback className="bg-secondary text-foreground text-xs font-semibold">
                        {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground flex items-center gap-1.5">
                      {member.name}
                      {member.role === "Dueño" && <Crown className="w-3.5 h-3.5 text-accent" />}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{member.email}</TableCell>
                <TableCell>
                  <Badge className={cn("border", roleColors[member.role])}>{member.role}</Badge>
                </TableCell>
                <TableCell>
                  {member.status === "Activo" ? (
                    <Badge className="bg-success/15 text-success border-success/30 border">Activo</Badge>
                  ) : (
                    <Badge className="bg-warning/15 text-warning border-warning/30 border">
                      Invitación pendiente
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {member.role !== "Dueño" && (
                    <button
                      onClick={() => handleRemove(member.id)}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      {member.status === "Activo" ? "Quitar" : "Cancelar invitación"}
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showInvite && (
        <InviteMemberModal onClose={() => setShowInvite(false)} onInvite={handleInvite} />
      )}
    </div>
  );
}

export function TeamSection() {
  return (
    <Tabs defaultValue="performance" className="space-y-6">
      <TabsList className="bg-secondary border border-border p-1">
        <TabsTrigger value="performance" className="data-[state=active]:bg-card data-[state=active]:text-foreground">
          Rendimiento
        </TabsTrigger>
        <TabsTrigger value="members" className="data-[state=active]:bg-card data-[state=active]:text-foreground">
          Miembros
        </TabsTrigger>
      </TabsList>

      <TabsContent value="performance" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <PerformanceTab />
      </TabsContent>

      <TabsContent value="members" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <MembersTab />
      </TabsContent>
    </Tabs>
  );
}
