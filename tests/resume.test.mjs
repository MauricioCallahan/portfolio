import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync, readFileSync } from "node:fs";
import { resumeProfile, resumeSections } from "../src/data/resume.ts";
import { getActiveResumeEntry, getProjectFocusTransform } from "../src/lib/resume.ts";
import { projects } from "../src/data/projects.ts";

test("each project maps to its existing resume anchor and has usable shared details", () => {
  const entries = resumeSections.flatMap(section => section.entries).filter(entry => entry.projectHref);
  assert.equal(projects.length, entries.length);
  assert.equal(new Set(projects.map(project => project.resumeEntryId)).size, projects.length);
  for (const project of projects) {
    const entry = entries.find(entry => entry.id === project.resumeEntryId);
    assert.ok(entry);
    assert.equal(entry.projectHref, `/projects/${project.slug}`);
    assert.ok(project.sections.length);
    for (const section of project.sections) {
      assert.ok(section.title && section.paragraphs.length && section.paragraphs.every(paragraph => paragraph.trim()));
    }
  }
});

test("project movement starts at the source card, including scrolled and resized layouts", () => {
  const target = { left: 24, top: 100, width: 400, height: 600 };
  assert.equal(getProjectFocusTransform({ left: 456, top: -120, width: 400, height: 600 }, target), "translate(432px, -220px) scale(1, 1)");
  assert.equal(getProjectFocusTransform({ left: 24, top: 200, width: 800, height: 300 }, target), "translate(0px, 100px) scale(2, 0.5)");
  assert.equal(getProjectFocusTransform(target, target), "translate(0px, 0px) scale(1, 1)");
});

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

// A controllable WAAPI timeline verifies completion ordering without wall-clock delays.
class FocusAnimation {
  currentTime = 0;
  reverseCalls = 0;
  playbackRate = 1;
  playState = "paused";
  effect = { getTiming: () => ({ duration: 400 }) };
  constructor() { this.resetFinished(); }
  resetFinished() {
    this.finished = new Promise((resolve, reject) => { this.resolve = resolve; this.reject = reject; });
  }
  pause() { this.playState = "paused"; }
  play() {
    if (this.playState === "finished") this.resetFinished();
    this.playState = "running";
  }
  reverse() {
    this.reverseCalls++;
    this.playbackRate = -1;
    this.play();
  }
  finish() {
    this.currentTime = this.playbackRate < 0 ? 0 : 400;
    this.playState = "finished";
    this.resolve();
  }
  cancel() { this.playState = "idle"; this.reject(new Error("cancelled")); }
}
const flushFocus = async () => { for (let i = 0; i < 8; i++) await Promise.resolve(); };
async function focusSequence(reducedMotion = false) {
  const { coordinateProjectFocus } = await import("../src/lib/projectFocus.ts");
  const move = new FocusAnimation();
  const reveal = new FocusAnimation();
  const resume = new FocusAnimation();
  const phases = [];
  let completed = 0;
  const controller = coordinateProjectFocus({ move, reveal, resume, reducedMotion: () => reducedMotion, phase: value => phases.push(value), complete: () => completed++ });
  return { move, reveal, resume, phases, controller, completed: () => completed };
}

test("project phases await completion, dismiss once, and restore the resume last", async () => {
  const s = await focusSequence();
  assert.deepEqual(s.phases, ["moving-card"]);
  assert.equal(s.reveal.playState, "paused");
  s.move.finish(); s.resume.finish(); await flushFocus();
  assert.equal(s.phases.at(-1), "revealing-details");
  s.reveal.finish(); await flushFocus();
  assert.equal(s.phases.at(-1), "open");
  s.controller.close(); s.controller.close();
  assert.equal(s.phases.at(-1), "concealing-details");
  s.reveal.finish(); await flushFocus();
  assert.equal(s.phases.at(-1), "returning-card");
  s.move.finish(); await flushFocus();
  assert.equal(s.phases.at(-1), "restoring-resume");
  assert.equal(s.completed(), 0);
  s.resume.finish(); await flushFocus();
  assert.equal(s.completed(), 1);
  assert.equal(s.phases.length, 6);
});

test("dismissal during movement reverses current progress without revealing details", async () => {
  const s = await focusSequence();
  s.move.currentTime = 123;
  s.controller.close(); s.controller.close();
  assert.equal(s.move.currentTime, 123);
  assert.equal(s.move.playbackRate, -1);
  assert.equal(s.move.reverseCalls, 1);
  s.move.finish(); await flushFocus();
  assert.equal(s.reveal.playState, "paused");
  s.resume.finish(); await flushFocus();
  assert.deepEqual(s.phases, ["moving-card", "returning-card", "restoring-resume"]);
  assert.equal(s.completed(), 1);
});

test("dismissal during reveal reverses its progress before returning the card", async () => {
  const s = await focusSequence();
  s.move.finish(); s.resume.finish(); await flushFocus();
  s.reveal.currentTime = 217;
  s.controller.close();
  assert.equal(s.reveal.currentTime, 217);
  assert.equal(s.reveal.playbackRate, -1);
  assert.equal(s.reveal.reverseCalls, 1);
  assert.equal(s.move.playbackRate, 1);
  s.reveal.finish(); await flushFocus();
  assert.equal(s.move.playbackRate, -1);
  assert.ok(!s.phases.includes("open"));
  s.move.finish(); await flushFocus();
  s.resume.finish(); await flushFocus();
  assert.equal(s.completed(), 1);
});

test("navigation cancels every animation and prevents subsequent phase changes", async () => {
  for (const stage of ["moving", "revealing", "closing"]) {
    const s = await focusSequence();
    if (stage !== "moving") { s.move.finish(); await flushFocus(); }
    if (stage === "closing") s.controller.close();
    const phases = [...s.phases];
    s.controller.dispose(); s.controller.close(); await flushFocus();
    assert.deepEqual(s.phases, phases);
    assert.equal(s.completed(), 0);
    assert.ok([s.move, s.reveal, s.resume].every(animation => animation.playState === "idle"));
  }
});

test("reduced motion opens and closes without waiting for animation completion", async () => {
  const s = await focusSequence(true);
  await flushFocus();
  assert.equal(s.phases.at(-1), "open");
  s.controller.close(); await flushFocus();
  assert.equal(s.completed(), 1);
  assert.ok([s.move, s.reveal, s.resume].every(animation => animation.currentTime === 0));
});

test("dismissal before movement starts does not rewind an untouched animation from its end", async () => {
  const s = await focusSequence();
  s.controller.close();
  await flushFocus();
  assert.equal(s.move.currentTime, 0);
  assert.equal(s.move.playbackRate, 1);
  assert.equal(s.completed(), 1);
  assert.deepEqual(s.phases, ["moving-card", "returning-card", "restoring-resume"]);
  s.controller.dispose();
});
