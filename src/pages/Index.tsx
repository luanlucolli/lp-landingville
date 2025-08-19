import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import PainSolutionSection from '@/components/PainSolutionSection';
import BrandIdentitySection from '@/components/BrandIdentitySection';
import CalculatorDemoSection from '@/components/CalculatorDemoSection';
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
        <PainSolutionSection />
        <BrandIdentitySection />
        <CalculatorDemoSection />
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
