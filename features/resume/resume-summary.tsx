import { Body } from "@/components/ui/typography/body";
import { resumeData } from "@/content/data/resume";

export function ResumeSummary() {
  return (
    <Body size="lg" className="text-foreground">
      {resumeData.summary}
    </Body>
  );
}
