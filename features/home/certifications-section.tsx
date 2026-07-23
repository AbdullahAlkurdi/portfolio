"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/lib/locale-context";
import { getSiteContent } from "@/content/data/content";
import { useContent } from "@/lib/content/content-provider";
import { Award, ExternalLink } from "lucide-react";

export function CertificationsSection() {
  const { locale } = useLocale();
  const { resume } = useContent();
  const content = getSiteContent(locale).certifications;
  const ui = getSiteContent(locale).ui;
  const certs = resume.certifications;

  if (certs.length === 0) return null;

  return (
    <Section id="certifications" spacing="lg" className="bg-muted/30">
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
          <p className="text-xs text-muted-foreground mb-8">{content.note}</p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((cert, i) => (
            <motion.div
              key={`${cert.name}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              <Card variant="bordered" className="h-full transition-all duration-300 hover:border-primary/20 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-0.5 shrink-0">
                    <Award size={20} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm">{cert.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary mt-1 hover:underline"
                      >
                        {ui.viewCredential}
                        <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
