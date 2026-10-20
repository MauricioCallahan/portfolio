import type { Metadata } from "next";
import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
          <Container><p>Projects, experience, and professional development.</p></Container>
        </Footer>
      </body>
    </html>
  );
}
