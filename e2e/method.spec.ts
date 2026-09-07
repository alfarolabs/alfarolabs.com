import { expect, test } from "@playwright/test";

test("method has four steps and a hire link", async ({ page }) => {
  await page.goto("/method");
  await expect(page.getByRole("heading", { name: "Model the domain in types" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Let agents write against that model" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Prove it on the real app" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "You review the interaction, then we ship" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Hire me" })).toHaveAttribute("href", "/engage");
});

test("engage repeats both tracks and the mailto", async ({ page }) => {
  await page.goto("/engage");
  await expect(page.getByRole("heading", { name: "Contract", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Technical lead" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Email Carlos" })).toHaveAttribute(
    "href",
    "mailto:carlos@alfarolabs.com",
  );
});
