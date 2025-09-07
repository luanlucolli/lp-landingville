import { Calculator, Smartphone } from 'lucide-react';
import BudgetCalculator from './BudgetCalculator';
import DemoSection from './DemoSection';

const CalculatorDemoSection = () => {
  return (
    <section className="py-20" style={{ background: 'hsl(var(--neutral-200))' }} id="calculadora">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Calculadora de Orçamento
              </h2>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
              Descubra em 30 segundos quanto custa seu site
            </p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-semibold text-sm">
              <Smartphone className="w-4 h-4" />
              100% Mobile-First
            </div>
          </div>

          {/* Calculator */}
          <div className="mb-20">
            <BudgetCalculator />
          </div>

          {/* Demo Section */}
          <div>
            <DemoSection />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorDemoSection;