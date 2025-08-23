import { Globe, Zap, Shield, Check, Megaphone, Layers, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import copy from '@/content/landingville';
import { viewExample } from './services/utils';

const ServicesSection = () => {

  const getServiceIcon = (serviceKey: string) => {
    switch (serviceKey) {
      case 'landing':
        return <Megaphone className="w-8 h-8 icon-gradient" aria-hidden="true" />;
      case 'site':
        return <Layers className="w-8 h-8 icon-gradient" aria-hidden="true" />;
      case 'care':
        return <Wrench className="w-8 h-8 icon-gradient" aria-hidden="true" />;
      default:
        return <Globe className="w-8 h-8 icon-gradient" aria-hidden="true" />;
    }
  };

  return (
    <section className="py-20 services-bg">
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
                 className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/95 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300"
               >
                 <div className="p-6 md:p-8">
                   {/* Icon */}
                   <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                     {getServiceIcon(service.key)}
                   </div>

                   {/* Content */}
                   <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">
                     {service.name}
                   </h3>
                   
                   <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
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

                   {/* Ver exemplo button for Landing and Site */}
                   {(service.key === 'landing' || service.key === 'site') && (
                     <div className="flex justify-end">
                       <Button 
                         variant="outline" 
                         size="sm"
                         onClick={() => viewExample(service.key as 'landing' | 'site')}
                         className="w-full md:w-auto"
                       >
                         Ver exemplo
                       </Button>
                     </div>
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