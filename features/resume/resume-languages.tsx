import { resumeData } from "@/content/data/resume";

export function ResumeLanguages() {
  if (resumeData.languages.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      {resumeData.languages.map((lang) => (
        <div key={lang.language} className="flex items-baseline gap-2">
          <span className="font-medium">{lang.language}</span>
          <span className="text-sm text-muted-foreground">— {lang.proficiency}</span>
        </div>
      ))}
    </div>
  );
}
