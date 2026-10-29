import Link from "next/link";
import Image from "next/image";
import jpmorganPhoto from "../../../public/images/experiences/JPMC/JPMC_Photo_3.jpeg";
import Badge from "@/components/ui/Badge";
import ShowcaseSection from "@/components/sections/ShowcaseSection";
import WelcomeFrame from "./WelcomeFrame";
import RivenProcess from "./RivenProcess";

export default function Hero() {
  return (
    <WelcomeFrame>
      <header className="hero home-intro">
        <p className="home-eyebrow">Mauricio S. Callahan · Software engineer</p>
        <h1><span>Welcome to</span><br />my <em>portfolio.</em></h1>
        <p>
          Explore a player-built pricing tool and my experience in payments engineering.
        </p>
        <nav className="home-story-links" aria-label="Featured stories">
          <a href="#riven-story">01 / Riven Market <span aria-hidden="true">↓</span></a>
          <a href="#jpmorgan-story">02 / JPMorgan Chase <span aria-hidden="true">↓</span></a>
        </nav>
      </header>

      <ShowcaseSection className="home-story home-story-dark" id="riven-story" aria-labelledby="riven-title">
        <div className="home-story-grid">
          <div className="home-story-copy">
            <p className="home-eyebrow">01 / Selected project</p>
            <h2 id="riven-title">A little clarity<br />in a player-run market.</h2>
            <p className="home-story-lead">Riven Market Pricing Tool</p>
            <p>I built a full-stack pricing tool for Warframe’s player-run market. It compares live auction listings and validated bids to estimate a price range with a confidence rating.</p>
            <ul className="home-technologies" aria-label="Project technologies">
              {["React", "TypeScript", "TanStack Query", "Python", "Flask"].map(name => <li key={name}><Badge>{name}</Badge></li>)}
            </ul>
            <Link className="button home-story-cta" href="/projects/riven-market">Explore Riven Market <span aria-hidden="true">↗</span></Link>
          </div>
          <RivenProcess />
        </div>
      </ShowcaseSection>

      <ShowcaseSection className="home-story" id="jpmorgan-story" aria-labelledby="jpmorgan-title">
        <div className="home-story-grid">
          <div className="home-story-copy">
            <p className="home-eyebrow">02 / Industry experience</p>
            <h2 id="jpmorgan-title">Building in payments.<br />Learning together.</h2>
            <p className="home-story-lead">JPMorgan Chase</p>
            <p className="home-role">Software Engineering Intern, Payments<br />Columbus, OH · June–August 2026</p>
            <div className="home-contribution">
              <h3>My contribution</h3>
              <p>I built a Spring Boot bulk ACH cancellation API so onboarding clients could cancel test transactions together, and designed a PostgreSQL workflow for atomic batch cancellation.</p>
            </div>
            <Link className="button home-story-cta" href="/experience#jpmorgan-chase">Read my JPMorgan experience <span aria-hidden="true">↗</span></Link>
          </div>
          <figure className="home-photo-card">
            <Image src={jpmorganPhoto} alt="Three people standing in front of the JPMorgan Chase & Co. reception wall" sizes="(min-width: 1248px) 480px, (min-width: 1024px) 40vw, 85vw" />
          </figure>
        </div>
      </ShowcaseSection>
    </WelcomeFrame>
  );
}
