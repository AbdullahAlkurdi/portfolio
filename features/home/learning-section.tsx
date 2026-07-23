"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/lib/locale-context";
import { getSiteContent } from "@/content/data/content";
import { BookOpen, TrendingUp, Compass, Sparkles } from "lucide-react";

export function LearningSection() {
  const { locale } = useLocale();
  const content = getSiteContent(locale).learning;

  const items = [
    {
      icon: <BookOpen size={20} />,
      label: content.currentlyLearning,
      title: "Currently Learning",
    },
    {
      icon: <TrendingUp size={20} />,
      label: content.improving,
      title: "Improving",
    },
    {
      icon: <Compass size={20} />,
      label: content.exploreNext,
      title: "Explore Next",
    },
  ];

  return (
    <Section id="learning" spacing="lg" className="bg-muted/30">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-primary" />
            <Badge variant="primary">{content.badge}</Badge>
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-3 sm:text-4xl">
            {content.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-10 text-base sm:text-lg leading-relaxed">
            {content.description}
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card variant="bordered" className="h-full transition-all duration-300 hover:border-primary/20 hover:shadow-md">
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-primary mt-0.5">{item.icon}</span>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.label}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
