import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { HelpCircle, Search, Gift, ArrowRight, ArrowUpRight } from 'lucide-react';
import copy from '@/content/landingville';

const iconMap = {
  HelpCircle,
  Search,
  Gift,
};

const DiagnosisHook = () => {
  return (
    <section
      id={copy.diagnosis.id}
      className="py-16 md:py-20 lg:py-24 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              <span style={{ color: '#2b6fa5' }}>{copy.diagnosis.title} </span>
              <span style={{ color: '#609f50' }}>{copy.diagnosis.titleHighlight}</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {copy.diagnosis.subtitle}
            </p>
          </div>

          {/* Steps Flow */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 mb-12 md:mb-16">
            {copy.diagnosis.steps.map((step, index) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap];
              const isMiddle = index === 1;
              
              return (
                <div key={index} className="flex flex-col md:flex-row items-center gap-6 md:gap-4">
                  {/* Card */}
                  <Card
                    className={`
                      relative w-full max-w-[280px] md:w-[240px] lg:w-[280px] 
                      p-8 md:p-6 lg:p-8
                      text-center
                      rounded-2xl
                      transition-all duration-300
                      ${isMiddle ? 'md:scale-105 shadow-lg' : 'shadow-md'}
                    `}
                    style={{ 
                      borderWidth: '3px',
                      borderColor: step.borderColor,
                      borderStyle: 'solid',
                    }}
                  >
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <Icon 
                        className="w-12 h-12 md:w-10 md:h-10 lg:w-12 lg:h-12" 
                        style={{ color: step.iconColor, strokeWidth: 2 }}
                      />
                    </div>
                    
                    {/* Step Number and Title */}
                    <div>
                      <p 
                        className="font-semibold text-sm mb-1"
                        style={{ color: '#2b6fa5' }}
                      >
                        PASSO {step.number}:
                      </p>
                      <h3 
                        className="font-bold text-base md:text-sm lg:text-base leading-tight"
                        style={{ color: '#2b6fa5' }}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </Card>

                  {/* Arrow Connector */}
                  {index < copy.diagnosis.steps.length - 1 && (
                    <div className="flex items-center justify-center">
                      <ArrowRight 
                        className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8 rotate-90 md:rotate-0" 
                        style={{ color: '#2b6fa5', strokeWidth: 2 }}
                      />
                    </div>
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
                h-14 px-8 md:px-10 lg:px-12
                font-bold text-base md:text-lg uppercase
                rounded-full
                transition-all duration-200
                hover:brightness-110 hover:shadow-xl
                active:scale-[0.98]
                flex items-center gap-3
              "
              style={{
                backgroundColor: '#609f50',
                color: '#FFFFFF',
              }}
            >
              <Link 
                to="/diagnostico"
                onClick={() => {
                  sessionStorage.setItem('lv_promo_claimed', 'true');
                }}
              >
                {copy.diagnosis.cta}
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DiagnosisHook;
