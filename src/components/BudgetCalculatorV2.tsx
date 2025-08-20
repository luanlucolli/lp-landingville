import { useState, useEffect } from 'react';
import { Calculator, ArrowRight, ArrowLeft, CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { copy } from '@/content/landingville';

interface CalculatorState {
  stepA?: string;
  stepB: string[];
  stepC?: string;
  stepD: string[];
  preset?: { type: string | null; opts: string[] };
}

interface BudgetResult {
  recommendedType: 'Landing' | 'Site';
  justification: string;
  priceRange: { min: number; max: number };
}

interface BudgetCalculatorV2Props {
  preset?: { type: string | null; opts: string[] };
  onReset?: () => void;
}

const BudgetCalculatorV2 = ({ preset, onReset }: BudgetCalculatorV2Props) => {
  const [currentStep, setCurrentStep] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [state, setState] = useState<CalculatorState>({
    stepB: [],
    stepD: [],
    preset
  });
  const [result, setResult] = useState<BudgetResult | null>(null);
  const [showPresetTag, setShowPresetTag] = useState(false);

  // Apply preset when it changes
  useEffect(() => {
    if (preset) {
      setState(prev => ({ 
        ...prev, 
        preset,
        stepB: preset.opts || []
      }));
      setShowPresetTag(true);
      setTimeout(() => setShowPresetTag(false), 5000);
    }
  }, [preset]);

  const calculateBudget = (): BudgetResult => {
    let landingScore = 1;
    let siteScore = 1;

    // Step A scoring
    if (state.stepA?.includes('Promover uma oferta')) {
      landingScore += 3;
    } else if (state.stepA?.includes('site completo')) {
      siteScore += 3;
    }

    // Step B scoring
    if (state.stepB.includes('sections')) siteScore += 3;
    if (state.stepB.includes('catalog')) {
      landingScore += 2;
      siteScore += 1;
    }
    if (state.stepB.includes('form')) {
      landingScore += 2;
      siteScore += 1;
    }
    ['map', 'gallery', 'contact', 'instagram'].forEach(opt => {
      if (state.stepB.includes(opt)) {
        landingScore += 1;
        siteScore += 1;
      }
    });

    // Step D scoring
    if (state.stepD.includes('Promo do dia simples')) landingScore += 2;
    if (state.stepD.includes('Depoimentos simples')) siteScore += 1;

    // Determine recommendation
    let recommendedType: 'Landing' | 'Site';
    let justification = '';

    if (siteScore > landingScore || state.stepB.includes('sections')) {
      recommendedType = 'Site';
      if (state.stepB.includes('sections')) {
        justification = 'Você selecionou Seções essenciais, ideal para um Site completo.';
      } else {
        justification = 'Baseado nas suas escolhas, um Site completo atende melhor seus objetivos.';
      }
    } else {
      recommendedType = 'Landing';
      justification = 'Uma Landing Page focada é perfeita para seus objetivos de conversão.';
    }

    // Calculate price range with cap at R$ 500
    const basePrice = recommendedType === 'Landing' ? { min: 250, max: 350 } : { min: 350, max: 480 };
    let priceRange = { ...basePrice };

    // Add increments
    const increments = {
      map: { min: 20, max: 30 },
      gallery: { min: 20, max: 30 },
      catalog: { min: 30, max: 40 },
      form: { min: 20, max: 30 },
      instagram: { min: 10, max: 20 }
    };

    Object.entries(increments).forEach(([key, increment]) => {
      if (state.stepB.includes(key)) {
        priceRange.min += increment.min;
        priceRange.max += increment.max;
      }
    });

    // Step D increments
    if (state.stepD.includes('Promo do dia simples')) {
      priceRange.min += 10;
      priceRange.max += 15;
    }
    if (state.stepD.includes('Depoimentos simples')) {
      priceRange.min += 5;
      priceRange.max += 10;
    }

    // Cap at R$ 500
    if (priceRange.max > 500) {
      priceRange.max = 500;
      if (priceRange.min > 430) priceRange.min = 430; // Maintain reasonable range
    }

    // Round to nearest 10
    priceRange.min = Math.round(priceRange.min / 10) * 10;
    priceRange.max = Math.round(priceRange.max / 10) * 10;

    return { recommendedType, justification, priceRange };
  };

  const handleFinish = () => {
    const budgetResult = calculateBudget();
    setResult(budgetResult);
  };

  const handleChannelProposal = () => {
    // Open channel selection sheet (placeholder for now)
    window.open(`https://wa.me/5547999999999?text=${encodeURIComponent(`Olá! Calculei meu orçamento na Landingville: ${result?.recommendedType} (R$ ${result?.priceRange.min} - R$ ${result?.priceRange.max}). Gostaria de receber uma proposta!`)}&utm_source=calculator&utm_medium=whatsapp&utm_campaign=landingville`, '_blank');
  };

  const nextStep = () => {
    const steps: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    } else {
      handleFinish();
    }
  };

  const prevStep = () => {
    const steps: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'A':
        return state.stepA !== undefined;
      case 'B':
        return true; // Optional step
      case 'C':
        return state.stepC !== undefined;
      case 'D':
        return true; // Optional step
      default:
        return false;
    }
  };

  // Show result if calculated
  if (result) {
    return (
      <div className="max-w-2xl mx-auto">
        {/* Preset Tag */}
        {showPresetTag && (
          <div className="mb-6 text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm">
              <CheckCircle className="w-4 h-4" />
              Sugestões aplicadas — pode ajustar à vontade
            </div>
          </div>
        )}

        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl text-primary">{copy.calculator.result.title}</CardTitle>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            {/* Recommendation */}
            <div className="p-6 rounded-2xl bg-background/50 border border-primary/10">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Recomendamos: {result.recommendedType}
              </h3>
              <p className="text-muted-foreground mb-4">
                {result.justification}
              </p>
              <div className="text-2xl font-bold text-primary">
                R$ {result.priceRange.min} - R$ {result.priceRange.max}
              </div>
            </div>

            {/* Note */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {copy.calculator.result.note}
            </p>

            {/* CTA */}
            <div className="space-y-3">
              <Button 
                onClick={handleChannelProposal}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-background font-semibold h-12"
                size="lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {copy.calculator.result.cta}
              </Button>
              
              <Button 
                onClick={() => {
                  setResult(null);
                  setCurrentStep('A');
                  setState({ stepB: [], stepD: [], preset: undefined });
                  if (onReset) onReset();
                }}
                variant="outline"
                className="w-full"
              >
                Calcular novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Preset Tag */}
      {showPresetTag && (
        <div className="mb-6 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm">
            <CheckCircle className="w-4 h-4" />
            Sugestões aplicadas — pode ajustar à vontade
          </div>
        </div>
      )}

      <Card>
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">{copy.calculator.title}</CardTitle>
          </div>
          
          {/* Progress */}
          <div className="flex justify-center gap-2 mb-6">
            {['A', 'B', 'C', 'D'].map((step, index) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full transition-colors ${
                  ['A', 'B', 'C', 'D'].indexOf(currentStep) >= index
                    ? 'bg-primary'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent>
          {/* Step A - Objective */}
          {currentStep === 'A' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-center mb-6">
                {copy.calculator.steps.A.title}
              </h3>
              
              <div className="space-y-3">
                {copy.calculator.steps.A.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setState(prev => ({ ...prev, stepA: option }))}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      state.stepA === option
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step B - Content */}
          {currentStep === 'B' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-center mb-6">
                {copy.calculator.steps.B.title}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {copy.calculator.steps.B.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setState(prev => ({
                        ...prev,
                        stepB: prev.stepB.includes(option.id)
                          ? prev.stepB.filter(id => id !== option.id)
                          : [...prev.stepB, option.id]
                      }));
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      state.stepB.includes(option.id)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step C - Urgency */}
          {currentStep === 'C' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-center mb-6">
                {copy.calculator.steps.C.title}
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {copy.calculator.steps.C.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setState(prev => ({ ...prev, stepC: option }))}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      state.stepC === option
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step D - Extras */}
          {currentStep === 'D' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-center mb-6">
                {copy.calculator.steps.D.title}
              </h3>
              
              <div className="space-y-3">
                {copy.calculator.steps.D.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setState(prev => ({
                        ...prev,
                        stepD: prev.stepD.includes(option)
                          ? prev.stepD.filter(item => item !== option)
                          : [...prev.stepD, option]
                      }));
                    }}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      state.stepD.includes(option)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            <Button
              onClick={prevStep}
              variant="outline"
              className="flex-1"
              disabled={currentStep === 'A'}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            
            <Button
              onClick={nextStep}
              className="flex-1"
              disabled={!canProceed()}
            >
              {currentStep === 'D' ? 'Calcular' : 'Próximo'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetCalculatorV2;