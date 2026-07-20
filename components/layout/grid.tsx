import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type GridProps = HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section";
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16";
  sm?: 1 | 2 | 3 | 4;
  md?: 1 | 2 | 3 | 4 | 5 | 6;
  lg?: 1 | 2 | 3 | 4 | 5 | 6;
};

export function Grid({
  as,
  cols = 1,
  gap = "4",
  sm,
  md,
  lg,
  className,
  children,
  ...props
}: GridProps) {
  const Component = as ?? "div";
  const colClasses = [
    cols === 1 ? "grid-cols-1" : `grid-cols-${cols}`,
    sm ? (sm === 1 ? "sm:grid-cols-1" : `sm:grid-cols-${sm}`) : "",
    md ? (md === 1 ? "md:grid-cols-1" : `md:grid-cols-${md}`) : "",
    lg ? (lg === 1 ? "lg:grid-cols-1" : `lg:grid-cols-${lg}`) : "",
  ];
  return (
    <Component
      className={cn(
        "grid",
        ...colClasses,
        gap !== "0" && `gap-${gap}`,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
