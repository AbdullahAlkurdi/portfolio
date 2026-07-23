"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale-context";
import { getSiteContent } from "@/content/data/content";
import { useContent } from "@/lib/content/content-provider";
import { ArrowRight, BookOpen, Construction, FlaskConical, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

const projectStatus: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  rizen: {
    label: "Active Development",
    color: "bg-success-muted text-success",
    icon: <Construction size={14} />,
  },
  tripmate: {
    label: "Planning",
    color: "bg-accent-muted text-accent-foreground",
    icon: <FlaskConical size={14} />,
  },
  "social-media-app": {
    label: "Graduation Project",
    color: "bg-primary-muted text-primary",
    icon: <GraduationCap size={14} />,
  },
};

export function FeaturedProjects() {
  const { locale } = useLocale();
  const { projects } = useContent();
  const content = getSiteContent(locale).featuredProjects;
  const featured = useMemo(
    () => projects.filter((p) => p.featured).slice(0, 2),
    [projects]
  );
  const graduation = useMemo(
    () => projects.find((p) => p.slug === "social-media-app"),
    [projects]
  );

  if (featured.length === 0) return null;

  return (
    <Section id="projects" spacing="lg" className="bg-muted/30">
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

        <div className="grid gap-6 md:grid-cols-3 md:grid-rows-2">
          {featured.map((project, i) => {
            const status = projectStatus[project.slug];
            const isFirst = i === 0;

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={isFirst ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1"}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="block group h-full"
                >
                  <div
                    className={`relative h-full rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg ${
                      isFirst ? "md:p-8" : ""
                    }`}
                  >
                    {status && (
                      <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.color} mb-4`}>
                        {status.icon}
                        {status.label}
                      </div>
                    )}

                    <h3
                      className={`font-semibold group-hover:text-primary transition-colors mb-2 ${
                        isFirst ? "text-2xl md:text-3xl" : "text-lg"
                      }`}
                    >
                      {project.title}
                    </h3>

                    <p
                      className={`text-muted-foreground leading-relaxed ${
                        isFirst ? "text-base mb-6" : "text-sm mb-3 line-clamp-2"
                      }`}
                    >
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, isFirst ? 6 : 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px]">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-sm text-muted-foreground pt-4 border-t border-border mt-auto">
                      <span className="flex items-center gap-1 text-primary font-medium text-xs">
                        <BookOpen size={12} />
                        Case Study
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {graduation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="md:col-span-1 md:row-span-1"
            >
              <Link
                href={`/projects/${graduation.slug}`}
                className="block group h-full"
              >
                <div className="h-full rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
                  {projectStatus[graduation.slug] && (
                    <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${projectStatus[graduation.slug].color} mb-3`}>
                      {projectStatus[graduation.slug].icon}
                      {projectStatus[graduation.slug].label}
                    </div>
                  )}

                  <h3 className="text-base font-semibold group-hover:text-primary transition-colors mb-2">
                    {graduation.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                    {graduation.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {graduation.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-primary text-xs font-medium pt-3 border-t border-border">
                    <BookOpen size={11} />
                    Case Study
                    <ArrowRight size={11} />
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Button as="a" href="/projects" variant="outline" size="lg">
            {content.viewAll}
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}
