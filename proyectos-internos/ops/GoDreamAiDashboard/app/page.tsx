"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { MainContent } from "@/components/dashboard/main-content";
import { RightPanel } from "@/components/dashboard/right-panel";

export type Section =
  | "overview"
  | "opportunities"
  | "content-calendar"
  | "settings";

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigate = (section: Section, search?: string) => {
    setActiveSection(section);
    if (search !== undefined) {
      setSearchQuery(search);
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Left Sidebar */}
      <AppSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <MainContent
        activeSection={activeSection}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
      />

      {/* Right Panel */}
      <RightPanel activeSection={activeSection} />
    </div>
  );
}
