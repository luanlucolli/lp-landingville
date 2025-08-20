import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Calculator, Lightbulb } from 'lucide-react';
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
    step: 1,
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

    // Special handling for "Não sei, me ajude"
    if (option === "Não sei, me ajude" && state.step === 1) {
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

  if (showResult && state.recommendation && state.priceRange) {
    const isLanding = state.recommendation === 'landing';
    const [min, max] = state.priceRange;
    const urgency = state.answers.s4[0] || 'Sem pressa';

    return (
      <div className="py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-background to-primary/5 border-primary/20">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {copy.calculator.result.title}
                </h3>
                
                {/* Recommendation */}
                <div className="bg-primary/10 rounded-2xl p-6 mb-6">
                  <p className="text-lg font-semibold text-foreground mb-2">
                    Sugerimos: {isLanding ? copy.calculator.result.recommendation.landingLabel : copy.calculator.result.recommendation.siteLabel}
                  </p>
                  <p className="text-muted-foreground">
                    {copy.calculator.result.recommendation.hint}
                  </p>
                </div>

                {/* Price Range */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-foreground mb-2">
                    R$ {min} - R$ {max}
                  </div>
                  <div className="flex gap-2 justify-center flex-wrap">
                    <Badge variant="secondary">Urgência: {urgency}</Badge>
                    <Badge variant="outline">{isLanding ? 'Landing Page' : 'Site'}</Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-8">
                  {copy.calculator.result.price.note}
                </p>

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
              </div>
            </Card>
          </div>
        </div>

        <ChannelSheet 
          open={showChannelSheet}
          onOpenChange={setShowChannelSheet}
          recommendation={state.recommendation}
          priceRange={state.priceRange}
        />
      </div>
    );
  }

  // Show fallback questions if "Não sei" was selected
  if (showFallback && state.step === 1) {
    return (
      <div className="py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Vamos te ajudar a decidir
              </h2>
              <p className="text-xl text-muted-foreground">
                Responda essas 2 perguntas rápidas
              </p>
            </div>

            <div className="space-y-8">
              {/* Q1 */}
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  {steps.s1.fallback.q1}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {steps.s1.fallback.q1Options.map((option) => (
                    <Button
                      key={option}
                      variant={state.fallback?.q1 === option ? "default" : "outline"}
                      onClick={() => handleFallbackAnswer('q1', option)}
                      className="h-auto p-4 text-left justify-start"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </Card>

              {/* Q2 */}
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  {steps.s1.fallback.q2}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {steps.s1.fallback.q2Options.map((option) => (
                    <Button
                      key={option}
                      variant={state.fallback?.q2 === option ? "default" : "outline"}
                      onClick={() => handleFallbackAnswer('q2', option)}
                      className="h-auto p-3 text-sm"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </Card>

              {canProceed() && (
                <div className="text-center">
                  <Button onClick={nextStep} className="h-12 px-8 font-semibold">
                    Continuar <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular step flow
  const currentStepKey = `s${state.step}` as keyof typeof steps;
  const currentStep = steps[currentStepKey];
  const isMultiSelect = state.step === 1 || state.step === 2 || state.step === 5;

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background" id="calculator">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {copy.calculator.title}
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              {copy.calculator.subtitle}
            </p>
            
            {/* Progress */}
            <div className="flex justify-center mb-8">
              <div className="flex gap-2">
                {Array.from({ length: maxSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      i + 1 <= state.step ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Current Step */}
          <Card className="p-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {currentStep.title}
              </h3>
              {('hint' in currentStep) && (
                <p className="text-sm text-muted-foreground">
                  {currentStep.hint}
                </p>
              )}
            </div>

            <div className="grid gap-3 mb-8">
              {currentStep.options.map((option) => {
                const stepKey = `s${state.step}` as keyof typeof state.answers;
                const isSelected = state.answers[stepKey]?.includes(option);
                
                return (
                  <Button
                    key={option}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => handleStepAnswer(option, isMultiSelect)}
                    className="h-auto p-4 text-left justify-start font-medium"
                  >
                    {option}
                  </Button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setState(prev => ({ ...prev, step: Math.max(1, prev.step - 1) }))}
                disabled={state.step === 1}
              >
                Voltar
              </Button>
              
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="h-12 px-6 font-semibold"
              >
                {state.step === maxSteps ? 'Ver Estimativa' : 'Próximo'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>

          {/* Quick skip option */}
          {state.step > 2 && (
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
    </section>
  );
};

export default Calculator30s;