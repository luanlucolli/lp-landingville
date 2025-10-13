import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

interface PromoDiscountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PromoDiscountModal = ({ open, onOpenChange }: PromoDiscountModalProps) => {
  const handleActivatePromo = () => {
    // Marcar promoção como ativada
    sessionStorage.setItem('lv_promo_claimed', 'true');
    
    // Fechar modal
    onOpenChange(false);
    
    // Rolar até calculadora
    setTimeout(() => {
      const calculator = document.getElementById('calculator');
      calculator?.scrollIntoView({ behavior: 'smooth' });
      
      // Disparar evento para iniciar calculadora
      window.dispatchEvent(new CustomEvent('startCalculator'));
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md"
        aria-labelledby="promo-title"
        aria-describedby="promo-description"
      >
        <DialogHeader className="space-y-4">
          {/* Logo pequena */}
          <div className="flex justify-center">
            <img
              src="/lovable-uploads/landingvillelogo.svg"
              alt="Landingville"
              className="h-8 w-auto"
            />
          </div>

          {/* Título */}
          <DialogTitle id="promo-title" className="text-2xl font-bold text-center">
            15% OFF no diagnóstico
          </DialogTitle>

          {/* Subtítulo */}
          <DialogDescription id="promo-description" className="text-center text-base">
            Descubra a solução ideal para seu negócio com desconto especial
          </DialogDescription>
        </DialogHeader>

        {/* Benefícios */}
        <div className="space-y-3 py-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary-green flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Diagnóstico gratuito em menos de 1 minuto
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary-green flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Recomendação personalizada para seu objetivo
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary-green flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              15% de desconto aplicado automaticamente
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 pt-2">
          <Button
            onClick={handleActivatePromo}
            className="w-full h-12 font-semibold text-base rounded-xl
              transition-all duration-200
              hover:brightness-110 hover:saturate-125
              active:brightness-125 active:saturate-150 active:scale-[0.99]
              [box-shadow:0_8px_24px_rgba(109,159,80,0.28)]
              hover:[box-shadow:0_12px_36px_rgba(109,159,80,0.42)]
              border border-white/15"
            style={{
              background: 'linear-gradient(135deg, #6d9f50 0%, #7fbf63 40%, #93d277 100%)',
              color: '#FFFFFF'
            }}
          >
            Abrir diagnóstico com 15% OFF
          </Button>

          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="w-full text-muted-foreground hover:text-foreground"
          >
            Agora não
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
