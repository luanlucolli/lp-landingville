import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MessageCircle, Instagram, Mail, Phone } from 'lucide-react';

const ChannelSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpenChannelSheet = () => {
      setIsOpen(true);
    };

    window.addEventListener('openChannelSheet', handleOpenChannelSheet);
    return () => {
      window.removeEventListener('openChannelSheet', handleOpenChannelSheet);
    };
  }, []);

  const channels = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      action: () => {
        const phone = "5547999999999";
        const message = "Oi! Vi a calculadora da Landingville e quero receber minha proposta personalizada.";
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
        setIsOpen(false);
      },
      color: 'bg-[#25D366] hover:bg-[#128C7E] text-white'
    },
    {
      name: 'Instagram Direct',
      icon: Instagram,
      action: () => {
        window.open('https://instagram.com/landingville', '_blank');
        setIsOpen(false);
      },
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
    },
    {
      name: 'E-mail',
      icon: Mail,
      action: () => {
        const subject = encodeURIComponent('Proposta Landingville - Calculadora');
        const body = encodeURIComponent('Olá! Usei a calculadora no site e gostaria de receber minha proposta personalizada.');
        window.open(`mailto:contato@landingville.com.br?subject=${subject}&body=${body}`, '_blank');
        setIsOpen(false);
      },
      color: 'bg-blue-600 hover:bg-blue-700 text-white'
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="bottom" className="h-auto max-w-md mx-auto rounded-t-3xl">
        <SheetHeader className="text-center pb-6">
          <SheetTitle className="text-xl font-bold">
            Escolha seu canal preferido
          </SheetTitle>
          <p className="text-muted-foreground">
            Fale conosco pelo canal que você mais usa
          </p>
        </SheetHeader>
        
        <div className="space-y-3 pb-4">
          {channels.map((channel) => (
            <Button
              key={channel.name}
              onClick={channel.action}
              className={`w-full h-14 text-lg font-semibold flex items-center gap-3 ${channel.color}`}
              size="lg"
            >
              <channel.icon className="w-6 h-6" />
              {channel.name}
            </Button>
          ))}
        </div>
        
        <p className="text-xs text-muted-foreground text-center pt-4 border-t">
          Resposta em até 2h no horário comercial
        </p>
      </SheetContent>
    </Sheet>
  );
};

export default ChannelSheet;