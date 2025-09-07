import { Button } from '@/components/ui/button';
import copy from '@/content/landingville';
import { scrollToCalculatorWithObjective } from '@/lib/navigation';

const ServicesSection = () => {
  const handleServiceCTA = (serviceKey: string) => {
    if (serviceKey === 'landing' || serviceKey === 'site') {
      scrollToCalculatorWithObjective(serviceKey as 'landing' | 'site');
    }
  };

  return (
    <section className="py-20" style={{ background: 'hsl(var(--neutral-200))' }}>
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
            {copy.services.items.map((service) => {
              const hasCTA = Boolean(service.cta);

              return (
                <div
                  key={service.key}
                  className="service-card relative overflow-hidden"
                >
                  <div className="p-6 md:p-8">
                    {/* Service Image/Icon */}
                    <div className="mb-6 flex justify-start">
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
                    <h3 className="service-title text-lg md:text-xl text-foreground mb-2 text-left">
                      {service.name}
                    </h3>

                    <p
                      className={`service-desc text-sm md:text-base text-muted-foreground text-left ${
                        hasCTA ? 'mb-4' : 'mb-0'
                      }`}
                    >
                      {service.desc}
                    </p>

                    {/* CTA Button (left-aligned). No contact button/link. */}
                    {hasCTA && (
                      <div className="flex justify-start">
                        <Button
                          onClick={() => handleServiceCTA(service.key)}
                          variant="primary"
                          className="h-12 px-6 rounded-xl font-semibold mb-0"
                          aria-label={`${service.cta} - ${service.name}`}
                        >
                          {service.cta}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
