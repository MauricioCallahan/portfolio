import type { Metadata } from "next";
import ProjectPage from "@/components/projects/ProjectPage";

export const metadata: Metadata = { title: "Radar Pose | Portfolio" };

export default function Page() {
  return <ProjectPage slug="radar-pose" />;
}
