import { expect, test } from "@playwright/test";

test("home shows the hire first screen", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Carlos Alfaro" })).toBeVisible();
  await expect(page.getByText("I ship tools and products. Agentic engineering is how I run the work.")).toBeVisible();
  await expect(page.getByRole("link", { name: "See the work" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Hire me" })).toHaveAttribute(
    "href",
    "mailto:carlos@alfarolabs.com",
  );
  await expect(page.getByRole("heading", { name: "Contract" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Technical lead" })).toBeVisible();
});

test("work cards go to case studies", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /Patchlist/ })).toHaveAttribute("href", "/work/patchlist");
  await expect(page.getByRole("link", { name: /Gearmind/ })).toHaveAttribute("href", "/work/gearmind");
  await expect(page.getByRole("link", { name: /Dial/ })).toHaveAttribute("href", "/work/dial");
});

test("unknown path is a not found page", async ({ page }) => {
  const response = await page.goto("/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "Not found" })).toBeVisible();
});
