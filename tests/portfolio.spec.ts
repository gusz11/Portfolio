import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/projetos/luria",
  "/projetos/dashboard-financeiro",
  "/projetos/garago",
  "/projetos/ondefica",
];
const widths = [320, 375, 390, 768, 1024, 1440, 1920];

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
  await expect(
    page.getByRole("link", { name: /^Repositório/ }),
  ).toHaveAttribute("href", "https://github.com/arantes225/luria");
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
  await expect(
    page.getByRole("link", { name: /^Repositório/ }),
  ).toHaveAttribute("href", "https://github.com/gusz11/OndeFica");
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
  await expect(page.locator(".card-garago .demo-garago .phone")).toHaveCount(2);
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
    page.locator(".gallery-stage .gallery-phone-demo"),
  ).toBeVisible();
  await page.locator(".gallery-stage").screenshot({
    path: "test-results/screenshots/garago-gallery-reference.png",
    style:
      ".site-header, .scroll-progress, .back-to-top { visibility: hidden; }",
  });
});
