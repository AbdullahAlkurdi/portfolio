import { Badge } from "@/components/ui/badge";
import { resumeData } from "@/content/data/resume";

export function ResumeSkills() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {resumeData.skillCategories.map((group) => (
        <div key={group.category}>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {group.category}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {group.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
