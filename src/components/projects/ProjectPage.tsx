import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectDetails from "./ProjectDetails";

export default function ProjectPage({ slug }: { slug: string }) {
  const project = projects.find(project => project.slug === slug);
  if (!project) notFound();
  return (
    <section className="page-intro">
      <h1>{project.title}</h1>
      <ProjectDetails project={project} />
      <Link className="text-link" href="/projects">Back to projects</Link>
    </section>
  );
}
