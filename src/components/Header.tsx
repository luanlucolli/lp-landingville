import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Início', path: '/' },
    { label: 'Diagnóstico', path: '/diagnostico' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className="w-full py-3 md:py-4 sticky top-0 z-50 backdrop-blur-sm"
      style={{ background: 'hsl(var(--neutral-900))' }}
    >
      <div className="container mx-auto px-4">
        {/* Mobile: flex. Desktop: grid com 3 colunas (logo | nav central | espaço vazio) */}
        <div className="flex items-center justify-between md:grid md:grid-cols-[auto_1fr_auto] md:items-center">
          {/* Logo à esquerda no desktop */}
          <Link to="/" className="md:flex-shrink-0">
            <img
              src="/lovable-uploads/landingvillelogo.svg"
              alt="Landingville"
              className="h-10 md:h-12 w-auto brightness-0 invert"
            />
          </Link>

          {/* Navegação desktop centralizada vertical e horizontal */}
          <nav className="hidden md:flex justify-center items-center">
            <ul className="flex gap-8">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`text-sm font-medium transition-colors hover:text-white inline-flex items-center gap-2 ${
                      isActive(item.path) ? 'text-white' : 'text-white/70'
                    }`}
                  >
                    {item.label}
                    {item.label === 'Diagnóstico' && (
                      <Badge 
                        className="px-2 py-0.5 text-[10px] font-bold bg-primary-green text-white border-0"
                      >
                        15% OFF
                      </Badge>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Espaço vazio à direita no desktop para manter a nav central */}
          <div className="hidden md:block" aria-hidden="true" />

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button
                className="p-2 text-white hover:text-white/80 transition-colors outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
                aria-label="Menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-64 focus:outline-none focus-visible:outline-none"
              style={{ background: '#20262d' }}
            >
              {/* Logo branca centralizada no topo */}
              <div className="flex justify-center mb-8">
                <img
                  src="/lovable-uploads/landingvillelogo.svg"
                  alt="Landingville"
                  className="h-10 w-auto brightness-0 invert"
                />
              </div>

              {/* X da sidebar sem focus-visible */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Fechar menu"
                  className="p-2 text-white/80 hover:text-white outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-white inline-flex items-center gap-2 ${
                      isActive(item.path) ? 'text-white' : 'text-white/70'
                    }`}
                  >
                    {item.label}
                    {item.label === 'Diagnóstico' && (
                      <Badge 
                        className="px-2 py-0.5 text-[10px] font-bold bg-primary-green text-white border-0"
                      >
                        15% OFF
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
