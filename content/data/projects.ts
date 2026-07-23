import type { ProjectFrontmatter } from "@/types/content";

export const projectsData: ProjectFrontmatter[] = [
  {
    slug: "rizen",
    title: "Rizen — Habit & Life OS",
    description:
      "A Flutter habit and life operating system built with Clean Architecture, BLoC state management, Firebase backend, and Gemini AI coaching.",
    tags: ["Flutter", "Dart", "Clean Architecture", "BLoC", "Firebase", "Gemini AI"],
    category: "Mobile App",
    featured: true,
    date: "2026-06-15",
    readingTime: "8 min read",
  },
  {
    slug: "tripmate",
    title: "TripMate — AI Travel Companion",
    description:
      "An intelligent trip planner that uses AI to build personalized itineraries, discover hidden gems, and adapt to real-time changes.",
    tags: ["Flutter", "Dart", "Firebase", "Clean Architecture", "BLoC", "Gemini AI"],
    category: "Mobile App",
    featured: true,
    date: "2026-04-20",
    readingTime: "7 min read",
  },

  {
    slug: "social-media-app",
    title: "Social Media App — Graduation Project",
    description:
      "A cross-platform social media application developed as a graduation project, featuring UI design, process flows, and team collaboration using Flutter and Dart.",
    tags: ["Flutter", "Dart", "Cross-platform", "UI Design", "Team Collaboration"],
    category: "Mobile App",
    featured: false,
    date: "2025-12-01",
    readingTime: "5 min read",
  },
];
