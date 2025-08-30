export const copy = {
  brand: {
    name: "Landingville",
    city: "Joinville",
    primaryHex: "#2B6FA5", // Steel Blue
    secondaryHex: "#85BA62" // Verde Musgo Claro
  },

  hero: {
    h1: "Tenha um site bonito, rápido e que gera vendas.",
    sub: "Landing pages e sites feitos para o celular, fáceis de achar no Google e conectados aos seus canais.",
    bullets: ["Carrega rápido", "Encontra no Google", "Conecta a seus canais"],
    ctas: {
      primary: "Calcular orçamento",   // scroll suave para #calculator
      secondary: "Ver exemplos"               // scroll suave para #demos (tab dinâmica)
    },
    visual: {
      gradientNote: "Hero com gradiente animado top (Steel→Moss) e blobs flutuantes; prefers-reduced-motion desativa; contraste AA/AAA."
    }
  },

  // SUPERSEÇÃO: CALCULADORA (objetivo-first, ≤ R$ 500)
  calculator: {
    id: "calculator",
    title: "Descubra seu investimento",
    subtitle: "5 perguntas simples e mostramos o melhor caminho para o seu negócio.",

    // TELA 0 (INTRO) — NÃO começar no Passo 1
    intro: {
      title: "Descubra seu investimento",
      bullets: ["Sem cadastro", "Recomendação automática", "Pode ajustar depois"],
      cta: "Descobrir agora",
      links: {
        seeExamples: "Ver exemplos primeiro" // rola para #demos
      }
    },

    steps: {
      // Passo 1 — Objetivo (multi). NÃO exigir saber 'landing' vs 'site'.
      s1: {
        title: "Qual seu objetivo agora?",
        options: [
          "Receber mais pedidos/contatos",
          "Divulgar promoção/campanha",
          "Mostrar horário/endereço e rotas",
          "Ter um site oficial simples",
          "Exibir cardápio/catálogo",
          "Coletar orçamentos/agendamentos",
          "Direcionar para delivery (iFood/etc.)",
          "Reabertura/inauguração",
          "Estou em dúvida"
        ],
        fallback: {
          q1: "Você quer algo pontual (campanha) ou presença contínua (site da loja)?",
          q1Options: ["Pontual (campanha)", "Presença contínua (site)"],
          q2: "Qual canal seu cliente mais usa?",
          q2Options: ["Instagram", "WhatsApp", "Google Maps", "Delivery", "Telefone", "E-mail"]
        }
      },

      // Passo 2 — Canais preferidos (multi). Não impacta preço; organiza CTAs.
      s2: {
        title: "Por onde prefere atender?",
        hint: "Posicionaremos seus botões principais nesses canais.",
        options: [
          "Instagram",
          "WhatsApp", 
          "Facebook",
          "Telefone",
          "E-mail",
          "Google Maps",
          "Plataformas de Delivery (iFood/Rappi/99Food/Aiqfome…)",
          "Outro"
        ]
      },

      // Passo 3 — Itens que você já tem (ENXUTO) — incluir opção "Logo e Fotos"
      s3: {
        title: "Você já tem algum destes itens?",
        options: ["Logo", "Fotos", "Logo e Fotos", "Nenhum dos dois"]
      },

      // Passo 4 — Urgência (não altera preço; vira etiqueta no resumo)
      s4: {
        title: "Qual a urgência?",
        options: ["Em 3 dias (noites)", "Em 5 dias (úteis, à noite)", "Em 7 dias", "Sem pressa"]
      },

      // Passo 5 — Extras leves (multi) com impacto pequeno
      s5: {
        title: "Quer adicionar algo leve?",
        options: ["Promo do dia", "Depoimentos simples", "Galeria simples", "Formulário simples", "Não"]
      }
    },

    // Resultado com recomendação automática e DEEP-LINK para Demos
    result: {
      title: "Sua estimativa inicial",
      recommendation: {
        landingLabel: "Landing de captação",
        siteLabel: "Site simples (2–4 seções)",
        hint: "Sugerimos com base no seu objetivo."
      },
      price: {
        note: "Oferta de lançamento em Joinville: escopo enxuto e integrações leves (links/embeds). Ajustes leves em [Y] dias."
      },
      ctas: {
        primary: "Falar com a Landingville",      // abre Contact Modal
        secondary: "Ver exemplo do meu caso"      // rola p/ #demos com tab correta (landing/site)
      }
    },

    // Regras de preço (aplicadas no código)
    pricing: {
      landingBase: [250, 350],
      siteBase: [350, 480],
      increments: {
        "Mapa/rotas": [20, 30],
        "Galeria simples": [20, 30],
        "Cardápio/Catálogo": [30, 40],
        "Formulário simples": [20, 30],
        "Promo do dia": [10, 15],
        "Depoimentos simples": [5, 10]
      },
      cap: 500,
      rounding: 10
    }
  },

  // "Serviços" permanece como está no layout (3 cards). Caso necessário, consuma estes textos.
services: {
  id: "services",
  title: "Nossos serviços",
  subtitle: "Escolha o que combina com a sua necessidade agora.",
  items: [
    {
      key: "landing",
      name: "Landing Page",
      desc: "Uma página única para um objetivo específico: divulgar promoção, reabertura ou captar pedidos. Ideal para ações rápidas.",
      cta: "Quero uma Landing Page",
      img: "/lovable-uploads/servicolanding.png",
      alt: "Ícone de Landing Page"
    },
    {
      key: "site",
      name: "Site",
      desc: "Presença completa e estável com seções principais (Início, Sobre, Serviços/Produtos e Contato). Bom para aparecer no Google e orientar quem pesquisa.",
      cta: "Quero um Site",
      img: "/lovable-uploads/servicosite.png",
      alt: "Ícone de Site"
    },
    {
      key: "care",
      name: "Manutenção",
      desc: "Atualizações de textos, preços e fotos, pequenos ajustes visuais e suporte contínuo. Podemos combinar um plano mensal.",
      cta: null,
      img: "/lovable-uploads/servicomanutencao.png",
      alt: "Ícone de Manutenção"
    }
  ]
},


  // DEMOS em tabs (Landing/Site). Reservar espaço para 1 imagem por tab (desktop+mobile combinados).
  demos: {
    id: "demos",
    title: "Veja na prática",
    tabs: [
      {
        key: "landing",
        title: "Landing Page",
        image: "/demo-landing-combo.png",
        images: ["/demo-landing-1.webp", "/demo-landing-2.webp"],
        bullets: ["Campanhas e ações pontuais", "CTA claro", "Medir resultado é simples"]
      },
      {
        key: "site",
        title: "Site",
        image: "/demo-site-combo.png",
        images: ["/demo-site-1.webp", "/demo-site-2.webp"],
        bullets: ["Presença contínua", "Navegação fácil", "Base para SEO local"]
      }
    ],
    note: "Exemplos de demonstração.",
    // CTA da seção DEMOS deve ABRIR o modal de contato (NÃO voltar para calculadora)
    cta: "Falar com a Landingville"
  },

  faq: {
    id: "faq",
    title: "Perguntas rápidas",
    items: [
      { q: "Preciso decidir entre Landing ou Site agora?", a: "Não. A calculadora recomenda com base no seu objetivo e você pode ver exemplos antes de decidir." },
      { q: "Quais canais posso usar para falar com vocês?", a: "Instagram ou WhatsApp. No seu projeto, podemos incluir links para outros canais conforme necessidade." },
      { q: "O que está incluso nesse preço de entrada?", a: "Estrutura enxuta, publicação, SEO local básico e integrações leves (links/embeds). Ajustes leves em [Y] dias." },
      { q: "Quem fornece textos e fotos?", a: "Se tiver logo/fotos, melhor. Se não, usamos provisórios e ajustamos depois." },
      { q: "Em quanto tempo vai ao ar?", a: "Dias, não semanas. Confirmamos após sua estimativa." }
    ],
    finalCTA: {
      title: "Vamos publicar algo bonito e que converte?",
      primary: "Falar com a Landingville", // abre modal
      secondary: "Calcular orçamento"      // rola p/ #calculator
    }
  },

  // Configuração do Modal de Contato (usar em todos os botões de contato)
  contact: {
    title: "Fale com a Landingville",
    channels: [
      {
        key: "instagram",
        label: "Instagram",
        // Abrir DM direto de landing.ville
        href: "https://ig.me/m/landing.ville"
      },
      {
        key: "whatsapp",
        label: "WhatsApp",
        // Número: +55 47 98480-2779
        href: "https://wa.me/5547984802779"
      }
    ],
    note: "Abriremos seu app de mensagens padrão. Se preferir, copie o número ou procure por @landing.ville no Instagram."
  }
};
export default copy;