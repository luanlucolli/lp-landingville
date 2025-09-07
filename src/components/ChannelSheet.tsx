import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageCircle, Instagram } from 'lucide-react';
import copy from '@/content/landingville';

interface ChannelSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recommendation?: 'landing' | 'site';
  priceRange?: [number, number];
}

export const ChannelSheet = ({ open, onOpenChange, recommendation, priceRange }: ChannelSheetProps) => {
  const channels = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-purple-500 hover:bg-purple-600 text-white',
      action: () => {
        window.open(copy.contact.channels[0].href, '_blank');
        onOpenChange(false);
      }
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366] hover:bg-[#128C7E]',
      action: () => {
        const serviceType = recommendation === 'landing' ? 'Landing Page' : 'Site';
        const price = priceRange ? `R$ ${priceRange[0]} - R$ ${priceRange[1]}` : '';
        
        const message = `Olá! Vi a calculadora da Landingville e tenho interesse em um ${serviceType}. A estimativa foi de ${price}. Gostaria de conversar sobre meu projeto.`;
        
        const url = `${copy.contact.channels[1].href}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        onOpenChange(false);
      }
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {copy.contact.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-center text-muted-foreground text-sm">
            {copy.contact.note}
          </p>
          
          <div className="grid grid-cols-1 gap-3">
            {channels.map((channel) => (
              <Button
                key={channel.id}
                onClick={channel.action}
                className={`${channel.color} text-white font-semibold h-14 justify-start gap-4 transition-all hover:scale-105`}
                variant="default"
              >
                <channel.icon className="w-6 h-6" />
                <span>Conversar pelo {channel.name}</span>
              </Button>
            ))}
          </div>
          
          {recommendation && priceRange && (
            <div className="mt-6 p-4 bg-muted/30 rounded-xl">
              <h4 className="font-semibold text-foreground text-center mb-2">
                Sua estimativa:
              </h4>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">
                  {recommendation === 'landing' ? 'Landing Page' : 'Site'} - R$ {priceRange[0]} - R$ {priceRange[1]}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Escopo enxuto • Integrações leves • Ajustes inclusos
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};