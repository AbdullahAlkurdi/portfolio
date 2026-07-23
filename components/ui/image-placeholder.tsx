import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

type ImagePlaceholderProps = {
  slug: string;
  title: string;
  className?: string;
};

export function ImagePlaceholder({ slug, title, className }: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex aspect-video items-center justify-center rounded-lg border border-dashed border-border bg-muted/50",
        className,
      )}
      role="img"
      aria-label={`Screenshot placeholder for ${title}`}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <ImageIcon size={24} className="text-muted-foreground/40" />
        <span className="text-xs text-muted-foreground/50 font-medium">
          {title}
        </span>
        <span className="text-[10px] text-muted-foreground/30">
          Add screenshot at <code className="text-[10px]">public/images/{slug}.png</code>
        </span>
      </div>
    </div>
  );
}
