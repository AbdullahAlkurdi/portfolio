"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getFirebaseClient } from "@/lib/firebase/config"
import { projectsData as staticProjects } from "@/content/data/projects"
import { resumeData as staticResume } from "@/content/data/resume"
import { knowledgeDomains as staticKnowledge } from "@/content/data/knowledge-domains"
import { footerData as staticFooter } from "@/content/data/footer"
import type { ProjectFrontmatter, ResumeContact, ResumeSkillCategory, ResumeData, FooterContent } from "@/types/content"
import type { KnowledgeDomain } from "@/content/data/knowledge-domains"

function toStrArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === "string")
  if (typeof v === "string") return v.split(/[,;]\s*/).filter(Boolean)
  return []
}

const identityContactMap: Record<string, (v: string) => { label: string; href: string } | null> = {
  email: (v) => v ? { label: "Email", href: `mailto:${v}` } : null,
  phone: (v) => v ? { label: "Phone", href: `tel:${v}` } : null,
  whatsapp: (v) => v ? { label: "WhatsApp", href: v } : null,
  github: (v) => v ? { label: "GitHub", href: v } : null,
  linkedin: (v) => v ? { label: "LinkedIn", href: v } : null,
  instagram: (v) => v ? { label: "Instagram", href: v } : null,
  facebook: (v) => v ? { label: "Facebook", href: v } : null,
  telegram: (v) => v ? { label: "Telegram", href: v } : null,
}

function buildContact(
  identityContactFields: Record<string, string>,
  socialDocs: { label: string; href: string }[],
  staticFallback: ResumeContact[],
): ResumeContact[] {
  const fromIdentity = Object.entries(identityContactMap)
    .map(([key, fn]) => fn(identityContactFields[key] ?? ""))
    .filter((x): x is ResumeContact => x !== null)
  const fromSocial = socialDocs.map((d) => ({ label: d.label, href: d.href }))
  const merged = [...fromIdentity, ...fromSocial]
  if (merged.length === 0 && staticFallback.length > 0) return staticFallback
  return merged
}

export type ContentData = {
  projects: ProjectFrontmatter[]
  resume: ResumeData
  knowledgeDomains: KnowledgeDomain[]
  footer: FooterContent
  loaded: boolean
  error: string | null
}

const defaultContent: ContentData = {
  projects: staticProjects,
  resume: staticResume,
  knowledgeDomains: staticKnowledge,
  footer: staticFooter,
  loaded: false,
  error: null,
}

const ContentContext = createContext<ContentData>(defaultContent)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentData>(defaultContent)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [{ db }, { collection, getDocs, doc, getDoc }] = await Promise.all([
          getFirebaseClient(),
          import("firebase/firestore"),
        ])

        const merged: ContentData = {
          ...defaultContent,
          loaded: true,
          error: null,
        }

        const projectsSnap = await getDocs(collection(db, "projects"))
        if (!projectsSnap.empty) {
          const firestoreProjects: ProjectFrontmatter[] = []
          projectsSnap.forEach((d) => {
            const data = d.data()
            if (data.published !== false) {
              firestoreProjects.push({
                slug: data.slug ?? d.id,
                title: data.title ?? "",
                description: data.description ?? "",
                tags: data.tags ?? [],
                category: data.category ?? "",
                featured: data.featured ?? false,
                date: data.date ?? "",
                readingTime: data.readingTime ?? "",
                github: data.github,
                demo: data.demo,
                image: data.image,
                longDescription: data.longDescription,
                problem: data.problem,
                solution: data.solution,
                architecture: data.architecture,
                keyFeatures: data.keyFeatures,
                challenges: data.challenges,
                decisions: data.decisions,
                results: data.results,
                lessons: data.lessons,
                timeline: data.timeline,
              })
            }
          })
          if (firestoreProjects.length > 0) {
            merged.projects = firestoreProjects
          }
        }

        const identitySnap = await getDoc(doc(db, "identity", "main"))
        let identityFields: Record<string, string> = {}
        if (identitySnap.exists()) {
          const data = identitySnap.data()
          identityFields = {
            email: (data.email as string) ?? "",
            phone: (data.phone as string) ?? "",
            whatsapp: (data.whatsapp as string) ?? "",
            github: (data.github as string) ?? "",
            linkedin: (data.linkedin as string) ?? "",
            instagram: (data.instagram as string) ?? "",
            facebook: (data.facebook as string) ?? "",
            telegram: (data.telegram as string) ?? "",
          }
          merged.resume = {
            ...staticResume,
            name: data.fullName ?? staticResume.name,
            title: data.title ?? staticResume.title,
            tagline: data.headline ?? staticResume.tagline,
            location: data.location ?? staticResume.location,
            summary: data.summary ?? staticResume.summary,
          }
        }

        const socialSnap = await getDocs(collection(db, "social"))
        const socialItems = socialSnap.docs
          .map((d) => d.data())
          .filter((d: Record<string, unknown>) => d.published !== false)
          .map((d: Record<string, unknown>) => ({
            label: (d.label as string) ?? "",
            href: (d.href as string) ?? "",
          }))
          .filter((d) => d.label && d.href)

        merged.resume.contact = buildContact(identityFields, socialItems, staticResume.contact)

        const skillsSnap = await getDocs(collection(db, "skills"))
        if (!skillsSnap.empty) {
          const items = skillsSnap.docs
            .map((d) => d.data())
            .filter((d: Record<string, unknown>) => d.published !== false)
          if (items.length > 0) {
            const categories: ResumeSkillCategory[] = items.map((d: Record<string, unknown>) => ({
              category: (d.category as string) ?? "",
              skills: toStrArray(d.skills),
            })).filter((c) => c.category)
            if (categories.length > 0) {
              merged.resume.skillCategories = categories
            }
          }
        }

        const experienceSnap = await getDocs(collection(db, "experience"))
        if (!experienceSnap.empty) {
          const items = experienceSnap.docs
            .map((d) => d.data())
            .filter((d: Record<string, unknown>) => d.published !== false)
          if (items.length > 0) {
            merged.resume = {
              ...merged.resume,
              experience: items.map((d: Record<string, unknown>) => ({
                role: (d.role as string) ?? "",
                organization: (d.organization as string) ?? "",
                location: (d.location as string) ?? "",
                startDate: (d.startDate as string) ?? "",
                endDate: (d.endDate as string) ?? "",
                description: (d.description as string) ?? "",
                achievements: ((d.achievements as string) ?? "").split("\n").filter(Boolean),
                technologies: toStrArray(d.technologies),
              })),
            }
          }
        }

        const educationSnap = await getDocs(collection(db, "education"))
        if (!educationSnap.empty) {
          const items = educationSnap.docs
            .map((d) => d.data())
            .filter((d: Record<string, unknown>) => d.published !== false)
          if (items.length > 0) {
            merged.resume = {
              ...merged.resume,
              education: items.map((d: Record<string, unknown>) => ({
                degree: (d.degree as string) ?? "",
                institution: (d.institution as string) ?? "",
                location: (d.location as string) ?? "",
                startDate: d.startDate as string | undefined,
                endDate: d.endDate as string | undefined,
                description: d.description as string | undefined,
              })),
            }
          }
        }

        const certificationsSnap = await getDocs(collection(db, "certifications"))
        if (!certificationsSnap.empty) {
          const items = certificationsSnap.docs
            .map((d) => d.data())
            .filter((d: Record<string, unknown>) => d.published !== false)
          if (items.length > 0) {
            merged.resume = {
              ...merged.resume,
              certifications: items.map((d: Record<string, unknown>) => ({
                name: (d.name as string) ?? "",
                issuer: (d.issuer as string) ?? "",
                date: d.date as string | undefined,
                url: d.url as string | undefined,
              })),
            }
          }
        }

        const coursesSnap = await getDocs(collection(db, "courses"))
        if (!coursesSnap.empty) {
          const items = coursesSnap.docs
            .map((d) => d.data())
            .filter((d: Record<string, unknown>) => d.published !== false)
          if (items.length > 0) {
            merged.resume = {
              ...merged.resume,
              courses: items.map((d: Record<string, unknown>) => ({
                name: (d.name as string) ?? "",
                issuer: (d.issuer as string) ?? "",
              })),
            }
          }
        }

        const knowledgeSnap = await getDocs(collection(db, "knowledge"))
        if (!knowledgeSnap.empty) {
          const items = knowledgeSnap.docs
            .map((d) => d.data())
            .filter((d: Record<string, unknown>) => d.published !== false)
          if (items.length > 0) {
            merged.knowledgeDomains = items.map((d: Record<string, unknown>) => ({
              name: (d.name as string) ?? "",
              nameAr: (d.nameAr as string) ?? "",
              level: (d.level as "Proficient" | "Intermediate" | "Developing" | "Learning" | "Exploring") ?? "Learning",
              description: (d.description as string) ?? "",
              descriptionAr: (d.descriptionAr as string) ?? "",
              icon: (d.icon as string) ?? "",
              technologies: toStrArray(d.technologies),
              evidence: toStrArray(d.evidence),
            }))
          }
        }

        if (!cancelled) setContent(merged)
      } catch {
        if (!cancelled) {
          setContent({ ...defaultContent, loaded: true, error: null })
        }
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent(): ContentData {
  return useContext(ContentContext)
}
