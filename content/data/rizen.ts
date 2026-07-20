import type { RizenContent } from "@/types/content";

export const rizenData: RizenContent = {
  hero: {
    badge: "Flagship Product",
    title: "Rizen — Habit & Life OS",
    description:
      "A production-grade Flutter application with 105+ screens, Clean Architecture, AI-powered coaching, and 300+ tests. An engineering case study in scalable mobile architecture.",
  },
  sections: [
    {
      id: "vision",
      label: "Vision",
      content:
        "Rizen is a comprehensive habit and life operating system designed to help users build consistent routines, track progress across multiple domains, and achieve long-term personal growth through data-driven insights and AI-powered coaching.",
    },
    {
      id: "problem",
      label: "Problem",
      content:
        "Existing habit trackers are superficial — they track checkboxes but fail to provide meaningful insights, adaptive coaching, or holistic life management. Users need a system that understands context, adapts to their lifestyle, and evolves with their goals.",
    },
    {
      id: "constraints",
      label: "Constraints",
      content:
        "Offline-first operation, sub-200ms response time for AI queries, support for 10k+ concurrent users, cross-platform consistency, and enterprise-grade data privacy. Every architectural decision was evaluated against these constraints.",
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
      id: "results",
      label: "Results",
      content:
        "105+ screens delivered across 6 feature domains. 300+ tests covering unit, widget, and integration layers. Zero critical bugs in production. Clean Architecture enabled parallel feature development by 3 engineers without merge conflicts.",
    },
    {
      id: "roadmap",
      label: "Roadmap",
      content:
        "Social features, team challenges, advanced analytics dashboards, wearable device integration, and an open API for third-party extensions. Continuous refinement of the AI coaching engine with reinforcement learning.",
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
    { label: "Screens", value: "105+", description: "Production screens across 6 feature domains" },
    { label: "Tests", value: "300+", description: "Unit, widget, and integration tests" },
    { label: "Architecture", value: "Clean", description: "Strict three-layer separation with BLoC" },
    { label: "Production", value: "Ready", description: "Zero critical bugs, CI/CD pipeline active" },
  ],
  results: [
    "Achieved 90% test coverage on domain layer",
    "Reduced bug rate by 70% compared to previous architecture",
    "Enabled 3 engineers to work in parallel without merge conflicts",
    "AI coaching feature increased user retention by 40%",
  ],
  roadmap: [
    "Social features and team challenges",
    "Advanced analytics with predictive insights",
    "Wearable device integration",
    "Open API for third-party extensions",
    "Reinforcement learning for AI coach",
  ],
};
