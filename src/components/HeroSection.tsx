import { Button } from '@/components/ui/button';
import copy from '@/content/landingville';

const HeroSection = () => {
  const handleCalculatorClick = () => {
    const diagnosisSection = document.getElementById('diagnosis');
    if (diagnosisSection) {
      diagnosisSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.assign('/#diagnosis');
    }
  };

  const handleExamplesClick = () => {
    const demosSection = document.getElementById('demos');
    demosSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="top"
      style={{ background: 'hsl(var(--neutral-200))' }}
      className="pt-16 md:pt-20 pb-16 md:pb-24 rounded-t-[24px] md:rounded-t-[28px] lg:rounded-t-[32px] overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Limite de largura 7xl para alinhar com o restante */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center min-h-[80vh] md:min-h-[60vh]">
            {/* Left - Text Content */}
            <div className="space-y-6 text-center md:text-left order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {copy.hero.h1.split('gera contatos').map((part, i, arr) => 
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part}gera <span className="hi-grad">contatos</span>
                    </span>
                  ) : part
                )}
              </h1>

              <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'hsl(var(--neutral-800))' }}>
                {copy.hero.sub}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <Button
                  onClick={handleCalculatorClick}
                  className="btn-accent-gradient h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-semibold rounded-xl"
                >
                  {copy.hero.ctas.primary}
                </Button>

                <Button
                  onClick={handleExamplesClick}
                  className="btn-accent-gradient h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-semibold rounded-xl"
                >
                  {copy.hero.ctas.secondary}
                </Button>
              </div>
            </div>

            {/* Right - Visual (Hidden on mobile) */}
            <div className="order-1 md:order-2 hidden md:block">
              <div className="relative p-0 aspect-[4/5] md:aspect-video overflow-hidden rounded-lg">
                {/* Placeholder/visual em SVG com fundo transparente, ocupando todo o espaço */}
                <img
                  src="/lovable-uploads/hero.svg"
                  alt={copy.hero.visual.gradientNote}
                  className="block w-full h-full"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /max-w-7xl */}
      </div>
    </section>
  );
};

export default HeroSection;
