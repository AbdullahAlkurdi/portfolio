"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale-context";
import { getSiteContent } from "@/content/data/content";
import {
  FileText,
  Mail,
  MapPin,
  ChevronDown,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function HeroSection() {
  const { locale } = useLocale();
  const content = getSiteContent(locale).hero;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      <Container className="relative z-10 w-full pt-28 pb-16 md:pt-36 md:pb-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <span className="text-sm font-medium text-primary">
              {content.availability}
            </span>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-sm font-medium text-primary mb-2 tracking-wider uppercase"
          >
            {content.greeting}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-4"
          >
            {content.name}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary mb-4"
          >
            {content.title}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-xs font-medium text-muted-foreground tracking-wide uppercase mb-2"
          >
            {content.tagline}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 text-muted-foreground mb-6"
          >
            <MapPin size={15} />
            <span className="text-sm">{content.location}</span>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-muted-foreground mb-10 max-w-2xl leading-relaxed"
          >
            {content.description}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
            <Button as="a" href="#projects" size="lg">
              {content.primaryCta}
              <ArrowRight size={16} />
            </Button>
            <Button
              as="a"
              href="/resume"
              variant="outline"
              size="lg"
            >
              <FileText size={16} />
              {content.secondaryCta}
            </Button>
            <Button
              as="a"
              href={`mailto:abdullah.h.alkurdi@gmail.com`}
              variant="outline"
              size="lg"
            >
              <Mail size={16} />
              {content.tertiaryCta}
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4"
          >
            <a
              href="https://github.com/AbdullahAlkurdi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub Profile"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <span className="text-muted-foreground/30">/</span>
            <a
              href="https://www.linkedin.com/in/abdullah-alkordie"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn Profile"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <span className="text-muted-foreground/30">/</span>
            <a
              href={`https://wa.me/+966511792943?text=Abdullah%20Alkurdi`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="WhatsApp"
            >
              <ExternalLink size={18} />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <a
            href="#who-i-am"
            className="flex flex-col items-center gap-1 text-muted-foreground/40 hover:text-muted-foreground transition-colors"
            aria-label="Scroll down"
          >
            <span className="text-[10px] tracking-widest uppercase">Scroll</span>
            <ChevronDown size={14} className="animate-bounce" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
