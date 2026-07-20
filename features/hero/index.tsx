"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Display } from "@/components/ui/typography/display";
import { Body } from "@/components/ui/typography/body";
import { Button } from "@/components/ui/button";
import { heroData } from "@/content/data/hero";
import { HeroSvg } from "./hero-svg";
import { ScrollIndicator } from "./scroll-indicator";
import {
  fadeInUp,
  fadeInLeft,
  slideInRight,
  staggerContainer,
} from "@/lib/animations/variants";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-dvh items-center overflow-hidden"
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
      <Container as="div" className="relative z-10 w-full pt-20 pb-16 md:pt-24 md:pb-20">
        <motion.div
          className="grid items-center gap-12 md:grid-cols-2 md:gap-16"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInLeft} className="space-y-6">
            <Display as="h1" level="1">
              {heroData.headline}
            </Display>
            <Body size="lg" className="text-muted-foreground">
              {heroData.paragraph}
            </Body>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button as="a" href={heroData.primaryCta.href} size="lg">
                {heroData.primaryCta.label}
              </Button>
              <Button
                as="a"
                href={heroData.secondaryCta.href}
                variant="outline"
                size="lg"
              >
                {heroData.secondaryCta.label}
              </Button>
            </div>
          </motion.div>
          <motion.div
            variants={slideInRight}
            className="hidden md:block"
          >
            <HeroSvg />
          </motion.div>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          <ScrollIndicator />
        </motion.div>
      </Container>
    </section>
  );
}
