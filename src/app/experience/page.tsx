import type { Metadata } from "next";
import InteractiveResume from "@/components/experience/InteractiveResume";

export const metadata: Metadata = { title: "Experience | Portfolio" };

export default function Page() {
  return <InteractiveResume />;
}
