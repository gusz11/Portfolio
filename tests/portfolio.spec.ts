import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../src/data/projects";

const routes = [
  "/",
  "/projetos/luria",
  "/projetos/dashboard-financeiro",
  "/projetos/garago",
  "/projetos/ondefica",
];
const widths = [320, 375, 390, 768, 1024, 1440, 1920];

test("projetos sem botões de repositório preservam aplicação e GitHub de contato", async ({
  page,
}) => {
  for (const route of routes.slice(1)) {
    await page.goto(route);
    await expect(page.locator('main a[href*="github.com"]')).toHaveCount(0);
    await expect(
      page.getByRole("link", { name: /Repositório|Ver código/i }),
    ).toHaveCount(0);
    if (route === "/projetos/luria")
      await expect(
        page.getByRole("link", { name: /^Acessar aplicação/ }),
      ).toHaveAttribute("href", "https://www.resibulando.online");
    if (route === "/projetos/ondefica")
      await expect(
        page.getByRole("heading", { name: "Explore o projeto" }),
      ).toHaveCount(0);
  }
  await page.goto("/");
  await expect(
    page.locator('#contato a[href="https://github.com/gusz11"]'),
  ).toBeVisible();
});

test("LURIA: dezesseis capturas reais, sequência editorial e zoom legível", async ({
  page,
  request,
}) => {
  test.setTimeout(150000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const luria = projects.find(({ slug }) => slug === "luria")!;
  expect(luria.gallery.map(({ label }) => label)).toEqual([
    "Dashboard",
    "Central de aplicativos",
    "Aprender",
    "Professor Alex",
    "Simulador de emergência",
    "Simulação clínica",
    "Cronograma",
    "Consolidar",
    "Questões e simulados",
    "Caderno de erros",
    "Flashcards",
    "Revisão de flashcard",
    "Estatísticas",
    "Detalhes do desempenho",
    "Jogos",
    "Modo Trabalho",
  ]);
  for (const screen of luria.gallery) {
    const response = await request.get(screen.path);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  }
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/projetos/luria");
    const panel = page.locator(".luria-gallery-slide");
    await expect(page.locator(".gallery-thumbnails button")).toHaveCount(16);
    for (let index = 0; index < luria.gallery.length; index++) {
      const screen = luria.gallery[index];
      await page.locator(".gallery-thumbnails button").nth(index).click();
      await expect(panel.getByRole("heading", { level: 3 })).toHaveText(
        screen.presentation!.title,
      );
      await expect(panel.locator(".luria-gallery-environment")).toHaveText(
        screen.presentation!.note,
      );
      const image = panel.locator("img");
      await expect(image).toHaveAttribute("alt", screen.alt);
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate((element: HTMLImageElement) => element.naturalWidth),
        )
        .toBeGreaterThan(0);
      const geometry = await panel.evaluate((element) => {
        const panel = element.getBoundingClientRect();
        const frame = element
          .querySelector(".luria-window")!
          .getBoundingClientRect();
        const copy = element
          .querySelector(".luria-gallery-editorial")!
          .getBoundingClientRect();
        const image = element.querySelector("img") as HTMLImageElement;
        const bounds = image.getBoundingClientRect();
        return {
          frameWidth: frame.width / panel.width,
          frameTop: frame.top,
          copyBottom: copy.bottom,
          frameLeft: frame.left,
          copyRight: copy.right,
          fit: getComputedStyle(image).objectFit,
          ratio: bounds.width / bounds.height,
          naturalRatio: image.naturalWidth / image.naturalHeight,
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
        };
      });
      expect(geometry.fit).toBe("contain");
      expect(geometry.ratio).toBeCloseTo(2880 / 2000, 2);
      expect(geometry.naturalRatio).toBeCloseTo(2880 / 2000, 2);
      expect(geometry.overflow).toBe(false);
      if (width >= 768) {
        expect(geometry.frameWidth).toBeGreaterThan(0.6);
        expect(geometry.frameWidth).toBeLessThan(0.72);
        expect(geometry.frameLeft).toBeGreaterThan(geometry.copyRight);
      } else {
        expect(geometry.frameWidth).toBeGreaterThan(0.85);
        expect(geometry.frameTop).toBeGreaterThan(geometry.copyBottom);
      }
      if ([0, 5, 15].includes(index))
        await panel.screenshot({
          path: `test-results/screenshots/luria-real-${width}-${index + 1}.png`,
          style:
            ".site-header, .skip-link, .scroll-progress, .back-to-top { visibility: hidden; }",
        });
    }
    const expand = page.locator(".gallery-expand");
    await expand.click();
    const dialog = page.getByRole("dialog", {
      name: "Imagem ampliada do projeto",
    });
    await expect(dialog).toBeVisible();
    await expect(
      dialog.locator(".luria-window, .luria-gallery-slide"),
    ).toHaveCount(0);
    await expect(dialog.locator("img")).toHaveAttribute(
      "alt",
      luria.gallery[15].alt,
    );
    await dialog.getByRole("button", { name: "Ampliar detalhes" }).click();
    const viewport = dialog.getByRole("region");
    const zoom = await viewport.evaluate((element) => {
      element.scrollLeft = 100;
      return {
        wider: element.scrollWidth > element.clientWidth,
        scroll: element.scrollLeft,
        pageOverflow: document.documentElement.scrollWidth > innerWidth + 1,
      };
    });
    expect(zoom.wider).toBe(true);
    expect(zoom.scroll).toBeGreaterThan(0);
    expect(zoom.pageOverflow).toBe(false);
    if (width === 390)
      await dialog.screenshot({
        path: "test-results/screenshots/luria-details-zoom-390.png",
      });
    await dialog.getByRole("button", { name: "Ver imagem inteira" }).click();
    await dialog.getByRole("button", { name: "Próxima imagem" }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(dialog.locator("img")).toHaveAttribute(
      "alt",
      luria.gallery[0].alt,
    );
    await page.keyboard.press("Tab");
    await expect(
      dialog.getByRole("button", { name: "Fechar imagem ampliada" }),
    ).toBeFocused();
    const accessibility = await new AxeBuilder({ page })
      .include(".luria-gallery-dialog")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(accessibility.violations).toEqual([]);
    await dialog.screenshot({
      path: `test-results/screenshots/luria-lightbox-${width}.png`,
    });
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(expand).toBeFocused();
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  }
});

test("LURIA: capa autêntica na home e no caso, sete larguras e atribuições fiéis", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const home of [true, false]) {
      await page.goto(home ? "/#projetos" : "/projetos/luria");
      const cover = page.locator(
        home ? ".card-luria .luria-cover" : ".case-hero .luria-cover",
      );
      await cover.scrollIntoViewIfNeeded();
      await expect(cover.locator("img")).toHaveCount(2);
      await expect(cover.locator(".demo-disclaimer")).toHaveCount(0);
      await expect(cover.locator(".luria-cover-primary img")).toHaveAttribute(
        "alt",
        /Dashboard/,
      );
      await expect(cover.locator(".luria-cover-secondary img")).toHaveAttribute(
        "alt",
        /Cronograma semanal/,
      );
      await expect(cover.locator(".luria-cover-secondary img")).toHaveAttribute(
        "src",
        /03-cronograma\.png/,
      );
      const secondaryRatio = await cover.evaluate((element) => {
        const secondary = element.querySelector(
          ".luria-cover-secondary",
        ) as HTMLElement;
        return secondary.offsetWidth / element.clientWidth;
      });
      expect(secondaryRatio).toBeGreaterThan(
        !home && width >= 768 ? 0.39 : 0.41,
      );
      for (const image of await cover.locator("img").all()) {
        await expect
          .poll(() =>
            image.evaluate((element: HTMLImageElement) => element.naturalWidth),
          )
          .toBeGreaterThan(0);
        await expect(image).toHaveCSS("object-fit", "contain");
      }
      const geometry = await cover.evaluate((element) => {
        const root = element.getBoundingClientRect();
        return [
          ...element.querySelectorAll(
            ".luria-cover-primary, .luria-cover-secondary",
          ),
        ].map((item) => {
          const frame = item.getBoundingClientRect();
          return (
            frame.left >= root.left &&
            frame.right <= root.right &&
            frame.top >= root.top &&
            frame.bottom <= root.bottom
          );
        });
      });
      expect(geometry).toEqual([true, true]);
      if ([390, 768, 1440].includes(width))
        await cover.screenshot({
          path: `test-results/screenshots/luria-${home ? "card" : "cover"}-${width}.png`,
          style:
            ".site-header, .skip-link, .scroll-progress, .back-to-top { visibility: hidden; }",
        });
    }
  }
  await expect(page.locator(".case-overview")).toContainText(
    "Minha contribuição se concentrou",
  );
  await expect(page.locator("main")).toContainText(
    "não representa a criação integral",
  );
  await expect(page.locator("main")).toContainText("CSP");
  for (const [label, href] of [
    ["Acessar aplicação", "https://www.resibulando.online"],
  ]) {
    const link = page.getByRole("link", { name: new RegExp(`^${label}`) });
    await expect(link).toHaveAttribute("href", href);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
  }
});

test("LURIA: capturas existem sem JavaScript e falhas têm fallback identificado", async ({
  browser,
  baseURL,
  page,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
  });
  try {
    const noScriptPage = await context.newPage();
    await noScriptPage.goto("/projetos/luria");
    await expect(
      noScriptPage.locator(".case-hero .luria-cover img"),
    ).toHaveCount(2);
    await expect(noScriptPage.locator(".luria-gallery-slide h3")).toHaveText(
      "Seu dia de estudos.",
    );
  } finally {
    await context.close();
  }
  await page.route("**/_next/image?*", async (route) => {
    const image = new URL(route.request().url()).searchParams.get("url");
    if (image?.endsWith("/luria/01-dashboard.png")) await route.abort();
    else await route.continue();
  });
  await page.goto("/projetos/luria");
  await expect(page.locator(".case-hero .demo-disclaimer")).toHaveText(
    "Demonstração visual",
  );
  await page.locator(".gallery-stage").scrollIntoViewIfNeeded();
  await expect(page.locator(".gallery-stage .demo-disclaimer")).toHaveText(
    "Demonstração visual",
  );
});

test("home, filtros e links válidos", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Gustavo");
  for (const id of [
    "inicio",
    "sobre",
    "experiencia",
    "tecnologias",
    "projetos",
    "certificacoes",
    "contato",
  ])
    await expect(page.locator(`#${id}`)).toBeAttached();
  await page.getByRole("button", { name: "Oracle", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card h3")).toHaveText(
    "Dashboard Financeiro",
  );
  await page.getByRole("button", { name: "Mobile", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await expect(page.locator(".project-card h3")).toHaveText([
    "Garago",
    "OndeFica",
  ]);
  await page.getByRole("button", { name: "Web", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await page.getByRole("button", { name: "Todos", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(4);
  expect(await page.locator('a[href="#"], a[href=""]').count()).toBe(0);
  for (const anchor of await page.locator('a[target="_blank"]').all())
    expect(await anchor.getAttribute("rel")).toContain("noopener");
  expect(errors).toEqual([]);
});

test("menu mobile: foco, Escape e seleção", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Abrir menu de navegação" });
  await trigger.click();
  const menu = page.getByRole("dialog", { name: "Menu de navegação" });
  await expect(menu).toBeVisible();
  await page.keyboard.press("Shift+Tab");
  expect(
    await menu.evaluate((element) => element.contains(document.activeElement)),
  ).toBeTruthy();
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await menu.getByRole("link", { name: "Projetos", exact: true }).click();
  await expect(menu).not.toBeVisible();
  await expect(page).toHaveURL(/#projetos$/);
  await expect(
    page.locator('.mobile-menu a[aria-current="location"]'),
  ).toHaveText("Projetos");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(menu).not.toBeVisible();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("galeria, teclado, ampliação e navegação entre projetos", async ({
  page,
}) => {
  await page.goto("/projetos/ondefica");
  await expect(page.locator(".gallery-thumbnails button")).toHaveCount(7);
  const next = page
    .locator(".gallery > .gallery-controls")
    .getByRole("button", { name: "Próxima imagem" });
  await next.click();
  await expect(
    page.locator(".gallery-thumbnails button[aria-pressed=true]"),
  ).toContainText("Detalhes da Catedral");
  await next.press("ArrowRight");
  await expect(
    page.locator(".gallery-thumbnails button[aria-pressed=true]"),
  ).toContainText("Login");
  await page
    .getByRole("button", { name: "Ampliar: Login", exact: true })
    .click();
  const lightbox = page.getByRole("dialog", {
    name: "Imagem ampliada do projeto",
  });
  await expect(lightbox).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(lightbox).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Ampliar: Login", exact: true }),
  ).toBeFocused();
  await page
    .getByRole("navigation", { name: "Navegação entre projetos" })
    .getByRole("link", { name: /Próximo projeto/ })
    .click();
  await expect(page).toHaveURL(/\/projetos\/luria$/);
  await expect(page.locator("h1")).toHaveText("Aprender. Praticar. Evoluir.");
});

for (const width of widths) {
  test(`responsividade ${width}px em todas as páginas`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => ({
        width: window.innerWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      expect(layout.scroll, route).toBeLessThanOrEqual(layout.width + 1);
      await expect(page.locator("h1")).toBeVisible();
      if (width === 390 || width === 1440) {
        // Trigger normal lazy loading before reviewing a complete page capture.
        for (const image of await page.locator("img:visible").all()) {
          await image.scrollIntoViewIfNeeded();
          await expect
            .poll(() =>
              image.evaluate(
                (element: HTMLImageElement) => element.naturalWidth,
              ),
            )
            .toBeGreaterThan(0);
        }
        await page.evaluate(() =>
          window.scrollTo({ top: 0, behavior: "instant" }),
        );
        await page.screenshot({
          path: `test-results/screenshots/${route === "/" ? "home" : route.split("/").pop()}-${width}.png`,
          fullPage: true,
        });
        if (route === "/")
          await page.screenshot({
            path: `test-results/screenshots/home-${width}-hero.png`,
          });
      }
    }
  });
}

test("acessibilidade WCAG AA nas cinco páginas", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of routes) {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    const summary = result.violations.map(({ id, nodes }) => ({
      id,
      nodes: nodes.map(({ target, failureSummary }) => ({
        target,
        failureSummary,
      })),
    }));
    expect(summary, JSON.stringify(summary, null, 2)).toEqual([]);
  }
});

test("movimento reduzido, SEO, assets e 404", async ({ page, request }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".orbital-sculpture")).toHaveCSS(
    "animation-name",
    "none",
  );
  expect(await page.locator("html").getAttribute("lang")).toBe("pt-BR");
  const titles = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    titles.add(await page.title());
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.+/,
    );
  }
  expect(titles.size).toBe(5);
  for (const route of [
    "/robots.txt",
    "/sitemap.xml",
    "/opengraph-image",
    "/icon.svg",
  ])
    expect((await request.get(route)).status()).toBe(200);
  const response = await page.goto("/pagina-inexistente");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("Este caminho");
});

test("todas as composições de galeria permanecem acessíveis", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of routes.slice(1)) {
    await page.goto(route);
    const choices = page.locator(".gallery-thumbnails button");
    for (let index = 0; index < (await choices.count()); index++) {
      await choices.nth(index).click();
      const result = await new AxeBuilder({ page })
        .include(".gallery")
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      const violations = result.violations.map(({ id, nodes }) => ({
        id,
        nodes: nodes.map(({ target, failureSummary }) => ({
          target,
          failureSummary,
        })),
      }));
      expect(
        violations,
        `${route} / ${index}: ${JSON.stringify(violations)}`,
      ).toEqual([]);
      if (index === 1)
        await page.locator(".gallery-stage").screenshot({
          path: `test-results/screenshots/${route.split("/").pop()}-gallery.png`,
          style:
            ".site-header, .scroll-progress, .back-to-top { visibility: hidden; }",
        });
    }
  }
});

test("conteúdo principal permanece disponível sem JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  try {
    const page = await context.newPage();
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("main")).not.toHaveCSS("opacity", "0");
    }
  } finally {
    await context.close();
  }
});

test("dados profissionais, atribuições e links atualizados", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#sobre")).toContainText(
    "2 anos de experiência prática",
  );
  await expect(page.locator("#sobre")).toContainText("2023–2026");
  await expect(page.locator("#experiencia")).toContainText(
    "Estagiário em Desenvolvimento Oracle APEX",
  );
  await expect(page.locator("#experiencia")).toContainText("Jul/2025 — Atual");
  await expect(
    page.locator('#contato a[href="https://github.com/gusz11"]'),
  ).toBeVisible();
  await expect(
    page.locator(
      '#contato a[href="https://linkedin.com/in/gustavo-jesus-de-souza-344743288"]',
    ),
  ).toBeVisible();
  await expect(
    page.locator('#contato a[href="mailto:gusjesus09@gmail.com"]'),
  ).toBeVisible();
  const credentials = page.locator("#certificacoes a");
  await expect(credentials).toHaveCount(2);
  for (const link of await credentials.all())
    await expect(link).toHaveAttribute(
      "href",
      /^https:\/\/catalog-education\.oracle\.com\/ords\/certview\/sharebadge\?id=[A-F0-9]+$/,
    );
  await page.goto("/projetos/garago");
  await expect(page.locator(".case-meta")).toContainText(
    "Desenvolvimento integral do frontend mobile",
  );
  await expect(page.locator(".case-stack")).toContainText("outra equipe");
  await page.goto("/projetos/luria");
  await expect(
    page.getByRole("link", { name: /Acessar aplicação/ }),
  ).toHaveAttribute("href", "https://www.resibulando.online");
  await expect(page.getByRole("link", { name: /^Ver código/ })).toHaveCount(0);
  await page.goto("/projetos/ondefica");
  await expect(page.locator(".case-stack")).toContainText("React Native");
  await expect(page.locator(".case-stack")).toContainText("Python");
  await expect(page.locator(".case-stack")).toContainText("FastAPI");
  await expect(page.locator(".case-meta")).toContainText(
    "Desenvolvimento completo — frontend e backend",
  );
  await expect(
    page.getByRole("heading", { name: "Próximos passos" }),
  ).toHaveCount(0);
  await expect(page.getByRole("link", { name: /^Repositório/ })).toHaveCount(0);
});

test("OndeFica usa dois smartphones reais na capa e sete capturas na galeria", async ({
  page,
}) => {
  await page.goto("/projetos/ondefica");
  const cover = page.locator(".case-hero .ondefica-cover");
  await expect(cover.locator(".ondefica-device img")).toHaveCount(2);
  await expect(cover.locator(".ondefica-device-primary img")).toHaveAttribute(
    "alt",
    /Museu Nacional/,
  );
  await expect(cover.locator(".ondefica-device-secondary img")).toHaveAttribute(
    "alt",
    /Programação/,
  );
  for (const image of await cover.locator("img").all())
    await expect
      .poll(() =>
        image.evaluate((element: HTMLImageElement) => element.naturalWidth),
      )
      .toBeGreaterThan(0);
  const thumbnails = page.locator(".gallery-thumbnails button");
  for (let index = 0; index < 7; index++) {
    await thumbnails.nth(index).click();
    const image = page.locator(".gallery-stage .project-screenshot img");
    await expect(image).toBeVisible();
    await expect
      .poll(() =>
        image.evaluate((element: HTMLImageElement) => element.naturalWidth),
      )
      .toBeGreaterThan(0);
  }
  await expect(page.locator(".gallery-note")).toHaveCount(0);
  await page.locator(".case-hero .ondefica-cover").screenshot({
    path: "test-results/screenshots/ondefica-cover-desktop.png",
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await cover.screenshot({
    path: "test-results/screenshots/ondefica-cover-mobile.png",
  });
  await page.goto("/#projetos");
  await expect(
    page.locator(".card-ondefica .ondefica-cover .ondefica-device"),
  ).toHaveCount(2);
  await page.locator(".card-ondefica").scrollIntoViewIfNeeded();
  for (const image of await page.locator(".card-ondefica img").all())
    await expect
      .poll(() =>
        image.evaluate((element: HTMLImageElement) => element.naturalWidth),
      )
      .toBeGreaterThan(0);
  await page
    .locator(".card-ondefica")
    .screenshot({ path: "test-results/screenshots/ondefica-card-mobile.png" });
  await expect(
    page.locator(".card-garago .garago-cover-device img"),
  ).toHaveCount(2);
});

test("capa do OndeFica mantém o placeholder se uma captura falhar", async ({
  page,
}) => {
  await page.route("**/_next/image?*", async (route) => {
    const image = new URL(route.request().url()).searchParams.get("url");
    if (image?.endsWith("/01-explorar.jpg")) await route.abort();
    else await route.continue();
  });
  await page.goto("/projetos/ondefica");
  await expect(page.locator(".case-hero .demo-travel")).toBeVisible();
  await expect(page.locator(".case-hero .demo-disclaimer")).toHaveText(
    "Demonstração visual",
  );
});

test("galeria editorial do OndeFica: sete telas, proporções e ampliação", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const titles = [
    "Descubra Brasília.",
    "Conheça cada lugar.",
    "Sua viagem começa aqui.",
    "Guarde suas descobertas.",
    "Planeje cada momento.",
    "Tudo no seu tempo.",
    "Do seu jeito.",
  ];
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/projetos/ondefica");
    const panel = page.locator(".gallery-stage .ondefica-gallery-slide");
    const heights: number[] = [];
    for (let index = 0; index < titles.length; index++) {
      await page.locator(".gallery-thumbnails button").nth(index).click();
      await expect(panel.getByRole("heading", { level: 3 })).toHaveText(
        titles[index],
      );
      const image = panel.locator(".project-screenshot img");
      await expect
        .poll(() =>
          image.evaluate((element: HTMLImageElement) => element.naturalWidth),
        )
        .toBeGreaterThan(0);
      const geometry = await panel.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        const copy = element
          .querySelector(".ondefica-gallery-editorial")!
          .getBoundingClientRect();
        const phone = element
          .querySelector(".ondefica-device")!
          .getBoundingClientRect();
        return {
          panelHeight: bounds.height,
          copyRight: copy.right,
          copyBottom: copy.bottom,
          phoneLeft: phone.left,
          phoneTop: phone.top,
          phoneBottom: phone.bottom,
          panelBottom: bounds.bottom,
          phoneHeight: phone.height,
        };
      });
      if (width >= 768) {
        expect(geometry.phoneLeft).toBeGreaterThanOrEqual(geometry.copyRight);
        expect(geometry.phoneHeight / geometry.panelHeight).toBeGreaterThan(
          0.83,
        );
      } else expect(geometry.phoneTop).toBeGreaterThan(geometry.copyBottom);
      heights.push(geometry.panelHeight);
      expect(geometry.phoneBottom).toBeLessThanOrEqual(
        geometry.panelBottom + 1,
      );
      if (index === 0 || (width === 1440 && index === 4))
        await panel.screenshot({
          path: `test-results/screenshots/ondefica-editorial-${width}-${index + 1}.png`,
          style:
            ".site-header, .scroll-progress, .back-to-top { visibility: hidden; }",
        });
    }
    expect(Math.max(...heights) - Math.min(...heights)).toBeLessThanOrEqual(1);
    const previewImage = page.locator(".gallery-stage .project-screenshot img");
    const previewWidth = await previewImage.evaluate(
      (element) => element.getBoundingClientRect().width,
    );
    await page
      .getByRole("button", { name: "Ampliar: Configurações", exact: true })
      .click();
    const dialog = page.getByRole("dialog", {
      name: "Imagem ampliada do projeto",
    });
    await expect(dialog).toBeVisible();
    await expect(dialog.locator(".ondefica-gallery-slide")).toHaveCount(0);
    const enlargedWidth = await dialog
      .locator(".project-screenshot img")
      .evaluate((element) => element.getBoundingClientRect().width);
    expect(enlargedWidth).toBeGreaterThan(previewWidth);
    await dialog.screenshot({
      path: `test-results/screenshots/ondefica-lightbox-${width}.png`,
    });
    await dialog.evaluate((element) => {
      element.scrollTop = element.scrollHeight;
    });
    await expect(
      dialog.getByRole("button", { name: "Fechar imagem ampliada" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  }
  await page.goto("/projetos/garago");
  await expect(page.locator(".gallery .ondefica-gallery-slide")).toHaveCount(0);
  await expect(
    page.locator(".gallery-stage .garago-gallery-slide"),
  ).toBeVisible();
  await page.locator(".gallery-stage").screenshot({
    path: "test-results/screenshots/garago-gallery-reference.png",
    style:
      ".site-header, .scroll-progress, .back-to-top { visibility: hidden; }",
  });
});

test("Garago: sete capturas reais, proporções e lightbox nas sete larguras", async ({
  page,
  request,
}) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const gallery = projects.find(({ slug }) => slug === "garago")!.gallery;
  expect(gallery.map(({ label }) => label)).toEqual([
    "Catálogo",
    "Detalhes da vaga",
    "Contato e avaliações",
    "Reservas",
    "Inventário",
    "Adicionar item",
    "Perfil",
  ]);
  for (const image of gallery) {
    const response = await request.get(image.path);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/jpeg");
  }
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/projetos/garago");
    await expect(
      page.locator(".case-hero .garago-cover-device img"),
    ).toHaveCount(2);
    const panel = page.locator(".gallery-stage .garago-gallery-slide");
    for (let index = 0; index < gallery.length; index++) {
      const screen = gallery[index];
      await page.locator(".gallery-thumbnails button").nth(index).click();
      await expect(panel.getByRole("heading", { level: 3 })).toHaveText(
        screen.presentation!.title,
      );
      await expect(panel.locator(".garago-gallery-note")).toContainText(
        "dados demonstrativos",
      );
      const image = panel.locator("img");
      await expect(image).toHaveAttribute("alt", screen.alt);
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate((element: HTMLImageElement) => element.naturalWidth),
        )
        .toBeGreaterThan(0);
      const geometry = await panel.evaluate((element) => {
        const panel = element.getBoundingClientRect();
        const copy = element
          .querySelector(".garago-gallery-editorial")!
          .getBoundingClientRect();
        const phone = element
          .querySelector(".garago-gallery-device")!
          .getBoundingClientRect();
        const image = element.querySelector("img") as HTMLImageElement;
        return {
          panelBottom: panel.bottom,
          panelHeight: panel.height,
          copyRight: copy.right,
          copyBottom: copy.bottom,
          phoneLeft: phone.left,
          phoneTop: phone.top,
          phoneBottom: phone.bottom,
          phoneHeight: phone.height,
          objectFit: getComputedStyle(image).objectFit,
          ratio: image.naturalWidth / image.naturalHeight,
          overflow:
            document.documentElement.scrollWidth > window.innerWidth + 1,
        };
      });
      expect(geometry.overflow).toBe(false);
      expect(geometry.objectFit).toBe("contain");
      expect(geometry.ratio).toBeCloseTo(738 / 1600, 2);
      expect(geometry.phoneBottom).toBeLessThanOrEqual(
        geometry.panelBottom + 1,
      );
      if (width >= 768) {
        expect(geometry.phoneLeft).toBeGreaterThan(geometry.copyRight);
        expect(geometry.phoneHeight / geometry.panelHeight).toBeGreaterThan(
          0.83,
        );
      } else expect(geometry.phoneTop).toBeGreaterThan(geometry.copyBottom);
      if (index === 0 || (width === 1440 && index === 5))
        await panel.screenshot({
          path: `test-results/screenshots/garago-real-${width}-${index + 1}.png`,
          style:
            ".site-header, .scroll-progress, .back-to-top, .skip-link { visibility: hidden; }",
        });
    }
    const previewWidth = await panel
      .locator("img")
      .evaluate((image) => image.getBoundingClientRect().width);
    const expand = page.locator(".gallery-expand");
    await expect(expand).toHaveAccessibleName("Ampliar: Perfil");
    await expand.click();
    const dialog = page.getByRole("dialog", {
      name: "Imagem ampliada do projeto",
    });
    await expect(dialog).toBeVisible();
    await expect(
      dialog.locator(".garago-gallery-slide, .garago-gallery-device"),
    ).toHaveCount(0);
    const raw = dialog.locator("img");
    await expect
      .poll(() => raw.evaluate((image: HTMLImageElement) => image.naturalWidth))
      .toBeGreaterThan(0);
    expect(
      await raw.evaluate((image) => image.getBoundingClientRect().width),
    ).toBeGreaterThan(previewWidth);
    const bounds = await raw.boundingBox();
    expect(bounds!.width / bounds!.height).toBeCloseTo(738 / 1600, 2);
    await page.keyboard.press("Shift+Tab");
    expect(
      await dialog.evaluate((element) =>
        element.contains(document.activeElement),
      ),
    ).toBe(true);
    await page.keyboard.press("ArrowRight");
    await expect(dialog.locator("img")).toHaveAttribute("alt", gallery[0].alt);
    if (width === 390 || width === 1440)
      await dialog.screenshot({
        path: `test-results/screenshots/garago-lightbox-${width}.png`,
      });
    await dialog.evaluate((element) => {
      element.scrollTop = element.scrollHeight;
    });
    await expect(
      dialog.getByRole("button", { name: "Fechar imagem ampliada" }),
    ).toBeVisible();
    const result = await new AxeBuilder({ page })
      .include(".garago-gallery-dialog")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(expand).toBeFocused();
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  }
});

test("Garago azul: capa real e composição isolada em todas as larguras", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const garago = projects.find(({ slug }) => slug === "garago")!;
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const home of [false, true]) {
      await page.goto(home ? "/#projetos" : "/projetos/garago");
      const cover = page.locator(
        home ? ".card-garago .garago-cover" : ".case-hero .garago-cover",
      );
      await cover.scrollIntoViewIfNeeded();
      await expect(cover.locator("img")).toHaveCount(2);
      await expect(cover.locator(".demo-disclaimer, .demo-garago")).toHaveCount(
        0,
      );
      await expect(cover).toHaveCSS("background-color", "rgb(220, 235, 247)");
      await expect(
        cover.locator(".garago-cover-device-primary img"),
      ).toHaveAttribute("alt", garago.gallery[0].alt);
      await expect(
        cover.locator(".garago-cover-device-secondary img"),
      ).toHaveAttribute("alt", garago.gallery[4].alt);
      for (const image of await cover.locator("img").all()) {
        await expect
          .poll(() =>
            image.evaluate((element: HTMLImageElement) => element.naturalWidth),
          )
          .toBeGreaterThan(0);
        await expect(image).toHaveCSS("object-fit", "contain");
      }
      const geometry = await cover.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        return Array.from(element.querySelectorAll(".garago-cover-device")).map(
          (device) => {
            const phone = device.getBoundingClientRect();
            return (
              phone.left >= bounds.left &&
              phone.right <= bounds.right &&
              phone.top >= bounds.top &&
              phone.bottom <= bounds.bottom
            );
          },
        );
      });
      expect(geometry).toEqual([true, true]);
      if ([390, 768, 1440].includes(width))
        await cover.screenshot({
          path: `test-results/screenshots/garago-blue-${home ? "card" : "cover"}-${width}.png`,
          style:
            ".site-header, .skip-link, .scroll-progress, .back-to-top { visibility: hidden; }",
        });
      if (!home) {
        await expect(page.locator(".project-status")).toContainText(
          "Em desenvolvimento",
        );
        const panel = page.locator(".garago-gallery-slide");
        await expect(panel).toHaveCSS("background-color", "rgb(220, 235, 247)");
        if (width === 390) {
          const geometry = await panel.evaluate((element) => {
            const panel = element.getBoundingClientRect();
            const device = element
              .querySelector(".garago-gallery-device")!
              .getBoundingClientRect();
            const copy = element
              .querySelector(".garago-gallery-editorial")!
              .getBoundingClientRect();
            const note = element
              .querySelector(".garago-gallery-note")!
              .getBoundingClientRect();
            return {
              deviceOffset: device.top - panel.top,
              copyBottom: copy.bottom,
              deviceTop: device.top,
              deviceBottom: device.bottom,
              noteTop: note.top,
            };
          });
          expect(geometry.deviceOffset).toBeLessThan(240);
          expect(geometry.deviceTop).toBeGreaterThan(geometry.copyBottom);
          expect(geometry.noteTop).toBeGreaterThan(geometry.deviceBottom);
        }
      }
    }
  }
});

test("Garago: touch, ciclo das setas e falha de imagem identificada", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    reducedMotion: "reduce",
  });
  try {
    const page = await context.newPage();
    await page.goto("/projetos/garago");
    const choices = page.locator(".gallery-thumbnails button");
    const stage = page.locator(".gallery-stage");
    await stage.dispatchEvent("pointerdown", {
      pointerType: "touch",
      clientX: 300,
      clientY: 400,
    });
    await stage.dispatchEvent("pointerup", {
      pointerType: "touch",
      clientX: 100,
      clientY: 410,
    });
    await expect(choices.nth(1)).toHaveAttribute("aria-pressed", "true");
    await stage.dispatchEvent("pointerdown", {
      pointerType: "touch",
      clientX: 150,
      clientY: 400,
    });
    await stage.dispatchEvent("pointerup", {
      pointerType: "touch",
      clientX: 160,
      clientY: 200,
    });
    await expect(choices.nth(1)).toHaveAttribute("aria-pressed", "true");
    await page
      .locator(".gallery > .gallery-controls")
      .getByRole("button", { name: "Imagem anterior" })
      .tap();
    await expect(choices.nth(0)).toHaveAttribute("aria-pressed", "true");
    await page
      .locator(".gallery > .gallery-controls")
      .getByRole("button", { name: "Imagem anterior" })
      .tap();
    await expect(choices.nth(6)).toHaveAttribute("aria-pressed", "true");
    await page.route("**/_next/image?*", async (route) => {
      const path = new URL(route.request().url()).searchParams.get("url");
      if (path?.includes("/garago/")) await route.abort();
      else await route.continue();
    });
    await page.reload();
    await expect(page.locator(".gallery-stage .demo-disclaimer")).toHaveText(
      "Demonstração visual",
    );
  } finally {
    await context.close();
  }
});
