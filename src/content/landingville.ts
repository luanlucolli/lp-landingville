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
      primary: "Calcular orçamento em 30s",   // rola para #calculator
      secondary: "Ver exemplos"               // rola para #demos (tab dinâmica)
    },
    visual: {
      // Permissão p/ ajustar contraste das cores e botões na hero
      gradientNote: "Hero com gradiente animado leve (Steel→Moss) e blobs flutuantes; respeitar prefers-reduced-motion; contraste AA/AAA."
    }
  },

  // SUPERSEÇÃO: CALCULADORA (objetivo-first, ≤ R$ 500)
  calculator: {
    id: "calculator",
    title: "Calculadora de Orçamento (30s)",
    subtitle: "Responda rápido e receba uma estimativa com recomendação do que é melhor hoje.",
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
          "Não sei, me ajude"
        ],
        fallback: {
          // Se marcar "Não sei, me ajude", pergunte APENAS estas 2 (chips):
          q1: "Você quer algo pontual (campanha) ou presença contínua (site da loja)?",
          q1Options: ["Pontual (campanha)", "Presença contínua (site)"],
          q2: "Qual canal seu cliente mais usa?",
          q2Options: ["Instagram", "WhatsApp", "Google Maps", "Delivery", "Telefone", "E-mail"]
        }
      },

      // Passo 2 — Canais preferidos (multi). Não impacta preço; organiza CTAs.
      s2: {
        title: "Por onde prefere atender?",
        hint: "Usaremos isso para posicionar seus botões.",
        options: ["WhatsApp", "Instagram", "Facebook", "Telefone", "E-mail", "Link de Delivery", "Google Maps"]
      },

      // Passo 3 — Itens que você já tem (simplificado). Tirar texto genérico; manter só logo/fotos.
      s3: {
        title: "Você já tem algum destes itens?",
        options: ["Logo", "Fotos", "Nenhum dos dois"]
      },

      // Passo 4 — Urgência (não altera preço; vira etiqueta no resumo)
      s4: {
        title: "Qual a urgência?",
        options: ["Hoje", "Em 3 dias", "Em 7 dias", "Sem pressa"]
      },

      // Passo 5 — Extras leves (multi) com impacto pequeno
      s5: {
        title: "Quer adicionar algo leve?",
        options: ["Promo do dia", "Depoimentos simples", "Galeria simples", "Formulário simples"]
      }
    },

    // Resultado com recomendação automática e DEEP-LINK para Demos
    result: {
      title: "Sua estimativa inicial",
      recommendation: {
        // Renderizar: "Sugerimos: Landing de captação" OU "Sugerimos: Site simples (2–4 seções)"
        landingLabel: "Landing de captação",
        siteLabel: "Site simples (2–4 seções)",
        hint: "Recomendamos com base no seu objetivo."
      },
      price: {
        // Sempre ≤ R$ 500; mostrar uma FAIXA arredondada para dezenas
        note: "Oferta de lançamento em Joinville: escopo enxuto e integrações leves (links/embeds). Ajustes leves em [Y] dias."
      },
      ctas: {
        primary: "Quero minha proposta no meu canal",   // abre folha de canais
        secondary: "Ver exemplo do meu caso"            // rola p/ #demos com tab correta
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

  // "Serviços" já está perfeito. Garanta apenas que os textos venham desta copy, se aplicável.
  services: {
    id: "services",
    title: "Nossos serviços",
    subtitle: "Prontos para seu momento atual.",
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

  // DEMOS em tabs (Landing/Site). Reservar espaço para 1 imagem por tab (desktop+mobile combinados).
  demos: {
    id: "demos",
    title: "Veja na prática",
    tabs: [
      {
        key: "landing",
        title: "Landing Page",
        image: "/demo-landing-combo.png",   // placeholder — manter container para uma imagem
        bullets: ["Campanhas e ações pontuais", "CTA claro", "Medir resultado é simples"]
      },
      {
        key: "site",
        title: "Site",
        image: "/demo-site-combo.png",       // placeholder — manter container para uma imagem
        bullets: ["Presença contínua", "Navegação fácil", "Base para SEO local"]
      }
    ],
    note: "Exemplos de demonstração."
  },

  faq: {
    id: "faq",
    title: "Perguntas rápidas",
    items: [
      { q: "Preciso decidir entre Landing ou Site agora?", a: "Não. A calculadora recomenda com base no seu objetivo e você pode ver exemplos antes de decidir." },
      { q: "Quais canais posso usar?", a: "WhatsApp, Instagram, Facebook, telefone, e-mail, delivery e Google Maps — você escolhe." },
      { q: "O que está incluso nesse preço de entrada?", a: "Estrutura enxuta, publicação, SEO local básico e integrações leves (links/embeds). Ajustes leves em [Y] dias." },
      { q: "Quem fornece textos e fotos?", a: "Se tiver logo/fotos, melhor. Se não, usamos provisórios e ajustamos depois." },
      { q: "Em quanto tempo vai ao ar?", a: "Dias, não semanas. Confirmamos após sua estimativa." }
    ],
    finalCTA: {
      title: "Vamos publicar algo bonito e que converte?",
      primary: "Calcular orçamento",
      secondary: "Falar com a Landingville"
    }
  }
};
export default copy;