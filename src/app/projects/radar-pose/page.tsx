import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Radar Pose | Portfolio" };

export default function Page() {
  return (
    <section className="page-intro">
      <h1>Radar Pose</h1>
      <p>Project overview, model comparisons, and results will be shared here.</p>
      <Link className="text-link" href="/projects">Back to projects</Link>
    </section>
  );
}
