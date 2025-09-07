import { useState } from 'react';
import { ChevronRight, Calculator, MessageCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CalculatorState {
  segment: string;
  features: string[];
  urgency: string;
  extras: string[];
}

// Scoring table for budget calculation
const SCORING = {
  segment: {
    'lanchonete': 10,
    'moda': 15,
    'servicos': 12,
    'outro': 10
  },
  features: {
    'cardapio': 8,
    'whatsapp': 5,
    'mapa': 5,
    'instagram': 10,
    'formulario': 8,
    'analytics': 12
  },
  urgency: {
    'hoje': 20,
    '3dias': 15,
    '7dias': 10,
    'sempressa': 5
  },
  extras: {
    'promocoes': 8,
    'campanhas': 15,
    'manutencao': 12
  }
};

const BudgetCalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [state, setState] = useState<CalculatorState>({
    segment: '',
    features: [],
    urgency: '',
    extras: []
  });
  const [result, setResult] = useState<{min: number, max: number} | null>(null);

  const calculateBudget = () => {
    let score = 0;
    
    // Add segment score
    score += SCORING.segment[state.segment as keyof typeof SCORING.segment] || 0;
    
    // Add features scores
    state.features.forEach(feature => {
      score += SCORING.features[feature as keyof typeof SCORING.features] || 0;
    });
    
    // Add urgency score
    score += SCORING.urgency[state.urgency as keyof typeof SCORING.urgency] || 0;
    
    // Add extras scores
    state.extras.forEach(extra => {
      score += SCORING.extras[extra as keyof typeof SCORING.extras] || 0;
    });
    
    // Convert score to price range
    const basePrice = 800;
    const pricePerPoint = 25;
    const calculatedPrice = basePrice + (score * pricePerPoint);
    
    return {
      min: Math.round(calculatedPrice * 0.8),
      max: Math.round(calculatedPrice * 1.2)
    };
  };

  const handleFinish = () => {
    const budget = calculateBudget();
    setResult(budget);
  };

  const handleWhatsAppProposal = () => {
    const features = state.features.join(', ');
    const extras = state.extras.join(', ');
    const message = `Oi! Fiz a calculadora no site e quero uma proposta detalhada.

Segmento: ${state.segment}
Recursos: ${features}
Urgência: ${state.urgency}
Extras: ${extras || 'Nenhum'}

Faixa estimada: R$ ${result?.min} - R$ ${result?.max}`;

    const phone = "5547999999999";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}&utm_source=calculadora&utm_medium=cta&utm_campaign=landingville`;
    window.open(url, '_blank');
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const segments = [
    { id: 'lanchonete', label: 'Lanchonete', emoji: '🍔' },
    { id: 'moda', label: 'Loja de Moda', emoji: '👗' },
    { id: 'servicos', label: 'Serviços', emoji: '🔧' },
    { id: 'outro', label: 'Outro', emoji: '🏪' }
  ];

  const features = [
    { id: 'cardapio', label: 'Cardápio/Catálogos' },
    { id: 'whatsapp', label: 'WhatsApp direto' },
    { id: 'mapa', label: 'Mapa e horário' },
    { id: 'instagram', label: 'Integração Instagram' },
    { id: 'formulario', label: 'Formulário simples' },
    { id: 'analytics', label: 'Pixel/Analytics' }
  ];

  const urgencyOptions = [
    { id: 'hoje', label: 'Hoje', description: 'Máxima prioridade' },
    { id: '3dias', label: 'Em 3 dias', description: 'Bem urgente' },
    { id: '7dias', label: 'Em 7 dias', description: 'Prazo normal' },
    { id: 'sempressa', label: 'Sem pressa', description: 'Quando possível' }
  ];

  const extrasOptions = [
    { id: 'promocoes', label: 'Página de promoções' },
    { id: 'campanhas', label: 'Landing de campanha sazonal' },
    { id: 'manutencao', label: 'Manutenção mensal' }
  ];

  if (result) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Orçamento Estimado
        </h3>
        
        <div className="text-4xl font-bold text-primary mb-2">
          R$ {result.min.toLocaleString()} - R$ {result.max.toLocaleString()}
        </div>
        
        <p className="text-muted-foreground mb-6">
          Esta é uma estimativa baseada nas suas necessidades. O valor final pode variar após análise detalhada.
        </p>
        
        <Button 
          onClick={handleWhatsAppProposal}
          className="whatsapp-button focus-ring h-12 px-8 font-semibold"
          size="lg"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Receber proposta detalhada no WhatsApp
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">Calculadora de Orçamento</h3>
            <p className="text-sm text-muted-foreground">Passo {currentStep} de 4</p>
          </div>
        </div>
        
        <div className="flex gap-1">
          {[1,2,3,4].map(step => (
            <div 
              key={step}
              className={`w-2 h-2 rounded-full ${step <= currentStep ? 'bg-primary' : 'bg-muted'}`} 
            />
          ))}
        </div>
      </div>

      {currentStep === 1 && (
        <div>
          <h4 className="text-xl font-semibold mb-4">Qual é o seu segmento?</h4>
          <div className="grid grid-cols-2 gap-3">
            {segments.map(segment => (
              <button
                key={segment.id}
                onClick={() => setState({...state, segment: segment.id})}
                className={`p-4 rounded-xl border-2 transition-all ${
                  state.segment === segment.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-2xl mb-2">{segment.emoji}</div>
                <div className="font-semibold text-sm">{segment.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <h4 className="text-xl font-semibold mb-4">O que você precisa? (múltipla escolha)</h4>
          <div className="grid grid-cols-1 gap-3">
            {features.map(feature => (
              <button
                key={feature.id}
                onClick={() => {
                  const newFeatures = state.features.includes(feature.id)
                    ? state.features.filter(f => f !== feature.id)
                    : [...state.features, feature.id];
                  setState({...state, features: newFeatures});
                }}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  state.features.includes(feature.id)
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    state.features.includes(feature.id) ? 'border-primary bg-primary' : 'border-border'
                  }`}>
                    {state.features.includes(feature.id) && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="font-semibold">{feature.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <h4 className="text-xl font-semibold mb-4">Qual a urgência?</h4>
          <div className="grid grid-cols-1 gap-3">
            {urgencyOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setState({...state, urgency: option.id})}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  state.urgency === option.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="font-semibold">{option.label}</div>
                <div className="text-sm text-muted-foreground">{option.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div>
          <h4 className="text-xl font-semibold mb-4">Extras (opcional)</h4>
          <div className="grid grid-cols-1 gap-3">
            {extrasOptions.map(extra => (
              <button
                key={extra.id}
                onClick={() => {
                  const newExtras = state.extras.includes(extra.id)
                    ? state.extras.filter(e => e !== extra.id)
                    : [...state.extras, extra.id];
                  setState({...state, extras: newExtras});
                }}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  state.extras.includes(extra.id)
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    state.extras.includes(extra.id) ? 'border-primary bg-primary' : 'border-border'
                  }`}>
                    {state.extras.includes(extra.id) && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="font-semibold">{extra.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="focus-ring"
        >
          Voltar
        </Button>
        
        <Button 
          onClick={nextStep}
          disabled={
            (currentStep === 1 && !state.segment) ||
            (currentStep === 2 && state.features.length === 0) ||
            (currentStep === 3 && !state.urgency)
          }
          className="focus-ring"
        >
          {currentStep === 4 ? 'Calcular Orçamento' : 'Próximo'}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
};

export default BudgetCalculator;