import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Clock, Target, DollarSign, Lightbulb, Receipt, Zap } from 'lucide-react';

const DiagnosisHook = () => {
  return (
    <section
      id="diagnosis"
      className="pt-24 pb-24 md:pt-28 md:pb-28 lg:pt-32 lg:pb-32"
      style={{ background: 'hsl(var(--neutral-200))' }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left Column - Content */}
            <div className="space-y-8 lg:space-y-12">

              {/* Upper Block - The Promise */}
              <div className="space-y-6 lg:space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  Qual a solução ideal para o seu negócio?
                </h2>

                {/* Mobile/Tablet: SVG imediatamente abaixo do título (sem margem) */}
                <div className="block lg:hidden [margin-top:0!important]" style={{ marginTop: 0 }}>
                  <div
                    className="w-full max-w-md mx-auto aspect-square flex items-center justify-center [margin-top:0!important]"
                    style={{ marginTop: 0 }}
                  >
                    <img
                      src="/lovable-uploads/quiz.svg"
                      alt="Diagnóstico — visual ilustrativo (SVG)"
                      className="block w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Lista de Benefícios */}
                <div className="[margin-top:0!important] lg:[margin-top:calc(1.5rem*calc(1-var(--tw-space-y-reverse)))!important] space-y-4 lg:space-y-6">
                  <div className="flex items-start gap-3 lg:gap-4">
                    <div className="flex-shrink-0 w-6 h-6 mt-0.5">
                      <Zap className="w-6 h-6 text-primary-green" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-base mb-1 lg:mb-2">
                        Rápido e sem cadastro
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Leve menos de 1 minuto para ter sua resposta, sem pedir seus dados.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 lg:gap-4">
                    <div className="flex-shrink-0 w-6 h-6 mt-0.5">
                      <Lightbulb className="w-6 h-6 text-primary-green" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-base mb-1 lg:mb-2">
                        Recomendação Instantânea
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Descubra na hora se uma Landing Page ou um Site é o ideal para seu objetivo.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 lg:gap-4">
                    <div className="flex-shrink-0 w-6 h-6 mt-0.5">
                      <Receipt className="w-6 h-6 text-primary-green" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-base mb-1 lg:mb-2">
                        Estimativa de Valor Clara
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Tenha uma faixa de preço transparente para planejar seu investimento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Block */}
              <div className="space-y-4 lg:space-y-6">
                <Button
                  asChild
                  className="
                    w-full h-12 font-semibold text-lg rounded-xl
                    transition-all duration-200
                    hover:brightness-110 hover:saturate-125 hover:contrast-105
                    active:brightness-125 active:saturate-150 active:contrast-110 active:scale-[0.99]
                    focus:outline-none
                    [box-shadow:0_8px_24px_rgba(109,159,80,0.28)]
                    hover:[box-shadow:0_12px_36px_rgba(109,159,80,0.42)]
                    active:[box-shadow:0_6px_18px_rgba(109,159,80,0.36)]
                    border border-white/15
                  "
                  style={{
                    background: 'linear-gradient(135deg, #6d9f50 0%, #7fbf63 40%, #93d277 100%)',
                    color: '#FFFFFF'
                  }}
                >
                  <Link to="/diagnostico">
                    Iniciar Diagnóstico Gratuito
                  </Link>
                </Button>

                <p className="text-sm italic text-muted-foreground text-center">
                  "O diagnóstico foi muito decisivo para mim. Me deu a clareza que eu precisava." - Diana Anacleto, Contadora
                </p>
              </div>
            </div>

            {/* Desktop: coluna do SVG à direita (invariável) */}
            <div className="hidden lg:flex items-center justify-center lg:pl-4">
              <div className="w-full max-w-md aspect-square flex items-center justify-center">
                <img
                  src="/lovable-uploads/quiz.svg"
                  alt="Diagnóstico — visual ilustrativo (SVG)"
                  className="block w-full h-full object-contain"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagnosisHook;
