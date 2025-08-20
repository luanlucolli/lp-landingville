import { MessageCircle, Navigation, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
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
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
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
              <span className="font-semibold text-foreground">Clique e fale no WhatsApp</span>
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Navigation className="w-6 h-6 text-secondary" />
              </div>
              <span className="font-semibold text-foreground">Como chegar no Google Maps</span>
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
              className="whatsapp-button focus-ring h-14 px-8 text-lg font-semibold w-full sm:w-auto"
              size="lg"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Falar no WhatsApp agora
            </Button>
            
            <Button 
              onClick={handlePlansClick}
              variant="secondary"
              className="focus-ring h-14 px-8 text-lg font-semibold w-full sm:w-auto"
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