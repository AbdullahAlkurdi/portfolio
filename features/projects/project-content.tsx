import RzMdx from "@/content/projects/rizen.mdx";
import TmMdx from "@/content/projects/tripmate.mdx";
import MdMdx from "@/content/projects/mindora.mdx";
import { projectsUi } from "@/content/data/projects-ui";
import type { ReactNode } from "react";

const renderers: Record<string, () => ReactNode> = {
  rizen: () => <RzMdx />,
  tripmate: () => <TmMdx />,
  mindora: () => <MdMdx />,
};

type ProjectContentProps = {
  slug: string;
};

export function ProjectContent({ slug }: ProjectContentProps) {
  const render = renderers[slug];
  if (!render) {
    return <p className="text-muted-foreground">{projectsUi.detail.notFoundTitle}</p>;
  }
  return render();
}
