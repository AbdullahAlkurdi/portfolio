import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type CodeProps = HTMLAttributes<HTMLElement> & {
  as?: "code" | "pre";
};

export function Code({
  as,
  className,
  children,
  ...props
}: CodeProps) {
  const Component = as ?? "code";
  return (
    <Component
      className={cn(
        "font-mono text-sm leading-relaxed",
        as !== "pre" && "rounded-md bg-muted px-1.5 py-0.5",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
