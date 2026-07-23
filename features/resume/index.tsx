"use client";

import { Container } from "@/components/layout/container";
import { Divider } from "@/components/layout/divider";
import { resumeData } from "@/content/data/resume";
import { useLocale } from "@/lib/locale-context";
import { getSiteContent } from "@/content/data/content";
import { ResumeHeader } from "./resume-header";
import { ResumeSummary } from "./resume-summary";
import { ResumeSkills } from "./resume-skills";
import { ResumeSoftSkills } from "./resume-soft-skills";
import { ResumeExperience } from "./resume-experience";
import { ResumeEducation } from "./resume-education";
import { ResumeCertifications } from "./resume-certifications";
import { ResumeCourses } from "./resume-courses";
import { ResumeLanguages } from "./resume-languages";
import { ResumeProjects } from "./resume-projects";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold tracking-tight">{children}</h2>;
}

export function ResumePage() {
  const { locale } = useLocale();
  const content = getSiteContent(locale).resume;

  return (
    <Container as="main" className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl space-y-10">
        <ResumeHeader />

        <Divider />

        <section aria-label={content.sections.summary}>
          <SectionHeading>{content.sections.summary}</SectionHeading>
          <div className="mt-3">
            <ResumeSummary />
          </div>
        </section>

        <Divider />

        <section aria-label={content.sections.skills}>
          <SectionHeading>{content.sections.skills}</SectionHeading>
          <div className="mt-4">
            <ResumeSkills />
          </div>
        </section>

        {resumeData.softSkills.length > 0 && (
          <>
            <Divider />
            <section aria-label={content.sections.softSkills}>
              <SectionHeading>{content.sections.softSkills}</SectionHeading>
              <div className="mt-4">
                <ResumeSoftSkills />
              </div>
            </section>
          </>
        )}

        {resumeData.experience.length > 0 && (
          <>
            <Divider />
            <section aria-label={content.sections.experience}>
              <SectionHeading>{content.sections.experience}</SectionHeading>
              <div className="mt-4">
                <ResumeExperience />
              </div>
            </section>
          </>
        )}

        {resumeData.education.length > 0 && (
          <>
            <Divider />
            <section aria-label={content.sections.education}>
              <SectionHeading>{content.sections.education}</SectionHeading>
              <div className="mt-4">
                <ResumeEducation />
              </div>
            </section>
          </>
        )}

        {resumeData.certifications.length > 0 && (
          <>
            <Divider />
            <section aria-label={content.sections.certifications}>
              <SectionHeading>{content.sections.certifications}</SectionHeading>
              <div className="mt-4">
                <ResumeCertifications />
              </div>
            </section>
          </>
        )}

        {resumeData.courses.length > 0 && (
          <>
            <Divider />
            <section aria-label={content.sections.courses}>
              <SectionHeading>{content.sections.courses}</SectionHeading>
              <div className="mt-4">
                <ResumeCourses />
              </div>
            </section>
          </>
        )}

        {resumeData.languages.length > 0 && (
          <>
            <Divider />
            <section aria-label={content.sections.languages}>
              <SectionHeading>{content.sections.languages}</SectionHeading>
              <div className="mt-4">
                <ResumeLanguages />
              </div>
            </section>
          </>
        )}

        <Divider />

        <section aria-label={content.sections.projects}>
          <SectionHeading>{content.sections.projects}</SectionHeading>
          <div className="mt-4">
            <ResumeProjects />
          </div>
        </section>
      </div>
    </Container>
  );
}
