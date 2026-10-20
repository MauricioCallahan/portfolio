import type { Metadata } from "next";

export const metadata: Metadata = { title: "Experiences | Portfolio" };

export default function Page() {
  return (
    <section className="page-intro">
      <h1>Experiences</h1>
      <p>Professional experience, responsibilities, and milestones will be shared here.</p>
    </section>
  );
}
