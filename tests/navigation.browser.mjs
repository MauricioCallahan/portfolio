// With the app on 127.0.0.1:3000, run with Playwright available via NODE_PATH.
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch({ channel: "msedge", headless: true });

try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));

  const aligned = () => page.waitForFunction(() => {
    const list = document.querySelector(".navbar-links");
    const active = list.querySelector('a[aria-current="page"]');
    const highlight = getComputedStyle(list, "::before");
    const transform = new DOMMatrixReadOnly(highlight.transform);
    return list.hasAttribute("data-highlight") && active &&
      Math.abs(transform.m41 - active.offsetLeft) < 1 &&
      Math.abs(transform.m42 - active.offsetTop) < 1 &&
      Math.abs(parseFloat(highlight.width) - active.offsetWidth) < 1 &&
      Math.abs(parseFloat(highlight.height) - active.offsetHeight) < 1;
  });

  for (const width of [1280, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("http://127.0.0.1:3000");
    await aligned();
    await page.evaluate(() => {
      window.navDocument = document;
      window.navElement = document.querySelector("body > nav");
      window.footerElement = document.querySelector("body > footer");
      window.navTransitions = [];
      window.pageArrivals = 0;
      document.addEventListener("animationstart", (event) => {
        if (event.animationName === "page-arrive") window.pageArrivals++;
      });
      document.querySelector(".navbar-links").addEventListener("transitionrun", (event) => {
        window.navTransitions.push(event.propertyName);
      });
    });
    const nav = page.getByRole("navigation", { name: "Main navigation" });
    for (const label of ["About Me", "Experience", "Projects", "Contact", "Home"]) {
      await nav.getByRole("link", { name: label, exact: true }).click();
      await page.waitForFunction((text) =>
        document.querySelector('.navbar-links a[aria-current="page"]')?.textContent === text, label);
      await aligned();
      assert.equal(await page.evaluate(() => window.navDocument === document), true,
        "navigation should preserve the shared highlight across pages");
      assert.equal(await page.evaluate(() =>
        window.navElement === document.querySelector("body > nav") &&
        window.footerElement === document.querySelector("body > footer")), true,
      "the navbar and footer should persist outside the page fade");
    }
    assert.ok(await page.evaluate(() => window.pageArrivals >= 5),
      "new page content should fade in on each navigation");
    await page.goBack();
    await page.waitForURL("**/contact");
    await aligned();
    await page.goForward();
    await page.waitForURL("http://127.0.0.1:3000/");
    await aligned();
    assert.ok(await page.evaluate(() => window.navTransitions.includes("transform")),
      "the highlight should slide between navigation items");
  }

  await page.goto("http://127.0.0.1:3000/projects/fire");
  await aligned();
  assert.equal(await page.locator('.navbar-links a[aria-current="page"]').textContent(), "Projects");
  await page.setViewportSize({ width: 1280, height: 900 });
  await aligned();

  await page.evaluate(() => {
    document.querySelector('.navbar-links a[href="/contact"]').click();
    requestAnimationFrame(() => document.querySelector('.navbar-links a[href="/about"]').click());
  });
  await page.waitForURL("**/about");
  await aligned();
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Home", exact: true }).focus();
  await page.keyboard.press("Enter");
  await page.waitForURL("http://127.0.0.1:3000/");
  await aligned();

  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(await page.locator(".navbar-links").evaluate((list) =>
    getComputedStyle(list, "::before").transitionDuration), "0s");
  await page.getByRole("navigation").getByRole("link", { name: "About Me" }).click();
  await page.waitForURL("**/about");
  await aligned();
  assert.equal(await page.locator(".page-transition").evaluate((content) =>
    getComputedStyle(content).animationName), "none");

  await page.goto("http://127.0.0.1:3000/missing");
  await page.waitForFunction(() => !document.querySelector(".navbar-links").hasAttribute("data-highlight"));
  assert.deepEqual(errors, []);
  console.log("Transition checks passed: desktop, wrapped mobile, history, nested routes, resize, rapid navigation, keyboard, page fades, reduced motion, and unmatched routes.");
} finally {
  await browser.close();
}
