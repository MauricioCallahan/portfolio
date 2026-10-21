import Link from "next/link";
import Badge from "@/components/ui/Badge";
import type { ResumeEntry } from "@/data/resume";

export default function ResumeEntryCard({ entry, focused = false, selected = false, onExplore }: {
  entry: ResumeEntry;
  focused?: boolean;
  selected?: boolean;
  onExplore?: (entry: ResumeEntry, trigger: HTMLAnchorElement) => void;
}) {
  const id = focused ? `focus-${entry.id}` : entry.id;
  return (
    <article className="resume-detail" id={id} data-resume-entry={focused ? undefined : ""} data-project-source={selected || undefined} tabIndex={-1} aria-labelledby={`heading-${id}`}>
      {entry.dates && <p className="resume-dates">{entry.dates}</p>}
      <h3 id={`heading-${id}`}>{entry.title}</h3>
      {entry.organization && <p className="resume-organization">{entry.organization}</p>}
      {entry.location && <p className="resume-location">{entry.location}</p>}
      <ul>{entry.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
      {entry.context && <p className="resume-context">{entry.context}</p>}
      {entry.technologies && <ul className="resume-technologies" aria-label="Technologies">{entry.technologies.map(technology => <li key={technology}><Badge>{technology}</Badge></li>)}</ul>}
      {entry.projectHref && (
        <Link className="text-link" href={entry.projectHref} onClick={event => {
          if (onExplore && !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
            event.preventDefault();
            onExplore(entry, event.currentTarget);
          }
        }}>
          Explore project <span aria-hidden="true">↗</span>
        </Link>
      )}
    </article>
  );
}
