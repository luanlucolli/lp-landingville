import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, ChevronLeft, ChevronRight, Megaphone, Network } from 'lucide-react';
import copy from '@/content/landingville';
import { ChannelSheet } from './ChannelSheet';

const SWIPE_THRESHOLD = 40;

const DemosTabs = () => {
  const [activeTab, setActiveTab] = useState('landing');
  const [showContactModal, setShowContactModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);

  useEffect(() => {
    const handleTabSelect = (event: CustomEvent) => {
      setActiveTab(event.detail);
      setActiveIndex(0);
    };
    window.addEventListener('selectDemoTab', handleTabSelect as EventListener);
    return () => window.removeEventListener('selectDemoTab', handleTabSelect as EventListener);
  }, []);

  const tabs = copy.demos.tabs;
  const currentTab = tabs.find(tab => tab.key === activeTab) || tabs[0];
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
        if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
      } else if (!isPaused) { play(); }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [totalSlides, isPaused, activeTab]);

  useEffect(() => { setActiveIndex(0); setIsPaused(false); }, [activeTab]);

  const goToPrev = () => setActiveIndex(prev => (prev - 1 + totalSlides) % totalSlides);
  const goToNext = () => setActiveIndex(prev => (prev + 1) % totalSlides);
  const goToSlide = (index: number) => setActiveIndex(index);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    setIsPaused(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' || startXRef.current === null || startYRef.current === null) return;
    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      dx > 0 ? goToPrev() : goToNext();
      startXRef.current = null; startYRef.current = null;
    }
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return;
    startXRef.current = null; startYRef.current = null; setIsPaused(false);
  };
  const handlePointerCancel = () => {
    startXRef.current = null; startYRef.current = null; setIsPaused(false);
  };

  const HighlightIcon = currentTab.highlightIcon === 'megaphone' ? Megaphone : Network;

  return (
    <section className="py-16 md:py-24" style={{ background: 'hsl(var(--neutral-200))' }} id="demos">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {copy.demos.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {copy.demos.note}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-10">
            <div
              className="inline-flex rounded-full p-1.5 shadow-md"
              style={{ background: 'hsl(var(--neutral-100))' }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-5 md:px-8 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

            {/* Left: Content */}
            <div className="order-1 space-y-6">
              {/* One-liner */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {currentTab.title}
                </h3>
                {currentTab.oneLiner && (
                  <p className="text-muted-foreground text-base md:text-lg">
                    {currentTab.oneLiner}
                  </p>
                )}
              </div>

              {/* Highlight */}
              <div
                className="rounded-xl p-5 flex items-start gap-4"
                style={{ background: 'hsl(var(--primary) / 0.06)' }}
              >
                <HighlightIcon
                  className="w-8 h-8 text-primary flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h4 className="text-base font-semibold text-foreground mb-1">
                    {currentTab.highlightTitle}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {currentTab.highlightDescription}
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <ul className="space-y-2.5">
                {currentTab.benefits?.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'hsl(var(--primary-green) / 0.15)' }}
                    >
                      <Check className="w-3 h-3 text-primary-green" />
                    </div>
                    <span className="text-foreground text-sm md:text-base">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA inline */}
              <Button
                onClick={() => setShowContactModal(true)}
                variant="accent-gradient"
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold mt-2"
              >
                {copy.demos.cta}
              </Button>
            </div>

            {/* Right: Image Carousel */}
            <div className="order-2">
              <div
                className="rounded-2xl overflow-hidden shadow-lg"
                style={{ background: 'hsl(var(--neutral-100))' }}
              >
                <div
                  className="relative aspect-[4/3] md:aspect-video select-none touch-pan-y"
                  role="region"
                  aria-roledescription="carousel"
                  aria-live="polite"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowLeft') { e.preventDefault(); goToPrev(); }
                    if (e.key === 'ArrowRight') { e.preventDefault(); goToNext(); }
                  }}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerCancel}
                  tabIndex={0}
                >
                  {images.map((src, index) => (
                    <img
                      key={`${src}-${index}`}
                      src={src}
                      alt={copy.demos.imageAlt(currentTab.title)}
                      className={`absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-300 ${
                        index === activeIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                      decoding="async"
                    />
                  ))}

                  {/* Arrows */}
                  {totalSlides > 1 && (
                    <>
                      <button
                        onClick={goToPrev}
                        aria-label={copy.demos.ariaLabels.prevSlide}
                        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 items-center justify-center w-8 h-8 rounded-full bg-black/15 hover:bg-black/25 text-white backdrop-blur-sm transition-colors z-10"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={goToNext}
                        aria-label={copy.demos.ariaLabels.nextSlide}
                        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 items-center justify-center w-8 h-8 rounded-full bg-black/15 hover:bg-black/25 text-white backdrop-blur-sm transition-colors z-10"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Dots */}
                      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            aria-label={copy.demos.ariaLabels.goToSlide(index + 1)}
                            aria-current={index === activeIndex ? 'true' : 'false'}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              index === activeIndex
                                ? 'bg-foreground/60 w-4'
                                : 'bg-foreground/20 hover:bg-foreground/40'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Badge */}
                <div className="text-center py-3">
                  <Badge variant="secondary" className="text-xs">
                    {copy.demos.badgeDemo}
                  </Badge>
                </div>
              </div>
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
