export type NavItem = {
  label: string;
  href: string;
};

export type NavigationContent = {
  brand: string;
  items: NavItem[];
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


