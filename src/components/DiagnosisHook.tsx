import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Settings, Search, Gift, ArrowRight, ArrowUpRight, HelpCircle } from 'lucide-react';
import copy from '@/content/landingville';

const DiagnosisHook = () => {
  const stepIcons = {
    Settings: Settings,
    Search: Search,
    Gift: Gift,
  };

  const stepBorderColors = {
    blue: 'border-[#2b6fa5]',
    green: 'border-[#609f50]',
  };

  const stepTextColors = {
    blue: 'text-[#2b6fa5]',
    green: 'text-[#609f50]',
  };

  const stepIconColors = {
    blue: 'text-[#2b6fa5]',
    green: 'text-[#609f50]',
  };

  return (
    <section
      id={copy.diagnosis.id}
      className="py-16 md:py-20 lg:py-24 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2b6fa5] mb-4 uppercase">
              {copy.diagnosis.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {copy.diagnosis.subtitle}
            </p>
          </div>

          {/* Steps Flow - Desktop: Row, Mobile: Column */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 lg:gap-8 mb-12 md:mb-16">
            
            {copy.diagnosis.steps.map((step, index) => {
              const Icon = stepIcons[step.icon as keyof typeof stepIcons];
              const borderColor = stepBorderColors[step.color as keyof typeof stepBorderColors];
              const textColor = stepTextColors[step.color as keyof typeof stepTextColors];
              const iconColor = step.color === 'blue' ? 'text-[#609f50]' : 'text-[#2b6fa5]';
              const arrowColor = index === 1 ? 'text-[#609f50]' : 'text-[#2b6fa5]';
              
              return (
                <div key={index} className="flex flex-col md:flex-row items-center gap-6 md:gap-4 lg:gap-8">
                  {/* Card */}
                  <div 
                    className={`
                      ${borderColor} border-[3px] rounded-2xl p-6 md:p-8
                      w-full max-w-[280px] md:w-[240px] lg:w-[280px]
                      text-center transition-all duration-300
                      ${index === 1 ? 'md:scale-105 shadow-lg' : 'shadow-md'}
                      hover:shadow-xl
                    `}
                  >
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <Icon className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 ${iconColor}`} strokeWidth={2} />
                    </div>
                    
                    {/* Step Label */}
                    <div className={`${textColor} font-semibold text-sm md:text-base mb-2 uppercase tracking-wide`}>
                      Passo {step.number}:
                    </div>
                    
                    {/* Step Title */}
                    <div className={`${textColor} font-bold text-base md:text-lg uppercase leading-tight`}>
                      {step.title}
                    </div>
                  </div>

                  {/* Arrow - Show between steps, hide after last step */}
                  {index < copy.diagnosis.steps.length - 1 && (
                    <>
                      {/* Desktop Arrow (Right) */}
                      <ArrowRight 
                        className={`hidden md:block w-8 h-8 lg:w-10 lg:h-10 ${arrowColor} flex-shrink-0`} 
                        strokeWidth={3}
                      />
                      
                      {/* Mobile Arrow (Down) */}
                      <ArrowRight 
                        className={`md:hidden w-8 h-8 ${arrowColor} flex-shrink-0 rotate-90`} 
                        strokeWidth={3}
                      />
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button
              asChild
              className="
                bg-[#2b6fa5] hover:bg-[#235a8a] text-white
                font-bold text-base md:text-lg uppercase tracking-wide
                rounded-full px-8 md:px-10 py-6 md:py-7
                flex items-center gap-3
                transition-all duration-300
                shadow-lg hover:shadow-xl
                hover:scale-105 active:scale-100
              "
            >
              <Link 
                to="/diagnostico"
                onClick={() => {
                  sessionStorage.setItem('lv_promo_claimed', 'true');
                }}
              >
                {copy.diagnosis.cta}
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DiagnosisHook;
