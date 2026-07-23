"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/features/admin/page-header"
import { useAdminAuth } from "@/lib/firebase/auth"
import { getFirebaseClient } from "@/lib/firebase/config"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"
import { projectsData as staticProjects } from "@/content/data/projects"
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react"

type ProjectItem = {
  id: string
  slug: string
  title: string
  description: string
  status: string
  featured: boolean
  published: boolean
}

export default function AdminProjectsPage() {
  useAdminAuth()
  const router = useRouter()
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const { db } = await getFirebaseClient()
        const snapshot = await getDocs(collection(db, "projects"))
        const items = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as ProjectItem[]
        setProjects(items)
      } catch {
        setProjects(
          staticProjects.map((p) => ({
            id: p.slug,
            slug: p.slug,
            title: p.title,
            description: p.description,
            status: "static",
            featured: p.featured,
            published: true,
          })),
        )
      }
      setLoaded(true)
    }
    load()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      const { db } = await getFirebaseClient()
      await deleteDoc(doc(db, "projects", id))
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch {}
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Projects"
        description="Manage your portfolio projects."
        action={
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Plus size={16} />
            New Project
          </Link>
        }
      />

      {!loaded ? (
        <div className="flex items-center justify-center p-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="space-y-3">
          {projects.length === 0 && (
            <div className="rounded-xl border border-border bg-surface p-8 text-center">
              <p className="text-sm text-muted-foreground">No projects yet. Create your first project.</p>
            </div>
          )}
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between rounded-xl border border-border bg-surface p-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium truncate">{project.title}</h3>
                  {project.featured && (
                    <span className="rounded-full bg-primary-muted px-2 py-0.5 text-[10px] font-medium text-primary">
                      Featured
                    </span>
                  )}
                  {!project.published && (
                    <span className="rounded-full bg-warning-muted px-2 py-0.5 text-[10px] font-medium text-warning">
                      Draft
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground truncate">
                  {project.description}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => router.push(`/admin/projects/${project.slug}`)}
                  className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => window.open(`/projects/${project.slug}`, "_blank")}
                  className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <ExternalLink size={14} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-error-muted hover:text-error"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
