import { Globe, Zap, Shield, Check } from 'lucide-react';
import copy from '@/content/landingville';

const ServicesSection = () => {

  const getServiceIcon = (serviceKey: string) => {
    switch (serviceKey) {
      case 'landing':
        return <Zap className="w-8 h-8" />;
      case 'site':
        return <Globe className="w-8 h-8" />;
      case 'care':
        return <Shield className="w-8 h-8" />;
      default:
        return <Globe className="w-8 h-8" />;
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
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-background/80 to-primary/5 backdrop-blur-sm shadow-lg"
              >
                <div className="p-8">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
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
                  <div className="space-y-3">
                    {service.bullets.map((bullet, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
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