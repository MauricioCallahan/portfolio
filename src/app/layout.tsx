import type { Metadata } from "next";
import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { resumeProfile } from "@/data/resume";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "A portfolio of projects, experience, skills, and professional development.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400&family=Figtree:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <Navbar />
        <main id="main-content" className="page">
          <Container>{children}</Container>
        </main>
        <Footer>
          <Container className="footer-content">
            <p>
              © 2026 Mauricio Callahan. Code licensed under{" "}
              <a href="https://github.com/MauricioCallahan/portfolio/blob/main/LICENSE">
                MIT
              </a>
              .
            </p>
            <section className="footer-contact" aria-labelledby="footer-contact-title">
              <h2 id="footer-contact-title">Get in touch</h2>
              <div className="footer-socials">
                <a href={`mailto:${resumeProfile.email}`} aria-label="Email" title="Email">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 6 9 7 9-7" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/mauricio-callahan" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab or window)" title="LinkedIn (opens in a new tab or window)">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                    <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.52 2.79-1.52 2.98 0 3.58 1.96 3.58 4.51v5.26Z" />
                  </svg>
                </a>
                <a href={resumeProfile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab or window)" title="GitHub (opens in a new tab or window)">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.24c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.6-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
                  </svg>
                </a>
              </div>
            </section>
          </Container>
        </Footer>
      </body>
    </html>
  );
}
