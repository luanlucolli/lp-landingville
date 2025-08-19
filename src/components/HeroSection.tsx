import { MessageCircle, Navigation, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    // Parallax scroll handler
    const handleScroll = () => {
      if (!isReducedMotion) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isReducedMotion]);

  const handleWhatsAppClick = () => {
    const message = "Oi, sou [Nome] da [Loja]. Vi a Landingville. Quero uma página para [Segmento] e publicar até [Data].";
    const phone = "5547999999999"; // Placeholder
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}&utm_source=site&utm_medium=hero&utm_campaign=landingville`;
    window.open(url, '_blank');
  };

  const handlePlansClick = () => {
    const plansSection = document.getElementById('planos');
    plansSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax animated mesh gradient background */}
      <div 
        className="absolute inset-0 mesh-gradient-animated opacity-30"
        style={{
          transform: isReducedMotion ? 'none' : `translate3d(0, ${scrollY * 0.5}px, 0)`,
          willChange: isReducedMotion ? 'auto' : 'transform'
        }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[hsl(208_58%_41%_/_0.1)] via-transparent to-[hsl(98_35%_55%_/_0.1)]"
        style={{
          transform: isReducedMotion ? 'none' : `translate3d(0, ${scrollY * 0.3}px, 0)`,
          willChange: isReducedMotion ? 'auto' : 'transform'
        }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-[hsl(208_58%_41%_/_0.05)] to-transparent"
        style={{
          transform: isReducedMotion ? 'none' : `translate3d(0, ${scrollY * 0.2}px, 0)`,
          willChange: isReducedMotion ? 'auto' : 'transform'
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Landing pages que viram{' '}
            <span className="text-primary">mensagens no WhatsApp</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Seu cliente encontra, clica e fala. A gente cuida do resto.
          </p>
          
          {/* Proof points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="flex items-center justify-center md:justify-start gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <span className="font-semibold text-foreground">Integração com WhatsApp</span>
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Navigation className="w-6 h-6 text-secondary" />
              </div>
              <span className="font-semibold text-foreground">Integração com Google Maps</span>
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-accent" />
              </div>
              <span className="font-semibold text-foreground">Cardápio/Catálogos</span>
            </div>
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              onClick={handleWhatsAppClick}
              className="bg-[hsl(208_58%_41%)] hover:bg-[hsl(208_58%_35%)] text-white focus-ring h-14 px-8 text-lg font-semibold w-full sm:w-auto transition-all duration-300"
              size="lg"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Falar no WhatsApp agora
            </Button>
            
            <Button 
              onClick={handlePlansClick}
              className="bg-[hsl(98_35%_55%)] hover:bg-[hsl(98_35%_50%)] text-white focus-ring h-14 px-8 text-lg font-semibold w-full sm:w-auto transition-all duration-300"
              size="lg"
            >
              Ver planos
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            🏪 Feito para comércios locais de Joinville
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;