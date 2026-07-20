import type { Principle } from "@/types/content";

export const principlesData: Principle[] = [
  {
    title: "Clean Architecture",
    description:
      "Separation of concerns with well-defined boundaries. Domain logic isolated from infrastructure, ensuring systems remain adaptable and testable as requirements evolve.",
    icon: "layers",
  },
  {
    title: "SOLID Principles",
    description:
      "Single responsibility, open-closed, Liskov substitution, interface segregation, dependency inversion. The foundation of maintainable object-oriented design.",
    icon: "blocks",
  },
  {
    title: "Scalability",
    description:
      "Designing systems that grow horizontally and vertically without degradation. Stateless architectures, efficient caching, and database optimization from day one.",
    icon: "trending-up",
  },
  {
    title: "Accessibility",
    description:
      "Every interface must be usable by everyone. WCAG AA compliance, semantic HTML, keyboard navigation, screen reader support, and reduced motion preferences.",
    icon: "accessibility",
  },
  {
    title: "Performance",
    description:
      "Fast load times, minimal bundle sizes, efficient rendering. Server components, lazy loading, code splitting, and optimized assets are non-negotiable.",
    icon: "zap",
  },
  {
    title: "Maintainability",
    description:
      "Code that is easy to understand, change, and extend. Consistent patterns, comprehensive types, meaningful tests, and documentation as code.",
    icon: "code",
  },
];
