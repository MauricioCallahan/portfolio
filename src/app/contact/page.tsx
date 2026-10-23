import type { Metadata } from "next";
import { resumeProfile } from "@/data/resume";

export const metadata: Metadata = {
  title: "Contact | Portfolio",
  description:
    "Connect with Mauricio Callahan about software engineering opportunities, projects, and professional connections.",
};

export default function Page() {
  return (
    <section className="page-intro contact-page" aria-labelledby="contact-title">
      <header>
        <h1 id="contact-title">Let&apos;s connect.</h1>
        <p>
          Have a software engineering opportunity or a project in mind? I&apos;d
          love to hear from you. I&apos;m always happy to make new professional
          connections, too.
        </p>
      </header>
      <div className="contact-email">
        <a className="button" href={`mailto:${resumeProfile.email}`}>
          Email me
        </a>
        <p className="contact-address">{resumeProfile.email}</p>
      </div>
      <div className="contact-socials">
        <a
          className="button"
          href="https://www.linkedin.com/in/mauricio-callahan"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn (opens in a new tab or window)"
        >
          LinkedIn
        </a>
        <a
          className="button"
          href={resumeProfile.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub (opens in a new tab or window)"
        >
          GitHub
        </a>
      </div>
      <p className="contact-booking">
        Prefer a quick conversation?{" "}
        <a
          href="https://cal.com/mauricio-callahan/15min"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Schedule a chat (opens in a new tab or window)"
        >
          Schedule a chat
        </a>
        .
      </p>
    </section>
  );
}
