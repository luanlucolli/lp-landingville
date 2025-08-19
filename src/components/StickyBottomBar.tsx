import { MessageCircle, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StickyBottomBar = () => {
  const handleWhatsAppClick = () => {
    const message = "Oi, sou [Nome] da [Loja]. Vi a Landingville. Quero uma página para [Segmento] e publicar até [Data].";
    const phone = "5547999999999"; // Placeholder
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}&utm_source=site&utm_medium=cta&utm_campaign=landingville`;
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