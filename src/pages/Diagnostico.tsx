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
          <div className="flex items-center justify-between h-16">
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

            <h1 className="text-lg font-semibold">Diagnóstico</h1>
          </div>
        </div>
      </header>

      {/* Simple centered layout for the calculator */}
      <main className="dark">
        <div className="pt-10 md:pt-12 pb-16 md:pb-20">
          <Calculator30s />
        </div>
      </main>
    </div>
  );
};

export default Diagnostico;
