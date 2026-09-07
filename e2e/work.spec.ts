import { expect, test } from "@playwright/test";

test("work index lists the four products", async ({ page }) => {
  await page.goto("/work");
  await expect(page.getByRole("heading", { level: 1, name: "Shipped products" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Patchlist/ })).toHaveAttribute("href", "/work/patchlist");
  await expect(page.getByRole("link", { name: /Gearmind/ })).toHaveAttribute("href", "/work/gearmind");
});

test("patchlist case study has a live link and no invented metric", async ({ page }) => {
  await page.goto("/work/patchlist");
  await expect(page.getByRole("heading", { level: 1, name: "Patchlist" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open the live product" })).toHaveAttribute(
    "href",
    "https://patchlist.app",
  );
  await expect(page.getByText("Live at patchlist.app")).toBeVisible();
});

test("gearmind has no live URL", async ({ page }) => {
  await page.goto("/work/gearmind");
  await expect(page.getByRole("heading", { level: 1, name: "Gearmind" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open the live product" })).toHaveCount(0);
});

test("unknown work slug is a not found page", async ({ page }) => {
  const response = await page.goto("/work/not-a-job");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "Not found" })).toBeVisible();
});
