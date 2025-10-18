import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import copy from '@/content/landingville';

const SchemaMarkup = () => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": copy.schema.name,
      "description": copy.schema.description,
      "url": copy.schema.url,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": copy.schema.city,
        "addressRegion": copy.schema.region,
        "addressCountry": copy.schema.country
      },
      "telephone": copy.schema.telephone,
      "areaServed": {
        "@type": "City",
        "name": copy.schema.city
      },
      "serviceType": copy.schema.serviceTypes,
      "priceRange": copy.schema.priceRange,
      "sameAs": copy.schema.socialLinks
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