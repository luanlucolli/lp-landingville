import { useEffect } from 'react';
import Calculator30s from '@/components/Calculator30s';
import SchemaMarkup from '@/components/SchemaMarkup';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Diagnostico = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Diagnóstico Digital Gratuito - Landingville';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Descubra em 1 minuto a solução digital ideal para seu negócio. Diagnóstico gratuito e plano de ação personalizado.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Schema.org structured data */}
      <SchemaMarkup />
      
      {/* Header with back link */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Diagnóstico Digital Gratuito
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Responda 5 perguntas simples e receba um plano de ação personalizado para seu negócio, com estimativa de valor e próximos passos.
            </p>
          </div>
          
          {/* Calculator component */}
          <Calculator30s />
        </div>
      </main>
    </div>
  );
};

export default Diagnostico;