export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

export function openDemosTab(tabKey: 'landing' | 'site') {
  // First scroll to demos section
  scrollToSection('demos');
  
  // Then trigger tab change with a small delay
  setTimeout(() => {
    const event = new CustomEvent('changeDemoTab', { detail: { tab: tabKey } });
    window.dispatchEvent(event);
  }, 300);
}

export function openChannelSheet() {
  const event = new CustomEvent('openChannelSheet');
  window.dispatchEvent(event);
}