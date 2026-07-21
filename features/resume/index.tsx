import { Container } from "@/components/layout/container";
import { Divider } from "@/components/layout/divider";
import { resumeData } from "@/content/data/resume";
import { resumeUi } from "@/content/data/resume-ui";
import { ResumeHeader } from "./resume-header";
import { ResumeSummary } from "./resume-summary";
import { ResumeSkills } from "./resume-skills";
import { ResumeExperience } from "./resume-experience";
import { ResumeEducation } from "./resume-education";
import { ResumeCertifications } from "./resume-certifications";
import { ResumeProjects } from "./resume-projects";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold tracking-tight">{children}</h2>;
}

export function ResumePage() {
  return (
    <Container as="main" className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl space-y-10">
        <ResumeHeader />

        <Divider />

        <section aria-label={resumeUi.sections.summary}>
          <SectionHeading>{resumeUi.sections.summary}</SectionHeading>
          <div className="mt-3">
            <ResumeSummary />
          </div>
        </section>

        <Divider />

        <section aria-label={resumeUi.sections.skills}>
          <SectionHeading>{resumeUi.sections.skills}</SectionHeading>
          <div className="mt-4">
            <ResumeSkills />
          </div>
        </section>

        {resumeData.experience.length > 0 && (
          <>
            <Divider />
            <section aria-label={resumeUi.sections.experience}>
              <SectionHeading>{resumeUi.sections.experience}</SectionHeading>
              <div className="mt-4">
                <ResumeExperience />
              </div>
            </section>
          </>
        )}

        {resumeData.education.length > 0 && (
          <>
            <Divider />
            <section aria-label={resumeUi.sections.education}>
              <SectionHeading>{resumeUi.sections.education}</SectionHeading>
              <div className="mt-4">
                <ResumeEducation />
              </div>
            </section>
          </>
        )}

        {resumeData.certifications.length > 0 && (
          <>
            <Divider />
            <section aria-label={resumeUi.sections.certifications}>
              <SectionHeading>{resumeUi.sections.certifications}</SectionHeading>
              <div className="mt-4">
                <ResumeCertifications />
              </div>
            </section>
          </>
        )}

        <Divider />

        <section aria-label={resumeUi.sections.projects}>
          <SectionHeading>{resumeUi.sections.projects}</SectionHeading>
          <div className="mt-4">
            <ResumeProjects />
          </div>
        </section>
      </div>
    </Container>
  );
}
