import type { Project } from "@/data/projects";

export default function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="project-narrative">
      {project.sections.map(section => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </section>
      ))}
    </div>
  );
}
