"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Divider } from "@/components/layout/divider";
import { Body } from "@/components/ui/typography/body";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale-context";
import { getSiteContent } from "@/content/data/content";
import { footerData } from "@/content/data/footer";
import {
  Code2, Globe, Camera, Users, Send, MessageSquare, Mail, FileText,
} from "lucide-react";

const socialIcons = {
  github: Code2,
  linkedin: Globe,
  instagram: Camera,
  facebook: Users,
  telegram: Send,
  whatsapp: MessageSquare,
  mail: Mail,
} as const;

export function Footer() {
  const { locale } = useLocale();
  const content = getSiteContent(locale).footer;

  return (
    <Section as="footer" id="contact-footer" spacing="lg">
      <Container>
        <Divider />
        <div className="flex flex-col items-center gap-6 pt-8 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4">
            {footerData.social.map((link) => {
              const Icon = socialIcons[link.icon];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label={link.label}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
          <Button as="a" href="/resume" variant="outline" size="sm">
            <FileText size={14} />
            {content.resumeLabel}
          </Button>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <Body size="sm" className="text-muted-foreground">
            &copy; {new Date().getFullYear()} {content.copyright}
          </Body>
          <Body size="sm" className="text-muted-foreground">
            {content.builtWith}
          </Body>
          <Body size="sm" className="text-muted-foreground">
            {content.lastUpdated}
          </Body>
        </div>
      </Container>
    </Section>
  );
}
