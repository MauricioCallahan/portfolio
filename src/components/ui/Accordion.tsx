import type { ComponentPropsWithoutRef, ReactNode } from "react";

type AccordionProps = ComponentPropsWithoutRef<"details"> & { summary: ReactNode };

export default function Accordion({ summary, children, className = "", ...props }: AccordionProps) {
  return (
    <details className={`accordion ${className}`} {...props}>
      <summary>{summary}</summary>
      <div className="accordion-content">{children}</div>
    </details>
  );
}
