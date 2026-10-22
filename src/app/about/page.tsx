import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "About Me | Portfolio" };

export default function Page() {
  return (
    <section className="page-intro about-layout">
      <h1 className="about-title">About Me</h1>
      <p className="about-intro">
        Hello! I’m Mauricio Callahan, a Computer Science major with a minor in
        Finance at Miami University, expecting to graduate in May 2027.
      </p>
      <div className="about-photo">
        <Image
          src="/Headshot-extended.png"
          alt="Mauricio Callahan"
          width={1122}
          height={1402}
          sizes="(max-width: 767px) 100vw, (max-width: 1248px) 40vw, 461px"
        />
      </div>
      <div className="about-body">
        <p>
          My interest in finance started with my brother, who studied economics
          and business. He often shared what he was learning in his coursework.
          As I prepared for college he taught me the basics of credit cards and
          investing, which then sparked my curiosity about how financial
          decisions work.
        </p>
        <p>
          My interest in software grew from being surrounded by engineering.
          Both of my parents were engineers and several relatives worked in
          computer, mechanical, and electrical engineering. That exposure
          encouraged me to explore how technology works. As I learned more about
          computer science and software, I found that coding gave me a way to
          turn that curiosity into something tangible.
        </p>
        <p>
          Fintech felt like a natural way to bring these interests together. It
          gives me the opportunity to build software that helps people manage
          their money and support the systems behind everyday financial
          transactions. My internship at J.P. Morgan Chase gave me firsthand
          experience with that connection. Working on backend systems supporting
          ACH payments, I built API functionality to simplify transaction
          cancellations and designed database operations to handle those
          transactions correctly.
        </p>
        <p>
          Alongside my technical work I enjoy helping others develop
          professionally as a Peer Career Coach at Miami University&apos;s Center
          for Career Exploration and Success. I conduct mock interviews, review
          resumes and cover letters, and deliver professional presentations. I
          have also held leadership positions in the Society of Hispanic
          Professional Engineers (SHPE), and Theta Tau Professional Engineering
          Fraternity.
        </p>
      </div>
    </section>
  );
}
