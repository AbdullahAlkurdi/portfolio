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

function PrincipleIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    layers: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    blocks: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    "trending-up": (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    accessibility: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="4" r="1" /><path d="m18 19 1-7-6 1" /><path d="m5 8 3-3 5.5 3-2.36 3.5" /><path d="M4.24 14.5a5 5 0 0 0 6.88 6" /><path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
      </svg>
    ),
    zap: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    code: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  };

  return <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-muted text-primary" aria-hidden="true">{icons[icon] ?? "◆"}</span>;
}

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
              className="group rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-md"
            >
              <PrincipleIcon icon={principle.icon} />
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
