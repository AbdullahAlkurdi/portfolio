import { ExternalLink } from "lucide-react";
import { resumeData } from "@/content/data/resume";

export function ResumeCertifications() {
  if (resumeData.certifications.length === 0) return null;

  return (
    <div className="space-y-3">
      {resumeData.certifications.map((cert, i) => (
        <div key={i} className="flex items-baseline justify-between gap-2">
          <div>
            {cert.url ? (
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
              >
                {cert.name}
                <ExternalLink size={12} />
              </a>
            ) : (
              <span className="text-sm font-medium">{cert.name}</span>
            )}
            <p className="text-xs text-muted-foreground">{cert.issuer}</p>
          </div>
          <span className="shrink-0 text-xs text-muted-foreground">{cert.date}</span>
        </div>
      ))}
    </div>
  );
}
