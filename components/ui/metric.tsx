import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type MetricProps = HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  format?: string;
};

export function Metric({
  label,
  value,
  trend,
  format,
  className,
  ...props
}: MetricProps) {
  const trendColors = {
    up: "text-success",
    down: "text-error",
    neutral: "text-muted-foreground",
  };

  return (
    <div className={cn("space-y-1", className)} {...props}>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold tracking-tight">
        {value}
        {format && (
          <span className="ml-0.5 text-lg text-muted-foreground">{format}</span>
        )}
      </p>
      {trend && (
        <p className={cn("text-sm font-medium", trendColors[trend])}>
          {trend === "up" && "↑ "}
          {trend === "down" && "↓ "}
          {trend === "neutral" && "→ "}
          {label}
        </p>
      )}
    </div>
  );
}
