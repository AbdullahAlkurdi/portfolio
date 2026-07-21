export type NavItem = {
  label: string;
  href: string;
};



export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
};

export type HeroContent = {
  headline: string;
  paragraph: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
};

export type SectionHeader = {
  badge: string;
  title: string;
  description: string;
};

export type Principle = {
  title: string;
  description: string;
  icon: string;
};

export type TimelineEvent = {
  year: string;
  title: string;
  description: string;
};

export type FooterContent = {
  email: string;
  copyright: string;
  resumeCta: {
    label: string;
    href: string;
  };
  social: SocialLink[];
};

export type SiteConfig = {
  url: string;
  name: string;
  title: string;
  description: string;
  ogImage: string;
};

export type ProjectFrontmatter = {
  title: string;
  description: string;
  tags: string[];
  category: string;
  featured: boolean;
  date: string;
  slug: string;
  readingTime: string;
  github?: string;
  demo?: string;
  image?: string;
};

export type ProjectsUiStrings = {
  listing: {
    title: string;
    description: string;
  };
  filter: {
    all: string;
    label: string;
    empty: string;
    noMatch: string;
  };
  card: {
    featured: string;
    readCaseStudy: string;
    code: string;
    live: string;
  };
  detail: {
    github: string;
    liveDemo: string;
    previous: string;
    next: string;
    backToAll: string;
    backChevron: string;
    notFoundTitle: string;
    notFoundDescription: string;
  };
  notFound: {
    title: string;
    description: string;
    backLink: string;
  };
};

export type RizenSection = {
  id: string;
  label: string;
  content: string;
};

export type RizenArchitectureLayer = {
  name: string;
  description: string;
  children?: string[];
};

export type RizenAiStep = {
  label: string;
  description: string;
};

export type RizenMetric = {
  label: string;
  value: string;
  description: string;
};

export type RizenEcosystemNode = {
  name: string;
  description: string;
};

export type RizenContent = {
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  sections: RizenSection[];
  architecture: RizenArchitectureLayer[];
  aiLifecycle: RizenAiStep[];
  ecosystem: RizenEcosystemNode[];
  metrics: RizenMetric[];
  results: string[];
  roadmap: string[];
};


