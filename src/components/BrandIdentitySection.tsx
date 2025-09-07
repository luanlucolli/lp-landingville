import { Palette, Smartphone } from 'lucide-react';

const BrandIdentitySection = () => {
  const colors = [
    {
      name: "Azul Aço",
      hex: "#2B6FA5",
      hsl: "208 58% 41%",
      usage: "Botões principais, títulos"
    },
    {
      name: "Verde Musgo",
      hex: "#85BA62", 
      hsl: "98 35% 55%",
      usage: "Destaques, CTAs secundários"
    }
  ];

  return (
    <section className="py-20" style={{ background: 'hsl(var(--neutral-200))' }} id="identidade">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Palette className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Identidade Visual
            </h2>
          </div>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Cores profissionais que transmitem confiança e destacam sua marca
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {colors.map((color, index) => (
              <div 
                key={index}
                className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
              >
                <div 
                  className="w-24 h-24 rounded-2xl mx-auto mb-6 shadow-lg"
                  style={{ backgroundColor: color.hex }}
                />
                
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {color.name}
                </h3>
                
                <div className="space-y-2 text-sm">
                  <p className="font-mono text-muted-foreground">{color.hex}</p>
                  <p className="text-muted-foreground">{color.usage}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Demo buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button 
              className="px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: "#2B6FA5" }}
            >
              Botão Principal
            </button>
            <button 
              className="px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: "#85BA62" }}
            >
              Botão Secundário
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-3 p-6 rounded-xl bg-muted/50 border border-border/50">
            <Smartphone className="w-6 h-6 text-primary" />
            <p className="text-muted-foreground font-medium">
              Visual limpo, rápido e de alto contraste para leitura no celular
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandIdentitySection;