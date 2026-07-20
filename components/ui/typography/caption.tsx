import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type CaptionProps = HTMLAttributes<HTMLSpanElement> & {
  as?: "span" | "p" | "div";
};

export function Caption({
  as,
  className,
  children,
  ...props
}: CaptionProps) {
  const Component = as ?? "span";
  return (
    <Component
      className={cn(
        "text-xs sm:text-sm text-muted-foreground leading-normal",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
