"use client"

import { useContent } from "@/lib/content/content-provider";
import { getProjectComponent } from "@/lib/content/mdx-registry";
import { projectsUi } from "@/content/data/projects-ui";
import { createElement, useMemo, type ReactElement } from "react";

type ProjectContentProps = {
  slug: string;
};

const elementCache: Record<string, ReactElement> = {};

function getElement(slug: string): ReactElement | null {
  if (slug in elementCache) return elementCache[slug];
  const Component = getProjectComponent(slug);
  if (!Component) return null;
  elementCache[slug] = createElement(Component);
  return elementCache[slug];
}

function CaseStudyContent({ project }: { project: NonNullable<ReturnType<typeof useContent>["projects"]>[number] }) {
  const sections = [
    { id: "longDescription", label: null, content: project.longDescription },
    { id: "problem", label: "Problem", content: project.problem },
    { id: "solution", label: "Solution", content: project.solution },
    { id: "architecture", label: "Architecture", content: project.architecture },
    { id: "keyFeatures", label: "Key Features", content: project.keyFeatures },
    { id: "challenges", label: "Engineering Challenges", content: project.challenges },
    { id: "decisions", label: "Decisions & Tradeoffs", content: project.decisions },
    { id: "results", label: "Results", content: project.results },
    { id: "lessons", label: "Lessons Learned", content: project.lessons },
    { id: "timeline", label: "Timeline", content: project.timeline },
  ].filter((s) => s.content)

  if (sections.length === 0) return null

  return (
    <div className="space-y-8">
      {sections.map((s) =>
        s.label ? (
          <section key={s.id}>
            <h2 className="text-xl font-semibold mb-3">{s.label}</h2>
            <div className="text-muted-foreground whitespace-pre-line">{s.content}</div>
          </section>
        ) : (
          <section key={s.id}>
            <div className="text-muted-foreground whitespace-pre-line">{s.content}</div>
          </section>
        ),
      )}
    </div>
  )
}

export function ProjectContent({ slug }: ProjectContentProps) {
  const { projects } = useContent();
  const cmsProject = useMemo(() => projects.find((p) => p.slug === slug), [projects, slug]);

  if (cmsProject && cmsProject.problem) {
    const caseStudy = <CaseStudyContent project={cmsProject} />;
    const longDesc = cmsProject.longDescription;
    return (
      <>
        {longDesc && (
          <p className="text-lg text-muted-foreground mb-8">{longDesc}</p>
        )}
        {caseStudy}
      </>
    );
  }

  const element = getElement(slug);
  if (!element) {
    return <p className="text-muted-foreground">{projectsUi.detail.notFoundTitle}</p>;
  }
  return element;
}
