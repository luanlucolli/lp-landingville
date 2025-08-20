import { MessageCircle, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteContent } from '@/content/siteContent';

const StickyBottomBar = () => {
  const handleWhatsAppClick = () => {
    const { phone, messageTemplate, utm } = siteContent.hero.whatsapp;
    const message = messageTemplate;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}&utm_source=${utm.source}&utm_medium=sticky&utm_campaign=${utm.campaign}`;
    window.open(url, '_blank');
  };

  const handlePlansClick = () => {
    const plansSection = document.getElementById('planos');
    plansSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border p-4 md:hidden">
      <div className="flex gap-3 max-w-md mx-auto">
        <Button 
          onClick={handleWhatsAppClick}
          className="flex-1 whatsapp-button focus-ring h-12 font-semibold"
          size="lg"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Falar no WhatsApp
        </Button>
        <Button 
          onClick={handlePlansClick}
          variant="secondary"
          className="focus-ring h-12 px-6 font-semibold"
          size="lg"
        >
          <CreditCard className="w-5 h-5 mr-2" />
          Ver planos
        </Button>
      </div>
    </div>
  );
};

export default StickyBottomBar;