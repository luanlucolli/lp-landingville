export function viewExample(serviceKey: 'landing' | 'site') {
  const demos = document.querySelector('#demos');
  if (!demos) return;
  
  // Dispatch event to select the correct demo tab
  window.dispatchEvent(new CustomEvent('selectDemoTab', { 
    detail: { key: serviceKey } 
  }));
  
  // Scroll to demos section
  demos.scrollIntoView({ behavior: 'smooth', block: 'start' });
}