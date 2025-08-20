import { MessageCircle, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { copy } from '@/content/landingville';

const StickyBottomBar = () => {
  const handleWhatsAppClick = () => {
    const phone = "5547999999999"; // Placeholder
    const url = `https://wa.me/${phone}?text=${encodeURIComponent("Olá! Vi a Landingville e gostaria de saber mais sobre como ter um site que gera vendas.")}&utm_source=site&utm_medium=cta&utm_campaign=landingville`;
    window.open(url, '_blank');
  };

  const handlePlansClick = () => {
    const plansSection = document.getElementById('planos');
    plansSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border p-4 md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex gap-3 max-w-md mx-auto">
        <Button 
          onClick={handleWhatsAppClick}
          className="flex-1 whatsapp-button focus-ring h-12 font-semibold"
          size="lg"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          {copy.faq.finalCTA.primary}
        </Button>
        <Button 
          onClick={handlePlansClick}
          variant="secondary"
          className="focus-ring h-12 px-6 font-semibold"
          size="lg"
        >
          <CreditCard className="w-5 h-5 mr-2" />
          {copy.faq.finalCTA.secondary}
        </Button>
      </div>
    </div>
  );
};

export default StickyBottomBar;