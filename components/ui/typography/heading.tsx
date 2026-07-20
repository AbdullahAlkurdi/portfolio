import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type HeadingLevel = "1" | "2" | "3" | "4";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: HeadingLevel;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
};

const styles: Record<HeadingLevel, string> = {
  "1": "text-3xl sm:text-4xl font-bold tracking-tight",
  "2": "text-2xl sm:text-3xl font-semibold tracking-tight",
  "3": "text-xl sm:text-2xl font-semibold",
  "4": "text-lg sm:text-xl font-medium",
};

export function Heading({
  level = "2",
  as,
  className,
  children,
  ...props
}: HeadingProps) {
  const tag = as ?? (`h${level}` as const);
  const Component = tag;
  return (
    <Component className={cn(styles[level], className)} {...props}>
      {children}
    </Component>
  );
}
