import { Check, MessageCircle, Shield, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const PlansSection = () => {
  const plans = [
    {
      name: "Essencial",
      icon: Clock,
      color: "border-muted-foreground/20",
      popular: false,
      features: [
        "1 página profissional",
        "WhatsApp direto", 
        "Mapa integrado",
        "Cardápio/Catálogo",
        "SEO local básico"
      ]
    },
    {
      name: "Pro",
      icon: Zap,
      color: "border-primary",
      popular: true,
      features: [
        "Tudo do Essencial",
        "Seção de promoções",
        "Formulário de contato", 
        "Integração Instagram",
        "Analytics básico"
      ]
    },
    {
      name: "Turbo",
      icon: Shield,
      color: "border-secondary",
      popular: false,
      features: [
        "Tudo do Pro",
        "Campanhas sazonais",
        "Pixel/Google Analytics",
        "Testes A/B simples",
        "Suporte prioritário"
      ]
    }
  ];

  const guarantees = [
    {
      icon: Clock,
      title: "Primeira versão em até [X] dias úteis",
      description: "Entrega rápida garantida"
    },
    {
      icon: Shield,
      title: "[Y] dias de ajustes após publicação, inclusos",
      description: "Ajustes sem custo adicional"
    },
    {
      icon: Check,
      title: "Se não publicar, você não paga",
      description: "Garantia total de satisfação"
    }
  ];

  const handleWhatsAppContact = () => {
    const message = "Oi! Vi os planos da Landingville. Quero saber mais detalhes e fazer um orçamento.";
    const phone = "5547999999999";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}&utm_source=planos&utm_medium=cta&utm_campaign=landingville`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-20 bg-muted/30" id="planos">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Planos & Garantias
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para o seu negócio e comece a converter visitantes em clientes
            </p>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card 
                key={index}
                className={`relative p-8 ${plan.color} ${plan.popular ? 'ring-2 ring-primary shadow-xl' : ''} hover:shadow-lg transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                      Mais Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                    plan.popular ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        plan.popular ? 'bg-primary' : 'bg-secondary'
                      }`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-foreground font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={handleWhatsAppContact}
                  className={`w-full h-12 font-semibold ${
                    plan.popular 
                      ? 'whatsapp-button' 
                      : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                  }`}
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Solicitar Orçamento
                </Button>
              </Card>
            ))}
          </div>

          {/* Guarantees */}
          <div className="bg-card rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-bold text-center text-foreground mb-8">
              Nossas Garantias
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {guarantees.map((guarantee, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <guarantee.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <h4 className="font-bold text-foreground mb-2">
                    {guarantee.title}
                  </h4>
                  
                  <p className="text-muted-foreground text-sm">
                    {guarantee.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;