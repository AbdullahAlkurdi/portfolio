"use client";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import type { NavItem } from "@/types/content";
import { navigationData, navigationBrand } from "@/content/data/navigation";
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

export function DesktopNav() {
  const sectionIds = navigationData.map((_) => _.href.replace("#", ""));
  const activeSection = useActiveSection(sectionIds);

  return (
    <header className="sticky top-0 z-50 hidden border-b border-border bg-background/80 backdrop-blur-lg md:block">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <span className="text-lg font-semibold tracking-tight">{navigationBrand}</span>
        <div className="flex items-center gap-1">
          {navigationData.map((item: NavItem) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
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
          <span className="ml-2">
            <ThemeToggle />
          </span>
        </div>
      </nav>
    </header>
  );
}
