import assert from "node:assert/strict";
import { test } from "node:test";
import { getLineProximity } from "../src/lib/lineProximity.ts";

test("line proximity peaks at the row center, falls off symmetrically, and clamps outside its radius", () => {
  assert.equal(getLineProximity(200, 200), 1);
  assert.equal(getLineProximity(140, 200), 0.5);
  assert.equal(getLineProximity(260, 200), 0.5);
  assert.equal(getLineProximity(80, 200), 0);
  assert.equal(getLineProximity(320, 200), 0);
  assert.equal(getLineProximity(-500, 200), 0);
});
