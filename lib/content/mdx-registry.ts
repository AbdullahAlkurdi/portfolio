import RzMdx from "@/content/projects/rizen.mdx";
import TmMdx from "@/content/projects/tripmate.mdx";
import MdMdx from "@/content/projects/mindora.mdx";
import type { ComponentType } from "react";

const mdxRegistry: Record<string, ComponentType> = {
  rizen: RzMdx,
  tripmate: TmMdx,
  mindora: MdMdx,
};

export function getProjectComponent(slug: string): ComponentType | null {
  return mdxRegistry[slug] ?? null;
}
