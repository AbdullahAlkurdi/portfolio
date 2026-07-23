import { rizenData } from "@/content/data/rizen";
import { rizenUi } from "@/content/data/rizen-ui";
import { RizenHero } from "./rizen-hero";
import { RizenStickyLayout } from "./rizen-sticky-layout";
import { RizenMetrics } from "./rizen-metrics";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/ui/typography/heading";
import { Body } from "@/components/ui/typography/body";
import { Badge } from "@/components/ui/badge";

export function Rizen() {
  const {
    hero,
    sections,
    architecture,
    aiLifecycle,
    ecosystem,
    metrics,
    results,
    roadmap,
  } = rizenData;

  return (
    <>
      <RizenHero
        badge={hero.badge}
        title={hero.title}
        description={hero.description}
      />

      <div className="py-16 md:py-20">
        <Container as="div">
          <div className="mb-4 flex items-center gap-2">
            <Badge variant="info">{rizenUi.metrics.badge}</Badge>
          </div>
          <Heading level="2" as="h3" className="mb-6">
            Architecture Overview
          </Heading>
          <RizenMetrics metrics={metrics} />
        </Container>
      </div>

      <div className="border-t border-border py-16 md:py-20">
        <RizenStickyLayout
          sections={sections}
          architectureLayers={architecture}
          aiLifecycle={aiLifecycle}
          ecosystem={ecosystem}
        />
      </div>

      <div className="border-t border-border py-16 md:py-20">
        <Container as="div">
          <Badge variant="success" className="mb-3">{rizenUi.results.badge}</Badge>
          <Heading level="2" as="h3" className="mb-6">
            Engineering Outcomes
          </Heading>
          <ul className="space-y-3">
            {results.map((result) => (
              <li key={result} className="flex items-start gap-3">
                <svg
                  className="mt-1 h-5 w-5 shrink-0 text-success"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <Body>{result}</Body>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <div className="border-t border-border py-16 md:py-20">
        <Container as="div">
          <Badge variant="warning" className="mb-3">{rizenUi.roadmap.badge}</Badge>
          <Heading level="2" as="h3" className="mb-6">
            {rizenUi.roadmap.heading}
          </Heading>
          <ul className="space-y-3">
            {roadmap.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg
                  className="mt-1 h-5 w-5 shrink-0 text-warning"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <Body>{item}</Body>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </>
  );
}
