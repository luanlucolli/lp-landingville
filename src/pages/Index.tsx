import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BenefitsStrip from '@/components/BenefitsStrip';
import DiagnosisHook from '@/components/DiagnosisHook';
import ServicesSection from '@/components/ServicesSection';
import DemosTabs from '@/components/DemosTabs';
import FAQSection from '@/components/FAQSection';
import StickyBottomBar from '@/components/StickyBottomBar';
import SchemaMarkup from '@/components/SchemaMarkup';
import { PromoDiscountModal } from '@/components/promo/PromoDiscountModal';

const Index = () => {
  const [showPromoModal, setShowPromoModal] = useState(false);

  useEffect(() => {
    // Add smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href') || '');
        target?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Verificar se deve mostrar popup promocional
    const promoSeen = sessionStorage.getItem('lv_promo_seen');
    if (promoSeen !== 'true') {
      setShowPromoModal(true);
      sessionStorage.setItem('lv_promo_seen', 'true');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Schema.org structured data */}
      <SchemaMarkup />

      {/* Promo Modal */}
      <PromoDiscountModal open={showPromoModal} onOpenChange={setShowPromoModal} />

      {/* Header */}
      <Header />

      {/* Main content (fundo escuro) */}
      <main style={{ background: 'hsl(var(--neutral-900))' }}>
        <HeroSection />
        <BenefitsStrip />
        <DiagnosisHook />
        <div id="services">
          <ServicesSection />
        </div>
        <DemosTabs />
        <FAQSection />
      </main>

      {/* Sticky bottom navigation for mobile */}
      <StickyBottomBar />

      {/* Add padding bottom on mobile to prevent content being hidden by sticky bar */}
      <div className="md:h-0" />
    </div>
  );
};

export default Index;
