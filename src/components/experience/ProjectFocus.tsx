"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { ResumeEntry } from "@/data/resume";
import type { Project } from "@/data/projects";
import { getProjectFocusTransform } from "@/lib/resume";
import { coordinateProjectFocus, type ProjectFocusPhase } from "@/lib/projectFocus";
import ProjectDetails from "@/components/projects/ProjectDetails";
import ResumeEntryCard from "./ResumeEntryCard";

export type ProjectSelection = {
  entry: ResumeEntry;
  project: Project;
  source: DOMRect;
  scrollX: number;
  scrollY: number;
  trigger: HTMLAnchorElement;
};

export default function ProjectFocus({ selection, onClose }: { selection: ProjectSelection; onClose: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const blurRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const dismissRef = useRef<() => void>(() => {});
  const [phase, setPhase] = useState<ProjectFocusPhase>("moving-card");
  const [sticky, setSticky] = useState(false);
  const close = useCallback(() => dismissRef.current(), []);

  useLayoutEffect(() => {
    const root = rootRef.current!;
    const anchor = anchorRef.current!;
    const card = cardRef.current!;
    const details = detailsRef.current!;
    const blur = blurRef.current!;
    const overview = document.querySelector<HTMLElement>(".resume-overview")!;
    const source = selection.trigger.closest("article")!;
    const background = Array.from(document.querySelectorAll<HTMLElement>("body > nav, body > main, body > footer"));
    const previousInert = background.map(element => element.inert);
    background.forEach(element => { element.inert = true; });
    const originalMinHeight = document.body.style.minHeight;
    const originalHeight = document.documentElement.scrollHeight;
    let revealEnd = originalHeight;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let restore = false;
    const options: KeyframeAnimationOptions = { duration: 400, easing: "ease", fill: "both" };
    const move = card.animate([], options);
    const reveal = details.animate([
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)" },
    ], { ...options, duration: 600 });
    const resume = overview.animate([
      { transform: "var(--resume-overview-transform)", opacity: 1 },
      { transform: "translateX(calc(-100% - 48px))", opacity: 0 },
    ], options);
    [move, reveal, resume].forEach(animation => { animation.pause(); animation.currentTime = 0; });
    const syncBlur = () => {
      const progress = Number(reveal.effect!.getComputedTiming().progress ?? 0);
      // Sweep through the whole document, then convert the shared boundary to viewport coordinates.
      const documentBoundary = selection.scrollY + (revealEnd - selection.scrollY) * progress;
      const boundary = Math.max(0, Math.min(window.innerHeight, documentBoundary - window.scrollY));
      blur.style.clipPath = `inset(0 0 ${window.innerHeight - boundary}px 0)`;
      blur.style.visibility = progress > 0 ? "visible" : "hidden";
    };
    const measure = () => {
      setSticky(window.innerWidth >= 1024 && anchor.getBoundingClientRect().height <= window.innerHeight - 48);
      (move.effect as KeyframeEffect).setKeyframes([
        { transform: getProjectFocusTransform(source.getBoundingClientRect(), anchor.getBoundingClientRect()), transformOrigin: "top left" },
        { transform: "none", transformOrigin: "top left" },
      ]);
      document.body.style.minHeight = `${Math.max(originalHeight, root.offsetTop + root.offsetHeight + 24)}px`;
      revealEnd = document.documentElement.scrollHeight;
      const detailsBottom = details.getBoundingClientRect().bottom + window.scrollY;
      (reveal.effect as KeyframeEffect).setKeyframes([
        { clipPath: `inset(0 0 ${detailsBottom - selection.scrollY}px 0)` },
        { clipPath: `inset(0 0 ${detailsBottom - revealEnd}px 0)` },
      ]);
      syncBlur();
    };
    const tick = () => {
      frame = 0;
      syncBlur();
      // Offscreen return animations still need frame updates to deliver their completion.
      if ([move, reveal, resume].some(animation => animation.playState === "running" || animation.pending)) frame = requestAnimationFrame(tick);
    };
    const controller = coordinateProjectFocus({
      move, reveal, resume,
      reducedMotion: () => reducedMotion.matches,
      phase: next => {
        root.dataset.phase = next;
        setPhase(next);
        if (next === "concealing-details") backRef.current?.focus({ preventScroll: true });
        syncBlur();
        if (next !== "open" && !frame) frame = requestAnimationFrame(tick);
      },
      complete: () => { restore = true; onClose(); },
    });
    dismissRef.current = controller.close;
    const observer = window.ResizeObserver ? new ResizeObserver(measure) : undefined;
    observer?.observe(root);
    observer?.observe(anchor);
    observer?.observe(source);
    window.addEventListener("resize", measure);
    // Scrolling changes both the reveal boundary and the source/target viewport positions.
    window.addEventListener("scroll", measure, { passive: true });
    const motionChange = () => {
      if (reducedMotion.matches) [move, reveal, resume].forEach(animation => {
        if (animation.playState === "running") animation.finish();
      });
    };
    reducedMotion.addEventListener("change", motionChange);
    measure();
    backRef.current?.focus({ preventScroll: true });

    const pointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      const bounds = root.querySelector(".project-focus-grid")!.getBoundingClientRect();
      const inContent = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
      if (!inContent && !root.querySelector(".project-focus-controls")!.contains(target)) close();
    };
    const keyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.key !== "Tab") return;
      const controls = Array.from(root.querySelectorAll<HTMLElement>("a[href], button, [tabindex]:not([tabindex='-1'])"))
        .filter(element => !element.closest("[inert]") && element.getClientRects().length);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("pointerdown", pointerDown);
    document.addEventListener("keydown", keyDown);
    return () => {
      dismissRef.current = () => {};
      controller.dispose();
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
      reducedMotion.removeEventListener("change", motionChange);
      document.removeEventListener("pointerdown", pointerDown);
      document.removeEventListener("keydown", keyDown);
      background.forEach((element, index) => { element.inert = previousInert[index]; });
      document.body.style.minHeight = originalMinHeight;
      if (restore) {
        window.scrollTo({ left: selection.scrollX, top: selection.scrollY, behavior: "instant" });
        if (selection.trigger.isConnected) selection.trigger.focus({ preventScroll: true });
      }
    };
  }, [selection, close, onClose]);

  return createPortal(
    <>
      <div ref={blurRef} className="project-focus-blur" aria-hidden="true" />
      <div ref={rootRef} className="project-focus" data-phase={phase} style={{ top: selection.scrollY + 24 }} role="dialog" aria-modal="true" aria-labelledby={`heading-focus-${selection.entry.id}`}>
        <div className="project-focus-controls">
          <button ref={backRef} className="button" type="button" onClick={close}>← Back to experience</button>
          <Link className="text-link" href={`/projects/${selection.project.slug}`}>Open project page ↗</Link>
          <span className="project-focus-status" role="status">{phase === "open" ? "Project details open" : phase === "moving-card" || phase === "revealing-details" ? "Opening project…" : "Returning to experience…"}</span>
        </div>
        <div className="project-focus-grid">
          <div ref={anchorRef} className="project-focus-anchor" data-sticky={sticky || undefined}>
            <div ref={cardRef}><ResumeEntryCard entry={selection.entry} focused /></div>
          </div>
          <div ref={detailsRef} className="project-focus-details" inert={phase !== "open"} aria-hidden={phase !== "open"}>
            <ProjectDetails project={selection.project} />
            <Link className="text-link" href={`/projects/${selection.project.slug}`}>Even deeper dive??</Link>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
