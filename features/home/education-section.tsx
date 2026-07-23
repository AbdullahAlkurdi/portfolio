"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/lib/locale-context";
import { getSiteContent } from "@/content/data/content";
import { useContent } from "@/lib/content/content-provider";
import { Card } from "@/components/ui/card";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

export function EducationSection() {
  const { locale } = useLocale();
  const { resume } = useContent();
  const content = getSiteContent(locale).education;
  const education = resume.education;

  if (education.length === 0) return null;

  return (
    <Section id="education" spacing="lg">
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

        <div className="space-y-4">
          {education.map((edu, i) => (
            <motion.div
              key={`${edu.degree}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card variant="bordered">
                <div className="flex items-start gap-4">
                  <span className="text-primary mt-1">
                    <GraduationCap size={24} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg">{edu.degree}</h3>
                    <p className="text-sm text-primary">{edu.institution}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {edu.location}
                      </span>
                      {edu.endDate && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {edu.endDate}
                        </span>
                      )}
                    </div>
                    {edu.description && (
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {edu.description}
                      </p>
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
