"use client"

import { useLocale } from "@/lib/locale-context";
import { getSiteContent } from "@/content/data/content";
import { useContent } from "@/lib/content/content-provider";
import { getProjectComponent } from "@/lib/content/mdx-registry";
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

export function ProjectContent({ slug }: ProjectContentProps) {
  const { locale } = useLocale();
  const ui = getSiteContent(locale).ui;
  const { projects } = useContent();
  const cmsProject = useMemo(() => projects.find((p) => p.slug === slug), [projects, slug]);

  if (cmsProject && cmsProject.problem) {
    const sections = [
      { id: "longDescription", label: null, content: cmsProject.longDescription },
      { id: "problem", label: ui.caseStudySections.problem, content: cmsProject.problem },
      { id: "solution", label: ui.caseStudySections.solution, content: cmsProject.solution },
      { id: "architecture", label: ui.caseStudySections.architecture, content: cmsProject.architecture },
      { id: "keyFeatures", label: ui.caseStudySections.keyFeatures, content: cmsProject.keyFeatures },
      { id: "challenges", label: ui.caseStudySections.challenges, content: cmsProject.challenges },
      { id: "decisions", label: ui.caseStudySections.decisions, content: cmsProject.decisions },
      { id: "results", label: ui.caseStudySections.results, content: cmsProject.results },
      { id: "lessons", label: ui.caseStudySections.lessons, content: cmsProject.lessons },
      { id: "timeline", label: ui.caseStudySections.timeline, content: cmsProject.timeline },
    ].filter((s) => s.content)

    return (
      <>
        {cmsProject.longDescription && (
          <p className="text-lg text-muted-foreground mb-8">{cmsProject.longDescription}</p>
        )}
        {sections.length > 0 && (
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
        )}
      </>
    );
  }

  const element = getElement(slug);
  if (!element) {
    return <p className="text-muted-foreground">{getSiteContent(locale).notFound.title}</p>;
  }
  return element;
}
