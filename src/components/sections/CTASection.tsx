import type { ComponentPropsWithoutRef } from "react";

export default function CTASection({ className = "", ...props }: ComponentPropsWithoutRef<"section">) {
  return <section className={`section ${className}`} {...props} />;
}
