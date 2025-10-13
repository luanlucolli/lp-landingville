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
    // smooth scroll para âncoras
    const links = document.querySelectorAll('a[href^="#"]');
    const onClick = (e: Event, href: string | null) => {
      if (!href) return;
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };
    links.forEach((link) => {
      const handler = (e: Event) => onClick(e, link.getAttribute("href"));
      link.addEventListener("click", handler);
    });

    // popup promocional 1x por sessão
    if (sessionStorage.getItem("lv_promo_seen") !== "true") {
      setShowPromoModal(true);
      sessionStorage.setItem("lv_promo_seen", "true");
    }

    return () => {
      links.forEach((link) => link.replaceWith(link.cloneNode(true))); // remove listeners
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SchemaMarkup />

      {/* Modal centralizado (o próprio componente já centraliza via fixed + translate) */}
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
