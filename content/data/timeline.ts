import type { SectionHeader, TimelineEvent } from "@/types/content";

export const timelineSection: SectionHeader = {
  badge: "Engineering Evolution",
  title: "The Journey So Far",
  description:
    "Every engineer evolves. Here is a snapshot of the milestones that shaped my approach to building software.",
};

export const timelineData: TimelineEvent[] = [
  {
    year: "2019",
    title: "First Line of Code",
    description:
      "Built a terminal-based game in Python. Discovered the joy of turning logic into working software.",
  },
  {
    year: "2020",
    title: "Web Development",
    description:
      "Created first full-stack web application with React and Node.js. Learned REST APIs, databases, and deployment.",
  },
  {
    year: "2021",
    title: "Clean Architecture",
    description:
      "Adopted domain-driven design and clean architecture principles. Started separating concerns and writing testable code.",
  },
  {
    year: "2022",
    title: "Production Systems",
    description:
      "Shipped multiple production applications. Learned about monitoring, error tracking, CI/CD pipelines, and team collaboration.",
  },
  {
    year: "2023",
    title: "Flutter & Mobile",
    description:
      "Expanded into cross-platform mobile development with Flutter. Built feature-rich applications with BLoC state management.",
  },
  {
    year: "2024",
    title: "System Design",
    description:
      "Focused on distributed systems, microservices architecture, and cloud infrastructure at scale.",
  },
];
