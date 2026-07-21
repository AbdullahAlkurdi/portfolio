import type { ResumeData } from "@/types/content";

export const resumeData: ResumeData = {
  name: "Abdullah Alkurdi",
  title: "Cloud & AI Engineer",
  tagline: "Building intelligent, scalable systems across mobile, web, and cloud.",
  location: "Remote · Global",
  summary:
    "Full-stack engineer and systems architect with deep expertise in Clean Architecture, cloud infrastructure, and AI-powered applications. I design production-grade systems that are maintainable, testable, and built to scale — from cross-platform mobile apps with 100+ screens to distributed cloud architectures. Passionate about the intersection of software engineering, AI/ML integration, and developer experience.",
  contact: [
    { label: "Email", href: "mailto:abdullah@example.com" },
    { label: "GitHub", href: "https://github.com/AbdullahAlkurdi" },
    { label: "LinkedIn", href: "https://linkedin.com/in/AbdullahAlkurdi" },
    { label: "Portfolio", href: "https://abdullahalkurdi.dev" },
  ],
  skillCategories: [
    {
      category: "Languages",
      skills: ["Dart", "TypeScript", "Python", "JavaScript", "SQL", "YAML"],
    },
    {
      category: "Frameworks",
      skills: ["Flutter", "Next.js", "Node.js", "Express", "React"],
    },
    {
      category: "Mobile",
      skills: ["Flutter", "BLoC", "Riverpod", "Clean Architecture", "Platform Channels"],
    },
    {
      category: "Cloud & Infrastructure",
      skills: ["Firebase", "Google Cloud", "AWS", "Vercel", "Docker"],
    },
    {
      category: "AI & ML",
      skills: ["Gemini AI", "LangChain", "RAG Pipelines", "Embeddings", "Prompt Engineering"],
    },
    {
      category: "Databases",
      skills: ["Firestore", "PostgreSQL", "SQLite", "Redis"],
    },
    {
      category: "DevOps & CI/CD",
      skills: ["GitHub Actions", "GitLab CI", "Terraform", "Cloud Run", "App Distribution"],
    },
    {
      category: "Architecture & Design",
      skills: ["Clean Architecture", "Domain-Driven Design", "SOLID", "Microservices", "Event-Driven"],
    },
    {
      category: "Testing",
      skills: ["Unit Testing", "Widget Testing", "Integration Testing", "Bloc Test", "Mockito"],
    },
  ],
  experience: [],
  education: [],
  certifications: [],
  selectedProjects: [
    { slug: "rizen", highlight: "105+ screens, Clean Architecture, AI coaching, 300+ tests" },
    { slug: "tripmate", highlight: "AI travel planning with real-time itinerary generation" },
    { slug: "mindora", highlight: "AI-enhanced private journaling with emotional pattern tracking" },
  ],
};
