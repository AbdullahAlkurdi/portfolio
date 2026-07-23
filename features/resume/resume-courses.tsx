import { useLocale } from "@/lib/locale-context";
import { resumeData } from "@/content/data/resume";

export function ResumeCourses() {
  const { dir } = useLocale();
  if (resumeData.courses.length === 0) return null;

  return (
    <ul className={`list-disc space-y-1 ${dir === "rtl" ? "pr-5" : "pl-5"} text-sm text-muted-foreground`}>
      {resumeData.courses.map((course, i) => (
        <li key={i}>
          <span className="text-foreground">{course.name}</span>
          {course.issuer && <span> — {course.issuer}</span>}
        </li>
      ))}
    </ul>
  );
}
