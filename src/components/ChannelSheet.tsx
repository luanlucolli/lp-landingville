import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageCircle, Instagram, Mail, Phone } from 'lucide-react';
import copy from '@/content/landingville';

interface ChannelSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recommendation?: 'landing' | 'site';
  priceRange?: [number, number];
}

export const ChannelSheet = ({ open, onOpenChange, recommendation, priceRange }: ChannelSheetProps) => {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  const channels = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366] hover:bg-[#128C7E]',
      action: () => {
        const phone = "5547999999999"; // Replace with actual phone
        const serviceType = recommendation === 'landing' ? 'Landing Page' : 'Site';
        const price = priceRange ? `R$ ${priceRange[0]} - R$ ${priceRange[1]}` : '';
        
        const message = `Olá! Vi a calculadora da Landingville e tenho interesse em um ${serviceType}. A estimativa foi de ${price}. Gostaria de conversar sobre meu projeto.`;
        
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}&utm_source=calculator&utm_medium=cta&utm_campaign=landingville`;
        window.open(url, '_blank');
        onOpenChange(false);
      }
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
      action: () => {
        // Replace with actual Instagram handle
        const url = 'https://instagram.com/landingville.jlle?utm_source=calculator&utm_medium=cta&utm_campaign=landingville';
        window.open(url, '_blank');
        onOpenChange(false);
      }
    },
    {
      id: 'email',
      name: 'E-mail',
      icon: Mail,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => {
        const serviceType = recommendation === 'landing' ? 'Landing Page' : 'Site';
        const price = priceRange ? `R$ ${priceRange[0]} - R$ ${priceRange[1]}` : '';
        
        const subject = `Interesse em ${serviceType} - ${copy.brand.name}`;
        const body = `Olá!\n\nVi a calculadora da Landingville e tenho interesse em um ${serviceType}.\n\nA estimativa foi de ${price}.\n\nGostaria de conversar sobre meu projeto.\n\nObrigado!`;
        
        const url = `mailto:contato@landingville.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(url, '_blank');
        onOpenChange(false);
      }
    },
    {
      id: 'phone',
      name: 'Telefone',
      icon: Phone,
      color: 'bg-green-600 hover:bg-green-700',
      action: () => {
        const phone = "tel:+5547999999999"; // Replace with actual phone
        window.open(phone, '_blank');
        onOpenChange(false);
      }
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Escolha seu canal preferido
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-center text-muted-foreground text-sm">
            Vamos enviar sua proposta pelo canal que preferir
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