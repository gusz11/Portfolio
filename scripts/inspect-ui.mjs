import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1024, height: 900 },
    reducedMotion: "reduce",
  });
  await page.goto("http://127.0.0.1:3000");
  await page.evaluate(() => document.fonts.ready);
  console.log(
    "Overflow:",
    await page.evaluate(() =>
      [...document.querySelectorAll("body *")]
        .map((element) => ({
          tag: element.tagName,
          class: element.className,
          left: element.getBoundingClientRect().left,
          right: element.getBoundingClientRect().right,
        }))
        .filter((item) => item.right > innerWidth + 1 || item.left < -1),
    ),
  );
  await mkdir("test-results/screenshots", { recursive: true });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("http://127.0.0.1:3000");
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: `test-results/screenshots/hero-review-${width}.png`,
    });
    await page.locator("#projetos").screenshot({
      path: `test-results/screenshots/projects-review-${width}.png`,
    });
  }
} finally {
  await browser.close();
}
