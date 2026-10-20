import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact | Portfolio" };

export default function Page() {
  return (
    <section className="page-intro">
      <h1>Contact</h1>
      <p>Contact details and professional links will be shared here.</p>
    </section>
  );
}
