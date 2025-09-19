import Calculator30s from '@/components/Calculator30s';
import SchemaMarkup from '@/components/SchemaMarkup';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Diagnostico = () => {
  const handleBack = () => {
    window.location.assign('/');
  };

  return (
    <div
      className="dark min-h-screen"
      style={{
        backgroundImage:
          'radial-gradient(1200px 600px at 15% -10%, hsl(210 90% 60% / 0.12), transparent 60%), radial-gradient(1200px 600px at 85% 110%, hsl(145 70% 50% / 0.12), transparent 60%), linear-gradient(165deg, hsl(222 48% 6%), hsl(223 50% 7%) 50%, hsl(165 45% 8%))',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Schema.org structured data */}
      <SchemaMarkup />

      {/* Header translúcido */}
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="relative flex items-center h-16">
            {/* Botão Voltar (à esquerda) */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-2"
              aria-label="Voltar"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Voltar</span>
            </Button>

            {/* Logo centralizada (clicável) */}
            <a
              href="/"
              className="absolute left-1/2 -translate-x-1/2 inline-flex items-center justify-center"
              aria-label="Ir para a página inicial"
            >
              <img
                src="/lovable-uploads/landingvillelogo.svg"
                alt="Landingville"
                className="h-12 md:h-812 w-auto select-none cursor-pointer"
              />
            </a>

            {/* Espaçador à direita (equilibra o layout visual) */}
            <div className="ml-auto w-10 sm:w-[88px]" aria-hidden="true" />
          </div>
        </div>
      </header>

      {/* Layout principal */}
      <main className="dark">
        <div className="pt-10 md:pt-12 pb-16 md:pb-20">
          <Calculator30s />
        </div>
      </main>
    </div>
  );
};

export default Diagnostico;
