import type { SiteConfig } from "@/types/content";

export const siteConfig: SiteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://abdullahalkurdi.dev",
  name: "Abdullah Alkurdi",
  title: "Abdullah Alkurdi — Engineering Portfolio",
  description:
    "Full-stack engineer passionate about clean architecture, scalable systems, and impactful software.",
  ogImage: "/og-image.png",
};
