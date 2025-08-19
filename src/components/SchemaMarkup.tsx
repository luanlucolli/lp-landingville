import { useEffect } from 'react';

const SchemaMarkup = () => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Landingville",
      "description": "Estúdio de Joinville focado em landing pages, sites e micro-sistemas para comércios locais",
      "url": "https://landingville.com.br",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Joinville",
        "addressRegion": "SC",
        "addressCountry": "BR"
      },
      "telephone": "+55 47 99999-9999",
      "areaServed": {
        "@type": "City",
        "name": "Joinville"
      },
      "serviceType": [
        "Landing Pages",
        "Sites Mobile-First",
        "Integração WhatsApp",
        "SEO Local"
      ],
      "priceRange": "$$",
      "sameAs": [
        "https://instagram.com/landingville",
        "https://wa.me/5547999999999"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default SchemaMarkup;