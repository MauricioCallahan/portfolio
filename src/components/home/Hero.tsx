import Link from "next/link";
import Badge from "@/components/ui/Badge";
import ShowcaseSection from "@/components/sections/ShowcaseSection";
import WelcomeFrame from "./WelcomeFrame";

export default function Hero() {
  return (
    <WelcomeFrame>
      <header className="hero home-intro">
        <p className="home-eyebrow">Mauricio S. Callahan · Software engineer</p>
        <h1><span>Welcome to</span><br />my <em>portfolio.</em></h1>
        <p>
          From a player-built pricing tool to payments engineering. Get to know
          me through what I build and the people I learn alongside.
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
            <p>A pricing tool for player-traded digital items, using live auction data to estimate what a comparable item might cost.</p>
            <div className="home-contribution">
              <h3>What I built</h3>
              <p>I built the Flask backend and a similarity-based estimator with outlier removal, age decay, and market-derived stat weights. Rate limiting and a 24-hour cache with fallback support the live-data workflow.</p>
            </div>
            <ul className="home-technologies" aria-label="Project technologies">
              {["Python", "Flask", "React", "TypeScript"].map(name => <li key={name}><Badge>{name}</Badge></li>)}
            </ul>
            <Link className="button home-story-cta" href="/projects/riven-market">Explore Riven Market <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="home-story-visual">
            <figure className="home-product-figure">
              <div className="home-product-placeholder">
                <span className="home-asset-label">Project screenshot</span>
                <p>[Riven screenshot: actual estimation result]</p>
                <p className="home-placeholder-note">Inputs, comparable items, and the resulting estimate.</p>
              </div>
              <figcaption>[Screenshot context: item, capture date, and what the result demonstrates]</figcaption>
            </figure>
            <div className="home-process">
              <h3>How an estimate takes shape</h3>
              <p className="home-process-caption">Process explanation</p>
              <ol>
                <li><span>01</span> Live auction data</li>
                <li><span>02</span> Similar-item comparison and filtering</li>
                <li><span>03</span> Price estimate</li>
              </ol>
            </div>
          </div>
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
            <div className="home-contribution">
              <h3>What I learned</h3>
              <p className="home-missing-copy">[Learning reflection: one specific technical or collaboration lesson]</p>
            </div>
            <Link className="button home-story-cta" href="/experience#jpmorgan-chase">Read my JPMorgan experience <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="home-photo-grid">
            <figure className="home-photo-card">
              <div className="home-photo-placeholder"><span className="home-asset-label">Intern collaboration</span><p>[Intern collaboration photo]</p></div>
              <figcaption>[Caption: the setting and my involvement]</figcaption>
            </figure>
            <figure className="home-photo-card">
              <div className="home-photo-placeholder"><span className="home-asset-label">Beyond the work</span><p>[Intern event photo]</p></div>
              <figcaption>[Caption: the event and my involvement]</figcaption>
            </figure>
          </div>
        </div>
      </ShowcaseSection>
    </WelcomeFrame>
  );
}
