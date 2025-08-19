import { useState } from 'react';
import { MessageCircle, MapPin, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const DemoSection = () => {
  const [selectedDemo, setSelectedDemo] = useState('lanchonete');

  const demos = {
    lanchonete: {
      name: "Lanchonete do João",
      segment: "Lanchonete",
      emoji: "🍔",
      promo: "Combo X-Bacon + Batata + Refri por R$ 25,90",
      items: [
        { name: "X-Bacon Especial", price: "R$ 18,90", image: "🍔" },
        { name: "Batata Frita Grande", price: "R$ 12,00", image: "🍟" },
        { name: "Refrigerante Lata", price: "R$ 5,00", image: "🥤" },
        { name: "Pizza Calabresa", price: "R$ 35,00", image: "🍕" },
        { name: "Açaí 500ml", price: "R$ 15,00", image: "🍧" },
        { name: "Pastel de Carne", price: "R$ 8,00", image: "🥟" }
      ]
    },
    moda: {
      name: "Boutique Elegance",
      segment: "Moda",
      emoji: "👗",
      promo: "Liquidação de Inverno - Até 50% OFF",
      items: [
        { name: "Vestido Floral", price: "R$ 89,90", image: "👗" },
        { name: "Blusa Básica", price: "R$ 39,90", image: "👚" },
        { name: "Calça Jeans", price: "R$ 79,90", image: "👖" },
        { name: "Sapato Social", price: "R$ 129,90", image: "👠" },
        { name: "Bolsa de Couro", price: "R$ 159,90", image: "👜" },
        { name: "Óculos de Sol", price: "R$ 89,90", image: "🕶️" }
      ]
    },
    servicos: {
      name: "Salão Beleza Total",
      segment: "Serviços",
      emoji: "💄",
      promo: "Pacote Completo: Corte + Escova + Hidratação R$ 80",
      items: [
        { name: "Corte Feminino", price: "R$ 45,00", image: "✂️" },
        { name: "Coloração", price: "R$ 120,00", image: "🎨" },
        { name: "Escova Modelada", price: "R$ 35,00", image: "💇‍♀️" },
        { name: "Hidratação", price: "R$ 50,00", image: "💆‍♀️" },
        { name: "Manicure", price: "R$ 25,00", image: "💅" },
        { name: "Pedicure", price: "R$ 30,00", image: "🦶" }
      ]
    }
  };

  const currentDemo = demos[selectedDemo as keyof typeof demos];

  const handleWhatsAppDemo = () => {
    const message = `Sou ${currentDemo.segment} e quero uma demo da Landingville.`;
    const phone = "5547999999999";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}&utm_source=demo&utm_medium=cta&utm_campaign=landingville`;
    window.open(url, '_blank');
  };

  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Veja como fica para o seu segmento
        </h3>
        <p className="text-muted-foreground">
          Escolha um segmento e veja uma demonstração
        </p>
      </div>

      {/* Demo selector */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-2 p-2 rounded-xl bg-muted">
          {Object.entries(demos).map(([key, demo]) => (
            <button
              key={key}
              onClick={() => setSelectedDemo(key)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedDemo === key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {demo.emoji} {demo.segment}
            </button>
          ))}
        </div>
      </div>

      {/* Demo preview */}
      <div className="max-w-sm mx-auto">
        <div className="relative">
          {/* Demo label */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
            <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full">
              Exemplo de demonstração
            </span>
          </div>
          
          <Card className="p-0 overflow-hidden border-2 border-primary/20">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{currentDemo.emoji}</span>
                <div>
                  <h4 className="font-bold text-lg">{currentDemo.name}</h4>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <Star className="w-4 h-4 fill-current" />
                    <span>4.8 (127 avaliações)</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/20 rounded-lg p-3 mb-3">
                <p className="text-sm font-semibold">🎉 {currentDemo.promo}</p>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Seg-Sáb 8h-20h</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Ver localização</span>
                </div>
              </div>
            </div>
            
            {/* Products/Services */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {currentDemo.items.map((item, index) => (
                  <div key={index} className="p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                    <div className="text-center">
                      <div className="text-2xl mb-1">{item.image}</div>
                      <div className="text-sm font-semibold text-foreground">{item.name}</div>
                      <div className="text-primary font-bold">{item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* CTA */}
              <Button 
                className="w-full whatsapp-button h-12 font-semibold"
                size="lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Fazer Pedido no WhatsApp
              </Button>
              
              <button className="w-full mt-2 py-2 text-sm text-primary font-semibold">
                <MapPin className="w-4 h-4 inline mr-1" />
                Como chegar - Abrir no Maps
              </button>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <Button 
          onClick={handleWhatsAppDemo}
          variant="secondary"
          className="focus-ring h-12 px-8 font-semibold"
          size="lg"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Quero minha demo no WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default DemoSection;