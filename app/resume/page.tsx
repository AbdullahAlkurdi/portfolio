import type { Metadata } from "next";
import { ResumePage } from "@/features/resume";
import { siteConfig } from "@/content/data/site";

export const metadata: Metadata = {
  title: `Resume — ${siteConfig.name}`,
  description:
    "Cloud & AI Engineer · Full-stack engineer passionate about clean architecture, scalable systems, and impactful software.",
  alternates: {
    canonical: `${siteConfig.url}/resume`,
  },
  openGraph: {
    title: `Resume — ${siteConfig.name}`,
    description:
      "Cloud & AI Engineer · Full-stack engineer passionate about clean architecture, scalable systems, and impactful software.",
    url: `${siteConfig.url}/resume`,
    siteName: siteConfig.name,
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: `Resume — ${siteConfig.name}`,
    description:
      "Cloud & AI Engineer · Full-stack engineer passionate about clean architecture, scalable systems, and impactful software.",
  },
};

export default function ResumeRoute() {
  return <ResumePage />;
}
