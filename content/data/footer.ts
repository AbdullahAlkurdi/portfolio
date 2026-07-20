import type { FooterContent } from "@/types/content";

export const footerData: FooterContent = {
  email: "abdullah@example.com",
  copyright: "Abdullah Alkurdi. Built with Next.js.",
  resumeCta: {
    label: "Download Resume",
    href: "#",
  },
  social: [
    {
      label: "GitHub",
      href: "https://github.com/AbdullahAlkurdi",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/AbdullahAlkurdi",
      icon: "linkedin",
    },
    {
      label: "Email",
      href: "mailto:abdullah@example.com",
      icon: "mail",
    },
  ],
};
