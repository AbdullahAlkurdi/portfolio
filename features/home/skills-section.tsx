"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale-context";
import { getSiteContent } from "@/content/data/content";
import { useContent } from "@/lib/content/content-provider";
import { Code2, Globe, Database, Network, Wrench, Cloud, Terminal, Cpu } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "Programming Languages": <Code2 size={20} />,
  "Web Development": <Globe size={20} />,
  "Mobile Development": <Smartphone size={20} />,
  Databases: <Database size={20} />,
  "Cloud & AI": <Cloud size={20} />,
  Networking: <Network size={20} />,
  "IT Support": <Wrench size={20} />,
  "DevOps & Tools": <Terminal size={20} />,
  "Software Engineering": <Cpu size={20} />,
};

function Smartphone(props: { size?: number }) {
  return (
    <svg width={props.size ?? 20} height={props.size ?? 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

export function SkillsSection() {
  const { locale } = useLocale();
  const { resume } = useContent();
  const content = getSiteContent(locale).skills;
  const categories = resume.skillCategories;

  return (
    <Section id="skills" spacing="lg" className="bg-muted/30">
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              <Card variant="bordered" className="h-full transition-all duration-300 hover:border-primary/20 hover:shadow-md">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-primary mt-0.5">
                    {categoryIcons[cat.category] ?? <Code2 size={20} />}
                  </span>
                  <h3 className="font-semibold">{cat.category}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <Button as="a" href="/resume" variant="ghost" size="sm">
            {content.learnMore}
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}
