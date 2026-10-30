import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "About Me | Portfolio" };

export default function Page() {
  return (
    <div className="page-intro about-page">
      <header className="about-hero">
        <div className="about-copy">
          <h1 className="about-title">About <em>me</em></h1>
          <p className="about-intro">
            I’m Mauricio Callahan, a Computer Science major with a Finance minor
            at Miami University, graduating in May 2027. I’m interested in where
            software, financial systems, and people meet.
          </p>
        </div>
        <div className="about-photo">
          <Image
            src="/images/profile/Headshot-extended.png"
            alt="Mauricio Callahan"
            width={1122}
            height={1402}
            sizes="(max-width: 767px) min(400px, calc(100vw - 48px)), (max-width: 1248px) 40vw, 461px"
          />
        </div>
      </header>

      <section className="about-interests" aria-labelledby="about-interests-title">
        <h2 id="about-interests-title">Two interests, one direction.</h2>
        <div className="about-interest-grid">
          <article className="about-interest">
            <h3>Software</h3>
            <p>
              Both of my parents were engineers, and engineering was a familiar
              part of my family. Computer science gave me a way to turn that
              curiosity into software I could build and use.
            </p>
          </article>
          <article className="about-interest about-interest-finance">
            <h3>Finance</h3>
            <p>
              My brother introduced me to credit cards and investing as I prepared
              for college. Those conversations sparked an interest in how financial
              decisions work—and the systems behind them.
            </p>
          </article>
        </div>
      </section>

      <section className="about-fintech" aria-labelledby="about-fintech-title">
        <h2 id="about-fintech-title">Where<br />they meet.</h2>
        <div className="about-copy">
          <p>
            Fintech brings those interests together. During my internship at
            JPMorgan Chase, I worked on backend systems supporting ACH payments,
            building API functionality for transaction cancellations and database
            operations to handle them correctly.
          </p>
          <Link className="button" href="/experience#jpmorgan-chase">
            Explore my experience <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="about-leadership" aria-labelledby="about-leadership-title">
        <h2 id="about-leadership-title">Helping others grow.</h2>
        <div className="about-copy">
          <p>
            As a Peer Career Coach at Miami University, I help students prepare
            through mock interviews, resume and cover letter reviews, and
            professional presentations. I’ve also held leadership positions in
            SHPE and Theta Tau.
          </p>
          <ul className="about-roles" aria-label="Coaching and leadership">
            <li>Peer Career Coach</li>
            <li><abbr title="Society of Hispanic Professional Engineers">SHPE</abbr></li>
            <li>Theta Tau</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
