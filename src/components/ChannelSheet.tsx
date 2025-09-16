import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageCircle, Instagram } from 'lucide-react';
import copy from '@/content/landingville';

interface ChannelSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recommendation?: 'landing' | 'site';
  priceRange?: [number, number];
  answers?: { s1: string[]; s2: string[]; s3: string[]; s4: string[]; s5: string[]; };
  fallback?: { q1?: string; q2?: string; };
  context?: {
    source: 'services' | 'calculator_final' | 'generic';
    intent?: 'landing' | 'site';
  };
}

function buildDiagnosisSummary(args: {
  stepsCopy: typeof copy.calculator.steps;
  answers?: ChannelSheetProps['answers'];
  fallback?: ChannelSheetProps['fallback'];
  recommendation?: 'landing' | 'site';
  priceRange?: [number, number];
}): string {
  const { stepsCopy, answers, fallback, recommendation, priceRange } = args;
  let summary = '';

  // Recomendação e estimativa
  if (recommendation && priceRange) {
    summary += `Tipo sugerido: ${recommendation === 'landing' ? 'Landing Page' : 'Site'}\n`;
    summary += `Estimativa: R$ ${priceRange[0]} – R$ ${priceRange[1]}\n\n`;
  }

  summary += 'Respostas do diagnóstico:\n';

  // Processar cada step
  if (answers) {
    Object.entries(answers).forEach(([stepKey, selections]) => {
      if (selections && selections.length > 0) {
        const stepTitle = stepsCopy[stepKey as keyof typeof stepsCopy]?.title;
        if (stepTitle) {
          summary += `• ${stepTitle}: ${selections.join('; ')}\n`;
        }
      }
    });
  }

  // Adicionar fallback se existir
  if (fallback?.q1) {
    summary += `• Preferência geral: ${fallback.q1}\n`;
  }
  if (fallback?.q2) {
    summary += `• Preferência de orçamento: ${fallback.q2}\n`;
  }

  return summary;
}

const buildWhatsAppHref = (
  intent: 'site' | 'landing', 
  context: { source: 'services' | 'calculator_final' | 'generic' }, 
  priceRange?: [number, number],
  answers?: ChannelSheetProps['answers'],
  fallback?: ChannelSheetProps['fallback'],
  recommendation?: 'landing' | 'site'
) => {
  const base = 'https://wa.me/5547984802779';
  let texto = '';

  if (context.source === 'calculator_final') {
    const intro = 'Olá! Fiz o diagnóstico no site.';
    const resumo = buildDiagnosisSummary({ 
      stepsCopy: copy.calculator.steps, 
      answers, 
      fallback, 
      recommendation: intent === 'landing' ? 'landing' : 'site', 
      priceRange 
    });
    const origem = 'Vim do resultado do diagnóstico.';
    texto = `${intro}\n${resumo}\n${origem}\nPodemos conversar?`;
  } else if (context.source === 'services') {
    const intro = 'Olá! ';
    const pedido = intent === 'site'
      ? 'Quero um Site para o meu negócio. '
      : 'Quero uma Landing Page para o meu negócio. ';
    const origem = 'Vim da seção de Serviços do site. ';
    texto = `${intro}${pedido}${origem}Podemos conversar?`;
  } else {
    // Generic message for any other source
    texto = `Olá! Quero conversar sobre um projeto web (${intent === 'site' ? 'site' : 'landing'}). Podemos falar?`;
  }

  return `${base}?text=${encodeURIComponent(texto)}`;
};

export const ChannelSheet = ({ open, onOpenChange, recommendation, priceRange, answers, fallback, context }: ChannelSheetProps) => {
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
        const contextData = context || { source: 'generic' };
        const url = buildWhatsAppHref(intent, contextData, priceRange, answers, fallback, recommendation);
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