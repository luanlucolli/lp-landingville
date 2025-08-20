import { MessageCircle, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { copy } from '@/content/landingville';

const HeroSection = () => {
  const handleWhatsAppClick = () => {
    const phone = "5547999999999"; // Placeholder
    const url = `https://wa.me/${phone}?text=${encodeURIComponent("Olá! Vi a Landingville e gostaria de saber mais sobre como ter um site que gera vendas.")}&utm_source=site&utm_medium=hero&utm_campaign=landingville`;
    window.open(url, '_blank');
  };

  const handleCalculatorClick = () => {
    const calculatorSection = document.getElementById('calculadora');
    calculatorSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Floating blobs */}
      <span 
        className="blob absolute" 
        style={{
          left: '10%',
          top: '20%',
          width: '220px',
          height: '220px',
          background: copy.brand.secondaryHex,
          '--dur': '26s'
        } as React.CSSProperties}
      />
      <span 
        className="blob absolute" 
        style={{
          right: '15%',
          top: '60%',
          width: '180px',
          height: '180px',
          background: copy.brand.primaryHex,
          '--dur': '20s'
        } as React.CSSProperties}
      />
      <span 
        className="blob absolute" 
        style={{
          left: '60%',
          top: '10%',
          width: '160px',
          height: '160px',
          background: copy.brand.secondaryHex,
          '--dur': '24s'
        } as React.CSSProperties}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight hero-title">
            {copy.hero.h1}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed hero-subtitle">
            {copy.hero.sub}
          </p>
          
          {/* Proof micro */}
          <div className="text-sm mb-12 hero-proof">
            {copy.hero.micro}
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              onClick={handleCalculatorClick}
              className="btn-primary h-14 px-8 text-lg font-semibold w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              size="lg"
            >
              <Calculator className="w-6 h-6 mr-3" />
            {copy.hero.ctas.primary}
            </Button>
            
            <Button 
              onClick={handleWhatsAppClick}
              className="btn-secondary h-14 px-8 text-lg font-semibold w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              size="lg"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
            {copy.hero.ctas.secondary}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;