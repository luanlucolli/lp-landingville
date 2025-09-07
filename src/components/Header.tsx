const Header = () => {
  return (
    <header
      className="w-full py-2 md:py-3" // menos espaço em cima/baixo
      style={{ background: 'hsl(var(--neutral-200))' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          {/* Logo centralizada, maior e sem gap de baseline */}
          <img
            src="/lovable-uploads/landingvillelogo.svg"
            alt="Landingville"
            className="block h-12 md:h-14 w-auto mx-auto" // ↑ logo maior
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
