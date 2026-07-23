"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/lib/locale-context";
import { getSiteContent } from "@/content/data/content";
import { useContent } from "@/lib/content/content-provider";
import { Card } from "@/components/ui/card";
import { MapPin, Calendar } from "lucide-react";

export function ExperienceSection() {
  const { locale } = useLocale();
  const { resume } = useContent();
  const content = getSiteContent(locale).experience;
  const experiences = resume.experience;

  return (
    <Section id="experience" spacing="lg" className="bg-muted/30">
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
          <h2 className="text-3xl font-bold tracking-tight mb-8 sm:text-4xl">
            {content.title}
          </h2>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={`${exp.role}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card variant="bordered" className="transition-all duration-300 hover:border-primary/20 hover:shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                    <p className="text-sm text-primary">{exp.organization}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground shrink-0">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {exp.startDate} — {exp.endDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {exp.location}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {exp.description}
                </p>
                <ul className="space-y-1.5">
                  {exp.achievements.slice(0, 4).map((a, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1.5 shrink-0">•</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border">
                    {exp.technologies.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
