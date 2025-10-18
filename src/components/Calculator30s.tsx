import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft, Calculator, Lightbulb, Clock, Shield, Target, MessageCircle, Globe, Grid3x3, MapPin, Image, Layers, Zap } from 'lucide-react';
import copy from '@/content/landingville';
import { ChannelSheet } from './ChannelSheet';
import '@dotlottie/player-component/dist/dotlottie-player.mjs';

interface CalculatorState {
  step: number;
  answers: {
    s1: string[];
    s2: string[];
    s3: string[];
    s4: string[];
    s5: string[];
  };
  fallback?: {
    q1?: string;
    q2?: string;
  };
  recommendation?: 'landing' | 'site';
  priceRange?: [number, number];
}

const Calculator30s = () => {
  const [state, setState] = useState<CalculatorState>({
    step: 0,
    answers: { s1: [], s2: [], s3: [], s4: [], s5: [] }
  });
  const [showResult, setShowResult] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [showChannelSheet, setShowChannelSheet] = useState(false);

  const steps = copy.calculator.steps;
  const maxSteps = 5;

  const calculateRecommendation = (answers: CalculatorState['answers']): 'landing' | 'site' => {
    let landingScore = 1;
    let siteScore = 1;

    const objectives = answers.s1;

    if (objectives.includes("Ter um site oficial simples")) {
      siteScore += 3;
    }

    const landingObjectives = [
      "Receber mais pedidos/contatos",
      "Divulgar promoção/campanha",
      "Reabertura/inauguração"
    ];

    landingObjectives.forEach(obj => {
      if (objectives.includes(obj)) {
        landingScore += 3;
      }
    });

    if (objectives.includes("Exibir cardápio/catálogo")) {
      if (objectives.includes("Ter um site oficial simples")) {
        siteScore += 1;
      } else {
        landingScore += 2;
      }
    }

    if (answers.s5.includes("Promo do dia")) {
      landingScore += 2;
    }

    if (answers.s5.includes("Depoimentos simples")) {
      siteScore += 1;
    }

    if (state.fallback?.q1 === "Presença contínua (site)") {
      siteScore += 3;
    } else if (state.fallback?.q1 === "Pontual (campanha)") {
      landingScore += 3;
    }

    return siteScore > landingScore ? 'site' : 'landing';
  };

  const calculatePrice = (answers: CalculatorState['answers'], recommendation: 'landing' | 'site'): [number, number] => {
    const pricing = copy.calculator.pricing;
    let [min, max] = recommendation === 'landing' ? pricing.landingBase : pricing.siteBase;

    const increments = pricing.increments;

    if (answers.s1.includes("Mostrar horário/endereço e rotas")) {
      const [minInc, maxInc] = increments["Mapa/rotas"];
      min += minInc;
      max += maxInc;
    }

    if (answers.s1.includes("Exibir cardápio/catálogo")) {
      const [minInc, maxInc] = increments["Cardápio/Catálogo"];
      min += minInc;
      max += maxInc;
    }

    if (answers.s1.includes("Coletar orçamentos/agendamentos")) {
      const [minInc, maxInc] = increments["Formulário simples"];
      min += minInc;
      max += maxInc;
    }

    if (answers.s5.includes("Galeria simples")) {
      const [minInc, maxInc] = increments["Galeria simples"];
      min += minInc;
      max += maxInc;
    }

    if (answers.s5.includes("Formulário simples")) {
      const [minInc, maxInc] = increments["Formulário simples"];
      min += minInc;
      max += maxInc;
    }

    if (answers.s5.includes("Promo do dia")) {
      const [minInc, maxInc] = increments["Promo do dia"];
      min += minInc;
      max += maxInc;
    }

    if (answers.s5.includes("Depoimentos simples")) {
      const [minInc, maxInc] = increments["Depoimentos simples"];
      min += minInc;
      max += maxInc;
    }

    if (max > pricing.cap) {
      max = pricing.cap;
      min = Math.max(min, max - 100);
    }

    min = Math.round(min / pricing.rounding) * pricing.rounding;
    max = Math.round(max / pricing.rounding) * pricing.rounding;

    return [min, max];
  };

  const handleStepAnswer = (option: string, isMultiSelect: boolean = false) => {
    const stepKey = `s${state.step}` as keyof typeof state.answers;

    setState(prev => {
      const newAnswers = { ...prev.answers };

      if (isMultiSelect) {
        const current = newAnswers[stepKey] || [];

        if (state.step === 5) {
          if (option === "Não") {
            newAnswers[stepKey] = current.includes("Não") ? [] : ["Não"];
          } else {
            if (current.includes("Não")) {
              newAnswers[stepKey] = [option];
            } else {
              if (current.includes(option)) {
                newAnswers[stepKey] = current.filter(item => item !== option);
              } else {
                newAnswers[stepKey] = [...current, option];
              }
            }
          }
        } else {
          if (current.includes(option)) {
            newAnswers[stepKey] = current.filter(item => item !== option);
          } else {
            newAnswers[stepKey] = [...current, option];
          }
        }
      } else {
        newAnswers[stepKey] = [option];
      }

      return {
        ...prev,
        answers: newAnswers
      };
    });

    if (option === "Estou em dúvida" && state.step === 1) {
      if (!state.answers.s1.includes("Estou em dúvida")) {
        setShowFallback(true);
      } else {
        setShowFallback(false);
        setState(prev => ({
          ...prev,
          fallback: undefined
        }));
      }
      return;
    }
  };

  const handleFallbackAnswer = (questionKey: 'q1' | 'q2', answer: string) => {
    setState(prev => ({
      ...prev,
      fallback: {
        ...prev.fallback,
        [questionKey]: answer
      }
    }));
  };

  const buildReasons = (state: CalculatorState): Array<{ title: string, text: string, icon: string }> => {
    const reasons = [];
    const isLanding = state.recommendation === 'landing';

    if (isLanding) {
      const landingReasons = copy.calculator.result.reasons.landing;
      
      if (state.answers.s1.some(obj => ['Divulgar promoção/campanha', 'Reabertura/inauguração', 'Receber mais pedidos/contatos'].includes(obj))) {
        reasons.push({ 
          title: landingReasons.immediateAction.title, 
          text: landingReasons.immediateAction.text, 
          icon: 'Target' 
        });
      }

      if (state.answers.s4?.[0] && ['Em 3 dias úteis', 'Em 5 dias úteis'].includes(state.answers.s4[0])) {
        reasons.push({ 
          title: landingReasons.goLiveFast.title, 
          text: landingReasons.goLiveFast.text, 
          icon: 'Clock' 
        });
      }

      if (state.answers.s2.some(canal => ['WhatsApp', 'Instagram'].includes(canal))) {
        reasons.push({ 
          title: landingReasons.channelFocus.title, 
          text: landingReasons.channelFocus.text, 
          icon: 'MessageCircle' 
        });
      }

      if (state.answers.s5.includes('Promo do dia')) {
        reasons.push({ 
          title: landingReasons.promoOfTheDay.title, 
          text: landingReasons.promoOfTheDay.text, 
          icon: 'Lightbulb' 
        });
      }

      if (state.answers.s3.includes('Nenhum dos dois')) {
        reasons.push({ 
          title: landingReasons.leanContent.title, 
          text: landingReasons.leanContent.text, 
          icon: 'Zap' 
        });
      }

      // General reasons for landing
      const generalReasons = [
        { title: landingReasons.goLiveFast.title, text: landingReasons.goLiveFast.text, icon: 'Clock' },
        { title: landingReasons.channelFocus.title, text: landingReasons.channelFocus.text, icon: 'MessageCircle' },
        { title: landingReasons.immediateAction.title, text: landingReasons.immediateAction.text, icon: 'Target' }
      ];

      generalReasons.forEach(reason => {
        if (reasons.length < 3 && !reasons.some(r => r.title === reason.title)) {
          reasons.push(reason);
        }
      });
    } else {
      const siteReasons = copy.calculator.result.reasons.site;
      
      if (state.answers.s1.includes('Ter um site oficial simples')) {
        reasons.push({ 
          title: siteReasons.ongoingPresence.title, 
          text: siteReasons.ongoingPresence.text, 
          icon: 'Globe' 
        });
      }

      if (state.answers.s1.some(obj => ['Exibir cardápio/catálogo'].includes(obj)) || state.answers.s5.some(extra => ['Galeria simples', 'Depoimentos simples'].includes(extra))) {
        reasons.push({ 
          title: siteReasons.moreContent.title, 
          text: siteReasons.moreContent.text, 
          icon: 'Grid3x3' 
        });
      }

      if (state.answers.s1.includes('Mostrar horário/endereço e rotas')) {
        reasons.push({ 
          title: siteReasons.easyToFind.title, 
          text: siteReasons.easyToFind.text, 
          icon: 'MapPin' 
        });
      }

      if (state.answers.s3.includes('Logo e Fotos') || state.answers.s3.includes('Logo') || state.answers.s3.includes('Fotos')) {
        reasons.push({ 
          title: siteReasons.youHaveMaterial.title, 
          text: siteReasons.youHaveMaterial.text, 
          icon: 'Image' 
        });
      }

      if (state.answers.s2.length >= 3) {
        reasons.push({ 
          title: siteReasons.multipleChannels.title, 
          text: siteReasons.multipleChannels.text, 
          icon: 'Layers' 
        });
      }

      // General reasons for site
      const generalReasons = [
        { title: siteReasons.ongoingPresence.title, text: siteReasons.ongoingPresence.text, icon: 'Globe' },
        { title: siteReasons.easyToFind.title, text: siteReasons.easyToFind.text, icon: 'MapPin' },
        { title: siteReasons.multipleChannels.title, text: siteReasons.multipleChannels.text, icon: 'Layers' }
      ];

      generalReasons.forEach(reason => {
        if (reasons.length < 3 && !reasons.some(r => r.title === reason.title)) {
          reasons.push(reason);
        }
      });
    }

    return reasons.slice(0, 3);
  };

  const nextStep = () => {
    if (state.step < maxSteps) {
      setState(prev => ({ ...prev, step: prev.step + 1 }));
      setShowFallback(false);
    } else {
      const recommendation = calculateRecommendation(state.answers);
      let priceRange = calculatePrice(state.answers, recommendation);

      // Aplicar 15% OFF se promoção foi ativada
      const promoActive = sessionStorage.getItem('lv_promo_claimed') === 'true';
      if (promoActive) {
        const [min, max] = priceRange;
        const discountedMin = Math.round((min * 0.85) / 50) * 50; // Aplicar 15% e arredondar
        const discountedMax = Math.round((max * 0.85) / 50) * 50;
        priceRange = [discountedMin, discountedMax] as [number, number];
      }

      setState(prev => ({
        ...prev,
        recommendation,
        priceRange
      }));
      setShowResult(true);
    }
  };

  const canProceed = () => {
    const stepKey = `s${state.step}` as keyof typeof state.answers;
    const hasAnswers = state.answers[stepKey]?.length > 0;

    if (showFallback) {
      return state.fallback?.q1 && state.fallback?.q2;
    }

    return hasAnswers;
  };

  const handleViewExample = () => {
    const tabKey = state.recommendation === 'landing' ? 'landing' : 'site';
    const demosSection = document.getElementById('demos');
    if (demosSection) {
      window.dispatchEvent(new CustomEvent('selectDemoTab', { detail: tabKey }));
      demosSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const startCalculator = () => {
    setState(prev => ({ ...prev, step: 1 }));
  };

  useEffect(() => {
    // Escutar evento personalizado para iniciar calculadora
    const handleStartCalculator = () => {
      startCalculator();
    };

    window.addEventListener('startCalculator', handleStartCalculator);
    return () => {
      window.removeEventListener('startCalculator', handleStartCalculator);
    };
  }, []);

  const goToDemos = () => {
    const demosSection = document.getElementById('demos');
    if (demosSection) {
      demosSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetCalculator = () => {
    setState({
      step: 0,
      answers: { s1: [], s2: [], s3: [], s4: [], s5: [] }
    });
    setShowResult(false);
    setShowFallback(false);
  };

  const getCurrentStepTitle = () => {
    if (showResult) return copy.calculator.ui.result;
    return copy.calculator.ui.stepOf(state.step, maxSteps);
  };

  const renderSectionHeader = () => (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        {copy.calculator.title}
      </h2>
      <p className="text-xl text-muted-foreground">
        {copy.calculator.subtitle}
      </p>
    </div>
  );

  const renderStepper = () => (
    <div className="flex items-center justify-center gap-2 mb-4">
      {Array.from({ length: maxSteps }, (_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all duration-300 ${i < state.step ? 'w-8' : 'bg-muted w-4'}`}
          style={{
            background: i < state.step ? 'linear-gradient(135deg, #2B6FA5, #85BA62)' : undefined
          }}
          aria-current={i + 1 === state.step ? 'step' : undefined}
        />
      ))}
    </div>
  );

  return (
    <section id="calculator" className="py-10 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">

          {/* Card único para todas as etapas, incluindo a 0 */}
          <Card className="overflow-hidden w-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
            <CardHeader className="pt-4 pb-0">
              <div className="flex flex-col items-center text-center gap-2.5 md:gap-3">
                {/* Stepper só nas etapas 1–5 */}
                {state.step > 0 && !showResult && renderStepper()}

                {/* Overline */}
                <p className="text-[11px] md:text-xs uppercase tracking-[0.14em] text-white/65 font-medium">
                  {state.step === 0 ? copy.calculator.ui.intro : getCurrentStepTitle()}
                </p>
              </div>
            </CardHeader>

            <CardContent className="px-5 pt-5 md:pt-6 pb-4">
              {/* Etapa 0 dentro do card */}
              {state.step === 0 && !showResult && (
                <div className="text-center animate-fade-in-up space-y-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {copy.calculator.intro.title}
                  </h1>

                  {/* Subtítulo menor (exigido) */}
                  <p className="max-w-xl mx-auto text-sm md:text-base text-white/70">
                    {copy.calculator.intro.subtitle}
                  </p>

                  {/* Bullets sutis opcionalmente (mantidos) */}
                  {/* <div className="flex flex-wrap gap-2 justify-center text-xs text-white/70">
                    {copy.calculator.intro.bullets.map(b => (
                      <span key={b} className="px-2 py-1 rounded-full bg-white/5 border border-white/10">{b}</span>
                    ))}
                  </div> */}
                </div>
              )}

              {/* Resultado */}
              {state.step > 0 && showResult && state.recommendation && state.priceRange && (
                <div className="space-y-5" aria-live="polite">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 order-2 md:order-1 space-y-3">
                      <div className="text-center md:text-left">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-1.5 leading-snug">
                          {copy.calculator.ui.weSuggest}{' '}
                          {state.recommendation === 'landing'
                            ? copy.calculator.result.recommendation.landingLabel
                            : copy.calculator.result.recommendation.siteLabel}
                        </h3>
                        <p className="text-white/70">
                          {copy.calculator.result.recommendation.hint}
                        </p>
                      </div>

                      <div className="text-center md:text-left">
                        {sessionStorage.getItem('lv_promo_claimed') === 'true' ? (
                          <div className="space-y-2 mb-3">
                            <div className="text-lg text-white/60 line-through">
                              R$ {Math.round((state.priceRange[0] / 0.85) / 50) * 50} - R$ {Math.round((state.priceRange[1] / 0.85) / 50) * 50}
                            </div>
                            <div className="text-3xl font-bold text-white">
                              R$ {state.priceRange[0]} - R$ {state.priceRange[1]}
                            </div>
                          </div>
                        ) : (
                          <div className="text-3xl font-bold text-white mb-3">
                            R$ {state.priceRange[0]} - R$ {state.priceRange[1]}
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          {sessionStorage.getItem('lv_promo_claimed') === 'true' && (
                            <Badge className="px-3 py-1.5 rounded-full
                                              bg-primary-green/20
                                              text-primary-green
                                              border border-primary-green/40
                                              shadow-[0_0_0_1px_hsl(98_35%_55%/.12)_inset]
                                              font-bold">
                              {copy.calculator.ui.promoApplied}
                            </Badge>
                          )}
                          <Badge className="px-3 py-1.5 rounded-full
                                            bg-[hsl(98_35%_55%/.16)]
                                            text-[hsl(98_40%_65%)]
                                            border border-[hsl(98_35%_55%/.38)]
                                            shadow-[0_0_0_1px_hsl(98_35%_55%/.12)_inset]">
                            {copy.calculator.ui.urgencyLabel} {state.answers.s4?.[0] || 'Sem pressa'}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:block flex-shrink-0 order-1 md:order-2">
                      <img
                        src={state.recommendation === 'landing'
                          ? '/lovable-uploads/landingpage.png'
                          : '/lovable-uploads/site.png'}
                        alt={`Ilustração do tipo recomendado: ${state.recommendation === 'landing' ? 'Landing de captação' : 'Site simples'}`}
                        className="w-72 h-auto animate-float"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl p-5 bg-white/5 ring-1 ring-white/10">
                    <h4 className="font-semibold text-white mb-3 text-center">
                      {copy.calculator.ui.whyRecommend(state.recommendation === 'landing' ? 'Landing Page' : 'Site')}
                    </h4>
                    <div className="space-y-3">
                      {buildReasons(state).map((reason, index) => {
                        const iconMap = { Target, Clock, MessageCircle, Lightbulb, Zap, Globe, Grid3x3, MapPin, Image, Layers };
                        const IconComponent = iconMap[reason.icon as keyof typeof iconMap] || Target;

                        return (
                          <div key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                              <IconComponent className="w-5 h-5 text-[hsl(98_40%_60%)] drop-shadow-[0_0_8px_hsla(98,35%,55%,0.25)]" />
                            </div>
                            <div>
                              <div className="font-medium text-white text-sm mb-0.5">{reason.title}</div>
                              <div className="text-sm text-white/70 leading-relaxed">{reason.text}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={resetCalculator}
                      variant="outline"
                      className="flex-1 font-semibold h-12 gap-2 border-white/30 text-white hover:bg-white/10"
                    >
                      {copy.calculator.ui.resetCalculator}
                    </Button>

                    <Button
                      onClick={() => setShowChannelSheet(true)}
                      className="flex-1 font-semibold h-12
                                 bg-[linear-gradient(135deg,hsl(215_85%_60%)_0%,hsl(145_60%_45%)_100%)]
                                 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset,0_10px_30px_rgba(0,0,0,0.35)]
                                 hover:brightness-110"
                    >
                      {copy.calculator.result.ctas.primary}
                    </Button>
                  </div>
                </div>
              )}

              {/* Etapas regulares */}
              {state.step > 0 && !showResult && (
                <div className="space-y-5 md:space-y-6">
                  <div className="mb-2 md:mb-3">
                    <h4 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                      {steps[`s${state.step}` as keyof typeof steps]?.title}
                    </h4>
                    {('hint' in steps[`s${state.step}` as keyof typeof steps]) && (
                      <p className="text-sm md:text-base text-white/70 mt-2">
                        {(steps[`s${state.step}` as keyof typeof steps] as any).hint}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {steps[`s${state.step}` as keyof typeof steps]?.options.map((option) => {
                      const stepKey = `s${state.step}` as keyof typeof state.answers;
                      const isSelected = state.answers[stepKey]?.includes(option);
                      const isMultiSelect = state.step === 1 || state.step === 2 || state.step === 5;

                      return (
                        <button
                          key={option}
                          onClick={() => handleStepAnswer(option, isMultiSelect)}
                          className={`inline-flex items-center justify-center h-12 px-4 rounded-xl border text-sm font-medium
                                      transition-[background,border-color,box-shadow,transform,color] duration-300 ease-out will-change-transform
                                      ${isSelected
                              ? 'bg-[linear-gradient(135deg,hsl(145_60%_45%),hsl(98_40%_50%))] text-white border-[hsl(98_35%_55%/0.35)] ring-2 ring-[hsl(98_35%_55%/0.45)] shadow-[0_10px_30px_hsla(98,35%,55%,0.25)] scale-[1.015]'
                              : 'border-white/25 text-white/90 hover:text-white hover:bg-white/5 hover:border-white/40 focus:outline-none focus:ring-0 active:bg-white/10'
                            }`}
                          aria-checked={isSelected}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {showFallback && state.step === 1 && (
                    <div className="mt-2.5 p-4 rounded-lg border border-white/10 bg-white/5">
                      <h5 className="font-medium text-white mb-3">{copy.calculator.ui.helpTitle}</h5>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-white mb-2">{steps.s1.fallback.q1}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {steps.s1.fallback.q1Options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleFallbackAnswer('q1', option)}
                              className={`h-10 px-3 rounded-lg border text-xs transition-all duration-300 ease-out
                                ${state.fallback?.q1 === option
                                  ? 'bg-[hsl(98_35%_55%/0.18)] border-[hsl(98_35%_55%/0.45)] text-white'
                                  : 'border-white/20 text-white hover:border-white/40 hover:bg-white/5 focus:outline-none focus:ring-0 active:bg-white/10'
                                }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-white mb-2">{steps.s1.fallback.q2}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {steps.s1.fallback.q2Options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleFallbackAnswer('q2', option)}
                              className={`h-10 px-2 rounded-lg border text-xs transition-all duration-300 ease-out
                                ${state.fallback?.q2 === option
                                  ? 'bg-[hsl(98_35%_55%/0.18)] border-[hsl(98_35%_55%/0.45)] text-white'
                                  : 'border-white/20 text-white hover:border-white/40 hover:bg-white/5 focus:outline-none focus:ring-0 active:bg-white/10'
                                }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>

            {/* Card Footer — mesmo para etapa 0 e para as etapas 1–5 */}
            {(!showResult) && (
              <CardFooter
                className={`flex ${state.step > 1 ? 'justify-between' : 'justify-end'} bg-white/5 border-t border-white/10 py-3 backdrop-blur-md`}
                style={{ paddingBottom: `calc(12px + env(safe-area-inset-bottom))` }}
              >
                {/* Voltar nas etapas > 1 */}
                {state.step > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setState((prev) => ({ ...prev, step: Math.max(1, prev.step - 1) }));
                      setShowFallback(false);
                    }}
                    className="h-12 px-6 border-white/30 text-white hover:bg-white/10"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    {copy.calculator.ui.back}
                  </Button>
                )}

                {/* CTA: etapa 0 inicia; demais avançam */}
                {state.step === 0 ? (
                  <Button
                    onClick={startCalculator}
                    className="h-12 px-6 font-semibold
                               bg-[linear-gradient(135deg,hsl(208_58%_41%),hsl(98_35%_55%))]
                               text-white border-0 hover:brightness-110"
                  >
                    {copy.calculator.intro.cta}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="h-12 px-6 font-semibold
                               bg-[linear-gradient(135deg,hsl(208_58%_41%),hsl(98_35%_55%))]
                               text-white border-0 hover:brightness-110"
                  >
                    {state.step === maxSteps ? copy.calculator.ui.seeEstimate : copy.calculator.ui.advance}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </CardFooter>
            )}
          </Card>
        </div>
      </div>

      <ChannelSheet
        open={showChannelSheet}
        onOpenChange={setShowChannelSheet}
        recommendation={state.recommendation}
        priceRange={state.priceRange}
        answers={state.answers}
        fallback={state.fallback}
        context={{
          source: 'calculator_final',
          intent: state.recommendation === 'landing' ? 'landing' : 'site'
        }}
      />
    </section>
  );
};

export default Calculator30s;
