import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type TitleProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
};

export function Title({
  as,
  className,
  children,
  ...props
}: TitleProps) {
  const Component = as ?? "h2";
  return (
    <Component
      className={cn(
        "text-2xl font-semibold tracking-tight sm:text-3xl",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
