"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { resumeProfile, resumeSections } from "@/data/resume";
import { getActiveResumeEntry } from "@/lib/resume";

export default function InteractiveResume() {
  const stageRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLElement>(null);
  const initialHashAligned = useRef(false);
  const [enhanced, setEnhanced] = useState<boolean | null>(null);
  const [exploring, setExploring] = useState(false);
  const [activeId, setActiveId] = useState<string | undefined>();

  useEffect(() => {
    const overview = overviewRef.current;
    if (!overview || !window.ResizeObserver) {
      setEnhanced(false);
      return;
    }
    const measure = () => setEnhanced(
      window.innerWidth >= 1024 && overview.getBoundingClientRect().height <= window.innerHeight - 48,
    );
    const observer = new ResizeObserver(measure);
    observer.observe(overview);
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || enhanced === null) return;
    const details = Array.from(stage.querySelectorAll<HTMLElement>("[data-resume-entry]"));
    if (!initialHashAligned.current) {
      details.find(detail => detail.id === window.location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
      initialHashAligned.current = true;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const entries = details.map(detail => {
        const { top, bottom } = detail.getBoundingClientRect();
        return { id: detail.id, top, bottom };
      });
      setActiveId(getActiveResumeEntry(entries, window.innerHeight));
      setExploring(Boolean(entries.length && entries[0].top <= window.innerHeight * 0.75));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = window.ResizeObserver ? new ResizeObserver(schedule) : undefined;
    observer?.observe(stage);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, [enhanced]);

  return (
    <section className="resume-page">
      <header className="resume-header page-intro">
        <p className="resume-eyebrow">Experience</p>
        <h1>The work,<br /><em>and the story behind it.</em></h1>
        <p>Explore my education, experience, and projects. Follow the details as you scroll, or choose an entry to jump in.</p>
        <a className="button resume-open" href={resumeProfile.pdfHref} target="_blank" rel="noopener noreferrer">Open PDF <span aria-hidden="true">↗</span></a>
      </header>

      <div ref={stageRef} className={`resume-stage${enhanced ? " is-enhanced" : ""}${exploring ? " is-exploring" : ""}`}>
        <aside ref={overviewRef} className="resume-overview" aria-labelledby="resume-overview-heading">
          <h2 id="resume-overview-heading">{resumeProfile.name}</h2>
          <p className="resume-overview-caption">At a glance · Select an entry to explore</p>
          <nav aria-label="Resume entries">
            {resumeSections.map(section => (
              <div className="resume-overview-group" key={section.id}>
                <h3>{section.title}</h3>
                <ul>
                  {section.entries.map(entry => (
                    <li key={entry.id}>
                      <a href={`#${entry.id}`} aria-current={activeId === entry.id ? "location" : undefined}>
                        <span className="resume-entry-title">{entry.title}</span>
                        <span className="resume-entry-summary">{entry.summary}{entry.dates && <> · {entry.dates}</>}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <div className="resume-details">
          {resumeSections.map(section => (
            <section className="resume-detail-section" key={section.id} aria-labelledby={`section-${section.id}`}>
              <h2 id={`section-${section.id}`}>{section.title}</h2>
              {section.entries.map(entry => (
                <article className="resume-detail" id={entry.id} data-resume-entry key={entry.id} tabIndex={-1} aria-labelledby={`heading-${entry.id}`}>
                  {entry.dates && <p className="resume-dates">{entry.dates}</p>}
                  <h3 id={`heading-${entry.id}`}>{entry.title}</h3>
                  {entry.organization && <p className="resume-organization">{entry.organization}</p>}
                  {entry.location && <p className="resume-location">{entry.location}</p>}
                  <ul>{entry.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
                  {entry.context && <p className="resume-context">{entry.context}</p>}
                  {entry.technologies && <ul className="resume-technologies" aria-label="Technologies">{entry.technologies.map(technology => <li key={technology}><Badge>{technology}</Badge></li>)}</ul>}
                  {entry.projectHref && <Link className="text-link" href={entry.projectHref}>Explore project <span aria-hidden="true">↗</span></Link>}
                </article>
              ))}
            </section>
          ))}
        </div>
      </div>

      <footer className="resume-download" aria-labelledby="resume-download-heading">
        <p className="resume-eyebrow">Take it with you</p>
        <h2 id="resume-download-heading">The resume, on paper.</h2>
        <p>Keep a copy of my resume.</p>
        <a className="button" href={resumeProfile.pdfHref} download>Download PDF <span aria-hidden="true">↓</span></a>
      </footer>
    </section>
  );
}
