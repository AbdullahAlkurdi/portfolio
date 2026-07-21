import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/ui/typography/heading";
import { Body } from "@/components/ui/typography/body";
import { ProjectGrid } from "@/features/projects/project-grid";
import { getAllProjects } from "@/lib/content/projects";
import { projectsUi } from "@/content/data/projects-ui";
import { siteConfig } from "@/content/data/site";

export const metadata: Metadata = {
  title: `${projectsUi.listing.title} — ${siteConfig.name}`,
  description: projectsUi.listing.description,
  openGraph: {
    title: `${projectsUi.listing.title} — ${siteConfig.name}`,
    description: projectsUi.listing.description,
    url: `${siteConfig.url}/projects`,
    images: [{ url: `${siteConfig.url}${siteConfig.ogImage}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${projectsUi.listing.title} — ${siteConfig.name}`,
    description: projectsUi.listing.description,
    images: [`${siteConfig.url}${siteConfig.ogImage}`],
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Container as="div" className="py-20 md:py-28">
      <div className="mb-12">
        <Heading level="1" as="h1" className="mb-4">
          {projectsUi.listing.title}
        </Heading>
        <Body size="lg" className="max-w-2xl text-muted-foreground">
          {projectsUi.listing.description}
        </Body>
      </div>

      <ProjectGrid projects={projects} />
    </Container>
  );
}
