"use client";

import { DiagramContainer, ArchitectureNode, ArchitectureEdge } from "./diagram-container";
import type { RizenAiStep } from "@/types/content";

type AiLifecycleProps = {
  steps: RizenAiStep[];
};

const NODE_W = 160;
const NODE_H = 40;
const H_GAP = 24;
const START_X = 20;
const START_Y = 180;

export function AiLifecycle({ steps }: AiLifecycleProps) {
  const totalW = steps.length * (NODE_W + H_GAP) + START_X + 20;

  return (
    <div className="overflow-x-auto">
      <DiagramContainer
        label="AI Request Lifecycle diagram"
        width={Math.max(totalW, 600)}
        height={400}
        className="min-w-[600px]"
      >
        {steps.map((step, i) => {
          const x = START_X + i * (NODE_W + H_GAP);
          return (
            <g key={step.label}>
              <ArchitectureNode
                x={x}
                y={START_Y}
                width={NODE_W}
                height={NODE_H}
                label={step.label}
                description={step.description}
              />
              <text
                x={x + NODE_W / 2}
                y={START_Y - 12}
                textAnchor="middle"
                className="fill-muted-foreground text-[10px]"
              >
                {step.description}
              </text>
              {i < steps.length - 1 && (
                <ArchitectureEdge
                  x1={x + NODE_W}
                  y1={START_Y + NODE_H / 2}
                  x2={x + NODE_W + H_GAP}
                  y2={START_Y + NODE_H / 2}
                  animated
                />
              )}
            </g>
          );
        })}
      </DiagramContainer>

      <div className="sr-only" role="region" aria-label="AI lifecycle description">
        {steps.map((s) => `${s.label}: ${s.description}`).join(". Then ")}.
      </div>
    </div>
  );
}
