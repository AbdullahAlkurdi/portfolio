export type NavItem = {
  label: string;
  href: string;
};

export type NavLink = {
  label: string;
  href: string;
  isExternal?: boolean;
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
  resumeCta: {
    label: string;
    href: string;
  };
  social: SocialLink[];
};

export type SiteContent = {
  navigation: NavItem[];
  hero: HeroContent;
  principles: Principle[];
  timeline: TimelineEvent[];
  footer: FooterContent;
};
