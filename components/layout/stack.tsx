import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type StackProps = HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "nav";
  gap?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16";
};

export function Stack({
  as,
  gap = "4",
  className,
  children,
  ...props
}: StackProps) {
  const Component = as ?? "div";
  return (
    <Component
      className={cn("flex flex-col", gap !== "0" && `gap-${gap}`, className)}
      {...props}
    >
      {children}
    </Component>
  );
}
