import { Fragment, type ReactNode } from "react";
import type { Project } from "@/data/projects";

// `after` adds page-only content after the section with that title, so it stays off the resume view.
export default function ProjectDetails({ project, after }: { project: Project; after?: Record<string, ReactNode> }) {
  return (
    <div className="project-narrative">
      {project.sections.map(section => (
        <Fragment key={section.title}>
          <section>
            <h2>{section.title}</h2>
            {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </section>
          {after?.[section.title]}
        </Fragment>
      ))}
    </div>
  );
}
