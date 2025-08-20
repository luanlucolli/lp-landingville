import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import IntentHook from '@/components/IntentHook';
import PainSolutionSection from '@/components/PainSolutionSection';
import BudgetCalculatorV2 from '@/components/BudgetCalculatorV2';
import ServicesSection from '@/components/ServicesSection';
import PlansSection from '@/components/PlansSection';
import FAQSection from '@/components/FAQSection';
import StickyBottomBar from '@/components/StickyBottomBar';
import SchemaMarkup from '@/components/SchemaMarkup';

const Index = () => {
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
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Schema.org structured data */}
      <SchemaMarkup />
      
      {/* Main content */}
      <main>
        <HeroSection />
        <IntentHook onIntentSelect={(preset) => {
          // Pass preset to calculator when implemented
          console.log('Intent selected:', preset);
        }} />
        <PainSolutionSection />
        <div id="calculadora">
          <BudgetCalculatorV2 />
        </div>
        <ServicesSection onServiceSelect={(serviceType) => {
          // Pass service type to calculator when implemented  
          console.log('Service selected:', serviceType);
        }} />
        <PlansSection />
        <FAQSection />
      </main>
      
      {/* Sticky bottom navigation for mobile */}
      <StickyBottomBar />
      
      {/* Add padding bottom on mobile to prevent content being hidden by sticky bar */}
      <div className="h-20 md:h-0" />
    </div>
  );
};

export default Index;
