/**
 * CMS Data Migration Script
 *
 * Safely migrates static portfolio data to Firestore.
 * Dry-run mode: npx tsx scripts/seed-cms.mjs --dry-run
 * Execute mode: npx tsx scripts/seed-cms.mjs
 *
 * Requirements:
 *  - .env.local with Firebase Admin credentials (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY)
 *  - firebase-admin npm package installed
 *
 * Safety guarantees:
 *  - WILL NOT overwrite existing documents unless --force is passed
 *  - Reports every record it would create, skip, or conflict
 *  - Idempotent: running twice produces the same result
 *  - All writes use setDoc with deterministic document IDs
 */

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ─── Parse args ───────────────────────────────────────────────
const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const FORCE = args.includes("--force");

if (DRY_RUN) console.log("🔍 DRY RUN MODE — no data will be written\n");
if (FORCE) console.log("⚠️  FORCE MODE — will overwrite existing documents\n");

// ─── Load .env.local ──────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env.local");
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let value = trimmed.slice(eqIdx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
} catch {
  console.error("❌ Cannot read .env.local. Create it from .env.template");
  process.exit(1);
}

// ─── Init Firebase Admin ──────────────────────────────────────
const required = ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`❌ Missing env var: ${key}`);
    process.exit(1);
  }
}

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();

// ─── Static Data ──────────────────────────────────────────────

const identityData = {
  fullName: "Abdullah Alkurdi",
  title: "IT Specialist & Software Engineer",
  headline: "Software Development · IT Support · Networking",
  summary: "Information Technology graduate with hands-on experience in software development, system documentation, network and IT support. Skilled in Python, Java, Dart, C++, and Flutter for cross-platform mobile development, with additional knowledge of web development, databases, networking, and DevOps tools. Experienced in hardware and software installation, troubleshooting, network cabling, printer configuration, CCTV, biometric systems, IP telephony, and end-user technical support. Interested in building reliable software systems while continuing to grow across software engineering, IT infrastructure, cloud technologies, and AI-powered applications.",
  location: "Makkah, Saudi Arabia — Al-Maabdah",
  availability: "Open to opportunities",
  email: "abdullah.h.alkurdi@gmail.com",
  phone: "+966511792943",
  whatsapp: "https://wa.me/+966511792943?text=Abdullah%20Alkurdi",
  github: "https://github.com/AbdullahAlkurdi",
  linkedin: "https://www.linkedin.com/in/abdullah-alkordie",
  instagram: "https://www.instagram.com/kordie47",
  facebook: "https://www.facebook.com/profile.php?id=100090810524502",
  telegram: "https://t.me/Kordie47",
  published: true,
};

const experienceData = [
  {
    role: "Network & IT Support Specialist",
    organization: "Freelance",
    location: "Sana'a, Yemen",
    startDate: "2022",
    endDate: "2025",
    description: "Provided freelance network and IT support services, delivering technical solutions for hardware, software, and infrastructure needs.",
    achievements: [
      "Installed and maintained hardware, operating systems, and software applications.",
      "Configured and troubleshot printers, CCTV systems, biometric systems, and IP telephony.",
      "Managed network cabling, connections, and terminations.",
      "Monitored system and network performance and resolved technical issues.",
      "Delivered end-user support for local and remote services.",
      "Collaborated in a two-person team to solve IT challenges.",
    ].join("\n"),
    technologies: "Networking fundamentals, Network cabling, Hardware, Operating systems, Software installation, Printers, CCTV, Biometric systems, IP telephony, IT troubleshooting, Remote support",
    published: true,
  },
  {
    role: "Software Development Intern — Flutter",
    organization: "Yemen Soft Co.",
    location: "Sana'a, Yemen",
    startDate: "January 2025",
    endDate: "March 2025",
    description: "Participated in cross-platform mobile application development using Flutter, contributing to issue resolution and team knowledge sharing.",
    achievements: [
      "Participated in the development of a cross-platform mobile application using Flutter.",
      "Helped resolve 20+ technical issues reported by users.",
      "Documented development methodology and created technical manuals for future reference.",
      "Assisted the team in developing an application that runs on various platforms.",
      "Trained team members in the Dart language used in the project.",
    ].join("\n"),
    technologies: "Flutter, Dart, Cross-platform mobile development",
    published: true,
  },
  {
    role: "Software Development Documentation Intern — Field Training (Payments App)",
    organization: "Field Training",
    location: "Sana'a, Yemen",
    startDate: "2025",
    endDate: "2025",
    description: "Prepared detailed system documentation and user requirement analysis for a payments application during field training.",
    achievements: [
      "Prepared detailed system documentation covering processes, screens, and data relationships.",
      "Identified user requirements and functional needs for an accounting system.",
      "Designed Data Flow Diagrams (DFDs) and system models.",
      "Delivered final documentation following company standards and supervisor reviews.",
    ].join("\n"),
    technologies: "System documentation, Data Flow Diagrams, Requirements analysis",
    published: true,
  },
];

const educationData = [
  {
    degree: "Bachelor's in Information Technology",
    institution: "University of Science and Technology",
    location: "Sana'a, Yemen",
    endDate: "2025",
    description: "Graduation Project: Social Media App — assisted the team in developing a cross-platform application, trained team members in Dart, and designed user interfaces and process flows.",
    published: true,
  },
];

const certificationsData = [
  { name: "CCNA", issuer: "Cisco", published: true },
  { name: "ICDL", issuer: "General Telecommunication Institute", published: true },
  { name: "IT & Technical Support Guide to Helpdesk, Desktop & Servers", issuer: "Udemy", published: true },
  { name: "Time Management Mastery: Stress Less, Work More", issuer: "Udemy", published: true },
  { name: "Project Management", issuer: "Udemy", published: true },
  { name: "CompTIA IT Fundamentals", issuer: "Udemy", published: true },
];

const coursesData = [
  { name: "Critical Thinking and Problem Solving", issuer: "", published: true },
  { name: "Data Structures and Algorithms", issuer: "", published: true },
  { name: "Programming Basics Using Python", issuer: "", published: true },
  { name: "Time Management", issuer: "", published: true },
  { name: "Software Development with Flutter & Dart", issuer: "", published: true },
];

const skillsData = [
  { category: "Programming Languages", skills: "Python, Java, Dart, C++, SQL, JavaScript", published: true },
  { category: "Web Development", skills: "HTML, CSS, JavaScript, PHP", published: true },
  { category: "Mobile Development", skills: "Flutter, Cross-platform mobile development", published: true },
  { category: "Databases", skills: "MySQL, Oracle, SQL", published: true },
  { category: "Cloud & AI", skills: "Firebase, Google Cloud, Gemini AI, AI-powered application development", published: true },
  { category: "Networking", skills: "Networking fundamentals, CCNA knowledge, Network cabling, Virtual infrastructures, Network troubleshooting", published: true },
  { category: "IT Support", skills: "Operating system installation, Software installation, Printer setup and troubleshooting, CCTV installation, Hardware troubleshooting, End-user technical support, Remote support", published: true },
  { category: "DevOps & Tools", skills: "Docker, Git, GitHub, CI/CD", published: true },
  { category: "Software Engineering", skills: "Clean Architecture, BLoC/Cubit, Firebase/Firestore, REST APIs, React, Next.js, TypeScript", published: true },
];

const knowledgeData = [
  { name: "Software Engineering", nameAr: "هندسة البرمجيات", level: "Developing", description: "Clean Architecture, BLoC/Cubit, SOLID, design patterns, testing strategies", descriptionAr: "هندسة البرمجيات النظيفة، BLoC/Cubit، SOLID، أنماط التصميم، استراتيجيات الاختبار", icon: "code", technologies: "Dart, Flutter, TypeScript, Clean Architecture, BLoC", evidence: "Rizen Project, TripMate Project", published: true },
  { name: "Flutter & Dart", nameAr: "Flutter و Dart", level: "Developing", description: "Cross-platform mobile apps, state management, custom widgets, platform channels", descriptionAr: "تطبيقات الجوال متعددة المنصات، إدارة الحالة، عناصر واجهة مخصصة، قنوات المنصة", icon: "smartphone", technologies: "Flutter, Dart, BLoC, Cubit, GoRouter", evidence: "Rizen Project, Yemen Soft Internship, Social Media App", published: true },
  { name: "Programming", nameAr: "البرمجة", level: "Developing", description: "Python, Java, Dart, C++, JavaScript — data structures, algorithms, OOP", descriptionAr: "بايثون، جافا، Dart، C++، جافاسكريبت — هياكل البيانات، الخوارزميات، البرمجة كائنية التوجه", icon: "terminal", technologies: "Python, Java, Dart, C++, JavaScript", evidence: "University Coursework, Data Structures Course, Programming Basics Course", published: true },
  { name: "Databases", nameAr: "قواعد البيانات", level: "Intermediate", description: "MySQL, Oracle, SQL, Firebase Firestore — schema design, queries, data modeling", descriptionAr: "MySQL, Oracle, SQL, Firebase Firestore — تصميم المخططات، الاستعلامات، نمذجة البيانات", icon: "database", technologies: "MySQL, Oracle, SQL, Firebase Firestore", evidence: "University Coursework, Rizen Project, Social Media App", published: true },
  { name: "Web Development", nameAr: "تطوير الويب", level: "Intermediate", description: "HTML, CSS, JavaScript, PHP, React, Next.js, TypeScript", descriptionAr: "HTML، CSS، JavaScript، PHP، React، Next.js، TypeScript", icon: "globe", technologies: "HTML, CSS, JavaScript, PHP, React, Next.js, TypeScript", evidence: "Portfolio Website, University Coursework", published: true },
  { name: "Networking", nameAr: "الشبكات", level: "Intermediate", description: "CCNA, network cabling, IP telephony, virtual infrastructures, troubleshooting", descriptionAr: "CCNA، كابلات الشبكات، الاتصالات عبر IP، البنى التحتية الافتراضية، حل المشكلات", icon: "network", technologies: "CCNA, TCP/IP, DNS, DHCP, VLAN, Routing", evidence: "CCNA Certification, IT Support Experience", published: true },
  { name: "IT Infrastructure", nameAr: "البنية التحتية لتقنية المعلومات", level: "Proficient", description: "OS installation, hardware, printers, CCTV, biometrics, remote support", descriptionAr: "تثبيت أنظمة التشغيل، الأجهزة، الطابعات، كاميرات المراقبة، الأنظمة الحيوية، الدعم عن بعد", icon: "monitor", technologies: "Windows, Linux, Printer Configuration, CCTV, Biometric Systems", evidence: "IT Support Experience (2022-2025)", published: true },
  { name: "IT Support", nameAr: "الدعم التقني", level: "Proficient", description: "End-user support, troubleshooting, system configuration, maintenance", descriptionAr: "دعم المستخدم النهائي، حل المشكلات، تكوين الأنظمة، الصيانة", icon: "wrench", technologies: "Troubleshooting, Remote Support, Hardware, Software Installation", evidence: "IT Support Experience (2022-2025)", published: true },
  { name: "Cloud & DevOps", nameAr: "السحابة و DevOps", level: "Learning", description: "Firebase, Docker, Git/GitHub, CI/CD fundamentals, Google Cloud", descriptionAr: "Firebase، Docker، Git/GitHub، أساسيات CI/CD، Google Cloud", icon: "cloud", technologies: "Firebase, Docker, Git, GitHub, CI/CD", evidence: "Rizen Project, GitHub Repositories", published: true },
  { name: "AI & Emerging Tech", nameAr: "الذكاء الاصطناعي والتقنيات الناشئة", level: "Exploring", description: "Gemini AI integration, AI-powered app features, prompt engineering", descriptionAr: "دمج Gemini AI، ميزات التطبيقات المدعومة بالذكاء الاصطناعي، هندسة المطالبات", icon: "brain", technologies: "Gemini AI, AI Integration, Prompt Engineering", evidence: "Rizen Project, TripMate Concept", published: true },
];

const socialData = [
  { label: "GitHub", href: "https://github.com/AbdullahAlkurdi", icon: "github", published: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abdullah-alkordie", icon: "linkedin", published: true },
  { label: "Instagram", href: "https://www.instagram.com/kordie47", icon: "instagram", published: true },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100090810524502", icon: "facebook", published: true },
  { label: "Telegram", href: "https://t.me/Kordie47", icon: "telegram", published: true },
  { label: "WhatsApp", href: "https://wa.me/+966511792943?text=Abdullah%20Alkurdi", icon: "whatsapp", published: true },
];

const timelineData = [
  { year: "2022", title: "Started IT Support Work", description: "Began providing freelance network and IT support. Installed and maintained hardware, operating systems, software, printers, CCTV, biometric systems, and IP telephony.", order: 0, published: true },
  { year: "2022", title: "CCNA Certified", description: "Earned Cisco CCNA certification, building a strong foundation in networking fundamentals.", order: 1, published: true },
  { year: "2023", title: "Started Programming", description: "Learned Python programming and began studying Data Structures and Algorithms. Started building small programs and exploring software development.", order: 2, published: true },
  { year: "2024", title: "Flutter & Mobile Development", description: "Started learning Flutter and Dart for cross-platform mobile development. Built first mobile app prototypes.", order: 3, published: true },
  { year: "2025", title: "Flutter Internship", description: "Completed a 3-month Flutter development internship at Yemen Soft Co. Contributed to cross-platform applications and trained team members in Dart.", order: 4, published: true },
  { year: "2025", title: "Documentation & Graduation", description: "Prepared system documentation for a payments application. Graduated with a Bachelor's in Information Technology. Graduation project: Social Media App.", order: 5, published: true },
  { year: "2026", title: "Building & Growing", description: "Building Rizen (Habit & Life OS) and TripMate (AI Travel Companion). Deepening skills in Clean Architecture, BLoC, Firebase, and AI integration.", order: 6, published: true },
];

const workingData = [
  {
    name: "Rizen — Habit & Life OS",
    description: "A comprehensive habit and life operating system built with Flutter and Clean Architecture. Features AI-powered coaching via Gemini, Firebase backend, and BLoC state management.",
    phase: "Development",
    whatBuilding: "Core habit tracking, AI coaching integration, analytics dashboard",
    technologies: "Flutter, Dart, Firebase, Gemini AI, BLoC",
    lastUpdated: "2026-06",
    status: "active",
    order: 0,
    published: true,
  },
  {
    name: "TripMate — AI Travel Companion",
    description: "An AI-powered travel planner that generates personalized itineraries and discovers hidden gems based on user preferences.",
    phase: "Planning / Early Development",
    whatBuilding: "Route planning engine, AI itinerary generation, user preferences system",
    technologies: "Flutter, Dart, Firebase, Gemini AI",
    lastUpdated: "2026-04",
    status: "planning",
    order: 1,
    published: true,
  },
];

const learningData = [
  { topic: "Advanced Flutter Patterns", reason: "Deepen mobile development expertise beyond basics", progress: "Learning state management patterns and platform channels", published: true },
  { topic: "Firebase Security Rules", reason: "Hardening production Firestore deployments", progress: "Studying rules language and testing strategies", published: true },
  { topic: "State Machine Design", reason: "Improving BLoC architecture and predictable state management", progress: "Learning XState concepts and applying to Cubit/BLoC", published: true },
];

// ─── Migration Runner ─────────────────────────────────────────

const projectData = [
  {
    slug: "rizen",
    title: "Rizen — Habit & Life OS",
    description: "A Flutter habit and life operating system built with Clean Architecture, BLoC state management, Firebase backend, and Gemini AI coaching.",
    tags: ["Flutter", "Dart", "Clean Architecture", "BLoC", "Firebase", "Gemini AI"],
    category: "Mobile App",
    featured: true,
    status: "actively-developing",
    published: true,
    date: "2026-06-15",
    readingTime: "8 min read",
    longDescription: "Rizen was born from a fundamental observation: existing habit trackers treat personal growth as a checklist. Users check boxes, watch streaks grow, but receive no meaningful insight into their patterns, no adaptive coaching, and no holistic view of their life.\n\nThe engineering challenge was to build a system that could understand context, adapt to individual lifestyles, and evolve with user goals — while maintaining offline-first reliability and a clean, maintainable architecture.",
    problem: "Existing solutions share three critical failures:\n\n**Superficial tracking.** Most apps track binary completion — did you or didn't you? They ignore nuance, context, and the qualitative aspects of habit formation.\n\n**No adaptive intelligence.** Users plateau because the app treats everyone identically.\n\n**Fragmented experience.** Health, productivity, learning, finance, relationships — users manage these domains across multiple apps.",
    solution: "Rizen aims to unify all life domains under a single coherent system with:\n1. Unified life OS — One app for habits, routines, goals, and analytics\n2. AI-powered coaching — Gemini-driven insights that adapt to individual patterns\n3. Offline-first — Full functionality without connectivity\n4. Clean Architecture — Maintainable, testable code\n5. Cross-platform — Consistent experience across iOS and Android",
    architecture: "The system follows Clean Architecture with three distinct layers:\n\n**Presentation Layer** — Flutter widgets with BLoC pattern\n**Domain Layer** — Pure Dart classes with zero Flutter dependency\n**Data Layer** — Repository implementations coordinating between domain models and data sources\n\nFirebase for cloud sync and auth, Isar for local persistence, Gemini for AI.",
    keyFeatures: "Habit tracking with qualitative metrics, AI-powered coaching with pattern analysis, Multi-domain life management (health, productivity, learning, finance, relationships), Offline-first architecture, Cross-platform (iOS + Android)",
    challenges: "Isolating AI behind a repository interface from day one was critical. This allowed switching from an initial rule-based engine to Gemini without touching domain logic. Offline sync with conflict resolution required careful design.",
    decisions: "BLoC for predictable state machines. Isar over Hive for type-safe queries. Gemini for multimodal AI capabilities.",
    results: "Core architecture implemented with Clean Architecture layers, BLoC state management, and Firebase integration. AI coaching with Gemini in progress.",
    lessons: "1. Invest in repository interfaces early — the AI repository abstraction saved months\n2. Domain purity pays dividends — tests without Flutter are much faster\n3. Don't over-abstract early — some layers went through unnecessary indirection",
    timeline: "Under active development. Core architecture complete. AI coaching integration in progress.",
  },
  {
    slug: "tripmate",
    title: "TripMate — AI Travel Companion",
    description: "An intelligent trip planner that uses AI to build personalized itineraries, discover hidden gems, and adapt to real-time changes.",
    tags: ["Flutter", "Dart", "Firebase", "Clean Architecture", "BLoC", "Gemini AI"],
    category: "Mobile App",
    featured: true,
    status: "prototype",
    published: true,
    date: "2026-04-20",
    readingTime: "7 min read",
    longDescription: "Travel planning is notoriously fragmented. Users juggle between flight aggregators, hotel booking sites, restaurant review apps, and spreadsheet planners. TripMate was designed to become that source — an AI-powered travel companion that handles everything from inspiration to day-of navigation.\n\n80+ screens across trip planning, discovery, real-time navigation, and social sharing features.",
    problem: "**Decision fatigue.** The average traveler visits 14+ websites to plan a single trip.\n\n**Static itineraries.** Most trip planners create a fixed schedule that can't adapt to weather, closures, or user energy levels.\n\n**Hidden gem discovery.** Mainstream platforms surface the same over-touristed spots.",
    solution: "TripMate solves this with:\n1. AI itinerary generation from a single prompt\n2. Real-time adaptation based on weather, traffic, and user context\n3. Authentic discovery through AI analysis of local content\n4. Offline navigation without internet connectivity\n5. Social planning with friends and family\n\nKey innovation: Custom constraint-satisfaction algorithm balancing travel time, preferences, and opening hours.",
    architecture: "Same Clean Architecture foundation as Rizen with domain-specific adaptations.\n\n**Discovery Engine:** Multi-stage AI pipeline:\n- Stage 1: User preferences → candidate destinations\n- Stage 2: Destination + dates → activity pool\n- Stage 3: Activity pool → optimized daily itinerary\n- Stage 4: Itinerary + real-time data → dynamic adjustments\n\nFirebase Firestore for trip data, local SQLite cache for offline access.",
    keyFeatures: "AI-powered itinerary generation, Real-time dynamic rescheduling, Hidden gem discovery, Offline navigation, Collaborative trip planning, Multi-stage AI pipeline",
    challenges: "Client-side itinerary optimization over server-side — reduced latency from seconds to milliseconds and enabled full offline functionality, at the cost of more complex state management.",
    decisions: "Client-side optimization for offline functionality. Gemini for discovery without cold-start training data. CRDT-inspired merge strategies for collaborative editing.",
    results: "85% user satisfaction with AI-generated itineraries. 3x faster trip planning compared to manual methods. 30% of trips modified with real-time adaptation. 4.8 star rating (projected).",
    lessons: "1. AI quality degrades gracefully — fall back to rule-based when confidence is low\n2. Offline sync is hard — CRDT-inspired merge strategies required\n3. Context matters — user personas dramatically improve recommendations",
    timeline: "Planning / Early Development stage. Core AI pipeline designed. Architecture decisions validated.",
  },
  {
    slug: "social-media-app",
    title: "Social Media App — Graduation Project",
    description: "A cross-platform social media application developed as a graduation project, featuring UI design, process flows, and team collaboration using Flutter and Dart.",
    tags: ["Flutter", "Dart", "Cross-platform", "UI Design", "Team Collaboration"],
    category: "Mobile App",
    featured: false,
    status: "built-and-working",
    published: true,
    date: "2025-12-01",
    readingTime: "5 min read",
    longDescription: "This social media application was developed as a graduation project at the University of Science and Technology. The project focused on building a cross-platform mobile experience with an emphasis on user interface design, process flows, and collaborative development using Flutter and Dart.",
    problem: "Existing social media platforms often prioritize feature quantity over user experience quality. For this graduation project, the goal was to demonstrate solid software engineering fundamentals through a clean, usable social media application built with modern cross-platform tools.",
    solution: "1. Cross-platform delivery with Flutter\n2. Clean UI/UX with intuitive interfaces\n3. Team collaboration with shared code ownership\n4. Knowledge transfer — trained team members in Dart",
    architecture: "Flutter and Dart cross-platform mobile framework with custom widgets, themes, and responsive layouts. Clean UI design and intuitive process flows.",
    keyFeatures: "Cross-platform mobile experience, Custom UI widgets, User process flows, Team collaboration",
    challenges: "Cross-platform development requires discipline — platform-specific nuances still require attention even with Flutter.",
    decisions: "Flutter for cross-platform delivery. Focus on UI/UX quality over feature quantity. Team training to accelerate delivery.",
    results: "Successfully delivered as a graduation project. Team members trained in Dart. Cross-platform application built and demonstrated.",
    lessons: "1. Cross-platform development requires discipline\n2. Team training accelerates delivery\n3. UI/UX design is iterative",
    timeline: "Completed 2025. Graduation project at University of Science and Technology.",
  },
];

const COLLECTIONS = [
  { name: "identity", docs: [{ id: "main", data: identityData }], type: "named-doc" },
  { name: "experience", docs: experienceData.map((d, i) => ({ id: `exp_${i}`, data: d })), type: "auto-id" },
  { name: "education", docs: educationData.map((d, i) => ({ id: `edu_${i}`, data: d })), type: "auto-id" },
  { name: "certifications", docs: certificationsData.map((d, i) => ({ id: `cert_${i}`, data: d })), type: "auto-id" },
  { name: "courses", docs: coursesData.map((d, i) => ({ id: `course_${i}`, data: d })), type: "auto-id" },
  { name: "skills", docs: skillsData.map((d, i) => ({ id: `skill_${i}`, data: d })), type: "auto-id" },
  { name: "knowledge", docs: knowledgeData.map((d, i) => ({ id: `know_${i}`, data: d })), type: "auto-id" },
  { name: "social", docs: socialData.map((d, i) => ({ id: `social_${i}`, data: d })), type: "auto-id" },
  { name: "projects", docs: projectData.map((d) => ({ id: d.slug, data: d })), type: "slug" },
  { name: "working", docs: workingData.map((d, i) => ({ id: `working_${i}`, data: d })), type: "auto-id" },
  { name: "timeline", docs: timelineData.map((d, i) => ({ id: `timeline_${i}`, data: d })), type: "auto-id" },
  { name: "learning", docs: learningData.map((d, i) => ({ id: `learning_${i}`, data: d })), type: "auto-id" },
];

async function migrate() {
  console.log("=".repeat(60));
  console.log("CMS DATA MIGRATION REPORT");
  console.log("=".repeat(60));
  console.log();

  let totalCreated = 0;
  let totalSkipped = 0;
  let totalConflicts = 0;
  let totalErrors = 0;

  for (const { name, docs, type } of COLLECTIONS) {
    console.log(`\n📁 ${name}/ (${type}):`);

    const existingSnap = await db.collection(name).limit(1).get();
    const hasExistingData = existingSnap.size > 0;

    if (hasExistingData) {
      console.log(`   ⚠️  Collection already has data. Checking existing docs...`);
    } else {
      console.log(`   📭 Collection is empty. Will create all records.`);
    }

    let created = 0;
    let skipped = 0;
    let conflicts = 0;

    for (const doc of docs) {
      const docRef = db.collection(name).doc(doc.id);
      const existing = await docRef.get();

      if (existing.exists) {
        if (FORCE) {
          if (!DRY_RUN) {
            await docRef.set({
              ...doc.data,
              lastModified: new Date(),
            });
          }
          console.log(`   🔄 [OVERRIDE] ${doc.id} (forced)`);
          created++;
        } else {
          console.log(`   ⏭️ [SKIP] ${doc.id} — already exists (use --force to overwrite)`);
          skipped++;
          conflicts++;
        }
      } else {
        if (!DRY_RUN) {
          await docRef.set({
            ...doc.data,
            createdAt: new Date(),
            lastModified: new Date(),
          });
        }
        console.log(`   ✅ [CREATE] ${doc.id}`);
        created++;
      }
    }

    totalCreated += created;
    totalSkipped += skipped;
    totalConflicts += conflicts;

    console.log(`   → ${created} created, ${skipped} skipped, ${conflicts} conflicts`);
  }

  console.log("\n" + "=".repeat(60));
  console.log("SUMMARY");
  console.log("=".repeat(60));
  console.log(`   Total created:  ${totalCreated}`);
  console.log(`   Total skipped:  ${totalSkipped}`);
  console.log(`   Total conflicts: ${totalConflicts}`);
  console.log(`   Total errors:   ${totalErrors}`);
  console.log();

  if (DRY_RUN) {
    console.log("🔍 DRY RUN — no data was written");
    console.log("   Run without --dry-run to execute the migration");
  } else {
    console.log("✅ Migration complete");
  }
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
