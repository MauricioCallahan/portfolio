import type { Metadata } from "next";
import ProjectPage from "@/components/projects/ProjectPage";
import FireHouseVisual from "@/components/projects/fire/FireHouseVisual";

export const metadata: Metadata = { title: "FIRE | Portfolio" };

export default function Page() {
  return <ProjectPage slug="fire" visual={<FireHouseVisual />} />;
}
