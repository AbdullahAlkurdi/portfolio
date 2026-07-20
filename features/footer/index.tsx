import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Divider } from "@/components/layout/divider";
import { Body } from "@/components/ui/typography/body";
import { Button } from "@/components/ui/button";
import { footerData } from "@/content/data/footer";
import { Code2, Globe, Mail, FileText } from "lucide-react";

const socialIcons = {
  github: Code2,
  linkedin: Globe,
  mail: Mail,
} as const;

export function Footer() {
  return (
    <Section as="footer" id="contact" spacing="lg">
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
          <Button as="a" href={footerData.resumeCta.href} variant="outline" size="sm">
            <FileText size={14} />
            {footerData.resumeCta.label}
          </Button>
        </div>
        <div className="mt-6 text-center sm:text-left">
          <Body size="sm" className="text-muted-foreground">
            &copy; {new Date().getFullYear()} Abdullah Alkurdi. Built with Next.js.
          </Body>
        </div>
      </Container>
    </Section>
  );
}
