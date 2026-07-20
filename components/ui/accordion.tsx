"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { ReactNode, HTMLAttributes } from "react";

type AccordionProps = {
  items: {
    id: string;
    title: ReactNode;
    content: ReactNode;
  }[];
  allowMultiple?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export function Accordion({
  items,
  allowMultiple = false,
  className,
  ...props
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn("divide-y divide-border", className)} {...props}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div key={item.id}>
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between py-4 text-left font-medium transition-colors hover:text-muted-foreground"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              {item.title}
              <ChevronDown
                size={16}
                className={cn(
                  "shrink-0 transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              id={`accordion-content-${item.id}`}
              role="region"
              className={cn(
                "overflow-hidden transition-all duration-200",
                isOpen ? "pb-4" : "max-h-0 pb-0",
              )}
            >
              <div className="text-sm text-muted-foreground">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
