export const copy = {
  brand: {
    name: "Landingville",
    city: "Joinville",
    primaryHex: "#2B6FA5", // Steel Blue
    secondaryHex: "#85BA62", // Verde Musgo Claro
    logoAlt: "Landingville",
  },

  // HEADER
  header: {
    nav: [
      { label: 'Início', path: '/' },
      { label: 'Diagnóstico', path: '/diagnostico', badge: '15% OFF' },
    ],
    ariaLabels: {
      menu: 'Menu',
      closeMenu: 'Fechar menu',
    },
  },

  // BENEFITS STRIP
  benefits: [
    { icon: 'Zap', text: 'Carrega rápido' },
    { icon: 'MonitorSmartphone', text: 'Pronto para celular e computador' },
    { icon: 'Search', text: 'Ajuda a aparecer no Google' },
    { icon: 'MessageCircle', text: 'Botões para WhatsApp e Instagram' },
    { icon: 'Phone', text: 'Clique para ligar' },
    { icon: 'Mail', text: 'E-mail em 1 toque' },
    { icon: 'MapPin', text: 'Endereço e rotas fáceis' },
    { icon: 'Clock', text: 'Horários sempre atualizados' },
    { icon: 'FileText', text: 'Formulário simples de contato' },
    { icon: 'ImageIcon', text: 'Galeria de fotos' },
    { icon: 'Star', text: 'Depoimentos do seu cliente' },
    { icon: 'Pencil', text: 'Conteúdo que você edita' },
    { icon: 'Wrench', text: 'Manutenção opcional' },
    { icon: 'ShieldCheck', text: 'Seguro e com HTTPS' },
    { icon: 'Lock', text: 'Privacidade e LGPD' },
    { icon: 'BarChart2', text: 'Métricas básicas' },
    { icon: 'Rocket', text: 'Publicação rápida' },
    { icon: 'Layers', text: 'Cresce por seções' },
    { icon: 'Globe', text: 'Domínio próprio ou atual' },
    { icon: 'UserCheck', text: 'Suporte humano' },
  ],

  hero: {
    h1: "Site claro, rápido e que gera contatos.",
    sub: "Landing pages e sites pensados para o celular, fáceis de achar no Google e conectados aos seus canais.",
    bullets: ["Carrega rápido", "Aparece no Google local", "Conecta aos seus canais"],
    badge: "Publicação ágil, prazo confirmado no diagnóstico",
    ctas: {
      primary: "Calcular orçamento", // scroll suave para #calculator
      secondary: "Ver exemplos", // scroll suave para #demos (tab dinâmica)
    },
    visual: {
      gradientNote:
        "Hero com gradiente animado (Steel→Moss) e blobs flutuantes; prefers-reduced-motion desativa; contraste AA/AAA.",
    },
  },

  // DIAGNOSIS HOOK
  diagnosis: {
    id: 'diagnosis',
    title: 'Qual a solução ideal para o seu negócio?',
    benefits: [
      {
        icon: 'Zap',
        title: 'Rápido e sem cadastro',
        description: 'Leve menos de 1 minuto para ter sua resposta, sem pedir seus dados.',
      },
      {
        icon: 'Lightbulb',
        title: 'Recomendação Instantânea',
        description: 'Descubra na hora se uma Landing Page ou um Site é o ideal para seu objetivo.',
      },
      {
        icon: 'Receipt',
        title: 'Estimativa de Valor Clara',
        description: 'Tenha uma faixa de preço transparente para planejar seu investimento.',
      },
    ],
    cta: 'Iniciar Diagnóstico Gratuito',
    ctaBadge: '15% OFF',
    testimonial: '"O diagnóstico foi muito decisivo para mim. Me deu a clareza que eu precisava." - Diana Anacleto, Contadora',
    visualAlt: 'Diagnóstico — visual ilustrativo (SVG)',
  },

  // SUPERSEÇÃO: CALCULADORA (objetivo-first, ≤ R$ 500)
  calculator: {
    id: "calculator",
    title: "Descubra seu investimento",
    subtitle: "5 perguntas simples e mostramos o melhor caminho para o seu negócio.",

    // TELA 0 (INTRO) — NÃO começar no Passo 1
    intro: {
      title: "Qual o caminho certo para o seu negócio?",
      subtitle: "Este diagnóstico aponta a solução digital ideal para seus objetivos.",
      bullets: ["Sem cadastro", "Recomendação automática", "Pode ajustar depois"],
      cta: "Descobrir agora",
      links: {
        seeExamples: "Ver exemplos primeiro", // rola para #demos
      },
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
          "Estou em dúvida",
        ],
        fallback: {
          q1: "Você quer algo pontual (campanha) ou presença contínua (site da loja)?",
          q1Options: ["Pontual (campanha)", "Presença contínua (site)"],
          q2: "Qual canal seu cliente mais usa?",
          q2Options: ["Instagram", "WhatsApp", "Google Maps", "Delivery", "Telefone", "E-mail"],
        },
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
          "Outro",
        ],
      },

      // Passo 3 — Itens que você já tem — incluir opção "Logo e Fotos"
      s3: {
        title: "Você já tem algum destes itens?",
        options: ["Logo", "Fotos", "Logo e Fotos", "Nenhum dos dois"],
      },

      // Passo 4 — Urgência (não altera preço; vira etiqueta no resumo)
      s4: {
        title: "Qual a urgência?",
        options: ["Em 3 dias", "Em 5 dias úteis", "Em 7 dias", "Sem pressa"],
      },

      // Passo 5 — Extras simples (multi) com impacto pequeno
      s5: {
        title: "Quer incluir algo simples?",
        options: ["Promo do dia", "Depoimentos simples", "Galeria simples", "Formulário simples", "Não"],
      },
    },

    // UI do Calculador
    ui: {
      intro: 'Introdução',
      stepOf: (current: number, total: number) => `Passo ${current} de ${total}`,
      result: 'Resultado · Estimativa inicial',
      back: 'Voltar',
      advance: 'Avançar',
      seeEstimate: 'Ver Estimativa',
      resetCalculator: 'Calcular novamente',
      helpTitle: 'Vamos te ajudar:',
      whyRecommend: (type: string) => `Por que recomendamos ${type}`,
      weSuggest: 'Sugerimos:',
      urgencyLabel: 'Urgência:',
      promoApplied: '15% OFF aplicado',
    },

    // Resultado com recomendação automática e DEEP-LINK para Demos
    result: {
      title: "Sua estimativa inicial",
      recommendation: {
        landingLabel: "Landing de captação",
        siteLabel: "Site simples (2–4 seções)",
        hint: "Sugerimos com base no seu objetivo.",
      },
      price: {
        note: "Oferta de lançamento em Joinville: escopo definido e integrações simples (links/embeds). Ajustes leves previstos para [Y] dias úteis, confirmados após o diagnóstico.",
      },
      ctas: {
        primary: "Falar com a Landingville", // abre Contact Modal
        secondary: "Ver exemplo do meu caso", // rola p/ #demos com tab correta (landing/site)
      },
      reasons: {
        landing: {
          immediateAction: { title: 'Ação imediata', text: 'Uma página direta com botão de contato facilita receber pedidos.' },
          goLiveFast: { title: 'Vai ao ar rápido', text: 'Publicamos rapidinho para você começar a receber mensagens.' },
          channelFocus: { title: 'Foco nos canais', text: 'Destaque para falar com você em 1 toque.' },
          promoOfTheDay: { title: 'Promo do dia', text: 'Dá para divulgar ofertas sem complicação.' },
          leanContent: { title: 'Conteúdo enxuto', text: 'Comece simples agora e troque as fotos depois.' },
        },
        site: {
          ongoingPresence: { title: 'Presença contínua', text: 'Seu negócio com páginas Home, Sobre e Contato bem organizadas.' },
          moreContent: { title: 'Mais conteúdo', text: 'Mostra melhor seus produtos e ajuda quem pesquisa.' },
          easyToFind: { title: 'Fácil de achar', text: 'Informações fixas que ajudam a aparecer no Google.' },
          youHaveMaterial: { title: 'Você já tem material', text: 'Aproveitamos seus materiais para um site completo.' },
          multipleChannels: { title: 'Vários canais', text: 'Tudo num lugar só, com navegação simples.' },
        },
      },
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
        "Depoimentos simples": [5, 10],
      },
      cap: 500,
      rounding: 10,
    },
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
        desc: "Uma página para um objetivo específico: promover, lançar ou captar pedidos. Ideal para ações rápidas com foco em contato.",
        cta: "Quero uma Landing Page",
        img: "/lovable-uploads/landing5.svg",
        alt: "Ícone representando Landing Page",
      },
      {
        key: "site",
        name: "Site",
        desc: "Presença contínua com seções principais (Início, Sobre, Serviços/Produtos e Contato). Ajuda quem busca no Google e orienta a decisão.",
        cta: "Quero um Site",
        img: "/lovable-uploads/tabs.svg",
        alt: "Ícone representando Site com abas",
      },
      {
        key: "care",
        name: "Manutenção",
        desc: "Atualizações de textos, preços e fotos, pequenos ajustes visuais e suporte contínuo. Podemos combinar um plano mensal.",
        cta: null,
        img: "/lovable-uploads/maintenance2.svg",
        alt: "Ícone de ferramentas para Manutenção",
      },
    ],
  },

  // DEMOS em tabs (Landing/Site).
  demos: {
    id: "demos",
    title: "Landing Page ou Site: qual é melhor para você?",
    note: "Compare rápido e escolha o que combina com seu momento.",
    intro: "Gostou do que viu? Vamos criar algo assim para você.",
    tabs: [
      {
        key: "landing",
        title: "Landing Page",
        oneLiner: "Uma página, um objetivo.",
        images: ["/lovable-uploads/landingcabelo.webp", "/lovable-uploads/landinglanche.webp"],
        // Ícone Lucide no lugar do SVG
        highlightIcon: "megaphone",
        highlightTitle: "Feita para gerar pedidos",
        highlightDescription: "Boa para campanhas e lançamentos. Leva a pessoa direto ao contato.",
        benefits: [
          "Um botão principal sempre visível",
          "Mede cliques e mensagens",
          "Publicação rápida para testar ofertas",
        ],
      },
      {
        key: "site",
        title: "Site",
        oneLiner: "Tudo sobre seu negócio na web.",
        images: ["/lovable-uploads/sitecarbo.webp", "/lovable-uploads/sitecafe.webp"],
        // Ícone Lucide no lugar do SVG
        highlightIcon: "network",
        highlightTitle: "Tudo do seu negócio num só lugar",
        highlightDescription: "Mostra quem você é, o que faz e como falar com você.",
        benefits: [
          "Estrutura com 2–4 seções",
          "Melhor para busca no Google local",
          "Cresce com novas páginas quando precisar",
        ],
      },
    ],
    // Botão abre o modal de contato
    cta: "Falar com a Landingville",
    badgeDemo: "Exemplo de Demonstração",
    imageAlt: (type: string) => `Exemplo de ${type} — visual desktop e mobile`,
    ariaLabels: {
      prevSlide: 'Slide anterior',
      nextSlide: 'Próximo slide',
      goToSlide: (n: number) => `Ir para slide ${n}`,
    },
  },

  faq: {
    id: "faq",
    title: "Perguntas rápidas",
    items: [
      {
        q: "Landing Page ou Site: qual a diferença prática?",
        a: "Landing é uma página única para ação imediata. Site reúne as informações principais em 2–4 seções. Se tiver dúvida, o diagnóstico sugere.",
      },
      {
        q: "Quanto vou investir?",
        a: "Depende do objetivo e dos extras. O plano inicial tem teto de R$ 500. Use o diagnóstico para ver sua faixa agora.",
      },
      {
        q: "Em quanto tempo fica pronto?",
        a: "Prazo curto. Confirmamos após o diagnóstico conforme escopo e materiais disponíveis.",
      },
      {
        q: "O que eu preciso enviar para começar?",
        a: "Nome do negócio, endereço/horários, canais de contato e, se tiver, logo e fotos. Sem esses itens, usamos provisórios e ajustamos depois.",
      },
      {
        q: "Já tenho domínio. Posso usar?",
        a: "Sim. Conectamos seu domínio atual ou ajudamos a registrar um novo.",
      },
      {
        q: "Quem hospeda e mantém?",
        a: "Publicamos e hospedamos no plano inicial. Manutenção contínua é opcional (plano Care) para atualizações recorrentes.",
      },
      {
        q: "Posso editar o conteúdo depois?",
        a: "Sim. Incluímos ajustes leves por 30 dias. Para mudanças frequentes, indicamos o plano de manutenção.",
      },
      {
        q: "Vou aparecer no Google?",
        a: "Aplicamos SEO local básico, performance e acessibilidade. Conteúdo atualizado e Perfil da Empresa no Google ajudam a melhorar o resultado.",
      },
      {
        q: "Integra com meus canais de atendimento?",
        a: "Sim. Botões e links para seus canais preferidos, como telefone, WhatsApp, Instagram, e-mail, mapas e delivery.",
      },
      {
        q: "E se eu não curtir o primeiro rascunho?",
        a: "Publicamos a versão inicial e ajustamos no período incluído até chegar no que você precisa, dentro do escopo contratado.",
      },
      {
        q: "Segurança e privacidade (LGPD)?",
        a: "Seguimos boas práticas de performance, acessibilidade e privacidade. Formulários com consentimento e política de privacidade. Remoção de dados a pedido.",
      },
      {
        q: "Como falo com a Landingville?",
        a: "Use os botões desta página. Respondemos rápido.",
      },
    ],
    finalCTA: {
      title: "Vamos publicar algo bonito e que converte?",
      primary: "Falar com a Landingville", // abre modal
      secondary: "Calcular orçamento", // rola p/ #calculator
    },
  },

  // Configuração do Modal de Contato (usar em todos os botões de contato)
  contact: {
    title: "Fale com a Landingville",
    channels: [
      {
        key: "instagram",
        label: "Instagram",
        // Abrir DM direto de landing.ville
        href: "https://ig.me/m/landing.ville",
      },
      {
        key: "whatsapp",
        label: "WhatsApp",
        // Número: +55 47 98480-2779
        href: "https://wa.me/5547984802779",
      },
    ],
    note: "Abriremos seu app de mensagens padrão. Se preferir, copie o número ou procure por @landing.ville no Instagram.",
    estimate: {
      title: 'Sua estimativa:',
      note: 'Escopo enxuto • Integrações leves • Ajustes inclusos',
    },
    channelPrefix: 'Conversar pelo ',
  },

  // PROMO MODAL
  promo: {
    title: '15% de desconto no valor do orçamento',
    description: 'Ative agora e veja sua estimativa já com o desconto aplicado no resultado do diagnóstico.',
    benefits: [
      'Diagnóstico gratuito e rápido (menos de 1 minuto)',
      'Recomendação clara: Landing Page ou Site',
      '15% de desconto no valor do orçamento, aplicado automaticamente no resultado',
    ],
    cta: 'Abrir diagnóstico com 15% de desconto',
    dismissCta: 'Agora não',
  },

  // DIAGNOSTICO PAGE
  diagnosticoPage: {
    backButton: 'Voltar',
    backButtonAriaLabel: 'Voltar',
    logoLinkAriaLabel: 'Ir para a página inicial',
  },

  // 404 PAGE
  notFound: {
    title: '404',
    message: 'Oops! Page not found',
    cta: 'Return to Home',
  },

  // STICKY BOTTOM BAR
  stickyBar: {
    ariaLabel: 'Entrar em contato',
  },

  // SCHEMA MARKUP
  schema: {
    name: "Landingville",
    description: "Estúdio de Joinville focado em landing pages, sites e micro-sistemas para comércios locais",
    url: "https://landingville.com.br",
    telephone: "+55 47 99999-9999",
    city: "Joinville",
    region: "SC",
    country: "BR",
    serviceTypes: [
      "Landing Pages",
      "Sites Mobile-First",
      "Integração WhatsApp",
      "SEO Local"
    ],
    priceRange: "$$",
    socialLinks: [
      "https://instagram.com/landingville",
      "https://wa.me/5547999999999"
    ]
  },
};
export default copy;
