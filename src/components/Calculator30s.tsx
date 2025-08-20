import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator, ChevronRight, ArrowLeft } from 'lucide-react';
import copy from '@/content/landingville';
import { calculatePricing, type CalculatorAnswers } from '@/utils/pricing';
import { openDemosTab, openChannelSheet } from '@/utils/nav';

const Calculator30s = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<CalculatorAnswers>({
    objectives: [],
    channels: [],
    assets: [],
    urgency: '',
    extras: []
  });
  const [showFallback, setShowFallback] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleObjectiveChange = (objective: string, checked: boolean) => {
    if (objective === "Não sei, me ajude") {
      setShowFallback(true);
      return;
    }
    
    setAnswers(prev => ({
      ...prev,
      objectives: checked 
        ? [...prev.objectives, objective]
        : prev.objectives.filter(o => o !== objective)
    }));
  };

  const handleChannelChange = (channel: string, checked: boolean) => {
    setAnswers(prev => ({
      ...prev,
      channels: checked 
        ? [...prev.channels, channel]
        : prev.channels.filter(c => c !== channel)
    }));
  };

  const handleAssetSelect = (asset: string) => {
    setAnswers(prev => ({ ...prev, assets: [asset] }));
  };

  const handleUrgencySelect = (urgency: string) => {
    setAnswers(prev => ({ ...prev, urgency }));
  };

  const handleExtraChange = (extra: string, checked: boolean) => {
    setAnswers(prev => ({
      ...prev,
      extras: checked 
        ? [...prev.extras, extra]
        : prev.extras.filter(e => e !== extra)
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      const pricingResult = calculatePricing(answers);
      setResult(pricingResult);
      setCurrentStep(6);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return answers.objectives.length > 0 || showFallback;
      case 2: return answers.channels.length > 0;
      case 3: return answers.assets.length > 0;
      case 4: return answers.urgency !== '';
      case 5: return true; // extras are optional
      default: return false;
    }
  };

  const renderStep = () => {
    if (showFallback && currentStep === 1) {
      return (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              {copy.calculator.steps.s1.fallback.q1}
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setAnswers(prev => ({ ...prev, objectives: ["Divulgar promoção/campanha"] }));
                  setShowFallback(false);
                }}
                className="flex-1"
              >
                Something pontual (campanha)
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setAnswers(prev => ({ ...prev, objectives: ["Ter um site oficial simples"] }));
                  setShowFallback(false);
                }}
                className="flex-1"
              >
                Presença contínua (site)
              </Button>
            </div>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                {copy.calculator.steps.s1.title}
              </h3>
              <p className="text-muted-foreground">{copy.calculator.steps.s1.hint}</p>
            </div>
            <div className="grid gap-3">
              {copy.calculator.steps.s1.options.map((option) => (
                <div key={option} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50">
                  <Checkbox
                    id={option}
                    checked={answers.objectives.includes(option)}
                    onCheckedChange={(checked) => handleObjectiveChange(option, checked as boolean)}
                  />
                  <label htmlFor={option} className="text-sm font-medium leading-relaxed cursor-pointer flex-1">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                {copy.calculator.steps.s2.title}
              </h3>
              <p className="text-muted-foreground">{copy.calculator.steps.s2.hint}</p>
            </div>
            <div className="grid gap-3">
              {copy.calculator.steps.s2.options.map((channel) => (
                <div key={channel} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50">
                  <Checkbox
                    id={channel}
                    checked={answers.channels.includes(channel)}
                    onCheckedChange={(checked) => handleChannelChange(channel, checked as boolean)}
                  />
                  <label htmlFor={channel} className="text-sm font-medium leading-relaxed cursor-pointer flex-1">
                    {channel}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground">
                {copy.calculator.steps.s3.title}
              </h3>
            </div>
            <div className="grid gap-3">
              {copy.calculator.steps.s3.options.map((asset) => (
                <Button
                  key={asset}
                  variant={answers.assets.includes(asset) ? "default" : "outline"}
                  onClick={() => handleAssetSelect(asset)}
                  className="h-auto py-4 px-6 text-left justify-start"
                >
                  {asset}
                </Button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground">
                {copy.calculator.steps.s4.title}
              </h3>
            </div>
            <div className="grid gap-3">
              {copy.calculator.steps.s4.options.map((urgency) => (
                <Button
                  key={urgency}
                  variant={answers.urgency === urgency ? "default" : "outline"}
                  onClick={() => handleUrgencySelect(urgency)}
                  className="h-auto py-4 px-6 text-left justify-start"
                >
                  {urgency}
                </Button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground">
                {copy.calculator.steps.s5.title}
              </h3>
            </div>
            <div className="grid gap-3">
              {copy.calculator.steps.s5.options.map((extra) => (
                <div key={extra} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50">
                  <Checkbox
                    id={extra}
                    checked={answers.extras.includes(extra)}
                    onCheckedChange={(checked) => handleExtraChange(extra, checked as boolean)}
                  />
                  <label htmlFor={extra} className="text-sm font-medium leading-relaxed cursor-pointer flex-1">
                    {extra}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                {copy.calculator.result.title}
              </h3>
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-lg font-semibold text-foreground mb-2">
                  {result?.recommendation}
                </p>
                <p className="text-3xl font-bold text-primary">
                  R$ {result?.minPrice} - R$ {result?.maxPrice}
                </p>
              </div>
            </div>

            {result?.scope && result.scope.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 text-foreground">O que está incluso:</h4>
                <ul className="space-y-2">
                  {result.scope.map((item: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-sm text-muted-foreground text-center">
              {copy.calculator.result.priceNote}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={openChannelSheet}
                className="flex-1 h-12 text-lg font-semibold"
                size="lg"
              >
                {copy.calculator.result.ctas.primary}
              </Button>
              <Button 
                onClick={() => openDemosTab(result?.type || 'landing')}
                variant="outline"
                className="flex-1 h-12 text-lg font-semibold"
                size="lg"
              >
                {copy.calculator.result.ctas.secondary}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="calculator" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Calculator className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {copy.calculator.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {copy.calculator.subtitle}
            </p>
          </div>

          <Card className="border-2 border-primary/20 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">
                  Passo {currentStep} de 5
                </CardTitle>
                <div className="w-32 bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 5) * 100}%` }}
                  />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {renderStep()}
              
              {currentStep < 6 && (
                <div className="flex justify-between mt-8">
                  <Button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar
                  </Button>
                  
                  <Button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="flex items-center gap-2"
                  >
                    {currentStep === 5 ? 'Ver estimativa' : 'Próximo'}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Calculator30s;