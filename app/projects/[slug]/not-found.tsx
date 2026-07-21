import { Container } from "@/components/layout/container";
import { Heading } from "@/components/ui/typography/heading";
import { Body } from "@/components/ui/typography/body";
import { Button } from "@/components/ui/button";
import { projectsUi } from "@/content/data/projects-ui";

export default function ProjectNotFound() {
  return (
    <Container as="div" className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="text-center">
        <Heading level="1" as="h1" className="mb-4">
          {projectsUi.notFound.title}
        </Heading>
        <Body size="lg" className="mb-8 text-muted-foreground">
          {projectsUi.notFound.description}
        </Body>
        <Button as="a" href="/projects">
          {projectsUi.notFound.backLink}
        </Button>
      </div>
    </Container>
  );
}
