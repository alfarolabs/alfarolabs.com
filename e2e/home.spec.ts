import { expect, test } from "@playwright/test";

test("home shows Alfaro Labs", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Alfaro Labs" })).toBeVisible();
  await expect(page).toHaveTitle(/Alfaro Labs/);
});

test("unknown path is a not found page", async ({ page }) => {
  const response = await page.goto("/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "Not found" })).toBeVisible();
});
