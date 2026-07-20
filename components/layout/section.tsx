import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div" | "article" | "footer";
  spacing?: "sm" | "md" | "lg" | "xl";
};

export function Section({
  as,
  spacing = "lg",
  className,
  children,
  ...props
}: SectionProps) {
  const Component = as ?? "section";
  const spacings = {
    sm: "py-8",
    md: "py-12",
    lg: "py-16 md:py-20",
    xl: "py-20 md:py-28",
  };
  return (
    <Component className={cn(spacings[spacing], className)} {...props}>
      {children}
    </Component>
  );
}
