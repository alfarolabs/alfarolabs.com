import { expect, test } from "vitest";
import { SITE_ORIGIN, routes } from "./seo";
import { works } from "./site";

test("origin is the apex", () => {
  expect(SITE_ORIGIN).toBe("https://alfarolabs.com");
});

test("sitemap list includes every work slug", () => {
  for (const work of works) {
    expect(routes).toContain(`/work/${work.slug}`);
  }
  expect(routes).toContain("/");
  expect(routes).toContain("/contact");
});
