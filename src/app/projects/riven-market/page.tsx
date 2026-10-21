import type { Metadata } from "next";
import ProjectPage from "@/components/projects/ProjectPage";

export const metadata: Metadata = { title: "Riven Market | Portfolio" };

export default function Page() {
  return <ProjectPage slug="riven-market" />;
}
