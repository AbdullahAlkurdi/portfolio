"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/typography/heading";
import { Body } from "@/components/ui/typography/body";
import { Badge } from "@/components/ui/badge";
import { timelineData } from "@/content/data/timeline";
import {
  staggerContainer,
  staggerItem,
} from "@/lib/animations/variants";

function TimelineDesktop() {
  return (
    <div className="relative hidden md:block">
      <div
        className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-border"
        aria-hidden="true"
      />
      <motion.div
        className="relative grid grid-cols-6 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {timelineData.map((event, index) => (
          <motion.div
            key={event.year}
            variants={staggerItem}
            className={cn(
              "relative",
              index % 2 === 0 ? "pt-0" : "pt-32",
            )}
          >
            <div
              className={cn(
                "absolute left-1/2 -translate-x-1/2",
                index % 2 === 0 ? "top-full mt-3" : "bottom-full mb-3",
              )}
            >
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold text-muted-foreground">
                  {event.year}
                </span>
                <div className="mt-1 h-3 w-0.5 bg-primary/40" aria-hidden="true" />
                <div className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              </div>
            </div>
            <div
              className={cn(
                "rounded-lg border border-border bg-surface p-4",
                index % 2 === 0 ? "mt-16" : "",
              )}
            >
              <Heading level="4" className="mb-1 text-sm">
                {event.title}
              </Heading>
              <Body size="sm" className="text-muted-foreground">
                {event.description}
              </Body>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function TimelineMobile() {
  return (
    <motion.div
      className="relative space-y-0 md:hidden"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      <div
        className="absolute left-4 top-0 h-full w-0.5 bg-border"
        aria-hidden="true"
      />
      {timelineData.map((event) => (
        <motion.div
          key={event.year}
          variants={staggerItem}
          className="relative ml-10 pb-8 pl-6"
        >
          <div
            className="absolute left-[-22px] top-1 flex h-3 w-3 items-center justify-center"
            aria-hidden="true"
          >
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
          <span className="text-xs font-semibold text-primary">
            {event.year}
          </span>
          <Heading level="4" className="mt-1 text-sm">
            {event.title}
          </Heading>
          <Body size="sm" className="mt-1 text-muted-foreground">
            {event.description}
          </Body>
        </motion.div>
      ))}
    </motion.div>
  );
}

import { cn } from "@/lib/utils";

export function Timeline() {
  return (
    <Section id="timeline" spacing="xl">
      <Container>
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="primary" className="mb-4">
            Engineering Evolution
          </Badge>
          <Heading level="2" className="mb-4">
            The Journey So Far
          </Heading>
          <Body className="text-muted-foreground">
            Every engineer evolves. Here is a snapshot of the milestones that
            shaped my approach to building software.
          </Body>
        </motion.div>
        <TimelineDesktop />
        <TimelineMobile />
      </Container>
    </Section>
  );
}
