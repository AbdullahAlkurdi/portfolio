import type { SiteConfig } from "@/types/content";

export const siteConfig: SiteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://abdullahalkurdi.dev",
  name: "Abdullah Alkurdi",
  title: "Abdullah Alkurdi — IT Specialist & Software Engineer",
  description:
    "IT Specialist & Software Engineer based in Makkah, Saudi Arabia. Flutter, Python, networking, IT support, and clean architecture.",
};
