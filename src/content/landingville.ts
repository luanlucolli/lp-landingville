export const copy = {
  brand: {
    name: "Landingville",
    city: "Joinville",
    primaryHex: "#2B6FA5",   // Steel Blue
    secondaryHex: "#85BA62"  // Verde Musgo Claro
  },

  hero: {
    h1: "Tenha um site bonito, rápido e que gera vendas.",
    sub: "Landing pages e sites feitos para o celular, fáceis de achar no Google e conectados aos seus canais.",
    bullets: ["Carrega rápido", "Encontra no Google", "Conecta a seus canais"],
    ctas: {
      primary: { label: "Calcular orçamento em 30s", to: "#calculator" },
      secondary:{ label: "Ver exemplos", to: "#demos" }
    },
    visualNote: "Gradiente animado leve (Steel→Moss) com blobs sutis; contraste AA/AAA."
  },

  calculator: {
    id: "calculator",
    title: "Calculadora de Orçamento (30s)",
    subtitle: "Responda rápido e receba uma estimativa com recomendação.",
    steps: {
      s1: {
        title: "Qual seu objetivo agora?",
        hint: "Pode escolher mais de um.",
        options: [
          "Receber mais pedidos/contatos",
          "Divulgar promoção/campanha",
          "Mostrar horário/endereço e rotas",
          "Ter um site oficial simples",
          "Exibir cardápio/catálogo",
          "Coletar orçamentos/agendamentos",
          "Direcionar para delivery (iFood/etc.)",
          "Reabertura/inauguração",
          "Não sei, me ajude"
        ],
        fallback: {
          q1: "Você quer algo pontual (campanha) ou presença contínua (site da loja)?",
          q2: "Qual canal seu cliente mais usa hoje?"
        }
      },
      s2: {
        title: "Quais canais você prefere?",
        hint: "Usaremos para posicionar seus botões.",
        options: ["WhatsApp", "Instagram", "Facebook", "Telefone", "E-mail", "Link de Delivery", "Google Maps"]
      },
      s3: {
        title: "Você tem logo e fotos?",
        options: ["Tenho logo", "Tenho fotos", "Tenho ambos", "Ainda não tenho"]
      },
      s4: {
        title: "Qual a urgência?",
        options: ["Hoje", "Em 3 dias", "Em 7 dias", "Sem pressa"]
      },
      s5: {
        title: "Quer adicionar algo leve?",
        options: ["Promo do dia", "Depoimentos simples", "Galeria simples", "Formulário simples"]
      }
    },
    result: {
      title: "Sua estimativa inicial",
      // "type" será calculado: "landing" ou "site"
      recommend: {
        landing: "Sugerimos: Landing de captação (página única focada em ação).",
        site:    "Sugerimos: Site simples (2–4 seções) para presença contínua."
      },
      priceNote: "Oferta de lançamento em Joinville: escopo enxuto, integrações leves (links/embeds) e ajustes leves em [Y] dias.",
      ctas: {
        primary: "Quero minha proposta no meu canal",   // abre folha de canais
        secondary: "Ver exemplos do meu caso"           // rola para #demos com a TAB correta
      }
    },
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
      rounding: 10,
      // mapeamento objetivo → recomendação
      rules: {
        siteObjectives: ["Ter um site oficial simples"],
        landingObjectives: ["Receber mais pedidos/contatos","Divulgar promoção/campanha","Reabertura/inauguração"]
      }
    }
  },

  services: {
    id: "services",
    title: "Nossos serviços",
    items: [
      {
        key: "landing",
        name: "Landing Page",
        desc: "Página única focada em conversão para promoções, reaberturas e campanhas.",
        bullets: ["Objetivo claro", "Seções essenciais", "CTA para seus canais"]
      },
      {
        key: "site",
        name: "Site",
        desc: "Presença contínua para apresentar o negócio com 2–4 seções e base para SEO local.",
        bullets: ["Home, Sobre, Serviços/Produtos, Contato", "Navegação simples", "Links para seus canais"]
      },
      {
        key: "care",
        name: "Manutenção",
        desc: "Atualizações leves e suporte contínuo. Mensal opcional, cobrado à parte.",
        bullets: ["Conteúdo e pequenos ajustes", "Monitoramento básico", "Sem dor de cabeça"]
      }
    ]
  },

  demos: {
    id: "demos",
    title: "Veja na prática",
    tabs: [
      {
        key: "landing",
        title: "Landing Page",
        image: {
          // RESERVAR espaço para IMAGEM ÚNICA por TAB (desktop + mobile juntos)
          src: "/demo-landing-combo.png",
          alt: "Exemplo de Landing Page — visual desktop e mobile lado a lado (demonstração).",
          ratioNote: "Sugestão: largura 1600px, altura 900px; otimizar em WebP/AVIF."
        },
        bullets: ["Campanhas e ações pontuais", "CTA claro", "Medição simples de resultado"]
      },
      {
        key: "site",
        title: "Site",
        image: {
          src: "/demo-site-combo.png",
          alt: "Exemplo de Site — visual desktop e mobile lado a lado (demonstração).",
          ratioNote: "Sugestão: largura 1600px, altura 900px; otimizar em WebP/AVIF."
        },
        bullets: ["Presença contínua", "Navegação fácil", "Base para SEO local"]
      }
    ],
    note: "Exemplos de demonstração."
  },

  faq: {
    id: "faq",
    title: "Perguntas rápidas",
    items: [
      { q: "Preciso decidir entre Landing ou Site agora?", a: "Não. A calculadora recomenda com base no seu objetivo, e você pode ver exemplos antes de decidir." },
      { q: "Quais canais posso usar?", a: "WhatsApp, Instagram, Facebook, telefone, e-mail, delivery e Google Maps — você escolhe." },
      { q: "O que está incluso nesse preço de entrada?", a: "Estrutura enxuta, publicação, SEO local básico e integrações leves (links/embeds). Ajustes leves em [Y] dias." },
      { q: "Quem fornece textos e fotos?", a: "Se tiver logo e fotos, melhor; se não, usamos provisórios e ajustamos depois." },
      { q: "Em quanto tempo vai ao ar?", a: "Dias, não semanas. Confirmamos após sua estimativa." }
    ],
    finalCTA: {
      title: "Vamos publicar algo bonito e que converte?",
      primary: { label: "Calcular orçamento", to: "#calculator" },
      secondary:{ label: "Falar com a Landingville", to: "#contact" }
    }
  }
};

export default copy;