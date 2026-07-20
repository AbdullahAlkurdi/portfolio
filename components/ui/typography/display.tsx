import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type DisplayLevel = "1" | "2";

type DisplayProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: DisplayLevel;
  as?: "h1" | "h2" | "span";
};

export function Display({
  level = "1",
  as,
  className,
  children,
  ...props
}: DisplayProps) {
  const Component = as ?? "h1";
  return (
    <Component
      className={cn(
        "font-bold tracking-tight",
        level === "1" && "text-5xl sm:text-6xl lg:text-7xl leading-none",
        level === "2" && "text-4xl sm:text-5xl lg:text-6xl leading-none",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
