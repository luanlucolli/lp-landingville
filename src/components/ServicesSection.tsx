import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, Globe, Settings } from 'lucide-react';
import copy from '@/content/landingville';

const ServicesSection = () => {
  const icons = {
    landing: Monitor,
    site: Globe,
    care: Settings
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {copy.services.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {copy.services.items.map((service) => {
            const Icon = icons[service.key as keyof typeof icons];
            
            return (
              <Card 
                key={service.key}
                className="group relative overflow-hidden border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(135deg, #0E1116 0%, rgba(43,111,165,0.15) 100%)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary stroke-1" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {service.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                  
                  <ul className="space-y-2 text-sm">
                    {service.bullets.map((bullet, index) => (
                      <li key={index} className="flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-muted-foreground">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;