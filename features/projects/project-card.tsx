"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Body } from "@/components/ui/typography/body";
import { fadeInUp } from "@/lib/animations/variants";
import { projectsUi } from "@/content/data/projects-ui";
import { ArrowRight, ExternalLink, Code2 } from "lucide-react";
import type { ProjectFrontmatter } from "@/types/content";

type ProjectCardProps = {
  project: ProjectFrontmatter;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      variants={!prefersReduced ? fadeInUp : undefined}
      initial={!prefersReduced ? "hidden" : undefined}
      whileInView={!prefersReduced ? "visible" : undefined}
      viewport={{ once: true, margin: "-40px" }}
      className="group relative"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block rounded-xl border border-border bg-surface p-6 transition-colors hover:border-primary/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {project.featured && (
          <Badge variant="primary" className="absolute -top-2.5 -right-2.5">
            {projectsUi.card.featured}
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
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          {project.github && (
            <span className="flex items-center gap-1 group-hover:text-foreground transition-colors">
              <Code2 size={14} />
              {projectsUi.card.code}
            </span>
          )}
          {project.demo && (
            <span className="flex items-center gap-1 group-hover:text-foreground transition-colors">
              <ExternalLink size={14} />
              {projectsUi.card.live}
            </span>
          )}
          <span className="ml-auto flex items-center gap-1 text-primary">
            {projectsUi.card.readCaseStudy}
            <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
