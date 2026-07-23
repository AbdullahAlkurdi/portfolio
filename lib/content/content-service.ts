import { projectsData as staticProjects } from "@/content/data/projects"
import { resumeData as staticResume } from "@/content/data/resume"
import { knowledgeDomains as staticKnowledge } from "@/content/data/knowledge-domains"
import { getSiteContent as getStaticContent } from "@/content/data/content"
import type { Locale } from "@/lib/locale-context"

type PublishStatus = {
  publishedAt: string | null
  lastModified: string | null
  publishedBy: string | null
}

async function getDb() {
  try {
    const mod = await import("@/lib/firebase/admin")
    return await mod.getAdminDb()
  } catch {
    return null
  }
}

export async function getPublishStatus(): Promise<PublishStatus> {
  const db = await getDb()
  if (!db) return { publishedAt: null, lastModified: null, publishedBy: null }
  try {
    const doc = await db.collection("site").doc("publishing").get()
    if (!doc.exists) return { publishedAt: null, lastModified: null, publishedBy: null }
    const data = doc.data()
    return {
      publishedAt: data?.publishedAt?.toDate()?.toISOString() ?? null,
      lastModified: data?.lastModified?.toDate()?.toISOString() ?? null,
      publishedBy: data?.publishedBy ?? null,
    }
  } catch {
    return { publishedAt: null, lastModified: null, publishedBy: null }
  }
}

export async function getPublishedProjects() {
  const db = await getDb()
  if (!db) return staticProjects
  try {
    const snapshot = await db
      .collection("projects")
      .where("published", "==", true)
      .get()
    if (snapshot.empty) return staticProjects
    return snapshot.docs.map((doc: { id: string; data: () => Record<string, unknown> }) => {
      const data = doc.data()
      return {
        slug: doc.id,
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
      }
    })
  } catch {
    return staticProjects
  }
}

export async function getPublishedProject(slug: string) {
  const db = await getDb()
  if (!db) return staticProjects.find((p) => p.slug === slug) ?? null
  try {
    const doc = await db.collection("projects").doc(slug).get()
    if (!doc.exists) return staticProjects.find((p) => p.slug === slug) ?? null
    const data = doc.data()
    if (!data?.published) return staticProjects.find((p) => p.slug === slug) ?? null
    return { ...data, slug: doc.id }
  } catch {
    return staticProjects.find((p) => p.slug === slug) ?? null
  }
}

export async function getPublishedContent(locale: Locale) {
  return getStaticContent(locale)
}

export async function getPublishedIdentity() {
  return null
}

export async function getPublishedWorkingItems() {
  return null
}

export async function getPublishedKnowledgeDomains() {
  return staticKnowledge
}

export async function getPublishedResume() {
  return staticResume
}
