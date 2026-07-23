"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { getSiteContent } from "@/content/data/content";
import type { ProjectFrontmatter } from "@/types/content";

type ProjectNavigationProps = {
  prev: ProjectFrontmatter | null;
  next: ProjectFrontmatter | null;
};

export function ProjectNavigation({ prev, next }: ProjectNavigationProps) {
  const { locale, dir } = useLocale();
  const ui = getSiteContent(locale).ui;
  return (
    <nav
      aria-label={ui.aria.projectNavigation}
      className="border-t border-border pt-8"
    >
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {dir === "rtl" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          )}
          {ui.projectNav.backToAll}
        </Link>

        {prev && (
          <Link
            href={`/projects/${prev.slug}`}
            className={`group ${dir === "rtl" ? "mr-auto" : "ml-auto"} flex flex-col items-end text-right`}
          >
            <span className="text-xs text-muted-foreground">{ui.projectNav.previous}</span>
            <span className="text-sm font-medium transition-colors group-hover:text-primary">
              {prev.title}
            </span>
          </Link>
        )}

        {next && (
          <Link
            href={`/projects/${next.slug}`}
            className="group flex flex-col items-start text-left"
          >
            <span className="text-xs text-muted-foreground">{ui.projectNav.next}</span>
            <span className="text-sm font-medium transition-colors group-hover:text-primary">
              {next.title}
            </span>
          </Link>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <Link
          href="/projects"
          className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
        >
          {ui.projectNav.backChevron}
        </Link>
      </div>
    </nav>
  );
}
