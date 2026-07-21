"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Tag } from "@/components/ui/tag";
import { staggerContainer, staggerItem } from "@/lib/animations/variants";
import { ProjectCard } from "./project-card";
import { projectsUi } from "@/content/data/projects-ui";
import type { ProjectFrontmatter } from "@/types/content";

type ProjectGridProps = {
  projects: ProjectFrontmatter[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const p of projects) {
      for (const t of p.tags) tags.add(t);
    }
    return Array.from(tags).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    if (!activeTag) return projects;
    return projects.filter((p) => p.tags.includes(activeTag));
  }, [projects, activeTag]);

  if (projects.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">{projectsUi.filter.empty}</p>
      </div>
    );
  }

  const containerVariants = prefersReduced ? undefined : staggerContainer;
  const itemVariants = prefersReduced ? undefined : staggerItem;

  return (
    <div>
      {allTags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label={projectsUi.filter.label}>
          <Tag
            active={activeTag === null}
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
          >
            {projectsUi.filter.all}
          </Tag>
          {allTags.map((tag) => (
            <Tag
              key={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              aria-pressed={activeTag === tag}
            >
              {tag}
            </Tag>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTag ?? "all"}
          variants={containerVariants}
          initial={!prefersReduced ? "hidden" : undefined}
          animate={!prefersReduced ? "visible" : undefined}
          exit={!prefersReduced ? "hidden" : undefined}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project) => (
            <motion.div key={project.slug} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">
            {projectsUi.filter.noMatch} <span className="font-medium text-foreground">{activeTag}</span>.
          </p>
        </div>
      )}
    </div>
  );
}
