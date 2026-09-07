import { expect, test } from "@playwright/test";

test("stored dark preference paints dark on first load", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("theme", "dark");
  });
  await page.goto("/");
  await expect.poll(async () => page.locator("html").evaluate((el) => el.classList.contains("dark"))).toBe(true);
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(26, 25, 22)");
  await expect(page.locator("body")).toHaveCSS("color", "rgb(244, 241, 234)");
});

test("stored light preference paints paper", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("theme", "light");
  });
  await page.goto("/");
  await expect.poll(async () => page.locator("html").evaluate((el) => el.classList.contains("dark"))).toBe(false);
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(244, 241, 234)");
});

test("toggle persists across reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Toggle theme" });
  await expect(toggle).toBeEnabled();
  await expect.poll(async () => page.locator("html").evaluate((el) => el.classList.contains("dark"))).toBe(false);
  await toggle.click();
  await expect.poll(async () => page.locator("html").evaluate((el) => el.classList.contains("dark"))).toBe(true);
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");
  await page.reload();
  await expect.poll(async () => page.locator("html").evaluate((el) => el.classList.contains("dark"))).toBe(true);
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(26, 25, 22)");
});

test("system dark with no storage uses dark", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect.poll(async () => page.locator("html").evaluate((el) => el.classList.contains("dark"))).toBe(true);
});
