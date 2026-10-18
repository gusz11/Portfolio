# Direção de arte

Portfólio editorial escuro, com a precisão dos sistemas Oracle e a abertura do desenvolvimento de interfaces. O momento visual principal é uma escultura de planos orbitais em CSS: camadas que se conectam, como dados, regras e experiência.

## Plano e revisão antes da implementação

- Base `#09090F`; seção `#11111B`; superfície `#191925`; violeta `#8B5CF6`; luz `#A78BFA`; texto `#F4F4F7`. Texto secundário `#A1A1B5`.
- Sora nos títulos, com formas geométricas e contraformas abertas. Manrope no texto e na navegação, para leitura confortável. Ambas por next/font.
- Conteúdo alinhado à esquerda, em um contêiner máximo de 1280px. Hero assimétrico, apresentação editorial, timeline, linhas de tecnologias e vitrine de projetos em duas colunas.

```text
marca                     navegação             contato
apresentação                 escultura orbital
título grande                planos / linhas
descrição e ações            espaço negativo
especialidade                         localização

sobre (coluna curta)          texto editorial (coluna larga)
experiência                  timeline de responsabilidades
tecnologias                  grupos horizontais
projetos                     filtro
capa grande                  capa grande deslocada
certificações                duas linhas de credenciais
convite grande               canais disponíveis
```

A primeira alternativa, repetir painéis arredondados em todas as seções, foi descartada. A composição final concentra o gradiente no hero e usa variações de superfície nos projetos. As seções informativas usam texto, espaço e divisórias funcionais. Numeração só aparece em sequências reais da galeria, não como decoração dos títulos.

## Tokens e componentes

Espaçamento baseado em 4px, com passos 8, 12, 16, 24, 32, 48, 64, 96 e 128. Seções com 96–128px no desktop e 64–80px no mobile. Cantos de 8px em controles, 16px em vitrines e arredondamento integral só em chips e elementos orbitais. Corpo 16–18px, linha 1.7; títulos com escala fluida e entrelinha compacta. Texto de leitura limitado a cerca de 68 caracteres.

Botões distinguem ação primária preenchida, secundária com borda e links textuais. Foco usa contorno violeta claro com deslocamento. Links externos identificam abertura em nova aba. Informações não dependem de hover.

## Movimento

GSAP controla a sequência inicial e a timeline com ScrollTrigger, usando context/revert. IntersectionObserver ativa reveals discretos. Motion controla a troca de filtros e imagens, sem concorrer pelas mesmas propriedades com GSAP. Tilt só em ponteiro fino com hover; sem tilt em touch. prefers-reduced-motion elimina entradas, deslocamentos contínuos e transições de navegação. Conteúdo existe e é legível no HTML inicial.

## Responsividade

Grids passam a uma coluna abaixo de 768px, menu compacto abaixo de 1100px. O hero ganha composição própria no mobile; a escultura é reposicionada e não compete com os textos. Testar 320, 375, 390, 768, 1024, 1440 e 1920px. Não esconder overflow globalmente para mascarar largura errada. Só áreas decorativas têm recorte local.

## Refinamento localizado do OndeFica

A capa reutiliza a direção de arte aprovada: verde suave `#BECBB9`, linhas de rota `#DAE1D0`, detalhes oliva `#637653` e aparelhos escuros `#161813`. Mantém Sora, Manrope, proporções dos cards e animações existentes. Dois smartphones levemente inclinados enquadram as capturas reais de Explorar e Programação, com prioridade visual para Explorar. A alternativa de usar apenas um print plano foi descartada para preservar a profundidade e a linguagem das capas. A galeria exibe os sete arquivos originais inteiros. CSS específico em `src/styles/ondefica.css`, sem alterar Hero, Garago ou tokens globais.
