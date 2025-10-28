export const copy = {
  brand: {
    name: "Landingville",
    city: "Joinville", // Mantido para dados estruturais/internos
    primaryHex: "#2B6FA5", // Steel Blue
    secondaryHex: "#85BA62", // Verde Musgo Claro
    logoAlt: "Landingville - Sites para Negócios Locais",
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
    { icon: 'Zap', text: 'Seu cliente não desiste de esperar' },
    { icon: 'MonitorSmartphone', text: 'Funciona perfeito no celular do cliente' },
    { icon: 'Search', text: 'Seu negócio encontrado por quem procura' },
    { icon: 'MessageCircle', text: 'Converte visitante em contato direto' },
    { icon: 'Phone', text: 'Receba ligações com um toque' },
    { icon: 'Mail', text: 'Facilita o pedido de orçamento' },
    { icon: 'MapPin', text: 'Mostra como chegar na sua loja' },
    { icon: 'Clock', text: 'Cliente sabe quando você atende' },
    { icon: 'FileText', text: 'Capture contatos 24h por dia' },
    { icon: 'ImageIcon', text: 'Mostre seu produto ou serviço' },
    { icon: 'Star', text: 'Clientes falando bem de você' },
    { icon: 'Pencil', text: 'Atualizações fáceis de solicitar' },
    { icon: 'Wrench', text: 'Tranquilidade para manter tudo funcionando' },
    { icon: 'ShieldCheck', text: 'Mostra profissionalismo e confiança' },
    { icon: 'Lock', text: 'Respeito total pelo seu cliente' },
    { icon: 'BarChart2', text: 'Saiba de onde vêm seus contatos' },
    { icon: 'Rocket', text: 'Comece a receber clientes mais cedo' },
    { icon: 'Layers', text: 'Comece simples e cresça depois' },
    { icon: 'Globe', text: 'Seu endereço .com.br profissional' },
    { icon: 'UserCheck', text: 'Fale com gente, não com robô' },
  ],

  // HERO (Generalizado)
  hero: {
    h1: "Tenha um site que paga o próprio investimento.",
    // ATUALIZADO: Remove menção direta a Joinville
    sub: "Para seu negócio local, só o Instagram não basta. Criamos sites e landing pages que transformam seus visitantes em orçamentos e pedidos reais, 24 horas por dia.",
    bullets: [
      "Converte mais que um 'link na bio'",
      "Mostra seu profissionalismo e confiança",
      "Centraliza seus contatos (Zap, Insta e Mapa)",
    ],
    badge: "Prazo de publicação confirmado no diagnóstico",
    ctas: {
      primary: "Iniciar Diagnóstico Gratuito",
      secondary: "Entenda a diferença",
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
    visualAlt: 'Ilustração do processo de diagnóstico da Landingville',
  },

  // CALCULADORA
  calculator: {
    id: "calculator",
    title: "Descubra seu investimento",
    subtitle: "5 perguntas simples e mostramos o melhor caminho para o seu negócio.",

    intro: {
      title: "Quanto investir para crescer?",
      subtitle: "Em 1 minuto, receba um plano claro e sob medida.",
      bullets: [
        "Sem cadastro nem compromisso",
        "Recomendação imediata",
        "Ajuste de acordo com seu orçamento"
      ],
      cta: "Iniciar diagnóstico",
      links: {
        seeExamples: "Ver planos reais"
      }
    },

    steps: {
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
      s3: {
        title: "Você já tem algum destes itens?",
        options: ["Logo", "Fotos", "Logo e Fotos", "Nenhum dos dois"],
      },
      s4: {
        title: "Qual a urgência?",
        options: ["Em 3 dias", "Em 5 dias úteis", "Em 7 dias", "Sem pressa"],
      },
      s5: {
        title: "Quer incluir algo simples?",
        options: ["Promo do dia", "Depoimentos simples", "Galeria simples", "Formulário simples", "Não"],
      },
    },

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

    result: {
      title: "Sua estimativa inicial",
      recommendation: {
        landingLabel: "Landing Page (Ação Rápida)",
        siteLabel: "Site Simples (Presença Oficial)",
        hint: "Sugerimos com base no seu objetivo.",
      },
      price: {
        note: "Valor para um projeto focado no essencial. O prazo final é confirmado após entendermos o que você já tem (fotos, logo, etc.).",
      },
      ctas: {
        primary: "Falar com um especialista",
        secondary: "Ver exemplo do meu caso",
      },
      reasons: {
        landing: {
          immediateAction: { title: 'Foco no Contato', text: 'Uma página direta para fazer o cliente clicar no botão (WhatsApp, ligar, etc.).' },
          goLiveFast: { title: 'Rápido para divulgar', text: 'Perfeito para campanhas e promoções. Comece a receber contatos em poucos dias.' },
          channelFocus: { title: 'Direto ao Ponto', text: 'Destaque total para seu canal de atendimento preferido.' },
          promoOfTheDay: { title: 'Fácil de atualizar', text: 'Ideal para divulgar ofertas e novidades sem complicação.' },
          leanContent: { title: 'Comece com o que tem', text: 'Não precisa de muito material. Comece simples e ajuste depois.' },
        },
        site: {
          ongoingPresence: { title: 'Presença Oficial', text: 'O "endereço" do seu negócio. Gera confiança e informa 24h por dia.' },
          moreContent: { title: 'Mostra tudo que você faz', text: 'Apresenta sua empresa, seus serviços e produtos de forma organizada.' },
          // ATUALIZADO: Exemplo generalizado
          easyToFind: { title: 'Ajuda a ser encontrado', text: 'Facilita para clientes que procuram seu serviço na sua região (ex: "oficina no seu bairro").' },
          youHaveMaterial: { title: 'Profissionalismo', text: 'Aproveita seus materiais para um site completo que passa autoridade.' },
          multipleChannels: { title: 'Tudo em um lugar', text: 'Organiza todos os seus contatos, endereço e horários de forma clara.' },
        },
      },
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
        "Depoimentos simples": [5, 10],
      },
      cap: 500,
      rounding: 10,
    },
  },

  // SERVICES
  services: {
    id: "services",
    title: "O que vai trazer mais resultado para você?",
    subtitle: "Não vendemos sites. Vendemos a ferramenta certa para o seu objetivo.",
    items: [
      {
        key: "landing",
        name: "Landing Page (Ação Rápida)",
        desc: "Uma única página, 100% focada em fazer o visitante tomar uma ação: pedir orçamento, agendar ou comprar. É um 'vendedor' digital focado.",
        cta: "Quero uma Landing Page",
        img: "/lovable-uploads/landing5.svg",
        alt: "Ícone representando Landing Page",
      },
      {
        key: "site",
        name: "Site (Confiança e Autoridade)",
        desc: "A 'casa' do seu negócio na internet. Apresenta quem você é e o que faz. Ideal para quem quer ser encontrado e transmitir profissionalismo.",
        cta: "Quero um Site",
        img: "/lovable-uploads/tabs.svg",
        alt: "Ícone representando Site com abas",
      },
      {
        key: "care",
        name: "Manutenção (Tranquilidade)",
        desc: "Não tem tempo de atualizar fotos, preços ou horários? Nós cuidamos disso para você, para seu site estar sempre 100% correto.",
        cta: null,
        img: "/lovable-uploads/maintenance2.svg",
        alt: "Ícone de ferramentas para Manutenção",
      },
    ],
  },

  // DEMOS
  demos: {
    id: "demos",
    title: "Veja na prática: Ação Rápida vs Confiança",
    note: "Compare rápido e escolha o que combina com seu momento.",
    intro: "Gostou do que viu? Vamos criar algo assim para você.",
    tabs: [
      {
        key: "landing",
        title: "Landing Page",
        oneLiner: "Uma página, um objetivo.",
        images: ["/lovable-uploads/landingcabelo.webp", "/lovable-uploads/landinglanche.webp"],
        highlightIcon: "megaphone",
        highlightTitle: "Ideal para campanhas e promoções",
        highlightDescription: "O objetivo é um só: fazer o cliente clicar no botão de contato. Rápido e direto.",
        benefits: [
          "Botão principal sempre visível",
          "Foco total em gerar o contato",
          "Ótimo para divulgar uma oferta específica",
        ],
      },
      {
        key: "site",
        title: "Site",
        oneLiner: "Tudo sobre seu negócio na web.",
        images: ["/lovable-uploads/sitecarbo.webp", "/lovable-uploads/sitecafe.webp"],
        highlightIcon: "network",
        highlightTitle: "Ideal para construir sua marca",
        highlightDescription: "Mostra tudo sobre seu negócio. Perfeito para o cliente que está pesquisando antes de decidir.",
        benefits: [
          "Organizado em seções (Início, Sobre, etc.)",
          "Melhor para ser encontrado por quem pesquisa",
          "Passa mais autoridade e confiança",
        ],
      },
    ],
    cta: "Falar com um especialista",
    badgeDemo: "Exemplo de Demonstração",
    imageAlt: (type: string) => `Exemplo de ${type} — visual desktop e mobile`,
    ariaLabels: {
      prevSlide: 'Slide anterior',
      nextSlide: 'Próximo slide',
      goToSlide: (n: number) => `Ir para slide ${n}`,
    },
  },

  // FAQ (Generalizado e sem asteriscos)
  faq: {
    id: "faq",
    title: "Dúvidas comuns de quem empreende",
    items: [
      {
        q: "Já tenho Instagram, por que preciso de um site?",
        // ATUALIZADO: Remove asteriscos
        a: "O Instagram é ótimo para atrair (descobrir). O site é para converter (fechar negócio). No site, você controla tudo: não há distrações (outros posts, reels) e o cliente foca 100% na sua oferta e no seu botão de contato.",
      },
      {
        q: "É muito caro? Não tenho como investir alto.",
        a: "Nosso foco é em negócios locais como o seu. O investimento é acessível, com teto de R$ 500 no plano inicial. O Diagnóstico Gratuito mostra a faixa de valor exata, sem surpresas.",
      },
      {
        q: "Não entendo de tecnologia e não tenho tempo.",
        a: "Você não precisa. Nosso processo é feito para quem não é da área. Cuidamos de tudo, desde o registro até a publicação. Você só precisa aprovar e começar a receber os contatos.",
      },
      {
        q: "Landing Page ou Site: qual a diferença na prática?",
        a: "Landing é uma página única para ação imediata (ex: uma promoção). Site tem várias seções (Início, Sobre, Contato) e serve como a 'casa' oficial do seu negócio. O diagnóstico sugere o ideal.",
      },
      {
        q: "Em quanto tempo fica pronto?",
        a: "É rápido. O prazo exato depende do que você precisa e dos materiais que já tem (fotos, textos). Após o diagnóstico, já te damos uma estimativa real.",
      },
      {
        q: "O que eu preciso enviar para começar?",
        a: "O básico: nome do negócio, o que faz, endereço/horários e seus canais de contato. Se tiver logo e fotos, ótimo. Se não, usamos provisórios e ajustamos depois.",
      },
      {
        q: "Vou aparecer no Google?",
        // ATUALIZADO: Remove asteriscos e menção a Joinville
        a: "Sim. Construímos o site de forma que o Google entenda onde você está e o que você faz. Isso ajuda muito quem procura pelo seu serviço na região.",
      },
      {
        q: "Preciso me preocupar com segurança ou LGPD?",
        a: "Não. Seu site será seguro e passará profissionalismo. Cuidamos de toda a parte técnica para que você e seu cliente fiquem tranquilos, seguindo as boas práticas.",
      },
      {
        q: "Já tenho um domínio (ex: meunegocio.com.br). Posso usar?",
        a: "Com certeza. Conectamos seu domínio atual ou ajudamos você a registrar um novo, se preferir.",
      },
      {
        q: "Posso editar o conteúdo depois?",
        a: "Sim. Pequenos ajustes (como mudar um preço ou foto) estão incluídos por 30 dias. Para mudanças frequentes, temos um plano de manutenção bem acessível.",
      },
    ],
    finalCTA: {
      title: "Vamos transformar seus visitantes em clientes?",
      primary: "Falar com um especialista",
      secondary: "Iniciar Diagnóstico Gratuito",
    },
  },

  // MODAL DE CONTATO
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
    note: "Abriremos seu app de mensagens. Se preferir, procure por @landing.ville no Instagram ou adicione nosso WhatsApp.",
    estimate: {
      title: 'Sua estimativa:',
      note: 'Projeto focado no essencial • Ajustes inclusos',
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
    backButtonAriaLabel: 'Voltar para a página inicial',
    logoLinkAriaLabel: 'Ir para a página inicial da Landingville',
  },

  // 404 PAGE
  notFound: {
    title: '404',
    message: 'Ops! Página não encontrada.',
    cta: 'Voltar para o início',
  },

  // STICKY BOTTOM BAR
  stickyBar: {
    ariaLabel: 'Entrar em contato ou iniciar diagnóstico',
  },

  // SCHEMA MARKUP (Generalizado)
  schema: {
    name: "Landingville",
    // ATUALIZADO: Remove menção a Joinville
    description: "Criação de sites e landing pages focados em transformar visitantes em clientes para negócios locais.",
    url: "https://landingville.com.br",
    telephone: "+55 47 98480-2779",
    city: "Joinville", // Mantido para LocalBusiness Schema
    region: "SC",
    country: "BR",
    serviceTypes: [
      "Criação de Landing Pages",
      "Desenvolvimento de Sites Institucionais",
      "Otimização para Negócios Locais",
      "Integração com WhatsApp e Mapas",
    ],
    priceRange: "$",
    socialLinks: [
      "https://instagram.com/landing.ville",
      "https://wa.me/5547984802779"
    ]
  },
};
export default copy;