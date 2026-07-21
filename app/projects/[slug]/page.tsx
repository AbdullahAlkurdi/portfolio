import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/typography/heading";
import { Body } from "@/components/ui/typography/body";
import { ProjectContent } from "@/features/projects/project-content";
import { ProjectNavigation } from "@/features/projects/project-navigation";
import { getProject, getAllSlugs } from "@/lib/content/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const { frontmatter } = project;

  return {
    title: `${frontmatter.title} — Abdullah Alkurdi`,
    description: frontmatter.description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: `${frontmatter.title} — Abdullah Alkurdi`,
      description: frontmatter.description,
      type: "article",
      publishedTime: frontmatter.date,
      url: `/projects/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${frontmatter.title} — Abdullah Alkurdi`,
      description: frontmatter.description,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const { frontmatter } = project;

  const allProjects = (
    await Promise.all(
      getAllSlugs().map(async (s) => {
        const p = getProject(s);
        return p?.frontmatter ?? null;
      }),
    )
  ).filter(Boolean) as typeof project.frontmatter[];

  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const next =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  return (
    <Container as="article" className="py-20 md:py-28">
      <div className="mb-10">
        <Link
          href="/projects"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          All projects
        </Link>

        <Heading level="1" as="h1" className="mb-4">
          {frontmatter.title}
        </Heading>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          {frontmatter.featured && <Badge variant="primary">Featured</Badge>}
          <Badge variant="secondary">{frontmatter.category}</Badge>
          <span className="text-sm text-muted-foreground">{frontmatter.date}</span>
          <span className="text-sm text-muted-foreground">·</span>
          <span className="text-sm text-muted-foreground">{frontmatter.readingTime}</span>
        </div>

        <Body size="lg" className="mb-6 max-w-3xl text-muted-foreground">
          {frontmatter.description}
        </Body>

        <div className="mb-6 flex flex-wrap gap-3">
          {frontmatter.github && (
            <a
              href={frontmatter.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
          {frontmatter.demo && (
            <a
              href={frontmatter.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live Demo
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {frontmatter.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="prose-container max-w-3xl">
        <ProjectContent slug={slug} />
      </div>

      <div className="mt-16">
        <ProjectNavigation prev={prev} next={next} />
      </div>
    </Container>
  );
}
