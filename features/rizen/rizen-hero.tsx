"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/typography/heading";
import { Body } from "@/components/ui/typography/body";

type RizenHeroProps = {
  badge: string;
  title: string;
  description: string;
};

export function RizenHero({ badge, title, description }: RizenHeroProps) {
  return (
    <section
      id="rizen-hero"
      className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface to-surface-muted"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
      <Container as="div" className="relative z-10 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <Badge variant="primary" className="mb-4">
            {badge}
          </Badge>
          <Heading level="1" as="h2" className="mb-4">
            {title}
          </Heading>
          <Body size="lg" className="text-muted-foreground">
            {description}
          </Body>
        </motion.div>
      </Container>
    </section>
  );
}
