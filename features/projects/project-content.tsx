import RzMdx from "@/content/projects/rizen.mdx";
import TmMdx from "@/content/projects/tripmate.mdx";
import MdMdx from "@/content/projects/mindora.mdx";

type ProjectContentProps = {
  slug: string;
};

export function ProjectContent({ slug }: ProjectContentProps) {
  switch (slug) {
    case "rizen":
      return <RzMdx />;
    case "tripmate":
      return <TmMdx />;
    case "mindora":
      return <MdMdx />;
    default:
      return <p className="text-muted-foreground">Project not found.</p>;
  }
}
