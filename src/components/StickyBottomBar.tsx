import { MessageCircle, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import copy from '@/content/landingville';
import { scrollToSection, openChannelSheet } from '@/utils/nav';

const StickyBottomBar = () => {
  const handleChannelClick = () => {
    openChannelSheet();
  };

  const handleCalculatorClick = () => {
    scrollToSection('calculator');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border p-4 md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex gap-3 max-w-md mx-auto">
        <Button 
          onClick={handleChannelClick}
          className="flex-1 whatsapp-button focus-ring h-12 font-semibold"
          size="lg"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          {copy.faq.finalCTA.secondary.label}
        </Button>
        <Button 
          onClick={handleCalculatorClick}
          variant="secondary"
          className="focus-ring h-12 px-6 font-semibold"
          size="lg"
        >
          <Calculator className="w-5 h-5 mr-2" />
          {copy.faq.finalCTA.primary.label}
        </Button>
      </div>
    </div>
  );
};

export default StickyBottomBar;