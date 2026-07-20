import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type SpacerProps = HTMLAttributes<HTMLDivElement> & {
  size?: "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16" | "20" | "24";
  axis?: "vertical" | "horizontal";
};

export function Spacer({
  size = "4",
  axis = "vertical",
  className,
  ...props
}: SpacerProps) {
  return (
    <div
      className={cn(
        axis === "vertical" ? `h-${size}` : `w-${size}`,
        "shrink-0",
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  );
}
