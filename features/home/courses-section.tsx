"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/lib/locale-context";
import { getSiteContent } from "@/content/data/content";
import { useContent } from "@/lib/content/content-provider";
import { BookOpen } from "lucide-react";

export function CoursesSection() {
  const { locale } = useLocale();
  const { resume } = useContent();
  const content = getSiteContent(locale).courses;
  const courses = resume.courses;

  if (courses.length === 0) return null;

  return (
    <Section id="courses" spacing="lg">
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

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <motion.div
              key={`${course.name}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              <Card variant="bordered" className="h-full transition-all duration-300 hover:border-primary/20 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-0.5 shrink-0">
                    <BookOpen size={20} />
                  </span>
                  <div>
                    <h3 className="font-medium text-sm">{course.name}</h3>
                    {course.issuer && (
                      <p className="text-xs text-muted-foreground mt-0.5">{course.issuer}</p>
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
