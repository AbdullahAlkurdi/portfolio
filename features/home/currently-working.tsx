"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/lib/locale-context";
import { getSiteContent } from "@/content/data/content";
import { ArrowRight, ArrowLeft, Clock, Code2 } from "lucide-react";
import Link from "next/link";

const statusColors = {
  active: "bg-success-muted text-success",
  paused: "bg-warning-muted text-warning",
  planning: "bg-info-muted text-info",
} as const;

const statusLabels = {
  active: "active",
  paused: "paused",
  planning: "planning",
} as const;

export function CurrentlyWorking() {
  const { locale, dir } = useLocale();
  const content = getSiteContent(locale).currentlyWorking;
  const ui = getSiteContent(locale).ui;

  return (
    <Section id="currently-working" spacing="lg" className="bg-muted/30">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
            <Badge variant="primary">{content.badge}</Badge>
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-8 sm:text-4xl">
            {content.title}
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {content.items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link href={item.link ?? "#"} className="block group">
                <Card variant="bordered" className="h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="primary">{item.phase}</Badge>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[item.status]}`}>
                      {ui.projectStatus[statusLabels[item.status]]}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2 text-sm">
                      <Code2 size={14} className="mt-0.5 text-muted-foreground shrink-0" />
                      <span className="text-muted-foreground">{item.whatBuilding}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Clock size={14} className="mt-0.5 text-muted-foreground shrink-0" />
                      <span className="text-muted-foreground">{item.lastUpdated}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.technologies.map((t) => (
                      <Badge key={t} variant="secondary">{t}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-primary font-medium">
                    {locale === "ar" ? "عرض التفاصيل" : "View details"}
                    {dir === "rtl" ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
