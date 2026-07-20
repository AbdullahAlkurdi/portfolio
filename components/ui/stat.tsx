import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type StatProps = HTMLAttributes<HTMLDivElement> & {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  description?: string;
};

export function Stat({
  icon,
  label,
  value,
  description,
  className,
  ...props
}: StatProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface p-5",
        className,
      )}
      {...props}
    >
      {icon && (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-muted text-primary">
          {icon}
        </div>
      )}
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-3xl font-bold tracking-tight">{value}</p>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
