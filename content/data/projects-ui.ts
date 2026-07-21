import type { ProjectsUiStrings } from "@/types/content";

export const projectsUi: ProjectsUiStrings = {
  listing: {
    title: "Projects",
    description:
      "Engineering case studies spanning mobile apps, AI systems, and full-stack architectures. Each project includes context, architecture decisions, and lessons learned.",
  },
  filter: {
    all: "All",
    label: "Filter by technology",
    empty: "No projects found.",
    noMatch: "No projects match the filter",
  },
  card: {
    featured: "Featured",
    readCaseStudy: "Read case study",
    code: "Code",
    live: "Live",
  },
  detail: {
    github: "GitHub",
    liveDemo: "Live Demo",
    previous: "Previous",
    next: "Next",
    backToAll: "All projects",
    backChevron: "← Back to projects",
    notFoundTitle: "Project not found",
    notFoundDescription: "The project you're looking for doesn't exist or has been removed.",
  },
  notFound: {
    title: "Project not found",
    description:
      "The project you're looking for doesn't exist or has been removed.",
    backLink: "← All projects",
  },
};
