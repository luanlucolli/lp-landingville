export const copy = {
  brand: {
    name: "Landingville",
    city: "Joinville",
    primaryHex: "#2B6FA5",
    secondaryHex: "#85BA62"
  },
  hero: {
    h1: "Mais clientes no seu WhatsApp — direto do Google.",
    sub: "Landing pages rápidas para comércios locais. Publicamos em dias; você começa a receber mensagens pelo celular.",
    ctas: {
      primary: "Calcular meu orçamento em 30s",
      secondary: "Falar no WhatsApp"
    },
    proofMicro: "WhatsApp 1 toque • Rotas no Google • Cardápio/Catálogo",
    // WhatsApp padrão (substituir DDD e número depois)
    waMessage: "Oi, sou [Nome] da [Loja]. Vi a Landingville. Quero uma página para [Segmento] e publicar até [Data]."
  },
  pains: {
    title: "O que trava as vendas hoje",
    bullets: [
      { title: "Contato lento", text: "Sem WhatsApp à mão, o cliente desiste. Colocamos 1 toque em todo lugar." },
      { title: "Como chegar?", text: "Mapa e horário sempre visíveis. Rotas no Google em segundos." },
      { title: "Oferta confusa", text: "Cardápio, catálogos e promo do dia sem complicar." }
    ],
    foot: "Resolvemos tudo em uma página leve, feita para o celular."
  },
  calculator: {
    title: "Calculadora de Orçamento (30s)",
    steps: {
      s1: { title: "Seu segmento", options: ["Lanchonete", "Moda", "Serviços", "Outro"] },
      s2: { title: "O que precisa", options: ["Cardápio/Catálogos", "WhatsApp direto", "Mapa e horário", "Integração Instagram", "Formulário simples", "Pixel/Analytics"] },
      s3: { title: "Urgência", options: ["Hoje", "Em 3 dias", "Em 7 dias", "Sem pressa"] },
      s4: { title: "Extras", options: ["Promoções", "Campanha sazonal", "Manutenção mensal"] }
    },
    result: {
      title: "Estimativa",
      // Importante: manter FAIXA como texto placeholder; NÃO fixar preço aqui
      text: "Para o seu cenário, indicamos uma faixa de investimento: [R$ faixa a definir].",
      cta: "Receber proposta no WhatsApp"
    },
    disclaimer: "Estimativa inicial. Validamos no WhatsApp em minutos."
  },
  demos: {
    title: "Veja como fica para o seu segmento",
    segments: ["Lanchonete", "Moda", "Serviços"],
    note: "Exemplo de demonstração."
  },
  plans: {
    title: "Planos sob medida",
    items: [
      {
        name: "Essencial",
        bullets: ["1 página", "WhatsApp", "Mapa", "Cardápio/Catálogo", "SEO local básico"]
      },
      {
        name: "Pro",
        bullets: ["Tudo do Essencial", "Promoções", "Formulário simples", "Integração Instagram"]
      },
      {
        name: "Turbo",
        bullets: ["Tudo do Pro", "Campanhas sazonais", "Pixel/GA", "Testes A/B simples"]
      }
    ],
    guarantees: [
      "Primeira versão em até [X] dias úteis.",
      "[Y] dias de ajustes após publicação, inclusos.",
      "Se não publicar, você não paga. (ou política real a definir)"
    ]
  },
  faq: {
    title: "Perguntas rápidas",
    items: [
      { q: "Não tenho fotos boas. E agora?", a: "Ajudamos com seleção/edição e usamos imagens provisórias leves para ir ao ar rápido." },
      { q: "Consigo atualizar sozinho?", a: "Sim. Conteúdos simples (preços/horários) ficam fáceis. Podemos treinar sua equipe." },
      { q: "Funciona com Instagram/iFood?", a: "Integramos links e destacamos o que traz pedido. Pixel/Analytics opcional." },
      { q: "Domínio e publicação?", a: "Já temos domínio pronto. Cuidamos da configuração e HTTPS." },
      { q: "Prazo típico?", a: "Dias, não semanas. Confirmamos no WhatsApp após a calculadora." }
    ],
    finalCTA: {
      title: "Pronto para aparecer e vender?",
      primary: "Falar no WhatsApp",
      secondary: "Ver planos"
    }
  }
};

export default copy;