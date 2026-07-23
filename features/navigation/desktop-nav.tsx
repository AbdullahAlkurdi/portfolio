"use client";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useLocale, type Locale } from "@/lib/locale-context";
import { getSiteContent } from "@/content/data/content";
import { usePathname } from "next/navigation";
import Link from "next/link";
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

export function DesktopNav() {
  const { locale, setLocale } = useLocale();
  const content = getSiteContent(locale);
  const pathname = usePathname();
  const navData = content.nav.links;
  const sectionIds = navData.map((item) => getSectionId(item.href));
  const activeSection = useActiveSection(sectionIds.filter(Boolean));

  return (
    <header className="sticky top-0 z-50 hidden border-b border-border bg-background/80 backdrop-blur-lg md:block">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <Link href="/" className="text-lg font-semibold tracking-tight hover:text-primary transition-colors">
          {content.nav.brand}
        </Link>
        <div className="flex items-center gap-1">
          {navData.map((item: NavLink) => {
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
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
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
          <div className="mx-2 h-5 w-px bg-border" />
          <div className="flex items-center rounded-lg border border-border overflow-hidden">
            {locales.map((l) => (
              <button
                key={l.value}
                onClick={() => setLocale(l.value)}
                className={cn(
                  "px-2.5 py-1.5 text-xs font-medium transition-colors",
                  locale === l.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
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
    </header>
  );
}
