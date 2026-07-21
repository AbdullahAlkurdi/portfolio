import Link from "next/link";
import { projectsUi } from "@/content/data/projects-ui";
import type { ProjectFrontmatter } from "@/types/content";

type ProjectNavigationProps = {
  prev: ProjectFrontmatter | null;
  next: ProjectFrontmatter | null;
};

export function ProjectNavigation({ prev, next }: ProjectNavigationProps) {
  return (
    <nav
      aria-label="Project navigation"
      className="border-t border-border pt-8"
    >
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          {projectsUi.detail.backToAll}
        </Link>

        {prev && (
          <Link
            href={`/projects/${prev.slug}`}
            className="group ml-auto flex flex-col items-end text-right"
          >
            <span className="text-xs text-muted-foreground">{projectsUi.detail.previous}</span>
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
            <span className="text-xs text-muted-foreground">{projectsUi.detail.next}</span>
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
          {projectsUi.detail.backChevron}
        </Link>
      </div>
    </nav>
  );
}
