import type { Project, ProjectImage } from "@/types/project";

function shot(folder: string, file: string, label: string): ProjectImage {
  return {
    path: `/images/projects/${folder}/${file}.webp`,
    label,
    alt: `${label} — ${folder === "financeiro" ? "Dashboard Financeiro" : folder}`,
  };
}

const ondeFicaGallery: ProjectImage[] = [
  {
    path: "/images/projects/ondefica/01-explorar.jpg",
    label: "Explorar Brasília",
    alt: "Tela Explorar do OndeFica com busca, categorias e Museu Nacional da República",
  },
  {
    path: "/images/projects/ondefica/02-detalhes-catedral.jpg",
    label: "Detalhes da Catedral",
    alt: "Tela de detalhes da Catedral de Brasília, com foto, informações de visitação e acesso à programação",
  },
  {
    path: "/images/projects/ondefica/03-login.jpg",
    label: "Login",
    alt: "Tela de login do OndeFica com campos de e-mail e senha",
  },
  {
    path: "/images/projects/ondefica/04-favoritos.jpg",
    label: "Favoritos",
    alt: "Tela de lugares salvos do OndeFica, com Museu Nacional e Catedral de Brasília",
  },
  {
    path: "/images/projects/ondefica/05-programacao.jpg",
    label: "Programação",
    alt: "Programação de uma viagem no OndeFica, com visitas, indicadores e exportação para PDF",
  },
  {
    path: "/images/projects/ondefica/06-roteiro-do-dia.jpg",
    label: "Roteiro do dia",
    alt: "Roteiro diário do OndeFica com Museu Nacional, Catedral e Congresso Nacional organizados por horário",
  },
  {
    path: "/images/projects/ondefica/07-configuracoes.jpg",
    label: "Configurações",
    alt: "Tela de configurações do OndeFica com conta, aparência e preferências de viagem",
  },
];

export const projects: Project[] = [
  {
    slug: "luria",
    name: "LURIA",
    title: "Aprender. Praticar. Evoluir.",
    category: "Plataforma educacional / Saúde",
    filters: ["Web"],
    theme: "luria",
    description:
      "Plataforma voltada à formação médica, com ambientes de estudo, trabalho e simulação. Atuação em frontend, UX/UI e segurança.",
    status: "Em evolução",
    role: "Engenharia de frontend, UX/UI e segurança",
    stack: ["HTML", "CSS", "JavaScript"],
    cover: shot("luria", "cover", "Plataforma educacional e simulação médica"),
    overview:
      "O LURIA é uma plataforma educacional voltada à formação médica, com ambientes de estudo, trabalho e simulação. Minha contribuição se concentrou na definição e evolução da identidade visual, no design e desenvolvimento de interfaces e em melhorias de funcionalidades e segurança frontend.",
    problem:
      "Uma plataforma com muitos ambientes exige uma linguagem de interface consistente. O desafio é tornar a navegação entre conteúdos, ferramentas de estudo e simulações mais clara, sem perder o contexto de cada atividade.",
    solution:
      "Desenvolvimento e refinamento de layouts, padronização de componentes e ajustes de responsividade, acompanhados da correção de falhas de interface e de funcionalidades existentes. A atuação também inclui identificação e correção de vulnerabilidades, revisão de CSP, testes e validações das correções. Esse trabalho não representa a criação integral da plataforma ou de seu backend, nem uma homologação definitiva.",
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
        body: "Definição e evolução da identidade visual, design de interfaces, refinamento de layouts e padronização de componentes. Organização do CSS e ajustes de responsividade conectam os diferentes ambientes.",
      },
      {
        title: "Interfaces e funcionalidades em evolução",
        body: "Correção de falhas de interface e de funcionalidades existentes, com testes e validações das alterações. O trabalho de UX/UI busca melhorar a navegação e a leitura das informações, incluindo o ambiente de simulação de emergência.",
      },
      {
        title: "Segurança também é frontend",
        body: "Identificação e correção de vulnerabilidades, melhorias de segurança frontend e revisão e aplicação de políticas CSP. Testes acompanham as funcionalidades corrigidas, sem alegar auditoria de segurança completa ou homologação definitiva.",
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
    links: [
      { label: "Repositório", href: "https://github.com/arantes225/luria" },
      { label: "Acessar aplicação", href: "https://www.resibulando.online" },
    ],
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
    role: "Desenvolvimento integral do frontend mobile",
    stack: ["React Native", "Expo", "TypeScript"],
    stackNote:
      "Fui responsável por todo o frontend em React Native, com Expo e TypeScript. O backend em Java e Spring Boot foi desenvolvido por outra equipe.",
    cover: shot("garago", "cover", "Locação de vagas e armários"),
    overview:
      "O Garago conecta moradores interessados em anunciar e encontrar vagas de garagem e armários no condomínio. Fui responsável por todo o desenvolvimento frontend em React Native, incluindo telas, componentes reutilizáveis, navegação, formulários e integração com os serviços backend.",
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
        body: "Construção das telas e de componentes reutilizáveis, navegação e experiência do usuário. Formulários, validações e máscaras apoiam o preenchimento das informações e os fluxos de gerenciamento de anúncios.",
      },
      {
        title: "Frontend e integração",
        body: "Responsabilidade integral pelo frontend em React Native, Expo e TypeScript, incluindo a integração com os serviços do projeto. O backend em Java com Spring Boot foi desenvolvido por outra equipe.",
      },
      {
        title: "Acesso e continuidade de sessão",
        body: "Autenticação no frontend, gerenciamento e persistência segura de sessão, validações e integração com os serviços de acesso. Parte do aplicativo continua em desenvolvimento; o fluxo completo de aluguel e pagamento não é apresentado como concluído.",
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
    category: "Mobile / Turismo e Planejamento",
    filters: ["Mobile"],
    theme: "ondefica",
    description:
      "Descubra pontos turísticos, salve lugares favoritos e organize roteiros de viagem em Brasília.",
    status: "Projeto autoral",
    role: "Desenvolvimento completo — frontend e backend",
    stack: ["React Native", "Python", "FastAPI"],
    stackNote:
      "Desenvolvi toda a aplicação: frontend em React Native e backend em Python com FastAPI.",
    cover: shot("ondefica", "cover", "Descubra e planeje Brasília"),
    coverComposition: {
      primary: ondeFicaGallery[0],
      secondary: ondeFicaGallery[4],
    },
    overview:
      "Desenvolvi toda a aplicação OndeFica, incluindo frontend em React Native e backend em Python com FastAPI. O aplicativo conecta a descoberta de lugares ao planejamento de viagens, com favoritos, programação de visitas e roteiros organizados por dia e horário.",
    problem:
      "Descobrir um lugar interessante é só uma parte do passeio. Depois vêm as decisões sobre o que visitar, em qual ordem e em quais horários. O desafio é dar continuidade entre descoberta e organização.",
    solution:
      "Uma aplicação mobile com exploração, busca, categorias, detalhes dos locais e favoritos. A organização de viagens reúne informações de visitação, programação por dia e horário, autenticação, preferências e exportação da programação em PDF.",
    features: [
      "Exploração de pontos turísticos",
      "Busca e filtros por categorias",
      "Detalhes de pontos turísticos",
      "Favoritos",
      "Autenticação",
      "Organização de viagens",
      "Programação de visitas",
      "Roteiros por dia e horário",
      "Informações de visitação",
      "Exportação de programação em PDF",
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
        title: "Da interface ao backend",
        body: "Desenvolvimento completo da aplicação, com frontend em React Native e backend em Python com FastAPI. Minha atuação abrange a experiência mobile e os serviços que apoiam os fluxos de descoberta e planejamento.",
      },
    ],
    nextSteps: [],
    gallery: ondeFicaGallery,
    links: [
      { label: "Repositório", href: "https://github.com/gusz11/OndeFica" },
    ],
  },
];
