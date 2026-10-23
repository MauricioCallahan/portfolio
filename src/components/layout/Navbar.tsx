"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { isActivePath } from "@/lib/utils";
import Container from "./Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Me" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const update = () => {
      const active = list.querySelector<HTMLAnchorElement>('a[aria-current="page"]');
      if (!active) {
        delete list.dataset.highlight;
        return;
      }
      list.style.setProperty("--nav-x", `${active.offsetLeft}px`);
      list.style.setProperty("--nav-y", `${active.offsetTop}px`);
      list.style.setProperty("--nav-width", `${active.offsetWidth}px`);
      list.style.setProperty("--nav-height", `${active.offsetHeight}px`);
      list.dataset.highlight = "true";
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(list);
    list.querySelectorAll("a").forEach((link) => observer.observe(link));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <nav className="navbar" aria-label="Main navigation">
      <Container>
        <ul className="navbar-links" ref={listRef}>
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
