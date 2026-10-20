import type { Metadata } from "next";

export const metadata: Metadata = { title: "About Me | Portfolio" };

export default function Page() {
  return (
    <section className="page-intro">
      <h1>About Me</h1>
      <p>A personal introduction, background, and interests will be shared here.</p>
    </section>
  );
}
