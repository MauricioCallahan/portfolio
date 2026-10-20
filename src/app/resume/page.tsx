import type { Metadata } from "next";

export const metadata: Metadata = { title: "Resume | Portfolio" };

export default function Page() {
  return (
    <section className="page-intro">
      <h1>Resume</h1>
      <p>A resume will be available here once it has been added.</p>
    </section>
  );
}
