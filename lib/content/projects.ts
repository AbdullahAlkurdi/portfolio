import { projectsData } from "@/content/data/projects";
import type { ProjectFrontmatter } from "@/types/content";

export function getAllProjects(): ProjectFrontmatter[] {
  return [...projectsData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getProject(
  slug: string,
): { frontmatter: ProjectFrontmatter } | null {
  const frontmatter = projectsData.find((p) => p.slug === slug);
  if (!frontmatter) return null;
  return { frontmatter };
}

export function getAllSlugs(): string[] {
  return projectsData.map((p) => p.slug);
}
