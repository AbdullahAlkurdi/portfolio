import { Badge } from "@/components/ui/badge";
import { resumeData } from "@/content/data/resume";

export function ResumeSoftSkills() {
  if (resumeData.softSkills.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {resumeData.softSkills.map((skill) => (
        <Badge key={skill} variant="secondary">
          {skill}
        </Badge>
      ))}
    </div>
  );
}
