import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";

type CalloutVariant = "info" | "success" | "warning" | "error";

type CalloutProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CalloutVariant;
  icon?: ReactNode;
};

const config: Record<CalloutVariant, { bg: string; border: string; icon: string; defaultIcon: ReactNode }> = {
  info: {
    bg: "bg-info-muted",
    border: "border-info/30",
    icon: "text-info",
    defaultIcon: <Info size={18} />,
  },
  success: {
    bg: "bg-success-muted",
    border: "border-success/30",
    icon: "text-success",
    defaultIcon: <CheckCircle size={18} />,
  },
  warning: {
    bg: "bg-warning-muted",
    border: "border-warning/30",
    icon: "text-warning",
    defaultIcon: <AlertTriangle size={18} />,
  },
  error: {
    bg: "bg-error-muted",
    border: "border-error/30",
    icon: "text-error",
    defaultIcon: <AlertCircle size={18} />,
  },
};

export function Callout({
  variant = "info",
  icon,
  className,
  children,
  ...props
}: CalloutProps) {
  const cfg = config[variant];
  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border p-4 text-sm",
        cfg.bg,
        cfg.border,
        className,
      )}
      {...props}
    >
      <span className={cn("mt-0.5 shrink-0", cfg.icon)}>
        {icon ?? cfg.defaultIcon}
      </span>
      <div>{children}</div>
    </div>
  );
}
