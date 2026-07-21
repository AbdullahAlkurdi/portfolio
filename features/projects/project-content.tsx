import { getProjectComponent } from "@/lib/content/mdx-registry";
import { projectsUi } from "@/content/data/projects-ui";
import { createElement, type ReactElement } from "react";

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
  const element = getElement(slug);
  if (!element) {
    return <p className="text-muted-foreground">{projectsUi.detail.notFoundTitle}</p>;
  }
  return element;
}
