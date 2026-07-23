export type KnowledgeDomain = {
  name: string;
  nameAr: string;
  level: "Proficient" | "Intermediate" | "Developing" | "Learning" | "Exploring";
  description: string;
  descriptionAr: string;
  icon: string;
  technologies: string[];
  evidence: string[];
};

export const knowledgeDomains: KnowledgeDomain[] = [
  {
    name: "Software Engineering",
    nameAr: "هندسة البرمجيات",
    level: "Developing",
    description: "Clean Architecture, BLoC/Cubit, SOLID, design patterns, testing strategies",
    descriptionAr: "هندسة البرمجيات النظيفة، BLoC/Cubit، SOLID، أنماط التصميم، استراتيجيات الاختبار",
    icon: "code",
    technologies: ["Dart", "Flutter", "TypeScript", "Clean Architecture", "BLoC"],
    evidence: ["Rizen Project", "TripMate Project"],
  },
  {
    name: "Flutter & Dart",
    nameAr: "Flutter و Dart",
    level: "Developing",
    description: "Cross-platform mobile apps, state management, custom widgets, platform channels",
    descriptionAr: "تطبيقات الجوال متعددة المنصات، إدارة الحالة، عناصر واجهة مخصصة، قنوات المنصة",
    icon: "smartphone",
    technologies: ["Flutter", "Dart", "BLoC", "Cubit", "GoRouter"],
    evidence: ["Rizen Project", "Yemen Soft Internship", "Social Media App"],
  },
  {
    name: "Programming",
    nameAr: "البرمجة",
    level: "Developing",
    description: "Python, Java, Dart, C++, JavaScript — data structures, algorithms, OOP",
    descriptionAr: "بايثون، جافا، Dart، C++، جافاسكريبت — هياكل البيانات، الخوارزميات، البرمجة كائنية التوجه",
    icon: "terminal",
    technologies: ["Python", "Java", "Dart", "C++", "JavaScript"],
    evidence: ["University Coursework", "Data Structures Course", "Programming Basics Course"],
  },
  {
    name: "Databases",
    nameAr: "قواعد البيانات",
    level: "Intermediate",
    description: "MySQL, Oracle, SQL, Firebase Firestore — schema design, queries, data modeling",
    descriptionAr: "MySQL, Oracle, SQL, Firebase Firestore — تصميم المخططات، الاستعلامات، نمذجة البيانات",
    icon: "database",
    technologies: ["MySQL", "Oracle", "SQL", "Firebase Firestore"],
    evidence: ["University Coursework", "Rizen Project", "Social Media App"],
  },
  {
    name: "Web Development",
    nameAr: "تطوير الويب",
    level: "Intermediate",
    description: "HTML, CSS, JavaScript, PHP, React, Next.js, TypeScript",
    descriptionAr: "HTML، CSS، JavaScript، PHP، React، Next.js، TypeScript",
    icon: "globe",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "React", "Next.js", "TypeScript"],
    evidence: ["Portfolio Website", "University Coursework"],
  },
  {
    name: "Networking",
    nameAr: "الشبكات",
    level: "Intermediate",
    description: "CCNA, network cabling, IP telephony, virtual infrastructures, troubleshooting",
    descriptionAr: "CCNA، كابلات الشبكات، الاتصالات عبر IP، البنى التحتية الافتراضية، حل المشكلات",
    icon: "network",
    technologies: ["CCNA", "TCP/IP", "DNS", "DHCP", "VLAN", "Routing"],
    evidence: ["CCNA Certification", "IT Support Experience"],
  },
  {
    name: "IT Infrastructure",
    nameAr: "البنية التحتية لتقنية المعلومات",
    level: "Proficient",
    description: "OS installation, hardware, printers, CCTV, biometrics, remote support",
    descriptionAr: "تثبيت أنظمة التشغيل، الأجهزة، الطابعات، كاميرات المراقبة، الأنظمة الحيوية، الدعم عن بعد",
    icon: "monitor",
    technologies: ["Windows", "Linux", "Printer Configuration", "CCTV", "Biometric Systems"],
    evidence: ["IT Support Experience (2022-2025)"],
  },
  {
    name: "IT Support",
    nameAr: "الدعم التقني",
    level: "Proficient",
    description: "End-user support, troubleshooting, system configuration, maintenance",
    descriptionAr: "دعم المستخدم النهائي، حل المشكلات، تكوين الأنظمة، الصيانة",
    icon: "wrench",
    technologies: ["Troubleshooting", "Remote Support", "Hardware", "Software Installation"],
    evidence: ["IT Support Experience (2022-2025)"],
  },
  {
    name: "Cloud & DevOps",
    nameAr: "السحابة و DevOps",
    level: "Learning",
    description: "Firebase, Docker, Git/GitHub, CI/CD fundamentals, Google Cloud",
    descriptionAr: "Firebase، Docker، Git/GitHub، أساسيات CI/CD، Google Cloud",
    icon: "cloud",
    technologies: ["Firebase", "Docker", "Git", "GitHub", "CI/CD"],
    evidence: ["Rizen Project", "GitHub Repositories"],
  },
  {
    name: "AI & Emerging Tech",
    nameAr: "الذكاء الاصطناعي والتقنيات الناشئة",
    level: "Exploring",
    description: "Gemini AI integration, AI-powered app features, prompt engineering",
    descriptionAr: "دمج Gemini AI، ميزات التطبيقات المدعومة بالذكاء الاصطناعي، هندسة المطالبات",
    icon: "brain",
    technologies: ["Gemini AI", "AI Integration", "Prompt Engineering"],
    evidence: ["Rizen Project", "TripMate Concept"],
  },
];
