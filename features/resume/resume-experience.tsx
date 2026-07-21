import { Badge } from "@/components/ui/badge";
import { Body } from "@/components/ui/typography/body";
import { resumeData } from "@/content/data/resume";

export function ResumeExperience() {
  if (resumeData.experience.length === 0) return null;

  return (
    <div className="space-y-8">
      {resumeData.experience.map((exp, i) => (
        <article key={i}>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold">{exp.role}</h3>
              <p className="text-sm text-muted-foreground">
                {exp.organization} · {exp.location}
              </p>
            </div>
            <p className="shrink-0 text-sm text-muted-foreground">
              {exp.startDate} — {exp.endDate}
            </p>
          </div>
          <Body size="sm" className="mt-2">{exp.description}</Body>
          {exp.achievements.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {exp.achievements.map((a, j) => (
                <li key={j}>{a}</li>
              ))}
            </ul>
          )}
          {exp.technologies && exp.technologies.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {exp.technologies.map((t) => (
                <Badge key={t} variant="secondary">{t}</Badge>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
