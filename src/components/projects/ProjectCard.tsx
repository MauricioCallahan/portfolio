import Link from "next/link";

export default function ProjectCard({ slug, title }: { slug: string; title: string }) {
  return (
    <li>
      <Link className="project-card" href={`/projects/${slug}`}>
        <h2>{title}</h2>
        <span>View project &rarr;</span>
      </Link>
    </li>
  );
}
