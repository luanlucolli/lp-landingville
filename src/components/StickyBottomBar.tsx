import { MessageCircle, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChannelSheet } from './ChannelSheet';
import { useState } from 'react';
import copy from '@/content/landingville';

const StickyBottomBar = () => {
  const [showChannelSheet, setShowChannelSheet] = useState(false);

  const handleChannelsClick = () => {
    setShowChannelSheet(true);
  };

  const handleCalculatorClick = () => {
    const calculatorSection = document.getElementById('calculator');
    calculatorSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border p-4 md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex gap-3 max-w-lg mx-auto">
        <Button 
          onClick={handleChannelsClick}
          variant="accent-gradient"
          className="flex-1 min-h-[52px] font-semibold"
          size="lg"
          aria-label="Falar com a Landingville"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          {copy.faq.finalCTA.primary}
        </Button>
        <Button 
          onClick={handleCalculatorClick}
          variant="outline"
          className="focus-ring min-h-[52px] px-6 font-semibold"
          size="lg"
          aria-label="Calcular orçamento"
        >
          <Calculator className="w-5 h-5 mr-2" />
          {copy.faq.finalCTA.secondary}
        </Button>
      </div>

      <ChannelSheet 
        open={showChannelSheet}
        onOpenChange={setShowChannelSheet}
      />
    </div>
  );
};

export default StickyBottomBar;