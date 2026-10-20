import type { ComponentPropsWithoutRef } from "react";

export default function ShowcaseSection({ className = "", ...props }: ComponentPropsWithoutRef<"section">) {
  return <section className={`section ${className}`} {...props} />;
}
