import type { Metadata } from "next";

export const metadata: Metadata = { title: "Resume | Portfolio" };

export default function Page() {
  return (
    <section className="page-intro resume-page">
      <header className="resume-header">
        <h1>My Resume</h1>
        <p>View my resume below, or open and download a copy.</p>
      </header>
      <div className="resume-actions">
        <a
          className="button resume-open"
          href="/Callahan_Mauricio_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Resume (PDF)
        </a>
        <a className="button" href="/Callahan_Mauricio_Resume.pdf" download>
          Download a Copy
        </a>
      </div>
      <div className="resume-frame">
        <iframe
          src="/Callahan_Mauricio_Resume.pdf"
          title="Mauricio Callahan's resume"
          width="100%"
          height="800"
          className="resume-viewer"
        />
      </div>
    </section>
  );
}
