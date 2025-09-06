import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Target, ClipboardList, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const DiagnosticHookSection = () => {
  const benefits = [
    {
      icon: Target,
      title: "Foco no seu Objetivo",
      text: "A recomendação é 100% baseada na sua meta de negócio."
    },
    {
      icon: ClipboardList,
      title: "Um Plano, não só um Preço",
      text: "Você recebe um plano de ação que justifica cada recomendação."
    },
    {
      icon: ShieldCheck,
      title: "Decisão Sem Pressão",
      text: "Use seu diagnóstico para decidir no seu tempo, sem compromisso."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background" id="diagnostico">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual Column - Right on Desktop, First on Mobile */}
            <div className="order-1 lg:order-2">
              <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  {/* Placeholder for Lottie animation */}
                  <div className="text-center text-muted-foreground">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <Target className="w-12 h-12 text-primary" />
                    </div>
                    <p className="text-sm">Container para animação Lottie</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column - Left on Desktop, Second on Mobile */}
            <div className="order-2 lg:order-1 space-y-8">
              
              {/* Top Block: Title and Paragraph */}
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Não sabe por onde começar? Tenha um plano de ação claro.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Nosso diagnóstico rápido e gratuito analisa seus objetivos e, em 1 minuto, recomenda a solução digital ideal com uma estimativa de valor. Tenha confiança para dar o próximo passo.
                </p>
              </div>

              {/* Bottom Block: Benefits and CTA */}
              <div className="space-y-6">
                {/* Benefits Badges */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {benefits.map((benefit, index) => {
                    const IconComponent = benefit.icon;
                    return (
                      <Card key={index} className="p-4 bg-background/50 border-border/50 hover:bg-background/80 transition-colors">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-4 h-4 text-primary" />
                            </div>
                            <h3 className="font-semibold text-sm text-foreground">
                              {benefit.title}
                            </h3>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {benefit.text}
                          </p>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <Button 
                    asChild
                    className="w-full md:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold h-12 px-8"
                  >
                    <Link to="/diagnostico">
                      Iniciar Diagnóstico Gratuito
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagnosticHookSection;