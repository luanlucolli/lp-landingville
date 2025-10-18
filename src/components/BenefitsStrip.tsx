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
  LucideIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import copy from '@/content/landingville';

const iconMap: Record<string, LucideIcon> = {
  Zap,
  MonitorSmartphone,
  Search,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  FileText,
  ImageIcon,
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
};

const benefits = copy.benefits.map(b => ({
  icon: iconMap[b.icon] || Zap,
  text: b.text
}));

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
