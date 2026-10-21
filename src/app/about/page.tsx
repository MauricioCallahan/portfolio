import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "About Me | Portfolio" };

export default function Page() {
  return (
    <section className="page-intro about-layout">
      <h1 className="about-title">About Me</h1>
      <div className="about-body">
        <p>
          Hello! I’m Mauricio Callahan, a Computer Science major with a minor in
          Finance at Miami University, expecting to graduate in May 2027.
        </p>
        <p>
          My passion and experience lie within software, specifically backend
          systems and financial technologies. This past summer, I interned at
          JPMorgan Chase as a software engineer, where I worked on backend systems
          supporting ACH transactions. I primarily focused on building API
          functionality that simplified transaction cancellations, designing
          efficient database operations, and ensuring the underlying logic handled
          transactions correctly.
        </p>
        <p>
          Outside of my technical work, I am passionate about innovation and
          collaboration. I currently work for Miami University&apos;s Center for
          Career Exploration and Success as a student worker. In this position, I
          handle mock interviews, resume and cover letter reviews, professional
          presentations, and tabling for CCES. Additionally, I have held leadership
          positions in the Society of Hispanic Professional Engineers (SHPE) and
          Theta Tau Professional Engineer Fraternity.
        </p>
      </div>
      <div className="about-photo">
        <div className="about-headshot">
          <Image
            src="/Headshot.png"
            alt="Mauricio Callahan"
            width={288}
            height={288}
            sizes="(max-width: 767px) 180px, (max-width: 1248px) 24vw, 288px"
          />
        </div>
      </div>
    </section>
  );
}
