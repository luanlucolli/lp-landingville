import { 
  Timer, 
  BookOpen, 
  MonitorSmartphone, 
  MessageCircle, 
  MapPin, 
  Pencil, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';

const benefits = [
  { icon: Timer, text: "Rápido de abrir" },
  { icon: BookOpen, text: "Fácil de entender" },
  { icon: MonitorSmartphone, text: "Funciona no computador e no celular" },
  { icon: MessageCircle, text: "Botão para falar com você" },
  { icon: MapPin, text: "Endereço e rotas fáceis" },
  { icon: Pencil, text: "Conteúdo que você consegue atualizar" },
  { icon: ShieldCheck, text: "Estável e seguro" },
  { icon: UserCheck, text: "Suporte humano" }
];

const BenefitsStrip = () => {
  return (
    <section style={{ background: 'hsl(var(--neutral-900))' }} className="py-6 md:py-8 overflow-hidden relative">
      {/* Fade effect on sides */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10" style={{ background: 'linear-gradient(to right, hsl(var(--neutral-900)), transparent)' }}></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10" style={{ background: 'linear-gradient(to left, hsl(var(--neutral-900)), transparent)' }}></div>
      
      {/* Scrolling content */}
      <div className="flex items-center gap-12 animate-marquee">
        {/* First set */}
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div
              key={`first-${index}`}
              className="flex items-center gap-3 whitespace-nowrap"
              style={{ color: 'hsl(var(--neutral-100))' }}
            >
              <Icon className="w-5 h-5" style={{ color: 'hsl(var(--primary-green))' }} />
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
              className="flex items-center gap-3 whitespace-nowrap"
              style={{ color: 'hsl(var(--neutral-100))' }}
            >
              <Icon className="w-5 h-5" style={{ color: 'hsl(var(--primary-green))' }} />
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