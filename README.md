# Gustavo Jesus — Portfólio

Portfólio autoral em português, com home editorial e quatro estudos de caso: LURIA, Dashboard Financeiro, Garago e OndeFica. Implementação local; nenhuma publicação foi realizada.

## Stack

Next.js 16.4 (App Router), React 19.3, TypeScript strict, Tailwind CSS 4, GSAP/ScrollTrigger, Motion para React e Lucide React. Sora e Manrope carregadas por next/font. Imagens reais usam next/image; placeholders são composições locais em CSS/SVG, identificadas como demonstração visual.

As páginas são pré-renderizadas no build com `generateStaticParams`. Não há backend de aplicação, autenticação, banco, analytics nem serviços pagos. A configuração padrão do Next mantém a otimização de imagens disponível na Vercel.

As rotas de projeto não têm uma tela de carregamento artificial: o HTML completo fica visível mesmo sem JavaScript. Os controles interativos e animações são aprimoramentos após a hidratação.

## Requisitos e execução

Node.js 20.9+ (recomendado Node 22 ou 24 LTS), npm e acesso à internet na instalação e no primeiro build para baixar as fontes do Google. O lockfile registra as versões resolvidas.

```sh
npm ci
npm run dev
```

Abra http://127.0.0.1:3000. Para a versão de produção:

```sh
npm run build
npm run start
```

## Validação

```sh
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

O lint exige zero warnings. Typecheck gera os tipos de rotas antes do `tsc --noEmit`. Os testes E2E usam Playwright com Google Chrome instalado, em modo headless. Iniciam um servidor de produção exclusivo na porta 3100, sem reutilizar nem interromper a prévia de desenvolvimento da porta 3000. Execute o build antes e mantenha a porta 3100 livre. Para usar o Chromium do Playwright em outra máquina, remova `channel: "chrome"` da configuração e instale o navegador com `npx playwright install chromium`.

Execute typecheck e build em sequência: ambos geram arquivos em `.next/types` e não devem rodar ao mesmo tempo.

A suíte cobre filtros, menu mobile, foco, Escape, galeria, navegação entre projetos, metadados, sitemap, robots, imagem Open Graph, 404, movimento reduzido, axe WCAG A/AA e largura de documento em 320, 375, 390, 768, 1024, 1440 e 1920px. Capturas de desktop e mobile são salvas em `test-results/screenshots/`, ignoradas no Git. Verificação automatizada não substitui uma auditoria humana completa de acessibilidade.

## Estrutura

Validação executada em 18/10/2026: lint sem erros ou warnings, typecheck e build de produção aprovados, 17 testes de navegador aprovados no servidor de produção isolado. A suíte verificou as cinco páginas nas sete larguras listadas, todas as composições de galeria, as sete capturas reais do OndeFica, a capa com dois smartphones, o fallback de imagem, os dados profissionais e o conteúdo sem JavaScript. As capturas de desktop e mobile foram revisadas visualmente. A auditoria de produção executada anteriormente com `npm audit --omit=dev` retornou zero vulnerabilidades.

```text
src/
  app/                 layout, home, 404, SEO e rota projetos/[slug]
  components/
    layout/            navbar, menu, footer e estrutura
    sections/          as sete seções da home
    projects/          cards, filtros, estudo de caso e galeria
    animations/        entradas, órbitas, timeline, progresso e tilt
    ui/                controles, chips e composições demonstrativas
  data/                perfil, projetos, experiência e conteúdo
  hooks/               movimento reduzido, media query e seção ativa
  lib/                 metadados, assets públicos e navegação de projetos
  styles/              regras de animação e movimento reduzido
  types/               contratos de perfil e projetos
public/
  images/projects/     pastas para capturas reais
  documents/           currículo PDF, quando fornecido
tests/                 testes de navegador e acessibilidade
```

O CSS global concentra tokens, layout e componentes; `animations.css` concentra o movimento. Componentes vazios ou arquivos de imagens falsos não são criados. A imagem Open Graph PNG é gerada localmente pela rota `app/opengraph-image.tsx`; o favicon utiliza o formato SVG válido em `app/icon.svg`.

## Publicação na Vercel

Somente publique com autorização do proprietário. Quando autorizado:

1. Envie o projeto para o repositório escolhido e importe-o na Vercel como Next.js.
2. Configure `NEXT_PUBLIC_SITE_URL` com o domínio público final, incluindo `https://`.
3. Adicione os dados pessoais, as capturas e o currículo disponíveis; revise o conteúdo.
4. Use `npm run build` como build command. Não altere o output directory padrão.
5. Verifique as rotas, as imagens sociais, o sitemap e o robots após publicar.

Sem domínio configurado, o site fica `noindex`, o robots bloqueia indexação e o sitemap não inventa URLs. A base dos metadados usa localhost somente para a prévia. Ao definir a variável e refazer o build, as URLs canônicas e o sitemap usam o domínio real.

## Conteúdo e limitações

Consulte [CONTENT_GUIDE.md](CONTENT_GUIDE.md) para editar os dados e [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) para a direção de arte.

- GitHub, LinkedIn e e-mail já estão configurados em `src/data/profile.ts`. As duas certificações têm links de validação Oracle. O currículo ainda precisa ser adicionado.
- OndeFica tem stack confirmada pelo autor: React Native, Python e FastAPI, com desenvolvimento completo de frontend e backend. O Garago explicita a responsabilidade integral pelo frontend e o backend de outra equipe. No LURIA, a contribuição é em UX/UI, engenharia de frontend e segurança. A IA do Dashboard Financeiro permanece planejada.
- OndeFica utiliza sete capturas reais e uma capa estilizada com dois smartphones. Os arquivos originais são preservados. As demais capas continuam com os mockups demonstrativos aprovados.
- A descoberta de imagens acontece no build. Refaça o build após adicionar arquivos em `public`.
- Fontes precisam de rede no primeiro build. Depois são servidas pela própria aplicação, sem requests do navegador para o Google Fonts.
- A auditoria inicial encontrou zero vulnerabilidades de produção e cinco alertas altos na cadeia de desenvolvimento `eslint-config-next → fast-glob → micromatch → braces`. A versão publicada de `braces` ainda não oferece correção. Não foi aplicado downgrade incompatível nem `audit fix --force`. ESLint 9 permanece por compatibilidade declarada do plugin React. Reavalie essa cadeia antes de atualizar a ferramenta.

Na verificação pública dos links fornecidos em 18/10/2026, GitHub pessoal, repositório LURIA, aplicação LURIA e as duas credenciais Oracle responderam HTTP 200. Os repositórios `gusz11/OndeFica`, `CaioQC/Garago_Front` e `CaioQC/Garago_Back` responderam HTTP 404 sem autenticação; isso não confirma se são privados ou indisponíveis. O LinkedIn respondeu 403 à consulta automatizada. Os endereços fornecidos foram mantidos, sem substituir por perfis ou projetos de terceiros.
