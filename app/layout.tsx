import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleProvider } from "@/lib/locale-context";
import { DirProvider } from "@/components/dir-provider";
import { ContentWrapper } from "@/components/content-wrapper";
import { DesktopNav } from "@/features/navigation/desktop-nav";
import { MobileNav } from "@/features/navigation/mobile-nav";
import { siteConfig } from "@/content/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ogImage = siteConfig.ogImage
  ? { url: `${siteConfig.url}${siteConfig.ogImage}` }
  : undefined;

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url,
    locale: "en_US",
    type: "website",
    ...(ogImage && { images: [ogImage] }),
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    ...(ogImage && { images: [ogImage.url] }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LocaleProvider>
            <ContentWrapper>
            <DirProvider>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:ring-2 focus:ring-ring"
              >
                Skip to content
              </a>
              <DesktopNav />
              <main id="main-content" className="flex-1">{children}</main>
              <MobileNav />
            </DirProvider>
            </ContentWrapper>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
