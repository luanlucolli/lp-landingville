export function scrollToCalculator() {
  const calculatorElement = document.querySelector('#calculator');
  if (calculatorElement) {
    calculatorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function scrollToCalculatorWithObjective(objectiveType: 'landing' | 'site') {
  // First scroll to calculator
  scrollToCalculator();
  
  // Optionally pre-select objectives if calculator supports it
  // This could be enhanced to dispatch events or set URL params
  console.log(`Scrolling to calculator with objective: ${objectiveType}`);
}