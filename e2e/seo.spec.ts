import { expect, test } from "@playwright/test";

test("home has canonical, json-ld, and og title", async ({ page }) => {
  await page.goto("/");
  const canonical = page.locator('link[rel="canonical"]');
  await expect(canonical).toHaveAttribute("href", /alfarolabs\.com\/?$/);
  const json = page.locator('script[type="application/ld+json"]');
  await expect(json).toHaveCount(1);
  const parsed = JSON.parse((await json.textContent()) ?? "{}");
  expect(parsed["@type"]).toBe("Person");
  expect(parsed.name).toBe("Carlos Alfaro");
  const og = page.locator('meta[property="og:title"]');
  await expect(og).toHaveAttribute("content", "Carlos Alfaro");
});

test("sitemap lists work slugs", async ({ page }) => {
  const response = await page.goto("/sitemap.xml");
  expect(response?.ok()).toBeTruthy();
  const xml = (await response?.text()) ?? "";
  expect(xml).toContain("/work/patchlist");
  expect(xml).toContain("/contact");
});

test("robots points at the sitemap", async ({ page }) => {
  const response = await page.goto("/robots.txt");
  expect(response?.ok()).toBeTruthy();
  const text = (await response?.text()) ?? "";
  expect(text).toContain("Sitemap: https://alfarolabs.com/sitemap.xml");
});

test("contact has the mailto", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("main").getByRole("link", { name: "carlos@alfarolabs.com" })).toHaveAttribute(
    "href",
    "mailto:carlos@alfarolabs.com",
  );
});
