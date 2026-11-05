import Link from "next/link";
import type { ComponentType } from "react";
import RadarPoseCardArt from "./RadarPoseCardArt";
import RivenCardArt from "./RivenCardArt";

const cardArt: Record<string, ComponentType> = {
  "riven-market": RivenCardArt,
  "radar-pose": RadarPoseCardArt,
};

export default function ProjectCard({ slug, title }: { slug: string; title: string }) {
  const Art = cardArt[slug];

  return (
    <li>
      <Link className="project-card" href={`/projects/${slug}`}>
        {Art && <div className="project-card-art"><Art /></div>}
        <h2>{title}</h2>
        <span>View project &rarr;</span>
      </Link>
    </li>
  );
}
