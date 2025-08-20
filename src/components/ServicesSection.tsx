import { Globe, Zap, Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import copy from '@/content/landingville';

interface ServicesSectionProps {
  onServiceSelect?: (serviceType: string) => void;
}

const ServicesSection = ({ onServiceSelect }: ServicesSectionProps) => {
  const handleServiceClick = (serviceId: string) => {
    if (onServiceSelect) {
      onServiceSelect(serviceId);
    }
    
    // Scroll to calculator
    setTimeout(() => {
      const calculatorSection = document.getElementById('calculadora');
      calculatorSection?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const getServiceIcon = (serviceId: string) => {
    switch (serviceId) {
      case 'landing':
        return <Zap className="w-8 h-8" />;
      case 'site':
        return <Globe className="w-8 h-8" />;
      case 'maintenance':
        return <Shield className="w-8 h-8" />;
      default:
        return <Globe className="w-8 h-8" />;
    }
  };

  const maintenanceFeatures = [
    "Atualizações rápidas de texto/preço",
    "Monitoramento básico e correções críticas", 
    "Backups periódicos",
    "Orientações por mensagem/e-mail"
  ];

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
                key={service.id}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-background/80 to-primary/5 backdrop-blur-sm shadow-lg"
              >
                <div className="p-8">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    {getServiceIcon(service.id)}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {service.name}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.desc}
                  </p>

                  {/* Special treatment for maintenance service */}
                  {service.id === 'maintenance' ? (
                    <div className="space-y-3">
                      {maintenanceFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : service.cta ? (
                    <Button
                      onClick={() => handleServiceClick(service.id)}
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-background font-semibold"
                    >
                      {service.cta}
                    </Button>
                  ) : null}
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