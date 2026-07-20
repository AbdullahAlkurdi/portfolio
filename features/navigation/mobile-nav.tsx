"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navigationData } from "@/content/data/navigation";
import type { NavItem } from "@/types/content";

export function MobileNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/80 backdrop-blur-xl md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-2 pb-safe-or-2 pt-2">
        {navigationData.map((item: NavItem) => (
          <a
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-0.5 rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.label}
          </a>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}
