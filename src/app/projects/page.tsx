import type { Metadata } from "next";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Projects | Portfolio" };

export default function Projects() {
  return (
    <section className="page-intro">
      <h1>Projects</h1>
      <p>A starting point for project overviews, technical details, and results.</p>
      <ul className="project-grid">
        {projects.map((project) => <ProjectCard key={project.slug} {...project} />)}
      </ul>
    </section>
  );
}
