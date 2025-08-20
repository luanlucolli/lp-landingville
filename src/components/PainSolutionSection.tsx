import { MessageCircle, MapPin, ShoppingBag } from 'lucide-react';
import { copy } from '@/content/landingville';

const PainSolutionSection = () => {
  const solutions = [
    {
      icon: MessageCircle,
      title: copy.pains.bullets[0].title,
      description: copy.pains.bullets[0].text,
      color: "text-primary"
    },
    {
      icon: MapPin,
      title: copy.pains.bullets[1].title,
      description: copy.pains.bullets[1].text,
      color: "text-secondary"
    },
    {
      icon: ShoppingBag,
      title: copy.pains.bullets[2].title,
      description: copy.pains.bullets[2].text,
      color: "text-accent"
    }
  ];

  return (
    <section className="py-20 bg-muted/30" id="solucao">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {copy.pains.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {solutions.map((solution, index) => (
              <div 
                key={index}
                className="group p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <solution.icon className={`w-8 h-8 ${solution.color}`} />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {solution.title}
                </h3>
                
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {solution.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-lg font-semibold text-foreground">
              {copy.pains.foot}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainSolutionSection;