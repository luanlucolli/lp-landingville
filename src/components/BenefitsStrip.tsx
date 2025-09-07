import { 
  Smartphone, 
  Timer, 
  Search, 
  MessageCircle, 
  MapPin, 
  LayoutList, 
  ShieldCheck, 
  BadgeCheck 
} from 'lucide-react';

const benefits = [
  { icon: Smartphone, text: "Feito para celular" },
  { icon: Timer, text: "Publica em dias" },
  { icon: Search, text: "Encontra no Google" },
  { icon: MessageCircle, text: "Botão para falar com você" },
  { icon: MapPin, text: "Mapa e rotas fáceis" },
  { icon: LayoutList, text: "Cardápio ou catálogo simples" },
  { icon: ShieldCheck, text: "Ajustes por 30 dias" },
  { icon: BadgeCheck, text: "Sem burocracia" }
];

const BenefitsStrip = () => {
  return (
    <section className="bg-[#0E1116] py-6 md:py-8 overflow-hidden relative benefits-strip">
      {/* Fade effect on sides */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0E1116] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0E1116] to-transparent z-10"></div>
      
      {/* Scrolling content */}
      <div className="flex items-center gap-12 animate-marquee">
        {/* First set */}
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div
              key={`first-${index}`}
              className="flex items-center gap-3 text-white whitespace-nowrap"
            >
              <Icon className="w-5 h-5 text-[#85BA62]" />
              <span className="text-sm md:text-base font-semibold tracking-wide">
                {benefit.text}
              </span>
            </div>
          );
        })}
        
        {/* Duplicate set for seamless loop */}
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div
              key={`second-${index}`}
              className="flex items-center gap-3 text-white whitespace-nowrap"
            >
              <Icon className="w-5 h-5 text-[#85BA62]" />
              <span className="text-sm md:text-base font-semibold tracking-wide">
                {benefit.text}
              </span>
            </div>
          );
        })}
      </div>
      
    </section>
  );
};

export default BenefitsStrip;