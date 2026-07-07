"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { TeamMembersProvider } from "@/components/dashboard/team-members-context";
import { OverviewSection } from "@/components/dashboard/sections/overview";
import { WebAnalyticsSection } from "@/components/dashboard/sections/web-analytics";
import { PropertiesSection } from "@/components/dashboard/sections/properties";
import { TeamSection } from "@/components/dashboard/sections/team";
import { ReportsSection } from "@/components/dashboard/sections/reports";
import { SettingsSection } from "@/components/dashboard/sections/settings";

export type Section = "overview" | "webAnalytics" | "properties" | "team" | "reports" | "settings";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection onNavigate={setActiveSection} />;
      case "webAnalytics":
        return <WebAnalyticsSection />;
      case "properties":
        return <PropertiesSection />;
      case "team":
        return <TeamSection />;
      case "reports":
        return <ReportsSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-out ${
          sidebarCollapsed ? "ml-[72px]" : "ml-[260px]"
        }`}
      >
        <Header activeSection={activeSection} onNavigate={setActiveSection} />
        <main className="flex-1 p-6 overflow-auto">
          <div
            key={activeSection}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}
