import type { ComponentPropsWithoutRef } from "react";

export default function FeatureSection({ className = "", ...props }: ComponentPropsWithoutRef<"section">) {
  return <section className={`section ${className}`} {...props} />;
}
