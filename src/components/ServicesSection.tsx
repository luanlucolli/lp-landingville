import { Globe, Zap, Shield, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import copy from '@/content/landingville';
import { navigateToDemosTab } from '@/lib/navigation';

const ServicesSection = () => {
  const getServiceIcon = (serviceKey: string) => {
    switch (serviceKey) {
      case 'landing':
        return <Zap className="w-8 h-8 service-icon" aria-hidden="true" />;
      case 'site':
        return <Globe className="w-8 h-8 service-icon" aria-hidden="true" />;
      case 'care':
        return <Shield className="w-8 h-8 service-icon" aria-hidden="true" />;
      default:
        return <Globe className="w-8 h-8 service-icon" aria-hidden="true" />;
    }
  };

  const getServiceAccentVar = (serviceKey: string) => {
    switch (serviceKey) {
      case 'landing':
        return { '--service-accent': 'hsl(205 65% 30%)' }; // #2B6FA5
      case 'site':
        return { '--service-accent': 'hsl(95 35% 45%)' }; // #85BA62
      case 'care':
        return { '--service-accent': 'hsla(205 65% 30% / 0.75)' }; // Mix of both
      default:
        return { '--service-accent': 'hsl(205 65% 30%)' };
    }
  };

  return (
    <section className="py-20 bg-muted/30">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {copy.services.items.map((service) => (
              <div
                key={service.key}
                className="service-card rounded-2xl border border-border shadow-lg overflow-hidden"
                style={getServiceAccentVar(service.key) as React.CSSProperties}
                data-key={service.key}
              >
                <div className="p-6">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center mb-6">
                    {getServiceIcon(service.key)}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {service.name}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.desc}
                  </p>

                  {/* Bullets for all services */}
                  <div className="space-y-3 mb-6">
                    {service.bullets.map((bullet, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Ver exemplo button for Landing and Site only */}
                  {(service.key === 'landing' || service.key === 'site') && 'ctaLabel' in service && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateToDemosTab(service.key as 'landing' | 'site')}
                      className="w-full mt-4 gap-2"
                      aria-label={`Ver exemplo de ${service.name}`}
                    >
                      {service.ctaLabel}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;