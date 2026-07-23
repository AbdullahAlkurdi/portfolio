import type { Locale } from "@/lib/locale-context";

export type NavLink = {
  label: string;
  href: string;
};

export type LocalizedText = Record<Locale, string>;

export type SiteContent = {
  site: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  nav: {
    brand: string;
    links: NavLink[];
  };
  hero: {
    greeting: string;
    name: string;
    title: string;
    location: string;
    tagline: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    tertiaryCta: string;
    availability: string;
  };
  about: {
    title: string;
    paragraphs: string[];
  };
  currentlyWorking: {
    title: string;
    badge: string;
    items: WorkingItem[];
  };
  featuredProjects: {
    title: string;
    badge: string;
    description: string;
    viewAll: string;
  };
  skills: {
    title: string;
    badge: string;
    description: string;
    learnMore: string;
  };
  knowledge: {
    title: string;
    badge: string;
    description: string;
  };
  experience: {
    title: string;
    badge: string;
  };
  education: {
    title: string;
    badge: string;
  };
  certifications: {
    title: string;
    badge: string;
    note: string;
  };
  courses: {
    title: string;
    badge: string;
  };
  learning: {
    title: string;
    badge: string;
    description: string;
    currentlyLearning: string;
    improving: string;
    exploreNext: string;
  };
  timeline: {
    title: string;
    badge: string;
    description: string;
    events: TimelineEventContent[];
  };
  contact: {
    title: string;
    badge: string;
    description: string;
    emailLabel: string;
    whatsappLabel: string;
    callLabel: string;
    socialLabel: string;
    formFallback: string;
  };
  footer: {
    copyright: string;
    builtWith: string;
    lastUpdated: string;
    resumeLabel: string;
  };
  resume: {
    metaTitle: string;
    metaDescription: string;
    printLabel: string;
    printDescription: string;
    sections: {
      summary: string;
      skills: string;
      softSkills: string;
      experience: string;
      education: string;
      certifications: string;
      courses: string;
      projects: string;
      languages: string;
    };
    contactNavLabel: string;
  };
  projectsPage: {
    title: string;
    description: string;
  };
  notFound: {
    title: string;
    description: string;
    backLink: string;
  };
};

export type WorkingItem = {
  name: string;
  description: string;
  phase: string;
  whatBuilding: string;
  technologies: string[];
  lastUpdated: string;
  status: "active" | "paused" | "planning";
  link?: string;
};

export type TimelineEventContent = {
  year: string;
  title: string;
  description: string;
};

export function getSiteContent(locale: Locale): SiteContent {
  return locale === "ar" ? ar : en;
}

const en: SiteContent = {
  site: {
    title: "Abdullah Alkurdi — IT Specialist & Software Engineer",
    description:
      "IT Specialist & Software Engineer based in Makkah, Saudi Arabia. Flutter, Python, networking, IT support, and clean architecture.",
    ogTitle: "Abdullah Alkurdi | IT Specialist & Software Engineer",
    ogDescription:
      "Portfolio of Abdullah Alkurdi — IT Specialist & Software Engineer. Flutter, Python, networking, and continuously building.",
  },
  nav: {
    brand: "AK",
    links: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "Resume", href: "/resume" },
      { label: "Contact", href: "#contact" },
    ],
  },
  hero: {
    greeting: "Hi, I'm",
    name: "Abdullah Alkurdi",
    title: "IT Specialist & Software Engineer",
    location: "Makkah, Saudi Arabia",
    tagline: "Software Development · IT Support · Networking",
    description:
      "I combine hands-on IT infrastructure experience with software engineering. From troubleshooting networks and configuring systems to developing cross-platform applications with Flutter — I bridge the gap between infrastructure and code. Continuously learning, building, and solving real problems.",
    primaryCta: "View My Work",
    secondaryCta: "View Resume",
    tertiaryCta: "Contact Me",
    availability: "Open to opportunities",
  },
  about: {
    title: "Who I Am",
    paragraphs: [
      "I started in IT support and networking — installing operating systems, configuring networks, setting up CCTV and biometric systems, and troubleshooting hardware and software issues across organizations. That experience taught me how technology works from the ground up.",
      "I transitioned into software engineering through a Flutter internship at Yemen Soft Co., where I contributed to cross-platform mobile applications, resolved technical issues, and trained team members in Dart.",
      "I later completed field training preparing system documentation for a payments application, designing Data Flow Diagrams and analyzing user requirements.",
      "Today I build applications with Flutter, Python, and modern architectures while continuing to grow across mobile development, IT infrastructure, cloud technologies, and AI-powered applications.",
      "I believe the best engineers understand both the code and the infrastructure it runs on.",
    ],
  },
  currentlyWorking: {
    title: "Currently Working On",
    badge: "Active Development",
    items: [
      {
        name: "Rizen — Habit & Life OS",
        description: "A comprehensive habit and life operating system built with Flutter and Clean Architecture. Features AI-powered coaching via Gemini, Firebase backend, and BLoC state management.",
        phase: "Development",
        whatBuilding: "Core habit tracking, AI coaching integration, analytics dashboard",
        technologies: ["Flutter", "Dart", "Firebase", "Gemini AI", "BLoC"],
        lastUpdated: "June 2026",
        status: "active",
        link: "/projects/rizen",
      },
      {
        name: "TripMate — AI Travel Companion",
        description: "An AI-powered travel planner that generates personalized itineraries and discovers hidden gems based on user preferences.",
        phase: "Planning / Early Development",
        whatBuilding: "Route planning engine, AI itinerary generation, user preferences system",
        technologies: ["Flutter", "Dart", "Firebase", "Gemini AI"],
        lastUpdated: "April 2026",
        status: "planning",
        link: "/projects/tripmate",
      },
    ],
  },
  featuredProjects: {
    title: "Projects I've Built",
    badge: "Featured Work",
    description: "Applications and systems I have designed and developed. Each project reflects real engineering decisions, architecture considerations, and continuous learning.",
    viewAll: "View All Projects",
  },
  skills: {
    title: "What I Can Do",
    badge: "Technical Capabilities",
    description: "Skills developed through hands-on work, projects, and continuous learning.",
    learnMore: "View full resume →",
  },
  knowledge: {
    title: "Knowledge Base",
    badge: "Areas of Expertise",
    description: "Domains where I have practical experience and ongoing development.",
  },
  experience: {
    title: "Professional Experience",
    badge: "Career",
  },
  education: {
    title: "Education",
    badge: "Academic Background",
  },
  certifications: {
    title: "Certifications",
    badge: "Credentials",
    note: "Dates and credential URLs will be added once verified.",
  },
  courses: {
    title: "Courses & Training",
    badge: "Continuous Learning",
  },
  learning: {
    title: "Currently Learning",
    badge: "Growth",
    description: "Technology evolves fast. Here is what I am focused on right now.",
    currentlyLearning: "Advanced Flutter patterns, Firebase security rules, state machine design",
    improving: "System architecture, testing strategies, CI/CD pipelines, Arabic technical writing",
    exploreNext: "Cloud infrastructure (GCP/AWS), AI/ML integration, backend development with Node.js",
  },
  timeline: {
    title: "My Journey",
    badge: "Career Path",
    description: "How I moved from IT support to software engineering.",
    events: [
      {
        year: "2022",
        title: "Started IT Support Work",
        description: "Began providing freelance network and IT support. Installed and maintained hardware, operating systems, software, printers, CCTV, biometric systems, and IP telephony.",
      },
      {
        year: "2022",
        title: "CCNA Certified",
        description: "Earned Cisco CCNA certification, building a strong foundation in networking fundamentals.",
      },
      {
        year: "2023",
        title: "Started Programming",
        description: "Learned Python programming and began studying Data Structures and Algorithms. Started building small programs and exploring software development.",
      },
      {
        year: "2024",
        title: "Flutter & Mobile Development",
        description: "Started learning Flutter and Dart for cross-platform mobile development. Built first mobile app prototypes.",
      },
      {
        year: "2025",
        title: "Flutter Internship",
        description: "Completed a 3-month Flutter development internship at Yemen Soft Co. Contributed to cross-platform applications and trained team members in Dart.",
      },
      {
        year: "2025",
        title: "Documentation & Graduation",
        description: "Prepared system documentation for a payments application. Graduated with a Bachelor's in Information Technology. Graduation project: Social Media App.",
      },
      {
        year: "2026",
        title: "Building & Growing",
        description: "Building Rizen (Habit & Life OS) and TripMate (AI Travel Companion). Deepening skills in Clean Architecture, BLoC, Firebase, and AI integration.",
      },
    ],
  },
  contact: {
    title: "Get In Touch",
    badge: "Contact",
    description: "I am open to opportunities, collaborations, and conversations. Reach out through any of the channels below.",
    emailLabel: "Send Email",
    whatsappLabel: "WhatsApp",
    callLabel: "Call",
    socialLabel: "Social",
    formFallback: "Prefer email? Click below to send me a message directly.",
  },
  footer: {
    copyright: "Abdullah Alkurdi.",
    builtWith: "Built with Next.js & Tailwind CSS",
    lastUpdated: "Last updated: July 2026",
    resumeLabel: "View Resume",
  },
  resume: {
    metaTitle: "Resume — Abdullah Alkurdi | IT Specialist & Software Engineer",
    metaDescription: "Professional resume of Abdullah Alkurdi — IT Specialist & Software Engineer.",
    printLabel: "Print Resume",
    printDescription: "Use browser print (Ctrl+P / Cmd+P) to save as PDF",
    sections: {
      summary: "Professional Summary",
      skills: "Technical Skills",
      softSkills: "Soft Skills",
      experience: "Professional Experience",
      education: "Education",
      certifications: "Certifications",
      courses: "Courses & Additional Learning",
      projects: "Selected Projects",
      languages: "Languages",
    },
    contactNavLabel: "Contact links",
  },
  projectsPage: {
    title: "Projects",
    description:
      "Applications and systems I have designed and developed. Each project includes context, architecture decisions, and lessons learned.",
  },
  notFound: {
    title: "Project not found",
    description: "The project you're looking for doesn't exist or has been removed.",
    backLink: "← All projects",
  },
};

const ar: SiteContent = {
  site: {
    title: "عبدالله الكردي — أخصائي تقنية معلومات ومهندس برمجيات",
    description:
      "أخصائي تقنية معلومات ومهندس برمجيات من مكة المكرمة، المملكة العربية السعودية. فلاتر، بايثون، شبكات، دعم تقني، وهندسة برمجيات نظيفة.",
    ogTitle: "عبدالله الكردي | أخصائي تقنية معلومات ومهندس برمجيات",
    ogDescription:
      "ملف أعمال عبدالله الكردي — أخصائي تقنية معلومات ومهندس برمجيات. فلاتر، بايثون، شبكات، وبناء مستمر.",
  },
  nav: {
    brand: "ع.ك",
    links: [
      { label: "الرئيسية", href: "/" },
      { label: "المشاريع", href: "/projects" },
      { label: "السيرة الذاتية", href: "/resume" },
      { label: "تواصل", href: "#contact" },
    ],
  },
  hero: {
    greeting: "مرحباً، أنا",
    name: "عبدالله الكردي",
    title: "أخصائي تقنية معلومات ومهندس برمجيات",
    location: "مكة المكرمة، المملكة العربية السعودية",
    tagline: "تطوير برمجيات · دعم تقني · شبكات",
    description:
      "أجمع بين خبرة عملية في البنية التحتية لتقنية المعلومات وهندسة البرمجيات. من حل مشاكل الشبكات وتكوين الأنظمة إلى تطوير تطبيقات متعددة المنصات باستخدام Flutter — أسد الفجوة بين البنية التحتية والكود. أتعلم وأبني وأحل المشكلات الحقيقية باستمرار.",
    primaryCta: "شاهد أعمالي",
    secondaryCta: "السيرة الذاتية",
    tertiaryCta: "تواصل معي",
    availability: "متاح للفرص",
  },
  about: {
    title: "من أنا",
    paragraphs: [
      "بدأت في مجال الدعم التقني والشبكات — تثبيت أنظمة التشغيل، تكوين الشبكات، تركيب أنظمة المراقبة والأنظمة الحيوية، وحل مشاكل الأجهزة والبرامج عبر المؤسسات. علمتني تلك التجربة كيف تعمل التكنولوجيا من الأساس.",
      "انتقلت إلى هندسة البرمجيات من خلال تدريب في Flutter في شركة Yemen Soft، حيث ساهمت في تطوير تطبيقات متعددة المنصات، وحللت مشاكل تقنية، ودربت أعضاء الفريق على Dart.",
      "أكملت تدريباً ميدانياً في توثيق الأنظمة لتطبيق مدفوعات، حيث صممت مخططات تدفق البيانات وحللت متطلبات المستخدمين.",
      "أبني اليوم تطبيقات باستخدام Flutter و Python وهندسة البرمجيات النظيفة، مع استمرار النمو في تطوير التطبيقات، البنية التحتية لتقنية المعلومات، الحوسبة السحابية، وتطبيقات الذكاء الاصطناعي.",
      "أؤمن أن أفضل مهندسي البرمجيات يفهمون الكود والبنية التحتية التي يعمل عليها.",
    ],
  },
  currentlyWorking: {
    title: "أعمل حالياً على",
    badge: "قيد التطوير",
    items: [
      {
        name: "Rizen — نظام العادات والحياة",
        description: "نظام متكامل لإدارة العادات والحياة مبني باستخدام Flutter وهندسة البرمجيات النظيفة. يتميز بتوجيه مدعوم بالذكاء الاصطناعي عبر Gemini، وخلفية Firebase، وإدارة الحالة BLoC.",
        phase: "تطوير",
        whatBuilding: "تتبع العادات الأساسي، تكامل التوجيه بالذكاء الاصطناعي، لوحة التحليلات",
        technologies: ["Flutter", "Dart", "Firebase", "Gemini AI", "BLoC"],
        lastUpdated: "يونيو 2026",
        status: "active",
        link: "/projects/rizen",
      },
      {
        name: "TripMate — رفيق السفر بالذكاء الاصطناعي",
        description: "مخطط سفر مدعوم بالذكاء الاصطناعي ينشئ مسارات رحلات مخصصة ويكشف عن الجواهر المخفية بناءً على تفضيلات المستخدم.",
        phase: "تخطيط / تطوير مبكر",
        whatBuilding: "محرك تخطيط الرحلات، توليد مسارات بالذكاء الاصطناعي، نظام تفضيلات المستخدم",
        technologies: ["Flutter", "Dart", "Firebase", "Gemini AI"],
        lastUpdated: "أبريل 2026",
        status: "planning",
        link: "/projects/tripmate",
      },
    ],
  },
  featuredProjects: {
    title: "المشاريع التي بنيتها",
    badge: "أعمال مميزة",
    description: "تطبيقات وأنظمة قمت بتصميمها وتطويرها. يعكس كل مشروع قرارات هندسية حقيقية، واعتبارات معمارية، وتعلماً مستمراً.",
    viewAll: "عرض جميع المشاريع",
  },
  skills: {
    title: "ماذا يمكنني أن أفعل",
    badge: "القدرات التقنية",
    description: "مهارات تم تطويرها من خلال العمل العملي والمشاريع والتعلم المستمر.",
    learnMore: "عرض السيرة الذاتية كاملة ←",
  },
  knowledge: {
    title: "قاعدة المعرفة",
    badge: "مجالات الخبرة",
    description: "مجالات لدي فيها خبرة عملية وتطوير مستمر.",
  },
  experience: {
    title: "الخبرة المهنية",
    badge: "المسار المهني",
  },
  education: {
    title: "التعليم",
    badge: "الخلفية الأكاديمية",
  },
  certifications: {
    title: "الشهادات",
    badge: "المؤهلات",
    note: "سيتم إضافة التواريخ وروابط الشهادات بمجرد التحقق منها.",
  },
  courses: {
    title: "الدورات والتدريب",
    badge: "التعلم المستمر",
  },
  learning: {
    title: "أتعلم حالياً",
    badge: "نمو",
    description: "التكنولوجيا تتطور بسرعة. إليكم ما أركز عليه الآن.",
    currentlyLearning: "أنماط Flutter المتقدمة، قواعد أمان Firebase، تصميم آلات الحالة",
    improving: "هندسة النظم، استراتيجيات الاختبار، خطط CI/CD، الكتابة التقنية بالعربية",
    exploreNext: "البنية التحتية السحابية (GCP/AWS)، تكامل الذكاء الاصطناعي/التعلم الآلي، تطوير الواجهة الخلفية باستخدام Node.js",
  },
  timeline: {
    title: "رحلتي",
    badge: "المسار المهني",
    description: "كيف انتقلت من الدعم التقني إلى هندسة البرمجيات.",
    events: [
      {
        year: "2022",
        title: "بداية العمل في الدعم التقني",
        description: "بدأت تقديم خدمات الدعم التقني والشبكات بشكل مستقل. قمت بتثبيت وصيانة الأجهزة وأنظمة التشغيل والبرامج والطابعات وكاميرات المراقبة والأنظمة الحيوية والهاتف عبر IP.",
      },
      {
        year: "2022",
        title: "شهادة CCNA",
        description: "حصلت على شهادة Cisco CCNA، مما بنى أساساً قوياً في أساسيات الشبكات.",
      },
      {
        year: "2023",
        title: "بداية البرمجة",
        description: "تعلمت برمجة بايثون وبدأت دراسة هياكل البيانات والخوارزميات. بدأت ببناء برامج صغيرة واستكشاف تطوير البرمجيات.",
      },
      {
        year: "2024",
        title: "Flutter وتطوير التطبيقات",
        description: "بدأت تعلم Flutter و Dart لتطوير التطبيقات متعددة المنصات. بنيت أول نماذج تطبيقات الجوال.",
      },
      {
        year: "2025",
        title: "تدريب Flutter",
        description: "أكملت تدريباً لمدة 3 أشهر في تطوير Flutter في شركة Yemen Soft. ساهمت في تطوير تطبيقات متعددة المنصات ودربت أعضاء الفريق على Dart.",
      },
      {
        year: "2025",
        title: "التوثيق والتخرج",
        description: "أعددت توثيقاً شاملاً لنظام لتطبيق مدفوعات. تخرجت بدرجة البكالوريوس في تقنية المعلومات. مشروع التخرج: تطبيق وسائل تواصل اجتماعي.",
      },
      {
        year: "2026",
        title: "بناء ونمو",
        description: "أبني Rizen (نظام العادات والحياة) و TripMate (رفيق السفر بالذكاء الاصطناعي). أعمق مهاراتي في هندسة البرمجيات النظيفة، BLoC، Firebase، وتكامل الذكاء الاصطناعي.",
      },
    ],
  },
  contact: {
    title: "تواصل معي",
    badge: "اتصال",
    description: "أنا متاح للفرص والتعاون والمحادثات. تواصل عبر أي من القنوات أدناه.",
    emailLabel: "أرسل بريداً",
    whatsappLabel: "واتساب",
    callLabel: "اتصال",
    socialLabel: "وسائل التواصل",
    formFallback: "تفضل البريد الإلكتروني؟ انقر أدناه لإرسال رسالة مباشرة.",
  },
  footer: {
    copyright: "عبدالله الكردي.",
    builtWith: "بُني باستخدام Next.js و Tailwind CSS",
    lastUpdated: "آخر تحديث: يوليو 2026",
    resumeLabel: "السيرة الذاتية",
  },
  resume: {
    metaTitle: "السيرة الذاتية — عبدالله الكردي | أخصائي تقنية معلومات ومهندس برمجيات",
    metaDescription: "السيرة الذاتية المهنية لعبدالله الكردي — أخصائي تقنية معلومات ومهندس برمجيات.",
    printLabel: "طباعة السيرة الذاتية",
    printDescription: "استخدم طباعة المتصفح (Ctrl+P / Cmd+P) للحفظ كـ PDF",
    sections: {
      summary: "الملخص المهني",
      skills: "المهارات التقنية",
      softSkills: "المهارات الشخصية",
      experience: "الخبرة المهنية",
      education: "التعليم",
      certifications: "الشهادات",
      courses: "الدورات والتعلم الإضافي",
      projects: "المشاريع المختارة",
      languages: "اللغات",
    },
    contactNavLabel: "روابط التواصل",
  },
  projectsPage: {
    title: "المشاريع",
    description: "تطبيقات وأنظمة قمت بتصميمها وتطويرها. يتضمن كل مشروع سياقاً وقرارات معمارية ودروساً مستفادة.",
  },
  notFound: {
    title: "المشروع غير موجود",
    description: "المشروع الذي تبحث عنه غير موجود أو تمت إزالته.",
    backLink: "← جميع المشاريع",
  },
};
