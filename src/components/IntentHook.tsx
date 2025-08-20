import { useState } from 'react';
import { Target, Zap } from 'lucide-react';
import { copy } from '@/content/landingville';

interface IntentHookProps {
  onIntentSelect?: (preset: { type: string | null; opts: string[] }) => void;
}

const IntentHook = ({ onIntentSelect }: IntentHookProps) => {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const handleChipClick = (chipId: string, preset: { type: string | null; opts: string[] }) => {
    setSelectedChip(chipId);
    
    // Aplicar preset e rolar para calculadora
    if (onIntentSelect) {
      onIntentSelect(preset);
    }
    
    // Scroll suave para calculadora
    setTimeout(() => {
      const calculatorSection = document.getElementById('calculadora');
      calculatorSection?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {copy.intentHook.title}
              </h2>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
              {copy.intentHook.subtitle}
            </p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-semibold text-sm">
              <Zap className="w-4 h-4" />
              {copy.intentHook.helper}
            </div>
          </div>

          {/* Chips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {copy.intentHook.chips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => handleChipClick(chip.id, chip.preset)}
                className={`
                  p-6 rounded-2xl border-2 transition-all duration-200 text-left
                  min-h-[80px] flex items-center justify-center
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                  hover:border-primary/50 hover:bg-primary/5
                  ${selectedChip === chip.id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-card text-card-foreground'
                  }
                `}
              >
                <span className="font-semibold text-center leading-relaxed">
                  {chip.label}
                </span>
              </button>
            ))}
          </div>

          {/* Selected feedback */}
          {selectedChip && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm animate-fade-in">
                <Target className="w-4 h-4" />
                Sugestões aplicadas — pode ajustar à vontade na calculadora
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default IntentHook;