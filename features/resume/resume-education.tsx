import { Body } from "@/components/ui/typography/body";
import { resumeData } from "@/content/data/resume";

export function ResumeEducation() {
  if (resumeData.education.length === 0) return null;

  return (
    <div className="space-y-6">
      {resumeData.education.map((edu, i) => (
        <article key={i}>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold">{edu.degree}</h3>
              <p className="text-sm text-muted-foreground">
                {edu.institution} · {edu.location}
              </p>
            </div>
            <p className="shrink-0 text-sm text-muted-foreground">
              {edu.startDate} — {edu.endDate}
            </p>
          </div>
          {edu.description && (
            <Body size="sm" className="mt-2">{edu.description}</Body>
          )}
        </article>
      ))}
    </div>
  );
}
