import type { RizenContent } from "@/types/content";

export const rizenData: RizenContent = {
  hero: {
    badge: "Flagship Project",
    title: "Rizen — Habit & Life OS",
    description:
      "A Flutter habit and life operating system built with Clean Architecture, BLoC state management, Firebase backend, and Gemini AI coaching.",
  },
  sections: [
    {
      id: "vision",
      label: "Vision",
      content:
        "Rizen is a habit and life operating system designed to help users build consistent routines, track progress across multiple domains, and achieve personal growth through data-driven insights and AI-powered coaching.",
    },
    {
      id: "problem",
      label: "Problem",
      content:
        "Existing habit trackers are superficial — they track checkboxes but fail to provide meaningful insights, adaptive coaching, or holistic life management. Users need a system that understands context, adapts to their lifestyle, and evolves with their goals.",
    },
    {
      id: "architecture",
      label: "Architecture",
      content:
        "Built on Clean Architecture principles with strict layer separation. The domain layer contains pure business logic with zero framework dependencies. Repository interfaces in domain, implementations in data. BLoC pattern for predictable state management.",
    },
    {
      id: "ai",
      label: "AI Integration",
      content:
        "Gemini-powered AI coach that analyzes user patterns, provides personalized recommendations, and adapts coaching strategies based on progress. The AI layer is isolated behind a repository interface, allowing provider swaps without affecting domain logic.",
    },
    {
      id: "current-status",
      label: "Current Status",
      content:
        "Rizen is under active development. Core architecture is implemented with Clean Architecture layers, BLoC state management, and Firebase integration. AI coaching with Gemini is in progress. The project serves as a learning platform for advanced Flutter patterns and mobile architecture patterns.",
    },
  ],
  architecture: [
    {
      name: "Presentation",
      description: "Flutter widgets, BLoC/Cubit state management, GoRouter navigation",
      children: ["Screens", "Widgets", "Blocs", "Routes"],
    },
    {
      name: "Domain",
      description: "Use cases, repository interfaces, entities with pure Dart logic",
      children: ["UseCases", "Repositories", "Entities"],
    },
    {
      name: "Data",
      description: "Repository implementations, DTOs, data source abstractions",
      children: ["Repositories", "DTOs", "DataSources"],
    },
    {
      name: "Infrastructure",
      description: "Firebase, local storage, platform channels, external APIs",
      children: ["Firebase", "Storage", "Platform"],
    },
  ],
  aiLifecycle: [
    { label: "User", description: "User submits journal entry or completes a habit" },
    { label: "Flutter", description: "UI captures input and dispatches BLoC event" },
    { label: "Repository", description: "AIRepository interface called from use case" },
    { label: "Gemini", description: "Gemini API processes the request and returns analysis" },
    { label: "Response", description: "AI response mapped to domain model" },
    { label: "State", description: "BLoC emits new state with AI insights" },
    { label: "UI", description: "Widget rebuilds with coaching feedback" },
  ],
  ecosystem: [
    { name: "Rizen Core", description: "Habit tracking, routines, domains, analytics engine" },
    { name: "AI", description: "Gemini-powered coaching, pattern analysis, recommendations" },
    { name: "Cloud", description: "Firebase backend, Firestore, authentication, cloud functions" },
    { name: "Analytics", description: "Progress dashboards, streak tracking, domain-level insights" },
    { name: "UI", description: "Flutter widget library, design system, animations, theming" },
  ],
  metrics: [
    { label: "Architecture", value: "Clean", description: "Three-layer separation with BLoC pattern" },
    { label: "State Management", value: "BLoC", description: "Predictable, testable state management" },
    { label: "Backend", value: "Firebase", description: "Authentication, Firestore, cloud functions" },
    { label: "AI", value: "Gemini", description: "AI-powered coaching integration" },
  ],
  results: [
    "Clean Architecture enables maintainable and testable code",
    "BLoC pattern provides predictable state management across features",
    "Firebase integration handles authentication and data persistence",
    "Gemini AI integration brings intelligent coaching capabilities",
  ],
  roadmap: [
    "Complete core habit tracking features",
    "Implement AI coaching with pattern analysis",
    "Add analytics dashboards and streak tracking",
    "Social features and team challenges",
    "Wearable device integration",
  ],
};
