import Container from "@/components/layout/Container";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="page">
        <Container>
          <div className="portfolio-card">
            <Hero />
          </div>
        </Container>
      </main>
    </>
  );
}
