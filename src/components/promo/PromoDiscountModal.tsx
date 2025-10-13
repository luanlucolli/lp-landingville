import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PromoDiscountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PromoDiscountModal = ({ open, onOpenChange }: PromoDiscountModalProps) => {
  const navigate = useNavigate();

  const handleActivatePromo = () => {
    sessionStorage.setItem('lv_promo_claimed', 'true');
    onOpenChange(false);
    navigate('/diagnostico');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        aria-labelledby="promo-title"
        aria-describedby="promo-description"
      >
        <DialogHeader className="space-y-4">
          <div className="flex justify-center">
            <img
              src="/lovable-uploads/landingvillelogo.svg"
              alt="Landingville"
              className="h-8 w-auto"
            />
          </div>

          <DialogTitle id="promo-title" className="text-2xl font-bold text-center">
            15% de desconto no valor do orçamento
          </DialogTitle>

          <DialogDescription id="promo-description" className="text-center text-base">
            Ative agora e veja sua estimativa já com o desconto aplicado no resultado do diagnóstico.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary-green flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Diagnóstico gratuito e rápido (menos de 1 minuto)
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary-green flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Recomendação clara: Landing Page ou Site
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary-green flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              15% de desconto no valor do orçamento, aplicado automaticamente no resultado
            </p>
          </div>
        </div>

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
            Abrir diagnóstico com 15% de desconto
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
