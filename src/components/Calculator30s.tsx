import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft, Calculator, Lightbulb, Clock, Shield, Target } from 'lucide-react';
import copy from '@/content/landingville';
import { ChannelSheet } from './ChannelSheet';

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
        if (current.includes(option)) {
          newAnswers[stepKey] = current.filter(item => item !== option);
        } else {
          newAnswers[stepKey] = [...current, option];
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
      setShowFallback(true);
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
    if (state.step === 0) return "Passo 0 de 5 · Introdução";
    if (showResult) return "Estimativa pronta";
    return `Passo ${state.step} de ${maxSteps} · ${steps[`s${state.step}` as keyof typeof steps]?.title || ''}`;
  };

  const getRecommendationReasons = () => {
    const reasons = [];
    const reasonsConfig = copy.calculator.result.reasons;
    
    // Map answers to reasons (max 3)
    if (state.answers.s1.includes("Receber mais pedidos/contatos")) {
      reasons.push(reasonsConfig.contacts);
    }
    if (state.answers.s2.includes("WhatsApp")) {
      reasons.push(reasonsConfig.whatsapp);
    }
    if (state.answers.s4[0] && ["Hoje", "Em 3 dias", "Em 7 dias"].includes(state.answers.s4[0])) {
      reasons.push(reasonsConfig.urgent);
    }
    if (state.answers.s1.includes("Ter um site oficial simples")) {
      reasons.push(reasonsConfig.official);
    }
    if (state.answers.s1.includes("Exibir cardápio/catálogo")) {
      reasons.push(reasonsConfig.catalog);
    }

    // Fill with defaults if needed, limit to 3
    const combined = [...reasons, ...reasonsConfig.defaults].slice(0, 3);
    return combined;
  };

  // Section title and subtitle (always stable)
  const renderSectionHeader = () => (
    <div className="text-center mb-12">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Calculator className="w-8 h-8 text-primary" />
      </div>
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
          className={`h-2 rounded-full transition-all duration-300 ${
            i <= state.step ? 'w-8' : 'bg-muted w-4'
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
        <div className="max-w-2xl mx-auto">
          {renderSectionHeader()}
          
          <Card className="overflow-hidden bg-[#F7FAFD] border-transparent" style={{
            backgroundImage: `
              linear-gradient(#F7FAFD, #F7FAFD),
              linear-gradient(135deg, #2B6FA5, #85BA62)
            `,
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: '0 8px 24px rgba(31,41,55,0.06)'
          }}>
            {/* Card Header with Stepper */}
            <CardHeader className="pb-4">
              {renderStepper()}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  {showResult && (
                    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#85BA62' }}>
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-foreground">
                    {getCurrentStepTitle()}
                  </h3>
                </div>
                {showResult && (
                  <p className="text-xs text-muted-foreground">Passo 5 de 5</p>
                )}
              </div>
            </CardHeader>

            <CardContent className="px-6 pb-6">
              {/* Intro Screen */}
              {state.step === 0 && (
                <div className="text-center space-y-6">
                  {/* Hero Image with Animation */}
                  <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                    <div className="flex-1 order-2 md:order-1">
                      {/* Mini badges */}
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                        {copy.calculator.intro.bullets.map((bullet, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {bullet}
                          </Badge>
                        ))}
                      </div>

                      {/* CTA */}
                      <Button
                        onClick={startCalculator}
                        className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold mb-4"
                      >
                        {copy.calculator.intro.cta}
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>

                      {/* Link */}
                      <button
                        onClick={goToDemos}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
                      >
                        {copy.calculator.intro.links.seeExamples}
                      </button>
                    </div>

                    <div className="flex-shrink-0 order-1 md:order-2">
                      <img
                        src="/lovable-uploads/5a727833-d262-47b7-8496-002dbd6525e7.png"
                        alt="Ilustração: celular com estimativa, WhatsApp e mapa"
                        className="w-56 md:w-80 h-auto animate-float"
                        style={{
                          animation: 'float 3.8s ease-in-out infinite'
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Result Screen */}
              {showResult && state.recommendation && state.priceRange && (
                <div 
                  className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-200"
                  style={{
                    animation: 'fadeUp 180ms ease-out forwards'
                  }}
                  aria-live="polite"
                >
                  {/* Recommendation Banner */}
                  <div 
                    className="rounded-2xl p-6 text-left"
                    style={{
                      backgroundColor: '#EAF3FF'
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#2B6FA5' }}>
                        <Lightbulb className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-foreground mb-3">
                          Sugerimos: <span className="text-[#2B6FA5]">
                            {state.recommendation === 'landing' ? copy.calculator.result.recommendation.landingLabel : copy.calculator.result.recommendation.siteLabel}
                          </span>
                        </h4>
                        
                        {/* Reasons */}
                        <div className="space-y-2 mb-4">
                          {getRecommendationReasons().map((reason, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-foreground">
                              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#2B6FA5' }} />
                              {reason}
                            </div>
                          ))}
                        </div>

                        {/* Chips */}
                        <div className="flex gap-2 flex-wrap">
                          <span 
                            className="inline-flex h-7 px-3 rounded-full text-[13px] items-center font-medium"
                            style={{
                              border: '1px solid rgba(43,111,165,.25)',
                              backgroundColor: 'rgba(43,111,165,.08)',
                              color: '#2B6FA5'
                            }}
                          >
                            Urgência: {state.answers.s4[0] || 'Sem pressa'}
                          </span>
                          <span 
                            className="inline-flex h-7 px-3 rounded-full text-[13px] items-center font-medium"
                            style={{
                              border: '1px solid rgba(43,111,165,.25)',
                              backgroundColor: 'rgba(43,111,165,.08)',
                              color: '#2B6FA5'
                            }}
                          >
                            {state.recommendation === 'landing' ? 'Landing Page' : 'Site'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price Range with Visual Bar */}
                  <div className="text-center space-y-4">
                    <div 
                      className="text-[clamp(28px,6vw,40px)] font-extrabold tracking-tight text-foreground"
                      style={{ fontFeatureSettings: '"tnum" 1' }}
                      role="status"
                      aria-label={`Estimativa de ${state.priceRange[0]} a ${state.priceRange[1]} reais`}
                    >
                      R$ {state.priceRange[0]} - R$ {state.priceRange[1]}
                    </div>
                    
                    {/* Visual Price Bar */}
                    <div className="max-w-xs mx-auto">
                      <div 
                        className="h-2 rounded-full relative"
                        style={{ backgroundColor: '#E6EEF5' }}
                      >
                        <div 
                          className="absolute inset-y-0 rounded-full"
                          style={{
                            left: `${(state.priceRange[0] / copy.calculator.pricing.cap) * 100}%`,
                            right: `${100 - (state.priceRange[1] / copy.calculator.pricing.cap) * 100}%`,
                            background: 'linear-gradient(90deg, #2B6FA5, #85BA62)'
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>R$ 0</span>
                        <span>R$ {copy.calculator.pricing.cap}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {copy.calculator.result.price.note}
                    </p>
                  </div>

                  {/* Next Steps */}
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {copy.calculator.result.nextSteps}
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      onClick={() => setShowChannelSheet(true)}
                      className="flex-1 font-semibold h-12 text-white"
                      style={{ backgroundColor: '#2B6FA5' }}
                    >
                      {copy.calculator.result.ctas.primary}
                    </Button>
                    
                    <Button 
                      onClick={handleViewExample}
                      variant="outline"
                      className="flex-1 font-semibold h-12"
                      style={{ 
                        borderColor: '#2B6FA5',
                        color: '#2B6FA5'
                      }}
                    >
                      {copy.calculator.result.ctas.secondary}
                    </Button>
                  </div>

                  {/* Reset */}
                  <div className="text-center">
                    <button
                      onClick={resetCalculator}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
                    >
                      Refazer calculadora
                    </button>
                  </div>
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
                          className={`inline-flex items-center justify-center h-12 px-4 rounded-xl border transition-all duration-200 text-sm font-medium ${
                            isSelected 
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
                              className={`h-10 px-3 rounded-lg border text-xs transition-all ${
                                state.fallback?.q1 === option 
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
                              className={`h-10 px-2 rounded-lg border text-xs transition-all ${
                                state.fallback?.q2 === option 
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

          {/* Quick skip option */}
          {state.step > 2 && !showResult && (
            <div className="text-center mt-6">
              <Button 
                variant="ghost" 
                onClick={() => {
                  const recommendation = calculateRecommendation(state.answers);
                  const priceRange = calculatePrice(state.answers, recommendation);
                  
                  setState(prev => ({
                    ...prev,
                    recommendation,
                    priceRange
                  }));
                  setShowResult(true);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                Pular para estimativa
              </Button>
            </div>
          )}
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