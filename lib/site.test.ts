import { expect, test } from "vitest";
import { person, workHref, works } from "./site";

test("four unique slugs", () => {
  const slugs = works.map((work) => work.slug);
  expect(slugs).toEqual(["patchlist", "gearmind", "crewbook", "dial"]);
  expect(new Set(slugs).size).toBe(slugs.length);
});

test("email is the studio mailbox", () => {
  expect(person.email).toBe("carlos@alfarolabs.com");
});

test("only live or beta rows have an href", () => {
  for (const work of works) {
    if (work.status === "live" || work.status === "beta") {
      expect(workHref(work)).toMatch(/^https:\/\//);
    } else {
      expect(workHref(work)).toBeUndefined();
    }
  }
});
