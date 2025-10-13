// src/pages/home/index.tsx
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BenefitsStrip from "@/components/BenefitsStrip";
import DiagnosisHook from "@/components/DiagnosisHook";
import ServicesSection from "@/components/ServicesSection";
import DemosTabs from "@/components/DemosTabs";
import FAQSection from "@/components/FAQSection";
import StickyBottomBar from "@/components/StickyBottomBar";
import SchemaMarkup from "@/components/SchemaMarkup";
import { PromoDiscountModal } from "@/components/promo/PromoDiscountModal";

const Index = () => {
  const [showPromoModal, setShowPromoModal] = useState(false); // inicia fechado

  useEffect(() => {
    // Smooth scroll para âncoras internas
    const links = document.querySelectorAll('a[href^="#"]');
    const onClick = (e: Event) => {
      const link = e.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute("href") || "";
      if (href.length > 1) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    };
    links.forEach((link) => link.addEventListener("click", onClick));
    return () => links.forEach((link) => link.removeEventListener("click", onClick));
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SchemaMarkup />

      {/* Mantido, mas fechado por padrão; pode ser aberto por alguma ação futura */}
      <PromoDiscountModal open={showPromoModal} onOpenChange={setShowPromoModal} />

      <Header />

      <main style={{ background: "hsl(var(--neutral-900))" }}>
        <HeroSection />
        <BenefitsStrip />
        <DiagnosisHook />
        <div id="services">
          <ServicesSection />
        </div>
        <DemosTabs />
        <FAQSection />
      </main>

      <StickyBottomBar />
      <div className="md:h-0" />
    </div>
  );
};

export default Index;
