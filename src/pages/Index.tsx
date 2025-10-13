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
    // Ancoragem suave apenas para links locais
    const links = document.querySelectorAll('a[href^="#"]');
    const handleClick = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href") || "";
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    };
    links.forEach((link) => link.addEventListener("click", handleClick));

    // Mostrar popup só uma vez por sessão
    const promoSeen = sessionStorage.getItem("lv_promo_seen");
    if (promoSeen !== "true") {
      setShowPromoModal(true);
      sessionStorage.setItem("lv_promo_seen", "true");
    }

    return () => {
      links.forEach((link) => link.removeEventListener("click", handleClick));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SchemaMarkup />

      {/* Modal centralizado pelo próprio DialogContent */}
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
