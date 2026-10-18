# Guia de conteúdo

## Dados pessoais

Edite `src/data/profile.ts`. Nome, cargo, localização, formação, apresentação e parágrafos da seção Sobre estão centralizados. `experience.ts` concentra organização, atuação e responsabilidades; `period` é opcional e não mostra datas inventadas. Não acrescente semestre, cargo formal, resultados ou anos de experiência sem confirmação.

## Links e contato

O GitHub confirmado já está em `profile.github`. Configure `profile.linkedin` com a URL completa e `profile.email` com o endereço real. O contato, o hero e a lista `social.ts` usam esses valores. O botão de copiar aparece somente quando existe e-mail. O clipboard fornece feedback acessível de sucesso ou falha.

Para currículo, adicione um PDF real, por exemplo `public/documents/gustavo-jesus-cv.pdf`, e defina `resume: "/documents/gustavo-jesus-cv.pdf"`. O download exige caminho existente e extensão `.pdf`. Não crie um arquivo vazio para habilitar a ação.

Links externos usam `target="_blank"`, `rel="noopener noreferrer"` e texto acessível avisando sobre a nova aba. Use somente links verificados; não use `#` como substituto.

## Projetos

Os contratos estão em `src/types/project.ts`. Cada entrada de `src/data/projects.ts` define slug, título, categoria, filtros, tema visual, resumo, status, atuação, stack, contexto, solução, funcionalidades, destaques, próximos passos, capa, galeria e links.

Para adicionar, crie uma entrada completa no array `projects` com slug exclusivo. A rota dinâmica, a navegação, o filtro e o sitemap são derivados desse array. Use um dos temas visuais existentes ou acrescente um tema ao contrato e seu placeholder em `ImagePlaceholder.tsx`. Para remover, exclua a entrada e execute as validações; mantenha ao menos dois projetos para que anterior/próximo faça sentido. Não inclua projetos sem conteúdo suficiente.

`filters` aceita uma ou mais categorias entre Oracle, Web e Mobile. OndeFica está em Mobile, com React Native, Python e FastAPI confirmados pelo autor. Sua contribuição cobre frontend e backend; no Garago, a responsabilidade integral é pelo frontend mobile, com backend de outra equipe. No LURIA, a contribuição é em identidade visual, interfaces, funcionalidades e segurança frontend.

## Imagens reais

As pastas já estão preparadas. Não há arquivos `.webp` vazios. Adicione as imagens com os nomes abaixo, ou mude os caminhos em `projects.ts`. Edite também o `alt` para descrever a captura real. As imagens existentes são detectadas no build e exibidas com next/image. Uma falha de carregamento retorna ao placeholder sem quebrar o layout.

| Pasta em public/images/projects | Arquivos esperados                                                                                                                                       |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `luria/`                        | `cover.webp`, `dashboard.webp`, `simulator.webp`, `education.webp`                                                                                       |
| `financeiro/`                   | `cover.webp`, `dashboard.webp`, `transactions.webp`                                                                                                      |
| `garago/`                       | `cover.webp`, `login.webp`, `spaces.webp`                                                                                                                |
| `ondefica/`                     | `01-explorar.jpg`, `02-detalhes-catedral.jpg`, `03-login.jpg`, `04-favoritos.jpg`, `05-programacao.jpg`, `06-roteiro-do-dia.jpg`, `07-configuracoes.jpg` |

Prefira WebP ou AVIF, 1600–2400px para capas desktop. Preserve a resolução legível dos screenshots; o componente usa `object-fit: contain`, evitando cortar informações. Para outro formato, altere a extensão no campo `path`. A galeria tem navegação por botões, setas do teclado, seletor de tela e ampliação por dialog. Escape fecha e o foco volta ao botão de origem.

Os placeholders são ilustrativos e não precisam corresponder pixel a pixel às aplicações. Quando as imagens reais chegam, elas têm prioridade. Para composições diferentes por tela sem screenshots, personalize `ImagePlaceholder.tsx`; não apresente os mockups como capturas reais.

As sete capturas reais do OndeFica já estão adicionadas. `ondeFicaGallery`, em `projects.ts`, centraliza caminhos, rótulos e textos alternativos. A propriedade `coverComposition` seleciona Explorar e Programação para a capa com dois smartphones, renderizada por `OndeFicaCover.tsx`. A composição utiliza as imagens originais com enquadramento CSS, sem regravar ou retocar os arquivos; na galeria, as capturas são exibidas inteiras. Se faltar uma das duas imagens da capa no build ou ocorrer falha de carregamento, a composição demonstrativa anterior continua disponível como fallback.

Para trocar uma tela, atualize seu caminho na galeria e refaça o build. Para trocar os aparelhos em destaque, altere `coverComposition.primary` e `coverComposition.secondary`. Os estilos específicos estão em `src/styles/ondefica.css`; preserve os estilos e as capas dos outros projetos.

## Certificações e tecnologias

Edite `certifications.ts` para nome, emissor, ano, URL de validação e imagem opcional de badge. Os anos de obtenção não foram presumidos; `2025` faz parte do nome da primeira certificação. Configure `year` somente após confirmar o ano de obtenção. `badge` recebe um caminho de arquivo real dentro de `public`.

`skills.ts` organiza as tecnologias em categorias. Não use níveis ou percentuais sem evidência. Não misture automaticamente a stack deste portfólio com as competências profissionais informadas.

## Textos editoriais e SEO

Os textos de perfil e projetos ficam nos arquivos de dados. Títulos de navegação ficam em `navigation.ts`; pequenos títulos editoriais de seção e microcopy estão nos componentes correspondentes. Os metadados derivam dos projetos e de `lib/metadata.ts`. A imagem social pode ser editada em `app/opengraph-image.tsx`.

Defina o domínio real em `.env.local`, copiando `.env.example`, e na Vercel quando houver autorização para publicação. Nunca inclua segredos em variáveis `NEXT_PUBLIC_*`.

Depois de alterações, rode lint, typecheck e build. Para mudanças de layout ou interação, execute também os testes de navegador e revise as capturas.
