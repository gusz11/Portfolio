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
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card h3")).toHaveText("Garago");
  await page.getByRole("button", { name: "Web", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(3);
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
        await page
          .locator(".gallery-stage")
          .screenshot({
            path: `test-results/screenshots/${route.split("/").pop()}-gallery.png`,
          });
    }
  }
});

test("conteúdo principal permanece disponível sem JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    for (const route of routes) {
      await page.goto(`http://127.0.0.1:3000${route}`);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("main")).not.toHaveCSS("opacity", "0");
    }
  } finally {
    await context.close();
  }
});
