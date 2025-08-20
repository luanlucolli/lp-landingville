import { useState } from 'react';
import { ChevronDown, MessageCircle, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChannelSheet } from './ChannelSheet';
import copy from '@/content/landingville';

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [showChannelSheet, setShowChannelSheet] = useState(false);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleChannelsClick = () => {
    setShowChannelSheet(true);
  };

  const handleCalculatorClick = () => {
    const calculatorSection = document.getElementById('calculator');
    calculatorSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-background" id="faq">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* FAQ */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {copy.faq.title}
            </h2>
          </div>

          <div className="space-y-4 mb-16">
            {copy.faq.items.map((faq, index) => (
              <div 
                key={index}
                className="border border-border rounded-xl overflow-hidden bg-card"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors focus-ring"
                >
                  <h3 className="font-semibold text-foreground pr-4">
                    {faq.q}
                  </h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      openItems.includes(index) ? 'transform rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">
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
                onClick={handleCalculatorClick}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white focus-ring h-14 px-8 text-lg font-semibold w-full sm:w-auto"
                size="lg"
              >
                <Calculator className="w-6 h-6 mr-3" />
                {copy.faq.finalCTA.primary}
              </Button>
              
              <Button 
                onClick={handleChannelsClick}
                variant="outline"
                className="focus-ring h-14 px-8 text-lg font-semibold w-full sm:w-auto"
                size="lg"
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                {copy.faq.finalCTA.secondary}
              </Button>
            </div>
          </div>

          <ChannelSheet 
            open={showChannelSheet}
            onOpenChange={setShowChannelSheet}
          />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;