import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync, readFileSync } from "node:fs";
import { resumeProfile, resumeSections } from "../src/data/resume.ts";
import { getActiveResumeEntry } from "../src/lib/resume.ts";

test("resume overview and details share unique entries in the PDF's order", () => {
  const entries = resumeSections.flatMap(section => section.entries);
  assert.deepEqual(resumeSections.map(section => section.id), ["education", "experience", "projects", "activities", "skills"]);
  assert.deepEqual(entries.map(entry => entry.id), [
    "miami-university", "jpmorgan-chase", "peer-career-coach", "fire",
    "riven-market", "pose-detection", "shpe-president", "technical-skills",
  ]);
  assert.equal(new Set(entries.map(entry => entry.id)).size, entries.length);
  for (const entry of entries) {
    assert.ok(entry.title && entry.summary && entry.bullets.length);
    if (entry.projectHref) assert.ok(existsSync(new URL(`../src/app${entry.projectHref}/page.tsx`, import.meta.url)));
  }
  const pdf = readFileSync(new URL(`../public${resumeProfile.pdfHref}`, import.meta.url));
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
});

test("active entry tracks boundaries, large jumps, reverse scrolling, and the last entry", () => {
  const positions = offset => [
    { id: "first", top: 1000 - offset, bottom: 1600 - offset },
    { id: "middle", top: 1700 - offset, bottom: 2300 - offset },
    { id: "last", top: 2400 - offset, bottom: 3000 - offset },
  ];
  assert.equal(getActiveResumeEntry([], 1000), undefined);
  for (const [offset, expected] of [
    [0, "first"], [1349, "first"], [1350, "middle"], [1900, "middle"],
    [2000, "last"], [3000, "last"], [1900, "middle"], [1350, "middle"], [1349, "first"], [0, "first"],
  ]) {
    assert.equal(getActiveResumeEntry(positions(offset), 1000), expected, `scroll offset ${offset}`);
  }
  assert.equal(getActiveResumeEntry([{ id: "only", top: 1500, bottom: 2000 }], 800), "only");
});
