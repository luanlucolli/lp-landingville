import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "Vocês fornecem as fotos para o site?",
      answer: "Sim! Podemos usar fotos que você já tem ou criar conteúdo visual personalizado para seu negócio. Também orientamos sobre os melhores tipos de foto para cada seção do site."
    },
    {
      question: "Como funciona a atualização de conteúdo?",
      answer: "Você pode solicitar alterações de conteúdo durante o período de ajustes inclusos. Após esse período, oferecemos planos de manutenção mensal para atualizações regulares."
    },
    {
      question: "Vocês integram com Instagram e iFood?",
      answer: "Sim! Fazemos integração com Instagram para mostrar seus posts mais recentes. Para iFood e outros apps de delivery, criamos links diretos para facilitar o acesso dos clientes."
    },
    {
      question: "O site vai ter domínio próprio?",
      answer: "Sim, seu site terá um domínio profissional (.com.br). Cuidamos de todo o processo de registro e configuração para você não se preocupar com aspectos técnicos."
    },
    {
      question: "Qual é o prazo de entrega?",
      answer: "O prazo varia conforme o plano escolhido e complexidade do projeto. Em média, entregamos a primeira versão entre 3 a 7 dias úteis, com período de ajustes inclusos."
    }
  ];

  const handleWhatsAppFinal = () => {
    const message = "Oi! Li o FAQ e tenho interesse nos serviços da Landingville. Gostaria de conversar sobre meu projeto.";
    const phone = "5547999999999";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}&utm_source=faq&utm_medium=cta&utm_campaign=landingville`;
    window.open(url, '_blank');
  };

  const handlePlansScroll = () => {
    const plansSection = document.getElementById('planos');
    plansSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-background" id="faq">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* FAQ */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-muted-foreground">
              Tire suas dúvidas sobre nossos serviços
            </p>
          </div>

          <div className="space-y-4 mb-16">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-border rounded-xl overflow-hidden bg-card"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors focus-ring"
                >
                  <h3 className="font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      openItems.includes(index) ? 'transform rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Pronto para transformar visitas em conversas?
            </h3>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Comece hoje mesmo e veja seu negócio crescer com um site que realmente converte
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleWhatsAppFinal}
                className="whatsapp-button focus-ring h-14 px-8 text-lg font-semibold w-full sm:w-auto"
                size="lg"
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                Começar Agora no WhatsApp
              </Button>
              
              <Button 
                onClick={handlePlansScroll}
                variant="secondary"
                className="focus-ring h-14 px-8 text-lg font-semibold w-full sm:w-auto"
                size="lg"
              >
                Ver Planos Novamente
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;