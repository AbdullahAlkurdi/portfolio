"use client";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useLocale, type Locale } from "@/lib/locale-context";
import { getSiteContent } from "@/content/data/content";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavLink } from "@/content/data/content";

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

function getSectionId(href: string): string {
  const hash = href.split("#")[1];
  return hash ?? "";
}

const locales: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "ar", label: "AR" },
];

export function MobileNav() {
  const { locale, setLocale } = useLocale();
  const content = getSiteContent(locale);
  const pathname = usePathname();
  const navData = content.nav.links;
  const sectionIds = navData.map((item) => getSectionId(item.href));
  const activeSection = useActiveSection(sectionIds.filter(Boolean));

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/80 backdrop-blur-xl md:hidden"
      aria-label="Mobile navigation"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="flex items-center justify-around px-2 pb-safe-or-2 pt-2">
        {navData.slice(0, 2).map((item: NavLink) => {
          const isActive = item.href.startsWith("/#")
            ? activeSection === getSectionId(item.href)
            : item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-current={isActive ? "true" : undefined}
            >
              {item.label}
            </a>
          );
        })}

        <div className="flex items-center rounded-md border border-border overflow-hidden">
          {locales.map((l) => (
            <button
              key={l.value}
              onClick={() => setLocale(l.value)}
              className={cn(
                "px-1.5 py-1 text-[10px] font-medium transition-colors",
                locale === l.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-label={`Switch to ${l.label}`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <ThemeToggle />
      </div>
    </nav>
  );
}
