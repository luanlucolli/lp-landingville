import copy from '@/content/landingville';

export interface CalculatorAnswers {
  objectives: string[];
  channels: string[];
  assets: string[];
  urgency: string;
  extras: string[];
}

export interface PricingResult {
  type: 'landing' | 'site';
  recommendation: string;
  minPrice: number;
  maxPrice: number;
  scope: string[];
}

export function calculatePricing(answers: CalculatorAnswers): PricingResult {
  const { pricing } = copy.calculator;
  let landingScore = 1;
  let siteScore = 1;
  
  // Score based on objectives
  answers.objectives.forEach(objective => {
    if (pricing.rules.landingObjectives.includes(objective)) {
      landingScore += 3;
    }
    if (pricing.rules.siteObjectives.includes(objective)) {
      siteScore += 3;
    }
  });
  
  // Determine type recommendation
  const type = siteScore > landingScore ? 'site' : 'landing';
  
  // Calculate base price
  let [minPrice, maxPrice] = type === 'landing' 
    ? pricing.landingBase 
    : pricing.siteBase;
  
  // Add increments based on selections
  const scope: string[] = [];
  
  if (answers.objectives.includes("Mostrar horário/endereço e rotas")) {
    const [minInc, maxInc] = pricing.increments["Mapa/rotas"];
    minPrice += minInc;
    maxPrice += maxInc;
    scope.push("Mapa e rotas");
  }
  
  if (answers.objectives.includes("Exibir cardápio/catálogo")) {
    const [minInc, maxInc] = pricing.increments["Cardápio/Catálogo"];
    minPrice += minInc;
    maxPrice += maxInc;
    scope.push("Cardápio/Catálogo simples");
  }
  
  if (answers.objectives.includes("Coletar orçamentos/agendamentos")) {
    const [minInc, maxInc] = pricing.increments["Formulário simples"];
    minPrice += minInc;
    maxPrice += maxInc;
    scope.push("Formulário de contato");
  }
  
  // Add extras
  answers.extras.forEach(extra => {
    if (pricing.increments[extra]) {
      const [minInc, maxInc] = pricing.increments[extra];
      minPrice += minInc;
      maxPrice += maxInc;
      scope.push(extra);
    }
  });
  
  // Apply cap and rounding
  if (maxPrice > pricing.cap) {
    maxPrice = pricing.cap;
    minPrice = Math.max(pricing.cap - 100, minPrice);
  }
  
  minPrice = Math.round(minPrice / pricing.rounding) * pricing.rounding;
  maxPrice = Math.round(maxPrice / pricing.rounding) * pricing.rounding;
  
  return {
    type,
    recommendation: copy.calculator.result.recommend[type],
    minPrice,
    maxPrice,
    scope
  };
}