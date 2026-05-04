"use client";

import { cn } from "@/lib/utils";
import type { Section } from "@/app/page";
import {
  LayoutDashboard,
  Settings,
  Search,
  Moon,
  Zap,
  Users,
  Calendar,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface AppSidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

interface NavItem {
  id: Section;
  label: string;
  icon: LucideIcon;
  badge?: number;
  badgeColor?: "red" | "yellow" | "green";
}

const favorites: NavItem[] = [];

const mainMenu: NavItem[] = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "opportunities", label: "Oportunidades", icon: Users, badge: 12, badgeColor: "green" },
  { id: "content-calendar", label: "Contenido", icon: Calendar },
];

export function AppSidebar({ activeSection, onSectionChange }: AppSidebarProps) {
  return (
    <aside className="w-[260px] h-screen bg-card border-r border-border flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-16 px-5 flex items-center gap-3 border-b border-border">
        <div className="w-9 h-9 rounded-xl bg-chart-1 flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-semibold text-foreground text-[15px] tracking-tight">
          Pulse
        </span>
        <span className="ml-auto px-2 py-0.5 text-[10px] font-medium bg-success/10 text-success rounded-full">
          Live
        </span>
      </div>

      {/* Search */}
      <div className="px-4 py-4">
        <button
          type="button"
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-muted/60 hover:bg-muted transition-colors"
        >
          <Search className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground flex-1 text-left">Buscar...</span>
          <kbd className="text-[11px] text-muted-foreground bg-background px-1.5 py-0.5 rounded-md border border-border font-mono">
            /
          </kbd>
        </button>
      </div>

      {/* Main Menu */}
      <div className="px-4 flex-1">
        <p className="px-2 mb-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          Menú Principal
        </p>
        <nav className="space-y-0.5">
          {mainMenu.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              isActive={activeSection === item.id}
              onClick={() => onSectionChange(item.id)}
            />
          ))}
        </nav>
      </div>

      {/* Settings & User */}
      <div className="px-4 py-4 border-t border-border space-y-2">
        <NavButton
          item={{ id: "settings", label: "Settings", icon: Settings }}
          isActive={activeSection === "settings"}
          onClick={() => onSectionChange("settings")}
        />

        {/* User Profile */}
        <UserProfile />
      </div>
    </aside>
  );
}

function UserProfile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();

        setUser(profile || authUser);
      }
      setLoading(false);
    }
    getUser();
  }, []);

  if (loading) return (
    <div className="flex items-center gap-3 px-2 py-3">
      <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-20 bg-muted animate-pulse rounded" />
        <div className="h-2 w-12 bg-muted animate-pulse rounded" />
      </div>
    </div>
  );

  const displayName = user?.full_name || user?.email?.split('@')[0] || "Usuario";
  const userRole = user?.role?.toUpperCase() || "SDR";
  const initials = (user?.full_name || user?.email || "U")
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-3 px-2 py-3 rounded-xl hover:bg-muted/60 transition-colors cursor-pointer group">
      <div className="w-9 h-9 rounded-full bg-chart-1/10 border border-chart-1/20 flex items-center justify-center">
        <span className="text-chart-1 text-xs font-bold">{initials}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
          {displayName}
        </p>
        <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest truncate">
          {userRole}
        </p>
      </div>
      <button
        type="button"
        className="p-1.5 rounded-lg hover:bg-muted transition-colors"
        aria-label="Toggle theme"
      >
        <Moon className="w-4 h-4 text-muted-foreground" />
      </button>
    </div>
  );
}

interface NavButtonProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}

function NavButton({ item, isActive, onClick }: NavButtonProps) {
  const Icon = item.icon;

  const badgeColorClass = {
    red: "bg-destructive/15 text-destructive",
    yellow: "bg-warning/20 text-warning",
    green: "bg-success/15 text-success",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isActive
          ? "bg-primary text-primary-foreground font-medium shadow-sm"
          : "text-foreground/80 hover:bg-muted/80 hover:text-foreground"
      )}
    >
      <Icon className="w-[18px] h-[18px] shrink-0" />
      <span className="flex-1 text-left">{item.label}</span>
      {item.badge && (
        <span
          className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full",
            isActive
              ? "bg-primary-foreground/20 text-primary-foreground"
              : item.badgeColor
                ? badgeColorClass[item.badgeColor]
                : "bg-muted text-muted-foreground"
          )}
        >
          {item.badge}
        </span>
      )}
    </button>
  );
}
