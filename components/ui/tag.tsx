import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type TagProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export function Tag({
  active = false,
  className,
  children,
  ...props
}: TagProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center rounded-md px-3 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:bg-surface-hover",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
