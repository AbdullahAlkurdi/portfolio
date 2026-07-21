import type { ProjectFrontmatter } from "@/types/content";

export const projectsData: ProjectFrontmatter[] = [
  {
    slug: "rizen",
    title: "Rizen — Habit & Life OS",
    description:
      "A production-grade Flutter application with 105+ screens, Clean Architecture, AI-powered coaching, and 300+ tests.",
    tags: ["Flutter", "Dart", "Clean Architecture", "BLoC", "Firebase", "Gemini AI"],
    category: "Mobile App",
    featured: true,
    date: "2026-06-15",
    readingTime: "8 min read",
    github: "https://github.com",
    demo: "https://example.com",
    image: "/images/rizen.png",
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
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    slug: "mindora",
    title: "Mindora — Mindful AI Journaling",
    description:
      "A private, AI-enhanced journaling app that helps users process thoughts, track emotional patterns, and cultivate self-awareness through intelligent reflection.",
    tags: ["Flutter", "Dart", "Firebase", "BLoC", "Clean Architecture", "Gemini AI"],
    category: "Mobile App",
    featured: false,
    date: "2026-02-10",
    readingTime: "7 min read",
    github: "https://github.com",
  },
];
