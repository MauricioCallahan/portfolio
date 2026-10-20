import Container from "./Container";

export default function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <Container>
        <ul className="navbar-links">
          <li><a href="">Home</a></li>
          <li><a href="">About Me</a></li>
          <li><a href="">Projects</a></li>
          <li><a href="">Experiences</a></li>
          <li><a href="">Resume</a></li>
          <li><a href="">Contact</a></li>
        </ul>
      </Container>
    </nav>
  );
}
