"use client";

import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import type { ReactNode, HTMLAttributes } from "react";

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
} & HTMLAttributes<HTMLDivElement>;

export function Tooltip({
  content,
  children,
  side = "top",
  className,
  ...props
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVisible(false);
    };
    if (visible) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [visible]);

  const sideStyles: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      ref={triggerRef}
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      role="tooltip"
      tabIndex={0}
      aria-describedby={visible ? "tooltip-content" : undefined}
      {...props}
    >
      {children}
      {visible && (
        <span
          id="tooltip-content"
          role="tooltip"
          className={cn(
            "pointer-events-none absolute z-50 rounded-md bg-foreground px-2.5 py-1.5 text-xs text-background shadow-lg whitespace-nowrap animate-fade-in",
            sideStyles[side],
          )}
        >
          {content}
        </span>
      )}
    </div>
  );
}
