import RzMdx from "@/content/projects/rizen.mdx";
import TmMdx from "@/content/projects/tripmate.mdx";
import SmMdx from "@/content/projects/social-media-app.mdx";
import type { ComponentType } from "react";

const mdxRegistry: Record<string, ComponentType> = {
  rizen: RzMdx,
  tripmate: TmMdx,
  "social-media-app": SmMdx,
};

export function getProjectComponent(slug: string): ComponentType | null {
  return mdxRegistry[slug] ?? null;
}
