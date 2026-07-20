import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type DividerProps = HTMLAttributes<HTMLHRElement> & {
  orientation?: "horizontal" | "vertical";
};

export function Divider({
  orientation = "horizontal",
  className,
  ...props
}: DividerProps) {
  return (
    <hr
      className={cn(
        "border-border",
        orientation === "horizontal"
          ? "my-8 w-full border-t"
          : "mx-4 self-stretch border-l",
        className,
      )}
      role="separator"
      aria-orientation={orientation}
      {...props}
    />
  );
}
