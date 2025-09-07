const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'hsl(var(--primary-green))' }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16 md:h-20">
          {/* Centered Logo */}
          <img 
            src="/lovable-uploads/logo-landingville.png" 
            alt="Landingville" 
            className="h-8 w-auto mx-auto" 
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;