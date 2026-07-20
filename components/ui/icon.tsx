import { cn } from "@/lib/utils";
import type { LucideProps } from "lucide-react";
import { forwardRef } from "react";

type IconProps = LucideProps & {
  icon: React.ComponentType<LucideProps>;
};

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, className, size, ...props }, ref) => {
    return (
      <IconComponent
        ref={ref}
        size={size ?? 16}
        className={cn("shrink-0", className)}
        {...props}
      />
    );
  },
);

Icon.displayName = "Icon";
