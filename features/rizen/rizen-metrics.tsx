import { Grid } from "@/components/layout/grid";
import { Stat } from "@/components/ui/stat";
import type { RizenMetric } from "@/types/content";

function MetricIcon({ label }: { label: string }) {
  const icons: Record<string, React.ReactNode> = {
    "Architecture": (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    "State Management": (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    "Backend": (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    "AI": (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a4 4 0 0 1 4 4c0 2-2 4-4 6-2-2-4-4-4-6a4 4 0 0 1 4-4z" /><path d="M12 22c-4 0-6-2-6-4 0-1 1-2 2-3" /><path d="M12 22c4 0 6-2 6-4 0-1-1-2-2-3" />
      </svg>
    ),
  };

  return <>{icons[label] ?? null}</>;
}

type RizenMetricsProps = {
  metrics: RizenMetric[];
};

export function RizenMetrics({ metrics }: RizenMetricsProps) {
  return (
    <Grid cols={1} sm={2} lg={4} gap="4">
      {metrics.map((metric) => (
        <Stat
          key={metric.label}
          icon={<MetricIcon label={metric.label} />}
          label={metric.label}
          value={metric.value}
          description={metric.description}
        />
      ))}
    </Grid>
  );
}
