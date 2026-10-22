import assert from "node:assert/strict";
import { test } from "node:test";
import { getWelcomeProgress } from "../src/lib/welcome.ts";

test("welcome expansion clamps scroll progress and reverses without retaining state", () => {
  for (const [scroll, expected] of [[-40, 0], [0, 0], [120, 0.5], [240, 1], [800, 1], [120, 0.5], [0, 0]]) {
    assert.equal(getWelcomeProgress(scroll), expected);
  }
});
