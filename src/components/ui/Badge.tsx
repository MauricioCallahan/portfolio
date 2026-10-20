import type { ComponentPropsWithoutRef } from "react";

export default function Badge({ className = "", ...props }: ComponentPropsWithoutRef<"span">) {
  return <span className={`badge ${className}`} {...props} />;
}
