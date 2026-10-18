import type { Project, ProjectImage } from "@/types/project";

function shot(folder: string, file: string, label: string): ProjectImage {
  return {
    path: `/images/projects/${folder}/${file}.webp`,
    label,
    alt: `${label} — ${folder === "financeiro" ? "Dashboard Financeiro" : folder}`,
  };
}

export const projects: Project[] = [
  {
    slug: "luria",
    name: "LURIA",
    title: "Aprender. Praticar. Evoluir.",
    category: "Plataforma educacional / Saúde",
    filters: ["Web"],
    theme: "luria",
    description:
      "Plataforma educacional com ambientes de estudo e trabalho, simulações médicas e interfaces voltadas à aprendizagem.",
    status: "Em evolução",
    role: "Evolução de interfaces, UX/UI e segurança frontend",
    stack: ["HTML", "CSS", "JavaScript"],
    cover: shot("luria", "cover", "Plataforma educacional e simulação médica"),
    overview:
      "O LURIA reúne diferentes ambientes de estudo e trabalho, incluindo recursos de aprendizagem e simulação de situações de emergência. Minha atuação passa pela evolução de interfaces, padronização visual, navegação, responsividade, segurança e testes.",
    problem:
      "Uma plataforma com muitos ambientes exige uma linguagem de interface consistente. O desafio é tornar a navegação entre conteúdos, ferramentas de estudo e simulações mais clara, sem perder o contexto de cada atividade.",
    solution:
      "A evolução das interfaces combina organização de CSS, componentes compartilhados e ajustes de UX/UI. A revisão de segurança e as validações acompanham esse trabalho. Os ambientes têm estágios distintos de desenvolvimento; a presença de um módulo não significa que ele esteja concluído ou homologado.",
    features: [
      "Ambiente educacional",
      "Ambiente de trabalho",
      "Dashboards",
      "Simulador de emergência",
      "Questões e simulados",
      "Flashcards",
      "Cronograma de estudos",
      "Estatísticas",
      "Áreas administrativas",
      "Temas de interface",
    ],
    technical: [
      {
        title: "Uma linguagem, diferentes ambientes",
        body: "Organização e padronização do CSS e de componentes compartilhados para dar continuidade visual aos fluxos de estudo e trabalho.",
      },
      {
        title: "Simulação com foco na experiência",
        body: "O ambiente de emergência faz parte da plataforma. O trabalho de interface busca tornar a leitura das informações e a navegação durante a simulação mais claras.",
      },
      {
        title: "Segurança também é frontend",
        body: "Revisão de políticas CSP e proteções contra conteúdo HTML não confiável, acompanhada de testes e validações. Essas frentes fazem parte da evolução, sem alegar uma auditoria ou homologação completa.",
      },
    ],
    nextSteps: [
      "Continuar a padronização entre os ambientes.",
      "Aprofundar validações de navegação, responsividade e segurança.",
    ],
    gallery: [
      shot("luria", "dashboard", "Visão do ambiente"),
      shot("luria", "simulator", "Simulador de emergência"),
      shot("luria", "education", "Recursos de aprendizagem"),
    ],
    links: [],
  },
  {
    slug: "dashboard-financeiro",
    name: "Dashboard Financeiro",
    title: "Clareza para cada movimentação.",
    category: "Oracle / Finanças pessoais",
    filters: ["Oracle", "Web"],
    theme: "financeiro",
    description:
      "Aplicação de finanças pessoais em Oracle APEX, com receitas, despesas, parcelamentos e indicadores financeiros.",
    status: "Em evolução",
    role: "Desenvolvimento de aplicação e regras de negócio",
    stack: ["Oracle APEX", "Oracle Database", "SQL", "PL/SQL"],
    cover: shot("financeiro", "cover", "Gestão de finanças pessoais"),
    overview:
      "Uma aplicação de finanças pessoais desenvolvida em Oracle APEX para organizar movimentações e acompanhar o comportamento financeiro ao longo dos meses. Consultas e regras de negócio transformam registros em uma visão organizada de receitas, despesas e saldos.",
    problem:
      "Movimentações distribuídas entre categorias, contas e parcelas dificultam a leitura do orçamento. É preciso relacionar cada registro ao seu período sem perder a visão do conjunto.",
    solution:
      "Centralizar o cadastro de receitas e despesas e organizar os dados por período, categoria e conta. O dashboard reúne gráficos e indicadores para facilitar a consulta de saldos e gastos mensais.",
    features: [
      "Cadastro de movimentações",
      "Receitas e despesas",
      "Categorias",
      "Contas e locais financeiros",
      "Parcelamento automático",
      "Visualização mensal",
      "Gráficos financeiros",
      "Consulta de saldos",
      "Indicadores de gastos",
    ],
    technical: [
      {
        title: "Parcelas com regras de negócio",
        body: "PL/SQL organiza o processamento de parcelamentos e a manipulação de datas. Cada parcela é associada ao período correspondente para compor as consultas mensais.",
      },
      {
        title: "Do registro à visualização",
        body: "Consultas SQL com agregações apoiam gráficos, indicadores e saldos. O Oracle APEX oferece a camada de formulários, relatórios e dashboards.",
      },
      {
        title: "Informação organizada por período",
        body: "A separação entre movimentações, categorias e contas permite consultar os dados financeiros com diferentes perspectivas, mantendo as regras no ecossistema Oracle.",
      },
    ],
    nextSteps: [
      "Explorar insights financeiros com IA — funcionalidade planejada.",
      "Estudar análise de movimentações em linguagem natural, sem integração com LLM implementada nesta apresentação.",
      "Evoluir os recursos de acompanhamento financeiro.",
    ],
    gallery: [
      shot("financeiro", "dashboard", "Visão financeira mensal"),
      shot("financeiro", "transactions", "Movimentações e parcelas"),
    ],
    links: [],
  },
  {
    slug: "garago",
    name: "Garago",
    title: "Mais espaço. Mais possibilidades.",
    category: "Mobile / Gestão condominial",
    filters: ["Mobile"],
    theme: "garago",
    description:
      "Aplicativo que conecta moradores para anunciar, encontrar e alugar vagas de garagem e armários no condomínio.",
    status: "Em desenvolvimento",
    role: "Frontend mobile",
    stack: ["React Native", "Expo", "TypeScript"],
    stackNote:
      "Backend do projeto: Java e Spring Boot. Minha atuação se concentra no frontend mobile e na integração com os serviços.",
    cover: shot("garago", "cover", "Locação de vagas e armários"),
    overview:
      "O Garago propõe aproximar moradores que têm espaços disponíveis daqueles que precisam de uma vaga de garagem ou de um armário no condomínio. Meu foco é a experiência no aplicativo, desde o acesso até as interfaces de anúncios e a integração com o backend.",
    problem:
      "Encontrar e anunciar espaços disponíveis dentro de um condomínio exige contexto: quem é o morador, qual é o condomínio e quais espaços estão disponíveis. O desafio é conectar essas informações em uma experiência mobile clara.",
    solution:
      "Construir fluxos de acesso e cadastro, validação de informações pessoais e gestão de anúncios. O frontend em React Native e Expo se comunica com os serviços do projeto. Parte das funcionalidades segue em desenvolvimento; o fluxo completo de aluguel e pagamento não é apresentado como implementado.",
    features: [
      "Tela inicial",
      "Login e cadastro de moradores",
      "Validação de informações pessoais",
      "Fluxo de condomínio",
      "Autenticação com JWT",
      "Persistência segura de sessão",
      "Gestão de espaços anunciados",
      "Criação e edição de anúncios",
      "Integração com serviços backend",
    ],
    technical: [
      {
        title: "Uma experiência pensada para o morador",
        body: "As telas mobile conectam acesso, informações do condomínio e anúncios. A organização dos fluxos busca reduzir dúvidas na navegação e no preenchimento de dados.",
      },
      {
        title: "Frontend e integração",
        body: "React Native, Expo e TypeScript compõem o frontend. A integração utiliza os serviços de um backend Java com Spring Boot, cuja implementação integral não é atribuída à minha atuação.",
      },
      {
        title: "Acesso e continuidade de sessão",
        body: "O escopo inclui autenticação JWT, validação de informações e persistência segura de sessão. Esses fluxos fazem parte do desenvolvimento do aplicativo.",
      },
    ],
    nextSteps: [
      "Continuar a evolução dos fluxos de anúncios e integração.",
      "Validar a experiência de ponta a ponta com os serviços do projeto.",
      "Amadurecer o fluxo de locação; aluguel e pagamento completos não estão confirmados.",
    ],
    gallery: [
      shot("garago", "login", "Fluxos de acesso"),
      shot("garago", "spaces", "Espaços e anúncios"),
    ],
    links: [
      {
        label: "Repositório frontend",
        href: "https://github.com/CaioQC/Garago_Front",
      },
      {
        label: "Repositório backend",
        href: "https://github.com/CaioQC/Garago_Back",
      },
    ],
  },
  {
    slug: "ondefica",
    name: "OndeFica",
    title: "Brasília, de um novo ponto de vista.",
    category: "Turismo / Planejamento",
    filters: ["Web"],
    theme: "ondefica",
    description:
      "Descubra pontos turísticos, salve lugares favoritos e organize roteiros de viagem em Brasília.",
    status: "Interface em apresentação",
    role: "Projeto de aplicação responsiva",
    stack: [],
    stackNote:
      "A stack será incluída após confirmação no repositório. Esta apresentação descreve as interfaces e funcionalidades observadas, sem atribuir tecnologias não verificadas.",
    cover: shot("ondefica", "cover", "Descubra e planeje Brasília"),
    overview:
      "O OndeFica reúne descoberta de lugares e planejamento de visitas a Brasília. A interface conecta a exploração de pontos turísticos aos favoritos, à programação da viagem e ao roteiro de cada dia.",
    problem:
      "Descobrir um lugar interessante é só uma parte do passeio. Depois vêm as decisões sobre o que visitar, em qual ordem e em quais horários. O desafio é dar continuidade entre descoberta e organização.",
    solution:
      "Uma experiência responsiva com busca, filtros, detalhes dos pontos turísticos e favoritos. O planejamento reúne visitas, horários, indicadores de despesas e exportação para PDF. As sete telas da galeria estão preparadas para receber as capturas reais.",
    features: [
      "Exploração de locais",
      "Busca e filtros por categorias",
      "Detalhes de pontos turísticos",
      "Favoritos",
      "Login e cadastro",
      "Programação de viagens",
      "Organização de visitas",
      "Horários de roteiro",
      "Indicadores de despesas",
      "Exportação para PDF",
      "Configurações e preferências",
    ],
    technical: [
      {
        title: "Da descoberta ao detalhe",
        body: "Exploração, busca e categorias ajudam a localizar pontos de interesse. A tela de detalhes concentra informações de um lugar, como a Catedral de Brasília.",
      },
      {
        title: "Uma viagem que ganha forma",
        body: "Favoritos alimentam o planejamento. A programação e o roteiro diário organizam visitas e horários, com indicadores de despesas e opção de exportação para PDF.",
      },
      {
        title: "Continuidade entre telas",
        body: "O conjunto inclui acesso, configurações e preferências, além dos fluxos de descoberta e planejamento. O estudo valoriza a organização da interface, sem inferir a arquitetura técnica.",
      },
    ],
    nextSteps: [
      "Incluir as sete capturas reais da aplicação.",
      "Confirmar tecnologias e detalhes de implementação no repositório.",
    ],
    gallery: [
      shot("ondefica", "explorar", "Explorar Brasília"),
      shot("ondefica", "detalhes", "Detalhes da Catedral"),
      shot("ondefica", "login", "Login"),
      shot("ondefica", "favoritos", "Favoritos"),
      shot("ondefica", "programacao", "Programação"),
      shot("ondefica", "roteiro", "Roteiro do dia"),
      shot("ondefica", "configuracoes", "Configurações"),
    ],
    links: [],
  },
];
