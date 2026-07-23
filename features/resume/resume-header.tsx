import { useLocale } from "@/lib/locale-context";
import { Heading } from "@/components/ui/typography/heading";
import { Body } from "@/components/ui/typography/body";
import { resumeData } from "@/content/data/resume";
import { resumeUi } from "@/content/data/resume-ui";
import { ResumePrintButton } from "./resume-print-button";
import { Mail, Code2, Globe, ExternalLink, Camera, Users, Send, MessageSquare, Phone } from "lucide-react";

const contactIcons: Record<string, React.ReactNode> = {
  Email: <Mail size={14} aria-hidden="true" />,
  Phone: <Phone size={14} aria-hidden="true" />,
  GitHub: <Code2 size={14} aria-hidden="true" />,
  LinkedIn: <Globe size={14} aria-hidden="true" />,
  Portfolio: <ExternalLink size={14} aria-hidden="true" />,
  Linktree: <ExternalLink size={14} aria-hidden="true" />,
  Instagram: <Camera size={14} aria-hidden="true" />,
  Facebook: <Users size={14} aria-hidden="true" />,
  Telegram: <Send size={14} aria-hidden="true" />,
  WhatsApp: <MessageSquare size={14} aria-hidden="true" />,
};

const contactLabels: Record<string, Record<string, string>> = {
  en: {
    Email: "Email",
    Phone: "Phone",
    GitHub: "GitHub",
    LinkedIn: "LinkedIn",
    Portfolio: "Portfolio",
    Linktree: "Linktree",
    Instagram: "Instagram",
    Facebook: "Facebook",
    Telegram: "Telegram",
    WhatsApp: "WhatsApp",
  },
  ar: {
    Email: "البريد الإلكتروني",
    Phone: "الهاتف",
    GitHub: "GitHub",
    LinkedIn: "LinkedIn",
    Portfolio: "ملف الأعمال",
    Linktree: "Linktree",
    Instagram: "إنستغرام",
    Facebook: "فيسبوك",
    Telegram: "تيليغرام",
    WhatsApp: "واتساب",
  },
};

export function ResumeHeader() {
  const { locale } = useLocale();
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-3">
        <div>
          <Heading level="1" as="h1">{resumeData.name}</Heading>
          <Heading level="2" as="h2" className="mt-1 text-primary">{resumeData.title}</Heading>
          <Body size="sm" className="mt-1 text-muted-foreground">{resumeData.location}</Body>
        </div>
        <Body size="sm" className="max-w-xl text-muted-foreground">{resumeData.tagline}</Body>
        <nav aria-label={resumeUi.contactNavLabel} className="flex flex-wrap gap-x-4 gap-y-1">
          {resumeData.contact.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {contactIcons[link.label]}
              {contactLabels[locale][link.label] ?? link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="shrink-0">
        <ResumePrintButton />
      </div>
    </header>
  );
}
