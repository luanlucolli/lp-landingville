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
    step: 0, // Start with intro screen
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

    // S1 - Objetivos principais
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

    // Catálogo pode ser ambos, mas se sem site oficial → landing
    if (objectives.includes("Exibir cardápio/catálogo")) {
      if (objectives.includes("Ter um site oficial simples")) {
        siteScore += 1;
      } else {
        landingScore += 2;
      }
    }

    // Extras
    if (answers.s5.includes("Promo do dia")) {
      landingScore += 2;
    }

    if (answers.s5.includes("Depoimentos simples")) {
      siteScore += 1;
    }

    // Fallback
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

    // Add increments based on selections
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

    // Apply cap
    if (max > pricing.cap) {
      max = pricing.cap;
      min = Math.max(min, max - 100); // Maintain reasonable range
    }

    // Round to tens
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

        // Step 5: Handle "Não" exclusivity
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

    // Special handling for "Estou em dúvida"
    if (option === "Estou em dúvida" && state.step === 1) {
      if (!state.answers.s1.includes("Estou em dúvida")) {
        setShowFallback(true);
      } else {
        setShowFallback(false);
        // Clear fallback answers when unmarking
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
      // Landing reasons
      if (state.answers.s1.some(obj => ['Divulgar promoção/campanha', 'Reabertura/inauguração', 'Receber mais pedidos/contatos'].includes(obj))) {
        reasons.push({
          title: 'Ação imediata',
          text: 'Uma página direta com botão de contato facilita receber pedidos.',
          icon: 'Target'
        });
      }

      if (state.answers.s4?.[0] && ['Em 3 dias (noites)', 'Em 5 dias (úteis, à noite)'].includes(state.answers.s4[0])) {
        reasons.push({
          title: 'Vai ao ar rápido',
          text: 'Publicamos rapidinho para você começar a receber mensagens.',
          icon: 'Clock'
        });
      }

      if (state.answers.s2.some(canal => ['WhatsApp', 'Instagram'].includes(canal))) {
        reasons.push({
          title: 'Foco nos canais',
          text: 'Destaque para falar com você em 1 toque.',
          icon: 'MessageCircle'
        });
      }

      if (state.answers.s5.includes('Promo do dia')) {
        reasons.push({
          title: 'Promo do dia',
          text: 'Dá para divulgar ofertas sem complicação.',
          icon: 'Lightbulb'
        });
      }

      if (state.answers.s3.includes('Nenhum dos dois')) {
        reasons.push({
          title: 'Conteúdo enxuto',
          text: 'Comece simples agora e troque as fotos depois.',
          icon: 'Zap'
        });
      }
    } else {
      // Site reasons
      if (state.answers.s1.includes('Ter um site oficial simples')) {
        reasons.push({
          title: 'Presença contínua',
          text: 'Seu negócio com páginas Home, Sobre e Contato bem organizadas.',
          icon: 'Globe'
        });
      }

      if (state.answers.s1.some(obj => ['Exibir cardápio/catálogo'].includes(obj)) || state.answers.s5.some(extra => ['Galeria simples', 'Depoimentos simples'].includes(extra))) {
        reasons.push({
          title: 'Mais conteúdo',
          text: 'Mostra melhor seus produtos e ajuda quem pesquisa.',
          icon: 'Grid3x3'
        });
      }

      if (state.answers.s1.includes('Mostrar horário/endereço e rotas')) {
        reasons.push({
          title: 'Fácil de achar',
          text: 'Informações fixas que ajudam a aparecer no Google.',
          icon: 'MapPin'
        });
      }

      if (state.answers.s3.includes('Logo e Fotos') || state.answers.s3.includes('Logo') || state.answers.s3.includes('Fotos')) {
        reasons.push({
          title: 'Você já tem material',
          text: 'Aproveitamos seus materiais para um site completo.',
          icon: 'Image'
        });
      }

      if (state.answers.s2.length >= 3) {
        reasons.push({
          title: 'Vários canais',
          text: 'Tudo num lugar só, com navegação simples.',
          icon: 'Layers'
        });
      }
    }

    // Fill with general reasons if we have less than 3
    const generalReasons = isLanding ? [
      { title: 'Vai ao ar rápido', text: 'Publicamos rapidinho para você começar a receber mensagens.', icon: 'Clock' },
      { title: 'Foco nos canais', text: 'Destaque para falar com você em 1 toque.', icon: 'MessageCircle' },
      { title: 'Ação imediata', text: 'Uma página direta com botão de contato facilita receber pedidos.', icon: 'Target' }
    ] : [
      { title: 'Presença contínua', text: 'Seu negócio com páginas Home, Sobre e Contato bem organizadas.', icon: 'Globe' },
      { title: 'Fácil de achar', text: 'Informações fixas que ajudam a aparecer no Google.', icon: 'MapPin' },
      { title: 'Vários canais', text: 'Tudo num lugar só, com navegação simples.', icon: 'Layers' }
    ];

    generalReasons.forEach(reason => {
      if (reasons.length < 3 && !reasons.some(r => r.title === reason.title)) {
        reasons.push(reason);
      }
    });

    return reasons.slice(0, 3);
  };

  const nextStep = () => {
    if (state.step < maxSteps) {
      setState(prev => ({ ...prev, step: prev.step + 1 }));
      setShowFallback(false);
    } else {
      // Calculate final result
      const recommendation = calculateRecommendation(state.answers);
      const priceRange = calculatePrice(state.answers, recommendation);

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

    // Scroll to demos with tab selection
    const demosSection = document.getElementById('demos');
    if (demosSection) {
      // Trigger tab selection via event
      window.dispatchEvent(new CustomEvent('selectDemoTab', { detail: tabKey }));
      demosSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const startCalculator = () => {
    setState(prev => ({ ...prev, step: 1 }));
  };

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
    if (state.step === 0) return "Introdução";
    if (showResult) return "Resultado · Estimativa inicial";
    return `Passo ${state.step} de ${maxSteps}`;
  };

  // Section title and subtitle (always stable)
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

  // Stepper component
  const renderStepper = () => (
    <div className="flex items-center justify-center gap-2 mb-4">
      {Array.from({ length: maxSteps + 1 }, (_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all duration-300 ${i <= state.step ? 'w-8' : 'bg-muted w-4'
            }`}
          style={{
            background: i <= state.step ? 'linear-gradient(135deg, #2B6FA5, #85BA62)' : undefined
          }}
          aria-current={i === state.step ? 'step' : undefined}
        />
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background" id="calculator">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {renderSectionHeader()}

          <Card className="overflow-hidden card-elevated">
            {/* Card Header with Stepper */}
            <CardHeader className="pb-4">
              {renderStepper()}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground">
                  {getCurrentStepTitle()}
                </h3>
              </div>
            </CardHeader>

            <CardContent className="px-6 pb-6">
              {/* Intro Screen */}
              {state.step === 0 && (
                <div className="flex flex-col md:grid md:grid-cols-12 md:gap-8 space-y-6 md:space-y-0">
                  {/* Text Column - Left on Desktop */}
                  <div className="order-2 md:order-1 md:col-span-7 space-y-6">
                    {/* Chips */}
                    <div className="flex flex-wrap gap-2">
                      {copy.calculator.intro.bullets.map((bullet, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {bullet}
                        </Badge>
                      ))}
                    </div>

                    {/* "Você vai ver" section */}
                    <div className="text-left space-y-4">
                      <h4 className="font-semibold text-foreground">Você vai ver:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>O que faz mais sentido: Landing ou Site</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>Faixa de valor para começar</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>Próximo passo para publicar rápido</span>
                        </li>
                      </ul>
                    </div>

                    {/* CTA */}
                    <Button
                      onClick={startCalculator}
                      className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold"
                      aria-label="Descobrir meu investimento agora"
                    >
                      {copy.calculator.intro.cta}
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>

                    {/* Link */}
                    <div className="text-center">
                      <button
                        onClick={goToDemos}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
                      >
                        {copy.calculator.intro.links.seeExamples}
                      </button>
                    </div>
                  </div>

                  {/* Image Column -> Lottie Column - Right on Desktop */}
                  <div className="order-1 md:order-2 md:col-span-5 flex-shrink-0 flex justify-center">
                    {/* runtime do dotLottie (mantenha se não importar no main.tsx) */}
                    <script
                      src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
                      type="module"
                    ></script>

                    {/* wrapper com altura fixa; o player é escalado sem mudar o layout */}
                    <div className="relative h-[15rem] w-full md:w-auto flex items-center justify-center pb-12 md:pb-0">
                      <div className="origin-center pointer-events-none scale-[1.8] md:scale-[2.8]">
                        <dotlottie-player
                          src="/lovable-uploads/calculator-intro5.lottie"
                          autoplay
                          loop
                          background="transparent"
                          aria-hidden="true"
                          className="block"
                          style={{ width: '15rem', height: '15rem' }}
                        />
                      </div>
                    </div>


                  </div>
                </div>
              )}

              {/* Result Screen */}
              {showResult && state.recommendation && state.priceRange && (
                <div className="space-y-6" aria-live="polite">
                  {/* Outcome Hero Image */}
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 order-2 md:order-1 space-y-4">
                      {/* Recommendation */}
                      <div className="text-center md:text-left">
                        <h3 className="text-xl font-semibold text-foreground mb-1">
                          Sugerimos: {state.recommendation === 'landing' ? copy.calculator.result.recommendation.landingLabel : copy.calculator.result.recommendation.siteLabel}
                        </h3>
                        <p className="text-muted-foreground">
                          {copy.calculator.result.recommendation.hint}
                        </p>
                      </div>

                      {/* Price Range */}
                      <div className="text-center md:text-left">
                        <div className="text-3xl font-bold text-foreground mb-3">
                          R$ {state.priceRange[0]} - R$ {state.priceRange[1]}
                        </div>

                        {/* Pills */}
                        <div className="flex gap-2 justify-center md:justify-start flex-wrap mb-4">
                          <Badge variant="secondary">Urgência: {state.answers.s4?.[0] || 'Sem pressa'}</Badge>
                          <Badge variant="outline">{state.recommendation === 'landing' ? 'Landing Page' : 'Site'}</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Hero Image */}
                    <div className="flex-shrink-0 order-1 md:order-2">
                      <img
                        src={state.recommendation === 'landing' ? '/lovable-uploads/landingpage.png' : '/lovable-uploads/site.png'}
                        alt={`Ilustração do tipo recomendado: ${state.recommendation === 'landing' ? 'Landing de captação' : 'Site simples'}`}
                        className="w-56 md:w-80 h-auto animate-float"
                      />
                    </div>
                  </div>

                  {/* Por que recomendamos */}
                  <div className="bg-muted/40 rounded-xl p-5">
                    <h4 className="font-semibold text-foreground mb-4 text-center">
                      Por que recomendamos {state.recommendation === 'landing' ? 'Landing Page' : 'Site'}
                    </h4>
                    <div className="space-y-4">
                      {buildReasons(state).map((reason, index) => {
                        const iconMap = {
                          Target, Clock, MessageCircle, Lightbulb, Zap,
                          Globe, Grid3x3, MapPin, Image, Layers
                        };
                        const IconComponent = iconMap[reason.icon as keyof typeof iconMap] || Target;

                        return (
                          <div key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                              <IconComponent className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground text-sm mb-1">
                                {reason.title}
                              </div>
                              <div className="text-sm text-muted-foreground leading-relaxed">
                                {reason.text}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => setShowChannelSheet(true)}
                      className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold h-12"
                    >
                      {copy.calculator.result.ctas.primary}
                    </Button>

                    <Button
                      onClick={handleViewExample}
                      variant="outline"
                      className="flex-1 font-semibold h-12"
                    >
                      {copy.calculator.result.ctas.secondary}
                    </Button>
                  </div>

                  {/* Reset */}
                  <button
                    onClick={resetCalculator}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
                  >
                    Refazer calculadora
                  </button>
                </div>
              )}

              {/* Regular Steps */}
              {state.step > 0 && !showResult && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-2">
                      {steps[`s${state.step}` as keyof typeof steps]?.title}
                    </h4>
                    {('hint' in steps[`s${state.step}` as keyof typeof steps]) && (
                      <p className="text-sm text-muted-foreground">
                        {(steps[`s${state.step}` as keyof typeof steps] as any).hint}
                      </p>
                    )}
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {steps[`s${state.step}` as keyof typeof steps]?.options.map((option) => {
                      const stepKey = `s${state.step}` as keyof typeof state.answers;
                      const isSelected = state.answers[stepKey]?.includes(option);
                      const isMultiSelect = state.step === 1 || state.step === 2 || state.step === 5;

                      return (
                        <button
                          key={option}
                          onClick={() => handleStepAnswer(option, isMultiSelect)}
                          className={`inline-flex items-center justify-center h-12 px-4 rounded-xl border transition-all duration-200 text-sm font-medium ${isSelected
                            ? 'bg-[rgba(43,111,165,0.90)] border-[#2B6FA5] text-white'
                            : 'border-[rgba(43,111,165,0.40)] text-[#0E1116] hover:border-[rgba(43,111,165,0.60)] hover:bg-[rgba(43,111,165,0.05)]'
                            }`}
                          aria-checked={isSelected}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {/* Fallback Accordion */}
                  {showFallback && state.step === 1 && (
                    <div className="mt-6 p-4 bg-muted/20 rounded-lg border">
                      <h5 className="font-medium text-foreground mb-4">Vamos te ajudar:</h5>

                      {/* Q1 */}
                      <div className="mb-4">
                        <p className="text-sm font-medium text-foreground mb-2">
                          {steps.s1.fallback.q1}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {steps.s1.fallback.q1Options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleFallbackAnswer('q1', option)}
                              className={`h-10 px-3 rounded-lg border text-xs transition-all ${state.fallback?.q1 === option
                                ? 'bg-primary/10 border-primary text-primary'
                                : 'border-muted-foreground/20 text-foreground hover:border-primary/40'
                                }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Q2 */}
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">
                          {steps.s1.fallback.q2}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {steps.s1.fallback.q2Options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleFallbackAnswer('q2', option)}
                              className={`h-10 px-2 rounded-lg border text-xs transition-all ${state.fallback?.q2 === option
                                ? 'bg-primary/10 border-primary text-primary'
                                : 'border-muted-foreground/20 text-foreground hover:border-primary/40'
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

            {/* Card Footer */}
            {state.step > 0 && !showResult && (
              <CardFooter className="flex justify-between bg-muted/20 border-t py-4" style={{
                paddingBottom: `calc(16px + env(safe-area-inset-bottom))`
              }}>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (state.step === 1) {
                      setState(prev => ({ ...prev, step: 0 }));
                      setShowFallback(false);
                    } else {
                      setState(prev => ({ ...prev, step: Math.max(1, prev.step - 1) }));
                      setShowFallback(false);
                    }
                  }}
                  className="h-12 px-6"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>

                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="h-12 px-6 font-semibold"
                >
                  {state.step === maxSteps ? 'Ver Estimativa' : 'Avançar'}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
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
      />
    </section>
  );

};

export default Calculator30s;