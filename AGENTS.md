# Convenções do portfólio

- Antes de alterações visuais, leia e aplique `.agents/skills/frontend-design/SKILL.md` e `DESIGN_SYSTEM.md`.
- Preserve o conceito editorial escuro e o hero orbital. Evite replicar cards uniformes em todas as seções. Não acrescente efeitos pesados, Three.js, analytics, backend ou formulários com envio sem solicitação.
- Use Server Components por padrão. Client Components apenas para estado, eventos, observers e animações. Conteúdo de projeto deve permanecer renderizado no servidor nas páginas de detalhes.
- Organize conteúdo em `src/data` e contratos em `src/types`. Componentes de layout, seções, projetos, animação e UI têm responsabilidades distintas. Não crie componentes vazios para preencher uma árvore.
- Não invente dados pessoais, experiência, métricas, status, tecnologias, certificações ou links. Preserve a distinção entre implementado, em desenvolvimento e planejado. A atuação no Garago é frontend mobile.
- Mantenha placeholders identificados como demonstrações. Imagens reais têm prioridade, usando next/image e alt adequado. Não crie imagens vazias nem use URLs temporárias.
- Reuse tokens e componentes. Estilos de movimento ficam em `src/styles/animations.css`. Não use GSAP e Motion sobre a mesma propriedade do mesmo elemento. GSAP deve ter cleanup com context/revert e ScrollTrigger deve ser desmontado.
- Respeite prefers-reduced-motion, foco visível, landmarks, headings e contraste AA. Menus e lightboxes precisam de Escape, retenção e restauração do foco. Conteúdo essencial deve existir sem JavaScript.
- Teste 320, 375, 390, 768, 1024, 1440 e 1920px. Corrija a causa do overflow; não esconda a página inteira para mascará-lo.
- Para concluir alterações de código, execute `npm run lint`, `npm run typecheck` e `npm run build`. Para layout/interação, execute `npm run test:e2e` e revise screenshots. Não declare verificações que não executou.
- Não faça deploy sem autorização explícita. O domínio público deve ser configurado pelo usuário; sem ele, mantenha noindex.
- Preserve mudanças do usuário, não crie commits automaticamente e não altere o conteúdo da skill instalada.
