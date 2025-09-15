import Calculator30s from '@/components/Calculator30s';
import SchemaMarkup from '@/components/SchemaMarkup';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const Diagnostico = () => {
  const [showResult, setShowResult] = useState(false);

  // Listen for result visibility changes
  useEffect(() => {
    const handleResultVisibility = (event: CustomEvent) => {
      setShowResult(event.detail.visible);
    };

    window.addEventListener('calculatorResultVisible', handleResultVisibility as EventListener);
    return () => {
      window.removeEventListener('calculatorResultVisible', handleResultVisibility as EventListener);
    };
  }, []);

  const handleBack = () => {
    window.location.assign('/');
  };

  const handleViewExamples = () => {
    window.location.assign('/#demos');
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
            
            {!showResult && (
              <a 
                href="/#demos" 
                onClick={handleViewExamples}
                className="text-sm font-medium hover:opacity-80 transition-opacity"
              >
                Ver exemplos
              </a>
            )}
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