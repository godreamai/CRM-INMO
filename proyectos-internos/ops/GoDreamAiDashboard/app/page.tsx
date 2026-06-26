"use client";

import { useState } from "react";
import type { Section } from "@/lib/types";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { MainContent } from "@/components/dashboard/main-content";
import { RightPanel } from "@/components/dashboard/right-panel";

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
      <AppSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <MainContent
        activeSection={activeSection}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
      />
      <RightPanel activeSection={activeSection} />
    </div>
  );
}
