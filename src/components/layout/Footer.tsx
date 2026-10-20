import type { ComponentPropsWithoutRef } from "react";

export default function Footer({ className = "", ...props }: ComponentPropsWithoutRef<"footer">) {
  return <footer className={`footer ${className}`} {...props} />;
}
