import assert from "node:assert/strict";
import { test } from "node:test";
import { isActivePath } from "../src/lib/utils.ts";

test("navigation highlights the current section, including project details", () => {
  assert.equal(isActivePath("/", "/"), true);
  assert.equal(isActivePath("/about", "/about"), true);
  assert.equal(isActivePath("/projects/fire", "/projects"), true);
  assert.equal(isActivePath("/projects/fire", "/"), false);
  assert.equal(isActivePath("/projects-archive", "/projects"), false);
  assert.equal(isActivePath("/missing", "/about"), false);
});
