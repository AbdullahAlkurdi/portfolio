import type { Metadata } from "next";
import { ResumePage } from "@/features/resume";
import { siteConfig } from "@/content/data/site";

const ogImage = siteConfig.ogImage
  ? { url: `${siteConfig.url}${siteConfig.ogImage}` }
  : undefined;

export const metadata: Metadata = {
  title: `Resume — ${siteConfig.name}`,
  description:
    "IT Specialist & Software Engineer — Flutter, networking, IT support, and clean architecture.",
  alternates: {
    canonical: `${siteConfig.url}/resume`,
  },
  openGraph: {
    title: `Resume — ${siteConfig.name}`,
    description:
      "IT Specialist & Software Engineer — Flutter, networking, IT support, and clean architecture.",
    url: `${siteConfig.url}/resume`,
    siteName: siteConfig.name,
    type: "profile",
    ...(ogImage && { images: [ogImage] }),
  },
  twitter: {
    card: "summary",
    title: `Resume — ${siteConfig.name}`,
    description:
      "IT Specialist & Software Engineer — Flutter, networking, IT support, and clean architecture.",
    ...(ogImage && { images: [ogImage.url] }),
  },
};

export default function ResumeRoute() {
  return <ResumePage />;
}
