import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageCircle, Instagram } from 'lucide-react';
import copy from '@/content/landingville';

interface ChannelSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recommendation?: 'landing' | 'site';
  priceRange?: [number, number];
  context?: {
    source: 'services' | 'calculator_final';
    intent: 'landing' | 'site';
  };
}

const buildWhatsAppHref = (intent: 'site' | 'landing', context: { source: 'services' | 'calculator_final' }, priceRange?: [number, number]) => {
  const base = 'https://wa.me/5547984802779';
  const intro = context.source === 'calculator_final' && priceRange
    ? `Olá! Fiz o diagnóstico no site e minha estimativa foi de R$ ${priceRange[0]}–${priceRange[1]}. `
    : `Olá! `;
  const pedido = intent === 'site'
    ? 'Quero um Site para o meu negócio. '
    : 'Quero uma Landing Page para o meu negócio. ';
  const origem = context.source === 'services'
    ? 'Vim da seção de Serviços do site. '
    : 'Vim do resultado do diagnóstico. ';
  const texto = encodeURIComponent(`${intro}${pedido}${origem}Podemos conversar?`);
  return `${base}?text=${texto}`;
};

export const ChannelSheet = ({ open, onOpenChange, recommendation, priceRange, context }: ChannelSheetProps) => {
  const channels = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
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
        const intent = context?.intent || (recommendation === 'landing' ? 'landing' : 'site');
        const contextData = context || { source: 'calculator_final' };
        const url = buildWhatsAppHref(intent, contextData, priceRange);
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