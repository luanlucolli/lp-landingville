export const siteContent = {
  brand: { 
    name: "Landingville", 
    city: "Joinville" 
  },
  
  palette: { 
    primary: "#2B6FA5", 
    secondary: "#85BA62" 
  },
  
  hero: {
    h1: "Landing pages que viram mensagens no WhatsApp",
    sub: "Seu cliente encontra, clica e fala. A gente cuida do resto.",
    ctaPrimary: "Falar no WhatsApp agora",
    ctaSecondary: "Ver planos",
    proofPoints: [
      "Clique e fale no WhatsApp",
      "Como chegar no Google Maps", 
      "Cardápio/Catálogos"
    ],
    whatsapp: { 
      phone: "5547999999999", // Placeholder - DDI+DDD+Número sem símbolos
      messageTemplate: "Oi, sou [Nome] da [Loja]. Vi a Landingville. Quero uma página para [Segmento] e publicar até [Data].",
      utm: { 
        source: "site", 
        medium: "cta", 
        campaign: "landingville" 
      }
    }
  },
  
  pains: [
    "Contato em 1 toque no WhatsApp",
    "Como chegar no Google em segundos", 
    "Cardápio e catálogos sem complicar"
  ],
  
  calculator: {
    title: "Calculadora de Orçamento",
    subtitle: "Descubra em 30 segundos quanto custa seu site",
    steps: [
      { 
        key: "segmento", 
        title: "Seu segmento", 
        type: "single", 
        options: ["Lanchonete", "Loja de Moda", "Serviços", "Outro"] 
      },
      { 
        key: "necessidades", 
        title: "O que precisa", 
        type: "multi", 
        options: ["Cardápio/Catálogos", "WhatsApp direto", "Mapa e horário", "Integração Instagram", "Formulário simples", "Pixel/Analytics"] 
      },
      { 
        key: "urgencia", 
        title: "Urgência", 
        type: "single", 
        options: ["Hoje", "Em 3 dias", "Em 7 dias", "Sem pressa"] 
      },
      { 
        key: "extras", 
        title: "Extras", 
        type: "multi", 
        options: ["Página de promoções", "Landing de campanha sazonal", "Manutenção mensal"] 
      }
    ],
    
    // Pontuação simples para faixa (ajustar facilmente)
    scoring: {
      base: 800, // valor base
      add: {
        segmento: { 
          "Lanchonete": 150, 
          "Loja de Moda": 150, 
          "Serviços": 120, 
          "Outro": 100 
        },
        necessidades: { 
          "Cardápio/Catálogos": 250, 
          "WhatsApp direto": 120, 
          "Mapa e horário": 100, 
          "Integração Instagram": 180, 
          "Formulário simples": 120, 
          "Pixel/Analytics": 180 
        },
        urgencia: { 
          "Hoje": 300, 
          "Em 3 dias": 220, 
          "Em 7 dias": 150, 
          "Sem pressa": 0 
        },
        extras: { 
          "Página de promoções": 180, 
          "Landing de campanha sazonal": 300, 
          "Manutenção mensal": 200 
        }
      },
      
      // Conversão pontuação → faixa estimada
      range: (score: number) => {
        const min = Math.round(score * 0.9);
        const max = Math.round(score * 1.3);
        return { min, max };
      }
    },
    
    output: {
      title: "Sua estimativa",
      note: "Valores estimados. Envie no WhatsApp para proposta detalhada.",
      cta: "Receber proposta no WhatsApp"
    }
  },
  
  demo: {
    title: "Veja como fica para o seu segmento",
    segments: [
      { name: "Lanchonete", disclaimer: "Exemplo de demonstração" },
      { name: "Loja de Moda", disclaimer: "Exemplo de demonstração" },
      { name: "Serviços", disclaimer: "Exemplo de demonstração" }
    ],
    cta: "Quero minha demo no WhatsApp"
  },
  
  plans: {
    title: "Planos",
    items: [
      { 
        name: "Essencial", 
        bullets: ["1 página", "WhatsApp", "Mapa", "Cardápio/Catálogos", "SEO local básico"],
        popular: false
      },
      { 
        name: "Pro", 
        bullets: ["Tudo do Essencial", "Seção de promoções", "Formulário", "Integração Instagram"],
        popular: true
      },
      { 
        name: "Turbo", 
        bullets: ["Tudo do Pro", "Campanhas sazonais", "Pixel/GA", "Testes A/B simples"],
        popular: false
      }
    ],
    guarantee: {
      title: "Garantias",
      statements: [
        "Primeira versão em até [X] dias úteis",
        "[Y] dias de ajustes após publicação, inclusos",
        "Se não publicar, você não paga"
      ]
    }
  },
  
  faq: [
    { 
      q: "Não tenho fotos boas, e agora?", 
      a: "Ajudamos com seleção/edição e placeholders de qualidade até você atualizar." 
    },
    { 
      q: "Posso atualizar sozinho?", 
      a: "Sim. Estrutura simples, com instruções e suporte para pequenas mudanças." 
    },
    { 
      q: "Funciona com Instagram/iFood?", 
      a: "Sim, linkamos e integramos o que for necessário para seu fluxo." 
    },
    { 
      q: "E o domínio/hospedagem?", 
      a: "Já temos domínio garantido e hospedagem incluída no setup." 
    },
    { 
      q: "Qual o prazo?", 
      a: "Estimativa no final da calculadora; prazos variam conforme escopo e urgência." 
    }
  ],
  
  finalCta: { 
    title: "Pronto para começar?", 
    ctaPrimary: "Falar no WhatsApp", 
    ctaSecondary: "Ver planos" 
  },
  
  footer: { 
    legal: "© Landingville — Joinville", 
    contacts: { 
      email: "", 
      phone: "" 
    }, 
    hours: "Atendimento comercial" 
  }
};

export type SiteContent = typeof siteContent;