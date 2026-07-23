import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/ui/typography/heading";
import { Body } from "@/components/ui/typography/body";
import { ProjectGrid } from "@/features/projects/project-grid";
import { getAllProjects } from "@/lib/content/projects";
import { siteConfig } from "@/content/data/site";

export const metadata: Metadata = {
  title: `Projects — ${siteConfig.name}`,
  description:
    "Applications and systems designed and developed by Abdullah Alkurdi — Flutter, Clean Architecture, Firebase, AI integration.",
  alternates: { canonical: `${siteConfig.url}/projects` },
  openGraph: {
    title: `Projects — ${siteConfig.name}`,
    description:
      "Applications and systems designed and developed by Abdullah Alkurdi.",
    url: `${siteConfig.url}/projects`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects — ${siteConfig.name}`,
    description:
      "Applications and systems designed and developed by Abdullah Alkurdi.",
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Container as="div" className="py-20 md:py-28">
      <div className="mb-12">
        <Heading level="1" as="h1" className="mb-4">
          Projects
        </Heading>
        <Body size="lg" className="max-w-2xl text-muted-foreground">
          Applications and systems I have designed and developed. Each project includes context, architecture decisions, and lessons learned.
        </Body>
      </div>

      <ProjectGrid projects={projects} />
    </Container>
  );
}
