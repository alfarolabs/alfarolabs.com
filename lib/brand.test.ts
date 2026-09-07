import { expect, test } from "vitest";
import { STUDIO } from "./brand";

test("studio name", () => {
  expect(STUDIO).toBe("Alfaro Labs");
});
