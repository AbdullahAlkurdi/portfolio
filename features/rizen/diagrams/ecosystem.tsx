"use client";

import { useState } from "react";
import { DiagramContainer, ArchitectureNode, ArchitectureEdge } from "./diagram-container";
import type { RizenEcosystemNode } from "@/types/content";

type EcosystemProps = {
  nodes: RizenEcosystemNode[];
};

const NODE_W = 160;
const NODE_H = 46;
const V_GAP = 24;
const START_X = 120;
const START_Y = 20;

export function Ecosystem({ nodes }: EcosystemProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const svgH = nodes.length * (NODE_H + V_GAP) + V_GAP;

  return (
    <div>
      <DiagramContainer
        label="Product Ecosystem diagram"
        width={400}
        height={svgH}
      >
        {nodes.map((node, i) => {
          const y = START_Y + i * (NODE_H + V_GAP);
          const isActive = activeIndex === i;
          return (
            <g key={node.name}>
              <ArchitectureNode
                x={START_X}
                y={y}
                width={NODE_W}
                height={NODE_H}
                label={node.name}
                description={node.description}
                isActive={isActive}
                isHighlighted={activeIndex !== null && activeIndex === i}
                onActivate={() => setActiveIndex(i)}
                onDeactivate={() => setActiveIndex(null)}
              />
              <text
                x={START_X + NODE_W / 2}
                y={y + NODE_H + 14}
                textAnchor="middle"
                className="fill-muted-foreground text-[10px]"
              >
                {node.description}
              </text>
              {i < nodes.length - 1 && (
                <ArchitectureEdge
                  x1={START_X + NODE_W / 2}
                  y1={y + NODE_H}
                  x2={START_X + NODE_W / 2}
                  y2={y + NODE_H + V_GAP}
                />
              )}
            </g>
          );
        })}
      </DiagramContainer>

      <div className="sr-only" role="region" aria-label="Ecosystem description">
        {nodes.map((n) => `${n.name}: ${n.description}`).join(". ")}.
      </div>
    </div>
  );
}
