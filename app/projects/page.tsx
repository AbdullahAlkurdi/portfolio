import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/ui/typography/heading";
import { Body } from "@/components/ui/typography/body";
import { ProjectGrid } from "@/features/projects/project-grid";
import { getAllProjects } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Projects — Abdullah Alkurdi",
  description:
    "Engineering case studies spanning mobile apps, AI systems, and full-stack architectures.",
  openGraph: {
    title: "Projects — Abdullah Alkurdi",
    description:
      "Engineering case studies spanning mobile apps, AI systems, and full-stack architectures.",
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
          Engineering case studies spanning mobile apps, AI systems, and full-stack
          architectures. Each project includes context, architecture decisions, and
          lessons learned.
        </Body>
      </div>

      <ProjectGrid projects={projects} />
    </Container>
  );
}
