"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/features/admin/page-header"
import { FormField, FormInput } from "@/features/admin/form-field"
import { getFirebaseClient } from "@/lib/firebase/config"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { projectsData as staticProjects } from "@/content/data/projects"

type ProjectForm = {
  title: string
  slug: string
  description: string
  longDescription: string
  tags: string
  category: string
  status: string
  featured: boolean
  published: boolean
  github: string
  demo: string
  problem: string
  solution: string
  architecture: string
  keyFeatures: string
  challenges: string
  decisions: string
  results: string
  lessons: string
  timeline: string
}

const defaultForm: ProjectForm = {
  title: "",
  slug: "",
  description: "",
  longDescription: "",
  tags: "",
  category: "",
  status: "concept",
  featured: false,
  published: false,
  github: "",
  demo: "",
  problem: "",
  solution: "",
  architecture: "",
  keyFeatures: "",
  challenges: "",
  decisions: "",
  results: "",
  lessons: "",
  timeline: "",
}

export default function AdminEditProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const [form, setForm] = useState<ProjectForm>(defaultForm)
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function load() {
      const slug = params.slug
      try {
        const { db } = await getFirebaseClient()
        const docSnap = await getDoc(doc(db, "projects", slug))
        if (docSnap.exists()) {
          const data = docSnap.data() as ProjectForm
          setForm({ ...defaultForm, ...data })
        } else {
          const staticP = staticProjects.find((p) => p.slug === slug)
          if (staticP) {
            setForm({
              ...defaultForm,
              title: staticP.title,
              slug: staticP.slug,
              description: staticP.description,
              tags: staticP.tags.join(", "),
              category: staticP.category,
              featured: staticP.featured,
            })
          }
        }
      } catch {
        const staticP = staticProjects.find((p) => p.slug === slug)
        if (staticP) {
          setForm({
            ...defaultForm,
            title: staticP.title,
            slug: staticP.slug,
            description: staticP.description,
            tags: staticP.tags.join(", "),
            category: staticP.category,
            featured: staticP.featured,
          })
        }
      }
      setLoaded(true)
    }
    load()
  }, [params.slug])

  const update = (key: keyof ProjectForm) => (value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const slug = params.slug
      const { db } = await getFirebaseClient()
      await setDoc(doc(db, "projects", slug), {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        lastModified: new Date(),
      })
    } catch {}
    setSaving(false)
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <PageHeader
        title={form.title || "Edit Project"}
        description="Manage project details and case study content."
        action={
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        }
      />

      <div className="max-w-3xl space-y-6">
        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold mb-4">Basic Info</h2>
          <div className="space-y-4">
            <FormField label="Project Title">
              <FormInput value={form.title} onChange={update("title")} />
            </FormField>
            <FormField label="Slug">
              <FormInput value={form.slug} onChange={update("slug")} />
            </FormField>
            <FormField label="Short Description">
              <FormInput value={form.description} onChange={update("description")} multiline rows={2} />
            </FormField>
            <FormField label="Category">
              <FormInput value={form.category} onChange={update("category")} />
            </FormField>
            <FormField label="Tags (comma-separated)">
              <FormInput value={form.tags} onChange={update("tags")} placeholder="Flutter, Dart, Firebase" />
            </FormField>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => update("featured")(e.target.checked)}
                  className="rounded border-border"
                />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => update("published")(e.target.checked)}
                  className="rounded border-border"
                />
                Published
              </label>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold mb-4">Status & Links</h2>
          <div className="space-y-4">
            <FormField label="Project Status">
              <select
                value={form.status}
                onChange={(e) => update("status")(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="built-and-working">Built & Working</option>
                <option value="actively-developing">Actively Developing</option>
                <option value="prototype">Prototype</option>
                <option value="early-development">Early Development</option>
                <option value="concept">Concept</option>
                <option value="archived">Archived</option>
              </select>
            </FormField>
            <FormField label="GitHub URL">
              <FormInput value={form.github} onChange={update("github")} placeholder="https://github.com/..." />
            </FormField>
            <FormField label="Live Demo URL">
              <FormInput value={form.demo} onChange={update("demo")} placeholder="https://..." />
            </FormField>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold mb-4">Case Study Content</h2>
          <div className="space-y-4">
            <FormField label="Long Description">
              <FormInput value={form.longDescription} onChange={update("longDescription")} multiline rows={4} />
            </FormField>
            <FormField label="Problem">
              <FormInput value={form.problem} onChange={update("problem")} multiline rows={3} />
            </FormField>
            <FormField label="Solution">
              <FormInput value={form.solution} onChange={update("solution")} multiline rows={3} />
            </FormField>
            <FormField label="Architecture">
              <FormInput value={form.architecture} onChange={update("architecture")} multiline rows={3} />
            </FormField>
            <FormField label="Key Features">
              <FormInput value={form.keyFeatures} onChange={update("keyFeatures")} multiline rows={3} />
            </FormField>
            <FormField label="Engineering Challenges">
              <FormInput value={form.challenges} onChange={update("challenges")} multiline rows={3} />
            </FormField>
            <FormField label="Decisions & Tradeoffs">
              <FormInput value={form.decisions} onChange={update("decisions")} multiline rows={3} />
            </FormField>
            <FormField label="Results">
              <FormInput value={form.results} onChange={update("results")} multiline rows={3} />
            </FormField>
            <FormField label="Lessons Learned">
              <FormInput value={form.lessons} onChange={update("lessons")} multiline rows={3} />
            </FormField>
            <FormField label="Timeline">
              <FormInput value={form.timeline} onChange={update("timeline")} multiline rows={2} />
            </FormField>
          </div>
        </div>
      </div>
    </div>
  )
}
