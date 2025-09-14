import { useState } from 'react';
import { ChevronDown, MessageCircle, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChannelSheet } from './ChannelSheet';
import copy from '@/content/landingville';

const FAQSection = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [showChannelSheet, setShowChannelSheet] = useState(false);

  const toggleItem = (index: number) => {
    setOpenItem(prev => (prev === index ? null : index));
  };

  const handleChannelsClick = () => setShowChannelSheet(true);

  const handleCalculatorClick = () => {
    const diagnosisSection = document.getElementById('diagnosis');
    if (diagnosisSection) {
      diagnosisSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.assign('/#diagnosis');
    }
  };

  return (
    <section className="py-20" style={{ background: 'hsl(var(--neutral-200))' }} id="faq">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              {copy.faq.title}
            </h2>
          </div>

          {/* Lista de FAQs */}
          <div className="space-y-4 md:space-y-5 mb-12">
            {copy.faq.items.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-lg overflow-hidden bg-card"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full text-left flex items-center justify-between transition-colors hover:bg-muted/50 min-h-[44px] px-4 md:px-6 py-4 md:py-5 focus:outline-none"
                  aria-expanded={openItem === index}
                  aria-controls={`faq-panel-${index}`}
                >
                  <h3 className="text-base font-medium text-foreground pr-4">
                    {faq.q}
                  </h3>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${
                      openItem === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openItem === index && (
                  <div
                    id={`faq-panel-${index}`}
                    className="px-4 md:px-6 pt-2 md:pt-3 pb-4 md:pb-5"
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {copy.faq.finalCTA.title}
            </h3>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleChannelsClick}
                variant="accent-gradient"
                size="lg"
                className="font-semibold w-full sm:w-auto"
                aria-label="Falar com a Landingville"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {copy.faq.finalCTA.primary}
              </Button>

              <Button
                onClick={handleCalculatorClick}
                variant="outline"
                className="focus-ring min-h-[44px] px-8 font-semibold w-full sm:w-auto"
                size="lg"
                aria-label="Calcular orçamento"
              >
                <Calculator className="w-5 h-5 mr-2" />
                {copy.faq.finalCTA.secondary}
              </Button>
            </div>
          </div>

          <ChannelSheet open={showChannelSheet} onOpenChange={setShowChannelSheet} />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
