"use client";

import { MetricCard } from "@/components/dashboard/metric-card";
import { RecentLeads } from "@/components/dashboard/recent-leads";
import { TopListings } from "@/components/dashboard/top-listings";
import { Building2, Users, DollarSign, TrendingUp } from "lucide-react";

export function OverviewSection() {
  return (
    <div className="space-y-6">
      {/* Metric cards - business KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Propiedades activas"
          value="128"
          change="+6.4%"
          changeType="positive"
          icon={Building2}
          delay={0}
        />
        <MetricCard
          title="Leads en seguimiento"
          value="1,284"
          change="+9.8%"
          changeType="positive"
          icon={Users}
          delay={1}
        />
        <MetricCard
          title="Operaciones cerradas"
          value="42"
          change="+12.1%"
          changeType="positive"
          icon={TrendingUp}
          delay={2}
        />
        <MetricCard
          title="Comisiones del mes"
          value="$54,200"
          change="+4.3%"
          changeType="positive"
          icon={DollarSign}
          delay={3}
        />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentLeads />
        <TopListings />
      </div>
    </div>
  );
}
