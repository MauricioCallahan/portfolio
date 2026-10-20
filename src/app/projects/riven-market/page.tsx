import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Riven Market | Portfolio" };

export default function Page() {
  return (
    <section className="page-intro">
      <h1>Riven Market</h1>
      <p>Project overview, implementation, and results will be shared here.</p>
      <Link className="text-link" href="/projects">Back to projects</Link>
    </section>
  );
}
