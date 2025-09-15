import Calculator30s from '@/components/Calculator30s';
import SchemaMarkup from '@/components/SchemaMarkup';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Diagnostico = () => {
  const handleBack = () => {
    window.location.assign('/');
  };



  return (
    <div className="min-h-screen bg-background">
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
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <Calculator30s />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Diagnostico;