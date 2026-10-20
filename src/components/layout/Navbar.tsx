"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActivePath } from "@/lib/utils";
import Container from "./Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Me" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experiences" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="navbar" aria-label="Main navigation">
      <Container>
        <ul className="navbar-links">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} aria-current={isActivePath(pathname, href) ? "page" : undefined}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
