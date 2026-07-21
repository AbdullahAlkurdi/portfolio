import { Badge } from "@/components/ui/badge";
import { Body } from "@/components/ui/typography/body";
import { ArrowUpRight } from "lucide-react";
import { resumeData } from "@/content/data/resume";
import { projectsData } from "@/content/data/projects";

export function ResumeProjects() {
  const projects = resumeData.selectedProjects
    .map((ref) => {
      const project = projectsData.find((p) => p.slug === ref.slug);
      if (!project) return null;
      return { ...project, highlight: ref.highlight };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <a
          key={project.slug}
          href={`/projects/${project.slug}`}
          className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:bg-muted"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold group-hover:text-primary">
              {project.title}
            </h3>
            <ArrowUpRight
              size={16}
              className="mt-0.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
            />
          </div>
          <Body size="sm" className="mt-1.5 text-muted-foreground">
            {project.description}
          </Body>
          {'highlight' in project && project.highlight && (
            <p className="mt-2 text-xs text-muted-foreground">
              {project.highlight}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </a>
      ))}
    </div>
  );
}
