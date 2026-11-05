import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectDetails from "./ProjectDetails";

export default function ProjectPage({
  slug,
  visual,
  after,
}: {
  slug: string;
  visual?: ReactNode;
  after?: Record<string, ReactNode>;
}) {
  const project = projects.find(project => project.slug === slug);
  if (!project) notFound();
  return (
    <section className="page-intro">
      <h1>{project.title}</h1>
      <div className={visual ? "project-split" : undefined}>
        {visual}
        <div>
          <ProjectDetails project={project} after={after} />
          <Link className="text-link" href="/projects">Back to projects</Link>
        </div>
      </div>
    </section>
  );
}
