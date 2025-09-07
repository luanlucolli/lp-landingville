import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import '@dotlottie/player-component/dist/dotlottie-player.mjs';

const DiagnosisHook = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background" id="diagnosis">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Content */}
            <div className="order-2 lg:order-1 space-y-8">
              
              {/* Upper Block - The Promise */}
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  Qual a vitrine digital ideal para o seu negócio?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Não tem certeza por onde começar? Nosso diagnóstico rápido e gratuito analisa seus objetivos e, em 1 minuto, recomenda a solução ideal com uma estimativa de valor clara. Tenha confiança para dar o próximo passo.
                </p>
              </div>

              {/* Lower Block - Social Proof */}
              <div className="space-y-6">
                
                {/* Testimonial */}
                <div className="bg-background/50 border border-border/50 rounded-xl p-6 relative">
                  <div className="absolute -top-2 -left-2 text-4xl text-muted-foreground/30 font-serif">
                    "
                  </div>
                  <blockquote className="italic text-foreground leading-relaxed pl-4">
                    O diagnóstico da Landingville foi um divisor de águas. Me deu a clareza que eu precisava para investir com segurança.
                  </blockquote>
                  <footer className="mt-4 text-sm text-muted-foreground">
                    <strong className="text-foreground">Diana Anacleto</strong>, Contadora
                  </footer>
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold text-lg"
                >
                  <Link to="/diagnostico">
                    Iniciar Diagnóstico Gratuito
                  </Link>
                </Button>

              </div>
            </div>

            {/* Right Column - Visual Container */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <div className="w-full max-w-md aspect-square bg-gradient border-none from-primary/5 to-secondary/5 rounded-2xl border border-border/30 flex items-center justify-center">
                {/* runtime do dotLottie (mantenha se não importar globalmente) */}
                <script
                  src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
                  type="module"
                ></script>

                {/* Lottie (mesma abordagem do outro arquivo) */}
                <div className="relative h-[15rem] w-full md:w-auto flex items-center justify-center">
                  <div className="origin-center pointer-events-none scale-[1.8] md:scale-[2.2]">
                    <dotlottie-player
                      src="/lovable-uploads/diagnosticohook.lottie"
                      autoplay
                      loop
                      background="transparent"
                      aria-hidden="true"
                      className="block"
                      style={{ width: '15rem', height: '15rem' }}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagnosisHook;
