import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "article" | "section";
  variant?: "default" | "muted" | "bordered";
};

export function Card({
  as,
  variant = "default",
  className,
  children,
  ...props
}: CardProps) {
  const Component = as ?? "div";
  const variants = {
    default: "bg-surface shadow-sm",
    muted: "bg-surface-muted",
    bordered: "border border-border bg-surface",
  };
  return (
    <Component
      className={cn(
        "rounded-xl p-6",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn("mb-4 space-y-1.5", className)} {...props}>
      {children}
    </div>
  );
}

type CardContentProps = HTMLAttributes<HTMLDivElement>;

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

type CardFooterProps = HTMLAttributes<HTMLDivElement>;

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div className={cn("mt-4 flex items-center gap-2", className)} {...props}>
      {children}
    </div>
  );
}
