import { useEffect, useState } from 'react';
import { MessageCircle, Navigation, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteContent } from '@/content/siteContent';

const HeroSection = () => {
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rate = scrolled * -0.5;
      
      setParallaxOffset({
        x: rate * 0.2,
        y: rate
      });
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth > 768) { // Only on desktop
        const x = (e.clientX - window.innerWidth / 2) * 0.01;
        const y = (e.clientY - window.innerHeight / 2) * 0.01;
        
        setParallaxOffset(prev => ({
          x: prev.x + x * 0.1,
          y: prev.y + y * 0.1
        }));
      }
    };
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleWhatsAppClick = () => {
    const { phone, messageTemplate, utm } = siteContent.hero.whatsapp;
    const message = messageTemplate;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}&utm_source=${utm.source}&utm_medium=${utm.medium}&utm_campaign=${utm.campaign}`;
    window.open(url, '_blank');
  };

  const handlePlansClick = () => {
    const plansSection = document.getElementById('planos');
    plansSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero relative min-h-screen flex items-center justify-center">
      {/* Animated parallax layers */}
      <div 
        className="parallax-layer" 
        data-depth="1"
        style={{
          '--tx': `${parallaxOffset.x}px`,
          '--ty': `${parallaxOffset.y}px`
        } as React.CSSProperties}
      />
      <div 
        className="parallax-layer" 
        data-depth="2"
        style={{
          '--tx': `${parallaxOffset.x}px`,
          '--ty': `${parallaxOffset.y}px`
        } as React.CSSProperties}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
            {siteContent.hero.h1}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed text-white/90 drop-shadow">
            {siteContent.hero.sub}
          </p>
          
          {/* Proof points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            {siteContent.hero.proofPoints.map((point, index) => {
              const icons = [MessageCircle, Navigation, Smartphone];
              const Icon = icons[index];
              
              return (
                <div key={index} className="flex items-center justify-center md:justify-start gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-white text-sm md:text-base">{point}</span>
                </div>
              );
            })}
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              onClick={handleWhatsAppClick}
              className="whatsapp-button focus-ring h-14 px-8 text-lg font-semibold w-full sm:w-auto shadow-lg"
              size="lg"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              {siteContent.hero.ctaPrimary}
            </Button>
            
            <Button 
              onClick={handlePlansClick}
              variant="outline"
              className="focus-ring h-14 px-8 text-lg font-semibold w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white shadow-lg backdrop-blur-sm"
              size="lg"
            >
              {siteContent.hero.ctaSecondary}
            </Button>
          </div>
          
          <div className="text-sm text-white/80">
            🏪 Feito para comércios locais de {siteContent.brand.city}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;