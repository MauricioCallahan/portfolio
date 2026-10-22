"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { getWelcomeProgress } from "@/lib/welcome";

export default function WelcomeFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motion = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = motion.matches ? getWelcomeProgress(window.scrollY) : 1;
      element.style.setProperty("--welcome-scale", String(0.96 + progress * 0.04));
      element.style.setProperty("--welcome-radius", `${80 - progress * 40}px`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    motion.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      motion.removeEventListener("change", schedule);
    };
  }, []);

  return <div className="welcome-frame" ref={ref}>{children}</div>;
}
