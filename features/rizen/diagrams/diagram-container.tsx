"use client";

import { cn } from "@/lib/utils";
import type { SVGAttributes } from "react";

type DiagramContainerProps = SVGAttributes<SVGSVGElement> & {
  label: string;
  width?: number;
  height?: number;
};

export function DiagramContainer({
  label,
  width = 400,
  height = 400,
  className,
  children,
  ...props
}: DiagramContainerProps) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="100%"
      className={cn("max-h-[400px]", className)}
      role="img"
      aria-label={label}
      {...props}
    >
      {children}
    </svg>
  );
}

type ArchitectureNodeProps = SVGAttributes<SVGGElement> & {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  description?: string;
  isActive?: boolean;
  isHighlighted?: boolean;
  onActivate?: () => void;
  onDeactivate?: () => void;
};

export function ArchitectureNode({
  x,
  y,
  width,
  height,
  label,
  description,
  isActive,
  isHighlighted,
  className,
  onActivate,
  onDeactivate,
  ...props
}: ArchitectureNodeProps) {
  const rx = 8;
  const fill = isActive
    ? "fill-primary/20"
    : isHighlighted
      ? "fill-primary/10"
      : "fill-surface";
  const stroke = isActive
    ? "stroke-primary"
    : isHighlighted
      ? "stroke-primary/60"
      : "stroke-border";
  return (
    <g
      className={cn(
        "transition-[opacity,filter] duration-300 outline-none",
        isHighlighted && !isActive ? "opacity-90" : "",
        className,
      )}
      tabIndex={0}
      role="group"
      aria-label={`${label}${description ? `: ${description}` : ""}`}
      onFocus={onActivate}
      onBlur={onDeactivate}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onActivate?.();
      }}
      style={{ cursor: "pointer" }}
      {...props}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={rx}
        className={cn(
          fill,
          stroke,
          "stroke-2 transition-all duration-300",
        )}
      />
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-foreground text-[13px] font-semibold"
      >
        {label}
      </text>
    </g>
  );
}

type ArchitectureEdgeProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  animated?: boolean;
};

export function ArchitectureEdge({
  x1,
  y1,
  x2,
  y2,
  animated,
}: ArchitectureEdgeProps) {
  const midY = (y1 + y2) / 2;
  const path = `M${x1},${y1} C${x1},${midY} ${x2},${midY} ${x2},${y2}`;
  return (
    <g>
      <path
        d={path}
        fill="none"
        className="stroke-muted-foreground/40"
        strokeWidth={2}
        markerEnd="url(#arrowhead)"
      />
      {animated && (
        <circle r={3} className="fill-primary">
          <animateMotion
            dur="2s"
            repeatCount="indefinite"
            path={path}
          />
        </circle>
      )}
      <defs>
        <marker
          id="arrowhead"
          markerWidth={8}
          markerHeight={6}
          refX={8}
          refY={3}
          orient="auto"
        >
          <polygon
            points="0,0 8,3 0,6"
            className="fill-muted-foreground/40"
          />
        </marker>
      </defs>
    </g>
  );
}
