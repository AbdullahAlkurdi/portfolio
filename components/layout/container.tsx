import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
};

export function Container({
  as,
  className,
  children,
  ...props
}: ContainerProps) {
  const Component = as ?? "div";
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
