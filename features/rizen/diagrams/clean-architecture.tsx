"use client";

import { useState } from "react";
import { DiagramContainer, ArchitectureNode, ArchitectureEdge } from "./diagram-container";
import type { RizenArchitectureLayer } from "@/types/content";

type CleanArchitectureProps = {
  layers: RizenArchitectureLayer[];
};

const NODE_W = 220;
const NODE_H = 56;
const GAP = 20;
const START_X = 90;
const START_Y = 20;

export function CleanArchitecture({ layers }: CleanArchitectureProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const svgH = layers.length * (NODE_H + GAP) + GAP;

  return (
    <div>
      <DiagramContainer
        label="Clean Architecture layers diagram"
        width={400}
        height={svgH}
      >
        {layers.map((layer, i) => {
          const y = START_Y + i * (NODE_H + GAP);
          const isActive = activeIndex === i;

          const childrenY = y + NODE_H + 8;
          return (
            <g key={layer.name}>
              <ArchitectureNode
                x={START_X}
                y={y}
                width={NODE_W}
                height={NODE_H}
                label={layer.name}
                description={layer.description}
                isActive={isActive}
                isHighlighted={activeIndex !== null && activeIndex === i}
                onActivate={() => setActiveIndex(i)}
                onDeactivate={() => setActiveIndex(null)}
              />
              {layer.children && (
                <text
                  x={START_X + NODE_W / 2}
                  y={childrenY + 12}
                  textAnchor="middle"
                  className="fill-muted-foreground text-[11px]"
                >
                  {layer.children.join("  ·  ")}
                </text>
              )}
              {i < layers.length - 1 && (
                <ArchitectureEdge
                  x1={START_X + NODE_W / 2}
                  y1={y + NODE_H}
                  x2={START_X + NODE_W / 2}
                  y2={y + NODE_H + GAP}
                />
              )}
            </g>
          );
        })}
      </DiagramContainer>

      <div className="sr-only" role="region" aria-label="Architecture description">
        {layers.map((l) => `${l.name}: ${l.description}`).join(". ")}
      </div>
    </div>
  );
}
