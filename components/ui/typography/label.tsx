import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type LabelProps = HTMLAttributes<HTMLLabelElement> & {
  as?: "label" | "span";
};

export function Label({
  as,
  className,
  children,
  ...props
}: LabelProps) {
  const Component = as ?? "label";
  return (
    <Component
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
