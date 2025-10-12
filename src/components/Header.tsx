import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

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
        <div className="flex items-center justify-between md:justify-start md:gap-12">
          {/* Logo à esquerda no desktop, centro no mobile */}
          <Link to="/" className="md:flex-shrink-0">
            <img
              src="/lovable-uploads/landingvillelogo.svg"
              alt="Landingville"
              className="h-10 md:h-12 w-auto brightness-0 invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-white ${
                  isActive(item.path)
                    ? 'text-white'
                    : 'text-white/70'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button
                className="p-2 text-white hover:text-white/80 transition-colors"
                aria-label="Menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-64"
              style={{ background: '#20262d' }}
            >
              <nav className="flex flex-col gap-6 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-white ${
                      isActive(item.path)
                        ? 'text-white'
                        : 'text-white/70'
                    }`}
                  >
                    {item.label}
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
