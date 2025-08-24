import { Button } from '@/components/ui/button';
import copy from '@/content/landingville';
import { scrollToCalculatorWithObjective } from '@/lib/navigation';
import { ChannelSheet } from './ChannelSheet';
import { useState } from 'react';

const ServicesSection = () => {
  const [showContactModal, setShowContactModal] = useState(false);

  const handleServiceCTA = (serviceKey: string) => {
    if (serviceKey === 'landing' || serviceKey === 'site') {
      scrollToCalculatorWithObjective(serviceKey as 'landing' | 'site');
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {copy.services.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {copy.services.subtitle}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {copy.services.items.map((service) => (
              <div
                key={service.key}
                className="service-card relative overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  {/* Service Image/Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="service-hero">
                      <img
                        src={service.img}
                        alt={service.alt}
                        className="w-16 h-16 md:w-20 md:h-20 object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 text-center">
                    {service.name}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed text-center text-sm md:text-base">
                    {service.desc}
                  </p>

                  {/* CTA Button or Contact Link */}
                  <div className="flex justify-center">
                    {service.cta ? (
                      <Button
                        onClick={() => handleServiceCTA(service.key)}
                        className="service-cta-button h-12 px-6 rounded-xl font-semibold"
                        aria-label={`${service.cta} - ${service.name}`}
                      >
                        {service.cta}
                      </Button>
                    ) : (
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-3">
                          Atualizações leves e suporte contínuo. Mensal opcional.
                        </p>
                        <button
                          onClick={() => setShowContactModal(true)}
                          className="text-primary hover:text-primary/80 transition-colors font-medium text-sm underline"
                          aria-label="Falar com a Landingville sobre manutenção"
                        >
                          Falar com a Landingville
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ChannelSheet 
        open={showContactModal}
        onOpenChange={setShowContactModal}
      />
    </section>
  );
};

export default ServicesSection;