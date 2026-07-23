"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/lib/locale-context";
import { getSiteContent } from "@/content/data/content";

const milestoneColors = [
  "border-border",
  "border-primary/30",
  "border-primary/40",
  "border-primary/50",
  "border-primary/60",
  "border-primary/70",
  "border-primary",
];

export function CareerTimeline() {
  const { locale } = useLocale();
  const content = getSiteContent(locale).timeline;

  return (
    <Section id="timeline" spacing="lg">
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
          <p className="text-muted-foreground max-w-2xl mb-12 text-base sm:text-lg leading-relaxed">
            {content.description}
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[18px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20" aria-hidden="true" />

          <div className="space-y-10">
            {content.events.map((event, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={`${event.year}-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="relative flex items-start gap-6 md:gap-0"
                >
                  <div className="hidden md:flex flex-1 justify-end">
                    {isLeft && (
                      <div className="w-full max-w-md pr-10 text-right">
                        <span className="inline-block text-xs font-bold text-primary mb-1.5 px-2 py-0.5 rounded-full bg-primary-muted">
                          {event.year}
                        </span>
                        <h3 className="text-base font-semibold mb-1">{event.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 flex-shrink-0 ml-0 md:ml-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center bg-background ${milestoneColors[i] || milestoneColors[milestoneColors.length - 1]}`}>
                      <span className="text-[10px] font-bold text-primary">{event.year}</span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 md:hidden">
                    <span className="inline-block text-xs font-bold text-primary mb-1">{event.year}</span>
                    <h3 className="text-base font-semibold mb-1">{event.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="hidden md:flex flex-1">
                    {!isLeft && (
                      <div className="w-full max-w-md pl-10">
                        <span className="inline-block text-xs font-bold text-primary mb-1.5 px-2 py-0.5 rounded-full bg-primary-muted">
                          {event.year}
                        </span>
                        <h3 className="text-base font-semibold mb-1">{event.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
