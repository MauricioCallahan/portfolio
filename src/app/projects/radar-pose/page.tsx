import type { Metadata } from "next";
import ProjectPage from "@/components/projects/ProjectPage";
import RadarPoseVisual from "@/components/projects/radar-pose/RadarPoseVisual";

export const metadata: Metadata = { title: "Radar Pose | Portfolio" };

export default function Page() {
  return <ProjectPage slug="radar-pose" visual={<RadarPoseVisual />} />;
}
