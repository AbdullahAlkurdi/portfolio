import { Heading } from "@/components/ui/typography/heading";
import { Body } from "@/components/ui/typography/body";
import { resumeData } from "@/content/data/resume";
import { resumeUi } from "@/content/data/resume-ui";
import { ResumePrintButton } from "./resume-print-button";
import { Mail, Code2, Globe, ExternalLink } from "lucide-react";

const contactIcons: Record<string, React.ReactNode> = {
  Email: <Mail size={14} />,
  GitHub: <Code2 size={14} />,
  LinkedIn: <Globe size={14} />,
  Portfolio: <ExternalLink size={14} />,
};

export function ResumeHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-3">
        <div>
          <Heading level="1" as="h1">{resumeData.name}</Heading>
          <Heading level="2" as="span" className="mt-1 text-primary">{resumeData.title}</Heading>
          <Body size="sm" className="mt-1 text-muted-foreground">{resumeData.location}</Body>
        </div>
        <Body size="sm" className="max-w-xl text-muted-foreground">{resumeData.tagline}</Body>
        <nav aria-label={resumeUi.contactNavLabel} className="flex flex-wrap gap-3">
          {resumeData.contact.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {contactIcons[link.label]}
              {link.label}
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
