"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/features/admin/page-header"
import { FormField, FormInput } from "@/features/admin/form-field"
import { getFirebaseClient } from "@/lib/firebase/config"
import { doc, setDoc } from "firebase/firestore"

export default function AdminNewProjectPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!slug.trim()) return
    setSaving(true)
    try {
      const { db } = getFirebaseClient()
      await setDoc(doc(db, "projects", slug), {
        title,
        slug,
        description,
        tags: [],
        category: "",
        status: "concept",
        featured: false,
        published: false,
        github: "",
        demo: "",
        created: new Date(),
        lastModified: new Date(),
      })
      router.push(`/admin/projects/${slug}`)
    } catch {}
    setSaving(false)
  }

  return (
    <div className="p-6">
      <PageHeader
        title="New Project"
        description="Create a new project entry."
        action={
          <button
            onClick={handleSave}
            disabled={saving || !slug.trim()}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Creating..." : "Create Project"}
          </button>
        }
      />

      <div className="max-w-xl space-y-4">
        <FormField label="Project Title">
          <FormInput
            value={title}
            onChange={(v) => {
              setTitle(v)
              if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")) {
                setSlug(v.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, ""))
              }
            }}
          />
        </FormField>
        <FormField label="Slug">
          <FormInput value={slug} onChange={setSlug} placeholder="my-project-slug" />
        </FormField>
        <FormField label="Short Description">
          <FormInput value={description} onChange={setDescription} multiline rows={2} />
        </FormField>
      </div>
    </div>
  )
}
