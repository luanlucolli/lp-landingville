export function navigateToDemosTab(key: 'landing' | 'site') {
  // Update hash for deep linking
  window.location.hash = `#demos?tab=${key}`;
  
  // Scroll to demos section
  const demosSection = document.querySelector('#demos');
  if (demosSection) {
    demosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  // Dispatch event to select the tab
  window.dispatchEvent(new CustomEvent('selectDemoTab', { detail: key }));
}