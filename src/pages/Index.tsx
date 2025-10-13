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
  const [showPromoModal, setShowPromoModal] = useState(false);

  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href") || "");
        target?.scrollIntoView({ behavior: "smooth" });
      });
    });

    const promoSeen = sessionStorage.getItem("lv_promo_seen");
    if (promoSeen !== "true") {
      setShowPromoModal(true);
      sessionStorage.setItem("lv_promo_seen", "true");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SchemaMarkup />

      {/* Modal centralizado na tela via shadcn Dialog */}
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
