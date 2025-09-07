import { useState, useEffect } from 'react';
import { Smartphone, MapPin } from 'lucide-react';

const themes = [
  {
    icon: Smartphone,
    title: "Feito para o celular",
    subtitle: "Publica em dias, não semanas"
  },
  {
    icon: MapPin,
    title: "Feito em Joinville",
    subtitle: "Atendimento humano e direto"
  }
];

const HeroBadge = () => {
  const [currentTheme, setCurrentTheme] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const interval = setInterval(() => {
      setCurrentTheme((prev) => (prev + 1) % themes.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [reduceMotion]);

  const CurrentIcon = themes[currentTheme].icon;

  return (
    <div className="inline-flex items-center gap-3 bg-[#F7FAFD] border border-gray-200 rounded-[14px] px-4 py-3 shadow-sm transition-opacity duration-500">
      <div className="flex-shrink-0">
        <CurrentIcon className="w-5 h-5 text-[#2B6FA5]" />
      </div>
      <div className="text-left">
        <div className="text-sm font-semibold text-[#0E1116] leading-tight">
          {themes[currentTheme].title}
        </div>
        <div className="text-xs text-[#64748B] leading-tight">
          {themes[currentTheme].subtitle}
        </div>
      </div>
    </div>
  );
};

export default HeroBadge;