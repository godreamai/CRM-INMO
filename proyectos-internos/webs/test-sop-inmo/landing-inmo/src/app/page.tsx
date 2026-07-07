import { Hero } from "@/components/sections/Hero";
import { PropertiesSection } from "@/components/sections/PropertiesSection";
import { ZonesSection } from "@/components/sections/ZonesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { OwnerCaptureSection } from "@/components/sections/OwnerCaptureSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <PropertiesSection />
      <ZonesSection />
      <ProcessSection />
      <TrustSection />
      <OwnerCaptureSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
