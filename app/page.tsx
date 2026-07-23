import { HeroSection } from "@/features/home/hero-section";
import { AboutSection } from "@/features/home/about-section";
import { CurrentlyWorking } from "@/features/home/currently-working";
import { FeaturedProjects } from "@/features/home/featured-projects";
import { SkillsSection } from "@/features/home/skills-section";
import { KnowledgeBase } from "@/features/home/knowledge-base";
import { ExperienceSection } from "@/features/home/experience-section";
import { EducationSection } from "@/features/home/education-section";
import { CertificationsSection } from "@/features/home/certifications-section";
import { CoursesSection } from "@/features/home/courses-section";
import { LearningSection } from "@/features/home/learning-section";
import { CareerTimeline } from "@/features/home/career-timeline";
import { ContactSection } from "@/features/home/contact-section";
import { Footer } from "@/features/footer";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CurrentlyWorking />
      <FeaturedProjects />
      <SkillsSection />
      <KnowledgeBase />
      <ExperienceSection />
      <EducationSection />
      <CertificationsSection />
      <CoursesSection />
      <LearningSection />
      <CareerTimeline />
      <ContactSection />
      <Footer />
    </>
  );
}
