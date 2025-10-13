import {
  Zap,
  MonitorSmartphone,
  Search,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  FileText,
  Image as ImageIcon,
  Star,
  Pencil,
  Wrench,
  ShieldCheck,
  Lock,
  BarChart2,
  Rocket,
  Layers,
  Globe,
  UserCheck,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const benefits = [
  { icon: Zap, text: 'Carrega rápido' },
  { icon: MonitorSmartphone, text: 'Pronto para celular e computador' },
  { icon: Search, text: 'Ajuda a aparecer no Google' },
  { icon: MessageCircle, text: 'Botões para WhatsApp e Instagram' },
  { icon: Phone, text: 'Clique para ligar' },
  { icon: Mail, text: 'E-mail em 1 toque' },
  { icon: MapPin, text: 'Endereço e rotas fáceis' },
  { icon: Clock, text: 'Horários sempre atualizados' },
  { icon: FileText, text: 'Formulário simples de contato' },
  { icon: ImageIcon, text: 'Galeria de fotos' },
  { icon: Star, text: 'Depoimentos do seu cliente' },
  { icon: Pencil, text: 'Conteúdo que você edita' },
  { icon: Wrench, text: 'Manutenção opcional' },
  { icon: ShieldCheck, text: 'Seguro e com HTTPS' },
  { icon: Lock, text: 'Privacidade e LGPD' },
  { icon: BarChart2, text: 'Métricas básicas' },
  { icon: Rocket, text: 'Publicação rápida' },
  { icon: Layers, text: 'Cresce por seções' },
  { icon: Globe, text: 'Domínio próprio ou atual' },
  { icon: UserCheck, text: 'Suporte humano' },
];

const BenefitsStrip = () => {
  const groupRef = useRef<HTMLUListElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [duration, setDuration] = useState<number>(40);

  useEffect(() => {
    const measure = () => {
      if (!groupRef.current || !trackRef.current) return;
      const groupWidth = groupRef.current.scrollWidth;
      const targetSpeed = 80; // px/s
      const newDuration = Math.max(20, Math.round(groupWidth / targetSpeed));
      setDistance(groupWidth);
      setDuration(newDuration);
      trackRef.current.style.setProperty('--marquee-distance', `${groupWidth}px`);
      trackRef.current.style.setProperty('--marquee-duration', `${newDuration}s`);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (groupRef.current) ro.observe(groupRef.current);
    window.addEventListener('resize', measure);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <section
      style={{ background: 'hsl(var(--neutral-900))' }}
      className="py-6 md:py-8 overflow-hidden relative"
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10"
        style={{ background: 'linear-gradient(to right, hsl(var(--neutral-900)), transparent)' }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10"
        style={{ background: 'linear-gradient(to left, hsl(var(--neutral-900)), transparent)' }}
      />

      <div
        ref={trackRef}
        className="flex items-center animate-marquee"
        style={
          {
            '--marquee-distance': `${distance || 0}px`,
            '--marquee-duration': `${duration || 40}s`,
          } as React.CSSProperties
        }
      >
        {/* Grupo 1 */}
        <ul ref={groupRef} className="flex items-center gap-12 pr-12 flex-none">
          {benefits.map(({ icon: Icon, text }, i) => (
            <li
              key={`g1-${i}`}
              className="flex items-center gap-3 whitespace-nowrap"
              style={{ color: 'hsl(var(--neutral-100))' }}
            >
              <Icon className="w-5 h-5" style={{ color: 'hsl(var(--primary-green))' }} />
              <span className="text-sm md:text-base font-semibold tracking-wide">{text}</span>
            </li>
          ))}
        </ul>

        {/* Grupo 2 (duplicado) */}
        <ul className="flex items-center gap-12 pr-12 flex-none" aria-hidden="true">
          {benefits.map(({ icon: Icon, text }, i) => (
            <li
              key={`g2-${i}`}
              className="flex items-center gap-3 whitespace-nowrap"
              style={{ color: 'hsl(var(--neutral-100))' }}
            >
              <Icon className="w-5 h-5" style={{ color: 'hsl(var(--primary-green))' }} />
              <span className="text-sm md:text-base font-semibold tracking-wide">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BenefitsStrip;
