import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import copy from '@/content/landingville';
import { ChannelSheet } from './ChannelSheet';

const SWIPE_THRESHOLD = 40;

const DemosTabs = () => {
  const [activeTab, setActiveTab] = useState('landing');
  const [showContactModal, setShowContactModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // refs p/ swipe
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);

  useEffect(() => {
    // Listen for tab selection from calculator
    const handleTabSelect = (event: CustomEvent) => {
      setActiveTab(event.detail);
      setActiveIndex(0); // Reset carousel quando troca a aba
    };

    window.addEventListener('selectDemoTab', handleTabSelect as EventListener);
    return () => window.removeEventListener('selectDemoTab', handleTabSelect as EventListener);
  }, []);

  const tabs = copy.demos.tabs;
  const currentTab = tabs.find(tab => tab.key === activeTab) || tabs[0];

  // ❗️Sem fallback para `image` (não existe mais no conteúdo)
  const images = Array.isArray(currentTab.images) && currentTab.images.length > 0 ? currentTab.images : [];
  const totalSlides = images.length;

  // Autoplay
  useEffect(() => {
    if (totalSlides <= 1 || isPaused) return;

    const play = () => {
      intervalRef.current = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % totalSlides);
      }, 5000);
    };

    play();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else if (!isPaused) {
        play();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [totalSlides, isPaused, activeTab]);

  // Reset ao trocar de aba
  useEffect(() => {
    setActiveIndex(0);
    setIsPaused(false);
  }, [activeTab]);

  const goToPrev = () => setActiveIndex(prev => (prev - 1 + totalSlides) % totalSlides);
  const goToNext = () => setActiveIndex(prev => (prev + 1) % totalSlides);
  const goToSlide = (index: number) => setActiveIndex(index);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    }
  };

  // Swipe: só em touch/caneta — não interfere no desktop
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    setIsPaused(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return;
    if (startXRef.current === null || startYRef.current === null) return;

    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;

    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      dx > 0 ? goToPrev() : goToNext();
      // evita múltiplos disparos
      startXRef.current = null;
      startYRef.current = null;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return;
    startXRef.current = null;
    startYRef.current = null;
    setIsPaused(false);
  };

  const handlePointerCancel = () => {
    startXRef.current = null;
    startYRef.current = null;
    setIsPaused(false);
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
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === tab.key
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
                  className="relative aspect-video rounded-xl overflow-hidden bg-transparent mb-6 select-none touch-pan-y"
                  role="region"
                  aria-roledescription="carousel"
                  aria-live="polite"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onKeyDown={handleKeyDown}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerCancel}
                  tabIndex={0}
                >
                  {/* Slides */}
                  {images.map((src, index) => (
                    <img
                      key={`${src}-${index}`}
                      src={src}
                      alt={`Exemplo de ${currentTab.title} — visual desktop e mobile`}
                      className={`absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-300 ${index === activeIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                      loading="lazy"
                      decoding="async"
                    />
                  ))}

                  {/* Navigation Arrows (Desktop) */}
                  {totalSlides > 1 && (
                    <>
                      <button
                        onClick={goToPrev}
                        aria-label="Slide anterior"
                        data-carousel-control
                        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 items-center justify-center w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 text-white backdrop-blur-sm transition-colors z-10"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={goToNext}
                        aria-label="Próximo slide"
                        data-carousel-control
                        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 items-center justify-center w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 text-white backdrop-blur-sm transition-colors z-10"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Dots Navigation */}
                      <div
                        className="absolute bottom-1 left-0 right-0 flex justify-center gap-2 z-10"
                        data-carousel-dots
                      >
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            aria-label={`Ir para slide ${index + 1}`}
                            aria-current={index === activeIndex ? 'true' : 'false'}
                            data-carousel-control
                            className={`w-[6px] h-[6px] rounded-full p-0 leading-none !min-w-0 !min-h-0 transition-colors ${index === activeIndex
                                ? 'bg-foreground/70'
                                : 'bg-foreground/25 hover:bg-foreground/50'
                              }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
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
                {/* Title and one-liner */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {currentTab.title}
                  </h3>
                  {currentTab.oneLiner && (
                    <p className="text-sm text-muted-foreground mb-6">
                      {currentTab.oneLiner}
                    </p>
                  )}
                </div>

                {/* Thermometer - Conversion vs Information */}
                {currentTab.thermo && (
                  <div className="space-y-4">
                    {/* Conversion meter */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">Conversão</span>
                        <span className="text-xs text-muted-foreground">{Math.round(currentTab.thermo.conversion * 100)}%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${currentTab.thermo.conversion * 100}%` }}
                          role="meter"
                          aria-valuenow={currentTab.thermo.conversion * 100}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label="Conversão"
                        />
                      </div>
                    </div>

                    {/* Information meter */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">Informação</span>
                        <span className="text-xs text-muted-foreground">{Math.round(currentTab.thermo.information * 100)}%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-secondary to-secondary/80 rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${currentTab.thermo.information * 100}%` }}
                          role="meter"
                          aria-valuenow={currentTab.thermo.information * 100}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label="Informação"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Chips - Features */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {currentTab.bullets?.map((bullet, index) => (
                    <div key={index} className="flex items-center gap-2 bg-secondary/5 rounded-lg px-3 py-2 h-10">
                      <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                      <span className="text-xs font-medium text-foreground truncate">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Badges - Ideal for */}
                {currentTab.helperTitle && currentTab.helperPoints && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground">
                      {currentTab.helperTitle}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentTab.helperPoints.map((point, index) => (
                        <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                          {point}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tip */}
                {currentTab.tip && (
                  <div className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                    <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="font-medium">Dica:</span> {currentTab.tip}
                    </p>
                  </div>
                )}
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
                className="px-6 py-3 bg-[hsl(var(--brand-primary))] text-white rounded-xl font-semibold hover:brightness-110 transition-all"
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
