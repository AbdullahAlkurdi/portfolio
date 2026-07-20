"use client";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navigationData } from "@/content/data/navigation";
import type { NavItem } from "@/types/content";
import { useEffect, useState } from "react";

function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}

export function MobileNav() {
  const sectionIds = navigationData.map((_) => _.href.replace("#", ""));
  const activeSection = useActiveSection(sectionIds);

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
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              activeSection === item.href.replace("#", "")
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-current={
              activeSection === item.href.replace("#", "")
                ? "true"
                : undefined
            }
          >
            {item.label}
          </a>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}
