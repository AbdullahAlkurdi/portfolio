"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/typography/heading";
import { Body } from "@/components/ui/typography/body";
import { Badge } from "@/components/ui/badge";
import { principlesData, principlesSection } from "@/content/data/principles";
import {
  staggerContainer,
  staggerItem,
  fadeInUpView,
} from "@/lib/animations/variants";

const iconMap: Record<string, string> = {
  layers: "⊕",
  blocks: "⊞",
  "trending-up": "↗",
  accessibility: "◉",
  zap: "⚡",
  code: "⟨/⟩",
};

export function Principles() {
  return (
    <Section id="principles" spacing="xl">
      <Container>
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          variants={fadeInUpView}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Badge variant="primary" className="mb-4">
            {principlesSection.badge}
          </Badge>
          <Heading level="2" className="mb-4">
            {principlesSection.title}
          </Heading>
          <Body className="text-muted-foreground">
            {principlesSection.description}
          </Body>
        </motion.div>
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {principlesData.map((principle) => (
            <motion.div
              key={principle.title}
              variants={staggerItem}
              className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:bg-surface-hover"
            >
              <span
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-muted text-lg text-primary"
                aria-hidden="true"
              >
                {iconMap[principle.icon] ?? "◆"}
              </span>
              <Heading level="4" className="mb-2">
                {principle.title}
              </Heading>
              <Body size="sm" className="text-muted-foreground">
                {principle.description}
              </Body>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
