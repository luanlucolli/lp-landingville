import Calculator30s from '@/components/Calculator30s';
import SchemaMarkup from '@/components/SchemaMarkup';

const Diagnostico = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Schema.org structured data */}
      <SchemaMarkup />
      
      {/* Simple centered layout for the calculator */}
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Calculator30s />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Diagnostico;