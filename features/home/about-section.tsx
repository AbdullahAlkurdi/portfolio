"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/lib/locale-context";
import { getSiteContent } from "@/content/data/content";

export function AboutSection() {
  const { locale } = useLocale();
  const content = getSiteContent(locale).about;

  return (
    <Section id="who-i-am" spacing="lg">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Badge variant="primary" className="mb-4">
            {getSiteContent(locale).about.title}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-6 sm:text-4xl">
            {content.title}
          </h2>
          <div className="space-y-4">
            {content.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-muted-foreground leading-relaxed text-base sm:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
