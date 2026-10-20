import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-intro">
      <h1>Page not found.</h1>
      <p>The page you are looking for could not be found.</p>
      <Link className="text-link" href="/">Return home</Link>
    </section>
  );
}
