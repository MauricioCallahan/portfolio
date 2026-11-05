import type { Metadata } from "next";
import ProjectPage from "@/components/projects/ProjectPage";
import RivenEstimateGuide from "@/components/projects/riven-market/RivenEstimateGuide";
import RivenEstimateVisual from "@/components/projects/riven-market/RivenEstimateVisual";

export const metadata: Metadata = { title: "Riven Market | Portfolio" };

export default function Page() {
  return (
    <ProjectPage
      slug="riven-market"
      visual={<RivenEstimateVisual />}
      after={{ "What I built": <RivenEstimateGuide /> }}
    />
  );
}
