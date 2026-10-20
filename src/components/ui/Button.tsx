import type { ComponentPropsWithoutRef } from "react";

export default function Button({ type = "button", className = "", ...props }: ComponentPropsWithoutRef<"button">) {
  return <button type={type} className={`button ${className}`} {...props} />;
}
