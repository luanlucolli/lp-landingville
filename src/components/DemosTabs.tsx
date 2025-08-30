import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import copy from '@/content/landingville';
import { ChannelSheet } from './ChannelSheet';

const DemosTabs = () => {
  const [activeTab, setActiveTab] = useState('landing');
  const [showContactModal, setShowContactModal] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const startXRef = useRef<number | null>(null);

  useEffect(() => {
    // Listen for tab selection from calculator
    const handleTabSelect = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };

    window.addEventListener('selectDemoTab', handleTabSelect as EventListener);
    
    return () => {
      window.removeEventListener('selectDemoTab', handleTabSelect as EventListener);
    };
  }, []);

  const tabs = copy.demos.tabs;
  const currentTab = tabs.find(tab => tab.key === activeTab) || tabs[0];
  const images = currentTab.images?.length ? currentTab.images : (currentTab.image ? [currentTab.image] : []);
  const totalImages = images.length;

  // Reset image index when tab changes
  useEffect(() => {
    setImageIndex(0);
  }, [activeTab]);

  // Autoplay functionality
  useEffect(() => {
    if (totalImages <= 1) return;

    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        setImageIndex(prev => (prev + 1) % totalImages);
      }, 5000);
    };

    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    };

    startAutoplay();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopAutoplay();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [totalImages]);

  // Navigation handlers
  const goToPrevious = () => {
    setImageIndex(prev => (prev - 1 + totalImages) % totalImages);
  };

  const goToNext = () => {
    setImageIndex(prev => (prev + 1) % totalImages);
  };

  const goToSlide = (index: number) => {
    setImageIndex(index);
  };

  // Swipe handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    startXRef.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    
    // Pause autoplay on interaction
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (startXRef.current === null) return;
    
    const deltaX = e.clientX - startXRef.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }
    startXRef.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    }
  };

  const pauseAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const resumeAutoplay = () => {
    if (totalImages > 1 && !autoplayRef.current) {
      autoplayRef.current = setInterval(() => {
        setImageIndex(prev => (prev + 1) % totalImages);
      }, 5000);
    }
  };

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
              <Card className="card-elevated p-6 md:p-8">
                <div 
                  className="relative aspect-video rounded-xl overflow-hidden bg-muted/30"
                  aria-roledescription="carousel"
                  aria-live="polite"
                  tabIndex={0}
                  onKeyDown={handleKeyDown}
                  onPointerDown={handlePointerDown}
                  onPointerUp={handlePointerUp}
                  onMouseEnter={pauseAutoplay}
                  onMouseLeave={resumeAutoplay}
                  onFocus={pauseAutoplay}
                  onBlur={resumeAutoplay}
                >
                  {/* Image Slides */}
                  {images.map((src, index) => (
                    <img
                      key={`${src}-${index}`}
                      src={src}
                      alt={`Exemplo de ${currentTab.title} — ${index + 1} de ${totalImages}`}
                      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                        index === imageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                      onLoad={(e) => {
                        e.currentTarget.style.opacity = index === imageIndex ? '1' : '0';
                      }}
                    />
                  ))}

                  {/* Navigation Controls */}
                  {totalImages > 1 && (
                    <>
                      <button
                        onClick={goToPrevious}
                        aria-label="Anterior"
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 backdrop-blur p-2 shadow hover:bg-background transition-all opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
                        style={{ opacity: 1 }}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={goToNext}
                        aria-label="Próximo"
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 backdrop-blur p-2 shadow hover:bg-background transition-all opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
                        style={{ opacity: 1 }}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Dots Indicator */}
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            aria-label={`Ir para imagem ${index + 1}`}
                            className={`h-2.5 w-2.5 rounded-full transition-all ${
                              index === imageIndex 
                                ? 'bg-primary' 
                                : 'bg-foreground/30 hover:bg-foreground/60'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                <div className="text-center mt-5">
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