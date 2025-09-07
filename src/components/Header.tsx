const Header = () => {
  return (
    <header className="w-full py-4 md:py-6" style={{ background: 'var(--neutral-200)' }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          {/* Centered Logo */}
          <img 
            src="/lovable-uploads/logo-landingville.png" 
            alt="Landingville" 
            className="h-8 w-auto mx-auto"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;