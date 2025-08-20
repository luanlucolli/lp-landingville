import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import Calculator30s from '@/components/Calculator30s';
import ServicesSection from '@/components/ServicesSection';
import DemosTabs from '@/components/DemosTabs';
import FAQSection from '@/components/FAQSection';
import StickyBottomBar from '@/components/StickyBottomBar';
import ChannelSheet from '@/components/ChannelSheet';
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
        <Calculator30s />
        <ServicesSection />
        <DemosTabs />
        <FAQSection />
      </main>
      
      {/* Interactive components */}
      <StickyBottomBar />
      <ChannelSheet />
      
      {/* Add padding bottom on mobile to prevent content being hidden by sticky bar */}
      <div className="h-20 md:h-0" />
    </div>
  );
};

export default Index;
