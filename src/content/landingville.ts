export const copy = {
  brand: {
    name: "Landingville",
    city: "Joinville",
    primaryHex: "#2B6FA5",
    secondaryHex: "#85BA62"
  },
  hero: {
    // Escolha 1 das headlines; mantenha as outras como variações A/B internas
    h1: "Tenha um site bonito, rápido e que gera vendas.",
    h1_alt: [
      "Sua presença digital funcionando — do Google ao Instagram.",
      "Landing pages e sites que trazem cliente, sem complicar."
    ],
    sub: "Feitos para o celular, fáceis de achar e conectados aos seus canais.",
    ctas: {
      primary: "Calcular orçamento em 30s",
      secondary: "Ver exemplos"
    },
    micro: "Integramos seus canais preferidos: Instagram, Facebook, WhatsApp, Google Maps, Delivery."
  },

  // NOVO: seção de GANCHO (chips de intenção)
  intentHook: {
    title: "O que você quer hoje?",
    subtitle: "Toque em uma opção e montamos tudo para você.",
    chips: [
      { id: "promo", label: "Divulgar promoção e captar contatos", preset: { type: "Landing", opts: ["form", "catalog"] } },
      { id: "sitefull", label: "Ter um site completo do meu negócio", preset: { type: "Site", opts: ["sections", "map", "gallery"] } },
      { id: "google", label: "Aparecer no Google e ser encontrado", preset: { type: "Site", opts: ["sections", "map"] } },
      { id: "storevisit", label: "Levar pessoas até minha loja física", preset: { type: "Landing", opts: ["map", "contact"] } },
      { id: "channels", label: "Receber pedidos pelos meus canais", preset: { type: "Landing", opts: ["contact", "instagram"] } },
      { id: "dontknow", label: "Não sei, me recomende", preset: { type: null, opts: [] } }
    ],
    // Texto exibido enquanto a pessoa escolhe um chip
    helper: "Pode tocar e desfazer. A calculadora adapta e recomenda no final."
  },

  // Manter seção de dores para transição suave
  pains: {
    title: "O que trava as vendas hoje",
    bullets: [
      { title: "Sem presença digital", text: "Clientes não te encontram online. Criamos sua presença conectada." },
      { title: "Site que não converte", text: "Visitas que não viram vendas. Fazemos sites que guiam ao pedido." },
      { title: "Desconectado dos canais", text: "Redes sociais e site separados. Integramos tudo de forma natural." }
    ],
    foot: "Resolvemos tudo em uma solução integrada, feita para gerar resultados."
  },

  // Calculadora 30s (≤ R$ 500)
  calculator: {
    title: "Calculadora de Orçamento (30s)",
    steps: {
      // Passo A — Objetivo (com 'não sei')
      A: {
        title: "Seu objetivo",
        options: [
          "Promover uma oferta e captar pedidos/contatos",
          "Ter um site completo para apresentar meu negócio",
          "Não sei, me recomende"
        ]
      },
      // Passo B — Conteúdo
      B: {
        title: "Conteúdo que você precisa",
        options: [
          { id: "contact", label: "Contato e horário" },
          { id: "map", label: "Mapa/rotas" },
          { id: "gallery", label: "Galeria simples" },
          { id: "sections", label: "Seções essenciais (Home, Sobre, Serviços, Contato)" },
          { id: "catalog", label: "Catálogo/Cardápio simples" },
          { id: "form", label: "Formulário simples" },
          { id: "instagram", label: "Integração Instagram (embed/link)" }
        ]
      },
      // Passo C — Urgência (não altera preço)
      C: {
        title: "Urgência",
        options: ["Hoje", "Em 3 dias", "Em 7 dias", "Sem pressa"]
      },
      // Passo D — Extras leves
      D: {
        title: "Extras leves",
        options: ["Promo do dia simples", "Depoimentos simples"]
      }
    },
    // Mantém teto e recomendação automática
    result: {
      title: "Sua estimativa inicial",
      text: "Para o que você escolheu, a faixa estimada é **entre R$ [min] e R$ [max]**.",
      note: "Oferta de lançamento em Joinville: escopo enxuto, integrações por links/embeds e 1 rodada de ajustes leves em [Y] dias.",
      cta: "Receber proposta no meu canal preferido"
    }
  },

  // Demos por tipo recomendado
  demos: {
    title: "Veja como fica",
    segments: {
      Landing: "Exemplo de Landing Page (demonstração)",
      Site: "Exemplo de Site (demonstração)"
    }
  },

  // SERVIÇOS (2 cards com CTA + 1 card sem CTA)
  services: {
    title: "Nossos serviços",
    subtitle: "Prontos para seu momento atual.",
    items: [
      {
        id: "landing",
        name: "Desenvolvimento de Landing Pages",
        desc: "Páginas objetivas para captação: promoção, inauguração e campanhas. Leves, diretas e medíveis.",
        cta: "Quero uma Landing Page"
      },
      {
        id: "site",
        name: "Desenvolvimento de Sites",
        desc: "Presença completa para apresentar seu negócio (Home, Sobre, Serviços/Produtos, Contato/Mapa) com base para SEO local.",
        cta: "Quero um Site"
      },
      {
        id: "maintenance",
        name: "Manutenção essencial",
        desc: "Como parte do serviço: atualizações rápidas de texto/preço, monitoramento básico, correções críticas e backups periódicos.",
        cta: null // SEM botão
      }
    ]
  },

  // FAQ e CTA final
  faq: {
    title: "Perguntas rápidas",
    items: [
      { q: "Quem escreve os textos e envia as fotos?", a: "Você fornece o básico; ajudamos a ajustar e podemos usar provisórios para ir ao ar rápido." },
      { q: "Consigo atualizar sozinho?", a: "Sim. Conteúdos simples (preços/horários) ficam fáceis. Podemos orientar sua equipe." },
      { q: "Integra com Instagram, Facebook, Delivery?", a: "Sim, via links e embeds. Integrações avançadas sob orçamento." },
      { q: "Domínio e HTTPS?", a: "Publicamos com HTTPS e configuramos seu domínio." },
      { q: "Prazo típico?", a: "Dias, não semanas. Confirmamos após a calculadora." }
    ],
    finalCTA: {
      title: "Pronto para aparecer e vender?",
      primary: "Falar com a Landingville",
      secondary: "Ver exemplos"
    }
  }
};

export default copy;