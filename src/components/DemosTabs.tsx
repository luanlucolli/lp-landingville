import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import copy from '@/content/landingville';
import { ChannelSheet } from './ChannelSheet';

const DemosTabs = () => {
  const [activeTab, setActiveTab] = useState('landing');
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    // Listen for tab selection from calculator and navigation
    const handleTabSelect = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };

    // Handle hash-based navigation
    const handleHashChange = () => {
      const hash = window.location.hash;
      const tabMatch = hash.match(/tab=([^&]+)/);
      if (tabMatch) {
        const tabKey = tabMatch[1];
        if (tabKey === 'landing' || tabKey === 'site') {
          setActiveTab(tabKey);
        }
      }
    };

    // Check hash on mount
    handleHashChange();

    window.addEventListener('selectDemoTab', handleTabSelect as EventListener);
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('selectDemoTab', handleTabSelect as EventListener);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const tabs = copy.demos.tabs;
  const currentTab = tabs.find(tab => tab.key === activeTab) || tabs[0];

  return (
    <section className="py-20 bg-muted/20" id="demos">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {copy.demos.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {copy.demos.note}
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-background rounded-2xl p-2 shadow-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === tab.key
                      ? 'bg-primary text-white shadow-md'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Container */}
            <div className="order-2 lg:order-1">
              <Card className="p-8 bg-gradient-to-br from-background to-primary/5 border-primary/20">
                <div className="aspect-video bg-muted/50 rounded-xl flex items-center justify-center mb-6 relative overflow-hidden">
                  {/* Placeholder for demo image */}
                  <div className="text-center text-muted-foreground">
                    <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📱</span>
                    </div>
                    <p className="font-medium">
                      {currentTab.title} Demo
                    </p>
                    <p className="text-sm mt-2 opacity-75">
                      Desktop + Mobile Preview
                    </p>
                  </div>
                  
                  {/* Image will be loaded here when available */}
                  <img
                    src={currentTab.image}
                    alt={`Exemplo de ${currentTab.title} - visual desktop e mobile lado a lado (demonstração).`}
                    className="absolute inset-0 w-full h-full object-contain opacity-0"
                    loading="lazy"
                    onLoad={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">
                    Exemplo de Demonstração
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Proporção ideal para visualização em todos os dispositivos
                  </p>
                </div>
              </Card>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {currentTab.title}
                  </h3>
                  
                  <div className="space-y-4">
                    {currentTab.bullets.map((bullet, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-secondary" />
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {bullet}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Context */}
                <Card className="p-6 bg-secondary/5 border-secondary/20">
                  <h4 className="font-semibold text-foreground mb-3">
                    {currentTab.key === 'landing' ? 'Ideal para:' : 'Perfeito quando:'}
                  </h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {currentTab.key === 'landing' ? (
                      <>
                        <p>• Você tem uma promoção ou campanha específica</p>
                        <p>• Quer captar contatos rapidamente</p>
                        <p>• Precisa medir resultados de forma simples</p>
                      </>
                    ) : (
                      <>
                        <p>• Você quer uma presença digital completa</p>
                        <p>• Clientes buscam informações sobre seu negócio</p>
                        <p>• Quer aparecer melhor no Google</p>
                      </>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Gostou do que viu? Vamos criar algo assim para você.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowContactModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:from-primary/90 hover:to-secondary/90 transition-all"
              >
                {copy.demos.cta}
              </button>
            </div>
          </div>
        </div>
      </div>

      <ChannelSheet 
        open={showContactModal}
        onOpenChange={setShowContactModal}
      />
    </section>
  );
};

export default DemosTabs;