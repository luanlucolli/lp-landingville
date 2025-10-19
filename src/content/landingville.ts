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
    { icon: 'Zap', text: 'Seu cliente não espera' },
    { icon: 'MonitorSmartphone', text: 'Perfeito no celular e computador' },
    { icon: 'Search', text: 'Seja encontrado no Google' },
    { icon: 'MessageCircle', text: 'Receba contatos por onde preferir' },
    { icon: 'Phone', text: 'Contato por telefone em 1 toque' },
    { icon: 'Mail', text: 'Receba e-mails com facilidade' },
    { icon: 'MapPin', text: 'Como chegar integrado ao mapa' },
    { icon: 'Clock', text: 'Seus horários sempre visíveis' },
    { icon: 'FileText', text: 'Formulário para orçamentos' },
    { icon: 'ImageIcon', text: 'Galeria para seus produtos' },
    { icon: 'Star', text: 'Prove com depoimentos reais' },
    { icon: 'Pencil', text: 'Autonomia para editar conteúdo' },
    { icon: 'Wrench', text: 'Suporte contínuo opcional' },
    { icon: 'ShieldCheck', text: 'Seguro com certificado HTTPS' },
    { icon: 'Lock', text: 'Privacidade e respeito à LGPD' },
    { icon: 'BarChart2', text: 'Mede as oportunidades geradas' },
    { icon: 'Rocket', text: 'Solução no ar, gerando resultado' },
    { icon: 'Layers', text: 'Evolui junto com seu negócio' },
    { icon: 'Globe', text: 'Use seu domínio próprio ou novo' },
    { icon: 'UserCheck', text: 'Suporte direto com pessoas' },
  ],

  hero: {
    h1: "Receba mais contatos de clientes na sua região.",
    sub: "Criamos a solução digital ideal para seu negócio em Joinville ser encontrado, receber pedidos e agendamentos pelos canais que você já usa.",
    bullets: ["Clientes encontram você no Google", "Facilita o contato em um toque", "Mede o que importa: oportunidades"],
    badge: "Prazo de publicação confirmado após diagnóstico",
    ctas: {
      primary: "Iniciar diagnóstico gratuito",
      secondary: "Ver exemplos",
    },
    visual: {
      gradientNote:
        "Hero com gradiente animado (Steel→Moss) e blobs flutuantes; prefers-reduced-motion desativa; contraste AA/AAA.",
    },
  },

  // DIAGNOSIS HOOK
  diagnosis: {
    id: 'diagnosis',
    title: 'Qual a melhor forma de atrair clientes para o seu negócio?',
    benefits: [
      {
        icon: 'Zap',
        title: 'Rápido e sem cadastro',
        description: 'Em menos de 1 minuto, sem pedir seus dados, você tem um caminho claro.',
      },
      {
        icon: 'Lightbulb',
        title: 'Recomendação Sob Medida',
        description: 'Descubra a solução ideal para seu objetivo atual: gerar mais contatos ou fortalecer sua marca.',
      },
      {
        icon: 'Receipt',
        title: 'Estimativa de Valor Transparente',
        description: 'Receba uma faixa de investimento clara para poder se planejar sem surpresas.',
      },
    ],
    cta: 'Iniciar Diagnóstico Gratuito',
    ctaBadge: 'Ganhe 15% OFF',
    testimonial: '"O diagnóstico me mostrou o que eu realmente precisava para começar a ter resultado. Foi direto ao ponto." - Diana Anacleto, Contadora',
    visualAlt: 'Ilustração do processo de diagnóstico digital',
  },

  // SUPERSEÇÃO: CALCULADORA (objetivo-first, ≤ R$ 500)
  calculator: {
    id: "calculator",
    title: "Descubra a solução e o investimento ideal",
    subtitle: "Com algumas perguntas, mostramos o melhor caminho para o seu negócio gerar mais oportunidades.",

    // TELA 0 (INTRO) — NÃO começar no Passo 1
    intro: {
      title: "Qual o caminho certo para o seu negócio?",
      subtitle: "Este diagnóstico aponta a solução digital ideal para seus objetivos.",
      bullets: ["Sem pedir seus dados", "Recomendação automática", "Você pode ajustar depois"],
      cta: "Descobrir agora",
      links: {
        seeExamples: "Ver exemplos primeiro",
      },
    },

    steps: {
      // Passo 1 — Objetivo (multi). NÃO exigir saber 'landing' vs 'site'.
      s1: {
        title: "Qual seu principal objetivo agora?",
        options: [
          "Receber mais pedidos e contatos",
          "Divulgar uma promoção ou evento",
          "Ter uma presença online profissional",
          "Facilitar que achem meu endereço e horário",
          "Mostrar meu cardápio ou catálogo de serviços",
          "Receber pedidos de orçamento ou agendamento",
          "Direcionar clientes para meu delivery",
          "Estou apenas começando e preciso de um norte",
        ],
        fallback: {
          q1: "Sua necessidade é para uma ação pontual (campanha) ou para ter uma presença contínua (referência da marca)?",
          q1Options: ["Ação pontual (campanha)", "Presença contínua (referência)"],
          q2: "Qual canal seu cliente mais usa para te encontrar?",
          q2Options: ["Instagram", "WhatsApp", "Busca no Google", "Mapas", "Telefone", "Outro"],
        },
      },

      // Passo 2 — Canais preferidos (multi). Não impacta preço; organiza CTAs.
      s2: {
        title: "Por onde prefere receber o contato dos clientes?",
        hint: "Vamos destacar os botões para os canais que você mais usa.",
        options: [
          "WhatsApp",
          "Telefone",
          "Instagram",
          "E-mail",
          "Formulário no site",
          "Mapa (como chegar)",
          "App de Delivery",
          "Outro",
        ],
      },

      // Passo 3 — Itens que você já tem — incluir opção "Logo e Fotos"
      s3: {
        title: "Você já tem algum destes itens prontos?",
        options: ["Logo", "Fotos dos produtos/serviços", "Logo e Fotos", "Ainda não tenho"],
      },

      // Passo 4 — Urgência (não altera preço; vira etiqueta no resumo)
      s4: {
        title: "Qual o seu momento?",
        options: ["Preciso para uma campanha com data marcada", "O mais breve possível, estou perdendo clientes", "Estou planejando para os próximos meses", "Sem pressa, apenas pesquisando"],
      },

      // Passo 5 — Extras simples (multi) com impacto pequeno
      s5: {
        title: "Quer incluir algum destes recursos?",
        options: ["Galeria de fotos", "Depoimentos de clientes", "Formulário de contato", "Seção de promoção", "Nenhum extra por enquanto"],
      },
    },

    // UI do Calculador
    ui: {
      intro: 'Introdução',
      stepOf: (current: number, total: number) => `Passo ${current} de ${total}`,
      result: 'Resultado · Sua recomendação',
      back: 'Voltar',
      advance: 'Avançar',
      seeEstimate: 'Ver Recomendação',
      resetCalculator: 'Refazer diagnóstico',
      helpTitle: 'Nossa sugestão para você:',
      whyRecommend: (type: string) => `Por que recomendamos ${type}`,
      weSuggest: 'Sugerimos:',
      urgencyLabel: 'Seu momento:',
      promoApplied: 'Desconto de 15% aplicado',
    },

    // Resultado com recomendação automática e DEEP-LINK para Demos
    result: {
      title: "Sua recomendação está pronta",
      recommendation: {
        landingLabel: "Página de Aquisição Rápida",
        siteLabel: "Central de Presença Digital",
        hint: "Esta é a nossa sugestão com base nos seus objetivos.",
      },
      price: {
        note: "Estimativa de investimento único. O escopo e o prazo de publicação são confirmados após o diagnóstico, garantindo que a solução atenda exatamente ao seu objetivo.",
      },
      ctas: {
        primary: "Falar com a Landingville",
        secondary: "Ver um exemplo similar",
      },
      reasons: {
        landing: {
          immediateAction: { title: 'Foco em Ação Imediata', text: 'Uma página direta para o cliente entrar em contato, sem distrações.' },
          goLiveFast: { title: 'Publicação Ágil', text: 'Ideal para campanhas e ofertas com tempo limitado, para começar a gerar resultados.' },
          channelFocus: { title: 'Conversão Direta', text: 'Leva o cliente direto para o seu WhatsApp, telefone ou formulário.' },
          promoOfTheDay: { title: 'Ofertas em Destaque', text: 'Perfeita para divulgar uma promoção específica e medir o interesse.' },
          leanContent: { title: 'Simples e Direto', text: 'Comunicação clara e objetiva para quem já sabe o que quer.' },
        },
        site: {
          ongoingPresence: { title: 'Constrói Confiança', text: 'Apresenta seu negócio de forma completa, com sua história e serviços.' },
          moreContent: { title: 'Melhor para o Google', text: 'Mais conteúdo relevante ajuda clientes a encontrarem você ao pesquisar.' },
          easyToFind: { title: 'Informação Organizada', text: 'Endereço, horários e contatos sempre fáceis de achar, construindo autoridade.' },
          youHaveMaterial: { title: 'Valoriza seu Material', text: 'Aproveita suas fotos e informações para criar uma vitrine digital completa.' },
          multipleChannels: { title: 'Centraliza a Comunicação', text: 'Organiza todos os seus canais de contato e serviços em um único lugar.' },
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
    title: "Soluções que geram resultado",
    subtitle: "Entregamos o que seu negócio precisa para crescer agora.",
    items: [
      {
        key: "landing",
        name: "Página de Ação Rápida",
        desc: "Ideal para campanhas, promoções ou quando você precisa que o cliente tome uma única ação: ligar, enviar mensagem ou agendar.",
        cta: "Ver exemplos de Ação Rápida",
        img: "/lovable-uploads/landing5.svg",
        alt: "Ícone representando uma página focada em um objetivo",
      },
      {
        key: "site",
        name: "Central de Presença Digital",
        desc: "Organiza tudo sobre seu negócio: quem você é, o que faz e como te encontrar. Perfeito para construir confiança e ser achado no Google.",
        cta: "Ver exemplos de Presença Digital",
        img: "/lovable-uploads/tabs.svg",
        alt: "Ícone representando um site com várias seções",
      },
      {
        key: "care",
        name: "Suporte e Evolução",
        desc: "Para você focar no seu negócio. Cuidamos das atualizações de conteúdo, fotos, preços e garantimos que tudo funcione perfeitamente.",
        cta: null,
        img: "/lovable-uploads/maintenance2.svg",
        alt: "Ícone de ferramentas para manutenção e suporte",
      },
    ],
  },

  // DEMOS em tabs (Landing/Site).
  demos: {
    id: "demos",
    title: "Ação Rápida ou Presença Digital: o que seu negócio precisa?",
    note: "Compare os dois modelos e veja qual se encaixa melhor no seu objetivo atual.",
    intro: "Gostou do que viu? Podemos criar uma solução assim para você.",
    tabs: [
      {
        key: "landing",
        title: "Página de Ação Rápida",
        oneLiner: "Uma página, um objetivo, um resultado.",
        images: ["/lovable-uploads/landingcabelo.webp", "/lovable-uploads/landinglanche.webp"],
        highlightIcon: "megaphone",
        highlightTitle: "Feita para gerar oportunidades",
        highlightDescription: "Perfeita para campanhas e ofertas. Leva a pessoa direto ao ponto: o contato.",
        benefits: [
          "Botão de contato sempre visível",
          "Mede quantos cliques e mensagens você recebe",
          "Publicação ágil para validar ofertas rapidamente",
        ],
      },
      {
        key: "site",
        title: "Central de Presença Digital",
        oneLiner: "A referência do seu negócio na internet.",
        images: ["/lovable-uploads/sitecarbo.webp", "/lovable-uploads/sitecafe.webp"],
        highlightIcon: "network",
        highlightTitle: "Feita para construir autoridade",
        highlightDescription: "Mostra quem você é, o que faz e porque seu negócio é a melhor escolha.",
        benefits: [
          "Estrutura organizada (Início, Sobre, Contato)",
          "Otimizada para ser encontrada no Google",
          "Pode crescer com novas seções no futuro",
        ],
      },
    ],
    // Botão abre o modal de contato
    cta: "Falar com a Landingville",
    badgeDemo: "Exemplo de Demonstração",
    imageAlt: (type: string) => `Exemplo de ${type} em versão desktop e mobile`,
    ariaLabels: {
      prevSlide: 'Slide anterior',
      nextSlide: 'Próximo slide',
      goToSlide: (n: number) => `Ir para slide ${n}`,
    },
  },

  faq: {
    id: "faq",
    title: "Dúvidas comuns, respostas diretas",
    items: [
      {
        q: "Só o Instagram não é suficiente?",
        a: "O Instagram é ótimo para relacionamento. Uma página própria centraliza seus contatos, aparece no Google para quem ainda não te segue e transmite mais profissionalismo. Eles se complementam.",
      },
      {
        q: "Não tenho tempo para gerenciar isso.",
        a: "Nós entendemos. Por isso, cuidamos de todo o processo técnico. Você só precisa nos dizer seu objetivo. E com o plano de suporte, nem com as atualizações você se preocupa.",
      },
      {
        q: "Quanto vou investir? É muito caro?",
        a: "É um investimento único, sem mensalidade obrigatória, com valor teto de R$ 500 para o plano inicial. O diagnóstico gratuito te dá uma estimativa transparente e sem compromisso.",
      },
      {
        q: "Em quanto tempo fica pronto?",
        a: "O prazo exato é confirmado após o diagnóstico, dependendo do que você precisa. Nosso processo é ágil para que você comece a ter retorno o mais breve possível.",
      },
      {
        q: "Um site/página realmente traz retorno para o meu nicho?",
        a: "Sim. Se as pessoas buscam pelo seu tipo de serviço em Joinville, uma presença digital bem-feita te coloca na frente delas. Ela funciona como um vendedor que apresenta seu negócio 24h por dia.",
      },
      {
        q: "O que eu preciso enviar para começar?",
        a: "O básico: nome do negócio, canais de contato, endereço e horários. Se tiver logo e fotos, ótimo. Se não, podemos começar com material provisório e ajustar depois.",
      },
      {
        q: "Já tenho um domínio. Posso usar?",
        a: "Com certeza. Conectamos seu domínio atual. Se não tiver, ajudamos você a registrar um novo.",
      },
      {
        q: "Vou aparecer na primeira página do Google?",
        a: "Aplicamos as melhores práticas de SEO local para que clientes em Joinville encontrem você. Resultados dependem da concorrência, mas a estrutura já nasce pronta para isso.",
      },
      {
        q: "Posso editar o conteúdo depois?",
        a: "Sim. Pequenos ajustes estão inclusos nos primeiros 30 dias. Para mudanças frequentes, como promoções ou fotos, o plano de suporte é a melhor opção.",
      },
      {
        q: "Como sei se está funcionando?",
        a: "Configuramos uma medição simples e focada no que importa: quantos contatos (cliques no WhatsApp, ligações, e-mails) a página gerou para você.",
      },
      {
        q: "E a segurança e a LGPD?",
        a: "Levamos isso a sério. Usamos certificado de segurança (HTTPS) e seguimos as boas práticas de privacidade, com aviso de cookies e consentimento nos formulários.",
      },
      {
        q: "Como falo com a Landingville?",
        a: "Clique em qualquer botão de contato desta página. Respondemos rápido para entender seu desafio.",
      },
    ],
    finalCTA: {
      title: "Vamos transformar seus cliques em clientes?",
      primary: "Falar com a Landingville",
      secondary: "Iniciar diagnóstico gratuito",
    },
  },

  // Configuração do Modal de Contato (usar em todos os botões de contato)
  contact: {
    title: "Fale com a Landingville",
    channels: [
      {
        key: "instagram",
        label: "Instagram",
        href: "https://ig.me/m/landing.ville",
      },
      {
        key: "whatsapp",
        label: "WhatsApp",
        href: "https://wa.me/5547984802779",
      },
    ],
    note: "Vamos abrir seu aplicativo de mensagens. Se preferir, copie o número ou busque por @landing.ville.",
    estimate: {
      title: 'Sua estimativa:',
      note: 'Escopo focado • Integrações leves • Ajustes inclusos',
    },
    channelPrefix: 'Conversar pelo ',
  },

  // PROMO MODAL
  promo: {
    title: 'Ganhe 15% de desconto em sua solução digital',
    description: 'Comece o diagnóstico gratuito e sua estimativa de investimento já virá com o desconto aplicado.',
    benefits: [
      'Diagnóstico rápido e sem compromisso (menos de 1 minuto)',
      'Recomendação clara para o seu objetivo',
      'Desconto de 15% aplicado automaticamente no resultado',
    ],
    cta: 'Ativar desconto e iniciar diagnóstico',
    dismissCta: 'Agora não, obrigado',
  },

  // DIAGNOSTICO PAGE
  diagnosticoPage: {
    backButton: 'Voltar',
    backButtonAriaLabel: 'Voltar para a página inicial',
    logoLinkAriaLabel: 'Ir para a página inicial da Landingville',
  },

  // 404 PAGE
  notFound: {
    title: '404',
    message: 'Página não encontrada',
    cta: 'Voltar para o início',
  },

  // STICKY BOTTOM BAR
  stickyBar: {
    ariaLabel: 'Ações rápidas de contato',
  },

  // SCHEMA MARKUP
  schema: {
    name: "Landingville",
    description: "Ajudamos pequenos negócios de Joinville a gerar mais oportunidades (pedidos, orçamentos, agendamentos) com soluções digitais focadas em resultado.",
    url: "https://landingville.com.br",
    telephone: "+5547984802779",
    city: "Joinville",
    region: "SC",
    country: "BR",
    serviceTypes: [
      "Páginas de Aquisição Rápida (Landing Pages)",
      "Sites Institucionais",
      "Otimização para Google Local",
      "Integração de Canais de Atendimento"
    ],
    priceRange: "$$",
    socialLinks: [
      "https://instagram.com/landing.ville",
      "https://wa.me/5547984802779"
    ]
  },
};
export default copy;