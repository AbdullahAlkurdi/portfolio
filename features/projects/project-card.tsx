"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Body } from "@/components/ui/typography/body";
import { fadeInUp } from "@/lib/animations/variants";
import type { ProjectFrontmatter } from "@/types/content";

type ProjectCardProps = {
  project: ProjectFrontmatter;
};

const tagVariants: Record<string, string> = {
  Flutter: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  Dart: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  Firebase: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "Clean Architecture": "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  BLoC: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  "Gemini AI": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="group relative"
    >
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          "block rounded-xl border border-border bg-surface p-6 transition-all duration-300",
          "hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        )}
      >
        {project.featured && (
          <Badge variant="primary" className="absolute -top-2.5 -right-2.5">
            Featured
          </Badge>
        )}

        <div className="mb-4 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{project.category}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">{project.date}</span>
        </div>

        <h3 className="mb-2 text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        <Body size="sm" className="mb-4 text-muted-foreground line-clamp-3">
          {project.description}
        </Body>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
                tagVariants[tag] ?? "bg-muted text-muted-foreground",
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          {project.github && (
            <span className="flex items-center gap-1 group-hover:text-foreground transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Code
            </span>
          )}
          {project.demo && (
            <span className="flex items-center gap-1 group-hover:text-foreground transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live
            </span>
          )}
          <span className="ml-auto flex items-center gap-1 text-primary">
            Read case study
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
