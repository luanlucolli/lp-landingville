import { Button } from '@/components/ui/button';
import copy from '@/content/landingville';

const Header = () => {
  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDiagnosticClick = () => {
    const calculatorSection = document.getElementById('calculator');
    calculatorSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/logo-landingville.png" 
              alt="Landingville" 
              className="h-8 w-auto" 
            />
          </div>

          {/* Center navigation - hidden on mobile */}
          <nav className="hidden md:flex items-center">
            <button
              onClick={handleHomeClick}
              className="text-[#0E1116] hover:text-[#2B6FA5] px-4 py-2 font-medium transition-colors rounded-lg"
              aria-label="Ir para o início da página"
            >
              Início
            </button>
          </nav>

          {/* Right CTA */}
          <div className="flex items-center">
            <Button
              onClick={handleDiagnosticClick}
              className="btn-accent-gradient h-10 md:h-12 px-4 md:px-6 text-sm md:text-base font-semibold rounded-lg"
              aria-label="Ir para diagnóstico"
            >
              Diagnóstico
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;