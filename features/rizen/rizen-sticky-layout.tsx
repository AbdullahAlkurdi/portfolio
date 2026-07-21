"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/ui/typography/heading";
import { Body } from "@/components/ui/typography/body";
import { Badge } from "@/components/ui/badge";
import { crossfade } from "@/lib/animations/variants";
import { rizenUi } from "@/content/data/rizen-ui";
import { CleanArchitecture } from "./diagrams/clean-architecture";
import { AiLifecycle } from "./diagrams/ai-lifecycle";
import { Ecosystem } from "./diagrams/ecosystem";
import type { RizenSection, RizenArchitectureLayer, RizenAiStep, RizenEcosystemNode } from "@/types/content";

type RizenStickyLayoutProps = {
  sections: RizenSection[];
  architectureLayers: RizenArchitectureLayer[];
  aiLifecycle: RizenAiStep[];
  ecosystem: RizenEcosystemNode[];
};

function SectionVisual({
  sectionId,
  architectureLayers,
  aiLifecycle,
  ecosystem,
}: {
  sectionId: string;
} & Omit<RizenStickyLayoutProps, "sections">) {
  switch (sectionId) {
    case "architecture":
      return <CleanArchitecture layers={architectureLayers} />;
    case "ai":
      return <AiLifecycle steps={aiLifecycle} />;
    case "roadmap":
      return <Ecosystem nodes={ecosystem} />;
    case "vision":
      return <Ecosystem nodes={ecosystem} />;
    default:
      return (
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-muted text-primary">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">
              {rizenUi.visual.placeholder}
            </p>
          </div>
        </div>
      );
  }
}

function SectionDiagram({
  sectionId,
  architectureLayers,
  aiLifecycle,
  ecosystem,
}: {
  sectionId: string;
} & Omit<RizenStickyLayoutProps, "sections">) {
  return (
    <div className="flex items-center justify-center p-4">
      <SectionVisual
        sectionId={sectionId}
        architectureLayers={architectureLayers}
        aiLifecycle={aiLifecycle}
        ecosystem={ecosystem}
      />
    </div>
  );
}

export function RizenStickyLayout({
  sections,
  architectureLayers,
  aiLifecycle,
  ecosystem,
}: RizenStickyLayoutProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [prefersReduced] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id.replace("section-", ""));
        }
      },
      { rootMargin: "-80px 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
    else sectionRefs.current.delete(id);
  };

  const diagramMap: Record<string, string> = {
    architecture: "architecture",
    ai: "ai",
    roadmap: "roadmap",
    vision: "vision",
  };
  const currentDiagramId = diagramMap[activeSection] ?? "default";

  return (
    <section id="rizen" className="relative">
      <Container as="div">
        {/* Mobile: stacked layout */}
        <div className="lg:hidden">
          <div className="space-y-16">
            {sections.map((section) => (
              <article
                key={section.id}
                id={`section-${section.id}`}
                ref={setRef(section.id)}
                className="scroll-mt-24"
              >
                <Badge variant="secondary" className="mb-3">
                  {section.label}
                </Badge>
                <Heading level="2" as="h3" className="mb-4">
                  {section.label}
                </Heading>
                <Body className="text-muted-foreground">{section.content}</Body>
                <div className="mt-8 rounded-xl border border-border bg-surface p-6">
                  <SectionVisual
                    sectionId={section.id}
                    architectureLayers={architectureLayers}
                    aiLifecycle={aiLifecycle}
                    ecosystem={ecosystem}
                  />
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16">
            <Badge variant="secondary" className="mb-3">{rizenUi.ecosystem.badge}</Badge>
            <Heading level="2" as="h3" className="mb-4">
              {rizenUi.ecosystem.heading}
            </Heading>
            <Body className="text-muted-foreground mb-6">
              {rizenUi.ecosystem.paragraph}
            </Body>
            <div className="rounded-xl border border-border bg-surface p-6">
              <Ecosystem nodes={ecosystem} />
            </div>
          </div>
        </div>

        {/* Desktop: sticky two-column layout */}
        <div className="hidden lg:block">
          <div className="relative grid grid-cols-2 gap-16">
            {/* Left column: scrollable sections */}
            <div className="space-y-32 pb-32">
              {sections.map((section) => (
                <article
                  key={section.id}
                  id={`section-${section.id}`}
                  ref={setRef(section.id)}
                  className="scroll-mt-24"
                >
                  <Badge variant="secondary" className="mb-3">
                    {section.label}
                  </Badge>
                  <Heading level="2" as="h3" className="mb-4">
                    {section.label}
                  </Heading>
                  <Body className="text-muted-foreground">{section.content}</Body>
                </article>
              ))}

              <div>
                <Badge variant="secondary" className="mb-3">{rizenUi.ecosystem.badge}</Badge>
                <Heading level="2" as="h3" className="mb-4">
                  {rizenUi.ecosystem.heading}
                </Heading>
                <Body className="text-muted-foreground mb-6">
                  {rizenUi.ecosystem.paragraph}
                </Body>
              </div>
            </div>

            {/* Right column: sticky diagram */}
            <div className="relative">
              <div className="sticky top-24" style={{ minHeight: "calc(100vh - 8rem)" }}>
                <div className="flex h-full min-h-[400px] items-center justify-center rounded-xl border border-border bg-surface p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentDiagramId}
                      variants={crossfade}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: prefersReduced ? 0 : 0.4,
                        ease: "easeInOut",
                      }}
                      className="w-full"
                    >
                      <SectionDiagram
                        sectionId={currentDiagramId}
                        architectureLayers={architectureLayers}
                        aiLifecycle={aiLifecycle}
                        ecosystem={ecosystem}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
