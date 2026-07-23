"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale-context";
import { getSiteContent } from "@/content/data/content";
import { useContent } from "@/lib/content/content-provider";
import { Mail, MessageSquare, Phone, Globe, Send, Users, Camera, ExternalLink } from "lucide-react";
import { useMemo } from "react";

const contactIcons: Record<string, React.ReactNode> = {
  Email: <Mail size={18} />,
  WhatsApp: <MessageSquare size={18} />,
  Phone: <Phone size={18} />,
  GitHub: <ExternalLink size={18} />,
  LinkedIn: <Globe size={18} />,
  Telegram: <Send size={18} />,
  Instagram: <Camera size={18} />,
  Facebook: <Users size={18} />,
};

export function ContactSection() {
  const { locale } = useLocale();
  const { resume } = useContent();
  const content = getSiteContent(locale).contact;
  const primaryContacts = useMemo(
    () => resume.contact.filter((c) =>
      ["Email", "WhatsApp", "Phone", "GitHub", "LinkedIn"].includes(c.label)
    ),
    [resume.contact]
  );
  const otherContacts = useMemo(
    () => resume.contact.filter((c) =>
      !["Email", "WhatsApp", "Phone", "GitHub", "LinkedIn"].includes(c.label)
    ),
    [resume.contact]
  );

  return (
    <Section id="contact" spacing="lg" className="bg-muted/30">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="primary" className="mb-4">
            {content.badge}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-3 sm:text-4xl">
            {content.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-10 text-base sm:text-lg leading-relaxed">
            {content.description}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-semibold text-sm text-muted-foreground mb-4 uppercase tracking-wider">
              {content.emailLabel}
            </h3>
            <div className="flex flex-wrap gap-3">
              {primaryContacts.map((contact) => (
                <Button
                  key={contact.label}
                  as="a"
                  href={contact.href}
                  variant="outline"
                  size="md"
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {contactIcons[contact.label]}
                  {contact.label}
                </Button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-semibold text-sm text-muted-foreground mb-4 uppercase tracking-wider">
              {content.socialLabel}
            </h3>
            <div className="flex flex-wrap gap-3">
              {otherContacts.map((contact) => (
                <Button
                  key={contact.label}
                  as="a"
                  href={contact.href}
                  variant="ghost"
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contactIcons[contact.label]}
                  {contact.label}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              {content.formFallback}
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
