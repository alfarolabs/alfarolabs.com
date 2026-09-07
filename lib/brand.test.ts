import { expect, test } from "vitest";
import { brand } from "./brand";

test("studio name", () => {
  expect(brand.studio).toBe("Alfaro Labs");
});
