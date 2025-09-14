import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const DiagnosisHook = () => {
  return (
    <section
      id="diagnosis"
      className="pt-24 pb-24 md:pt-28 md:pb-28"
      style={{ background: 'hsl(var(--neutral-200))' }} // mesmo fundo da Hero
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8">
              
              {/* Upper Block - The Promise */}
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  Qual a solução ideal para o seu negócio?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Não tem certeza por onde começar? Nosso diagnóstico rápido e gratuito analisa seus objetivos e, em 1 minuto, recomenda a solução ideal com uma estimativa de valor clara. Tenha confiança para dar o próximo passo.
                </p>
              </div>

              {/* Mobile/Tablet: SVG abaixo do título */}
              <div className="block lg:hidden">
                <div className="w-full max-w-md mx-auto aspect-square flex items-center justify-center">
                  <img
                    src="/lovable-uploads/quiz.svg"
                    alt="Diagnóstico — visual ilustrativo (SVG)"
                    className="block w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Lower Block - Social Proof */}
              <div className="space-y-6">
                
                {/* Testimonial */}
                <div
                  className="border border-border/50 rounded-xl p-6 relative"
                  style={{ background: 'hsl(var(--neutral-200) / 0.5)' }}
                >
                  <div className="absolute -top-2 -left-2 text-4xl text-muted-foreground/30 font-serif">
                    "
                  </div>
                  <blockquote className="italic text-foreground leading-relaxed pl-4">
                    O diagnóstico da Landingville foi muito decisivo. Me deu a clareza que eu precisava para investir na divulgação do meu negócio com segurança.
                  </blockquote>
                  <footer className="mt-4 text-sm text-muted-foreground">
                    <strong className="text-foreground">Diana Anacleto</strong>, Contadora
                  </footer>
                </div>

                {/* CTA Button — Verde especial (gradiente + glow + intensificação) */}
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
                    // Gradiente com foco no #6d9f50
                    background: 'linear-gradient(135deg, #6d9f50 0%, #7fbf63 40%, #93d277 100%)',
                    color: '#FFFFFF'
                  }}
                >
                  <Link to="/diagnostico">
                    Iniciar Diagnóstico Gratuito
                  </Link>
                </Button>

              </div>
            </div>

            {/* Desktop: coluna do SVG à direita (invariável) */}
            <div className="hidden lg:flex items-center justify-center">
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
