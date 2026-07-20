import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type BodyProps = HTMLAttributes<HTMLParagraphElement> & {
  size?: "sm" | "base" | "lg";
  as?: "p" | "span" | "div";
};

export function Body({
  size = "base",
  as,
  className,
  children,
  ...props
}: BodyProps) {
  const Component = as ?? "p";
  const sizes = {
    sm: "text-sm leading-relaxed",
    base: "text-base leading-relaxed",
    lg: "text-lg leading-relaxed",
  };
  return (
    <Component className={cn(sizes[size], className)} {...props}>
      {children}
    </Component>
  );
}
