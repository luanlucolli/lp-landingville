import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import copy from '@/content/landingville';

const HeroSection = () => {
  const handleCalculatorClick = () => {
    const calculatorSection = document.getElementById('calculator');
    calculatorSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExamplesClick = () => {
    const demosSection = document.getElementById('demos');
    demosSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-white pt-16 md:pt-20 pb-16 md:pb-24" id="top">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center min-h-[80vh] md:min-h-[60vh]">
          {/* Left - Text Content */}
          <div className="space-y-6 text-center md:text-left order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0E1116] leading-tight">
              Tenha um site bonito, rápido e que gera <span className="hi-grad">vendas</span>.
            </h1>
            
            <p className="text-lg md:text-xl text-[#334155] leading-relaxed">
              {copy.hero.sub}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Button 
                onClick={handleCalculatorClick}
                className="btn-accent-gradient h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B6FA5] focus:ring-offset-2"
              >
                <Calculator className="w-5 h-5 mr-2" />
                {copy.hero.ctas.primary}
              </Button>
              
              <Button 
                onClick={handleExamplesClick}
                className="btn-outline-gradient h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-semibold"
              >
                {copy.hero.ctas.secondary}
              </Button>
            </div>

            {/* Badge */}
            <div className="pt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#85BA62]/10 text-[#85BA62] border border-[#85BA62]/20">
                {copy.hero.badge}
              </span>
            </div>
          </div>

          {/* Right - Photo */}
          <div className="order-1 md:order-2">
            <div className="card-elevated p-4 md:p-6 aspect-[4/5] md:aspect-video overflow-hidden">
              <img 
                src="/lovable-uploads/hero-photo-placeholder.png" 
                alt="Foto destaque (placeholder)" 
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  // Fallback to a gradient placeholder
                  const target = e.target as HTMLImageElement;
                  target.style.background = 'linear-gradient(135deg, #f3f4f6, #e5e7eb)';
                  target.style.display = 'flex';
                  target.style.alignItems = 'center';
                  target.style.justifyContent = 'center';
                  target.innerHTML = '<span style="color: #6b7280; font-weight: 500;">Imagem em breve</span>';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;