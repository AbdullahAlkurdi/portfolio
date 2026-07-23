"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/features/admin/page-header"
import { FormField, FormInput } from "@/features/admin/form-field"
import { getFirebaseClient } from "@/lib/firebase/config"
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"
import { resumeData } from "@/content/data/resume"
import { Plus, Trash2 } from "lucide-react"

type ExperienceItem = {
  id: string
  role: string
  organization: string
  location: string
  startDate: string
  endDate: string
  description: string
  achievements: string
  technologies: string
  published: boolean
}

export default function AdminExperiencePage() {
  const [items, setItems] = useState<ExperienceItem[]>([])
  const [newRole, setNewRole] = useState("")
  const [newOrg, setNewOrg] = useState("")

  useEffect(() => {
    async function load() {
      try {
        const { db } = getFirebaseClient()
        const snapshot = await getDocs(collection(db, "experience"))
        if (!snapshot.empty) {
          const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ExperienceItem))
          setItems(list)
        } else {
          setItems(
            resumeData.experience.map((e) => ({
              id: e.role + e.organization,
              role: e.role,
              organization: e.organization,
              location: e.location,
              startDate: e.startDate,
              endDate: e.endDate,
              description: e.description,
              achievements: e.achievements.join("\n"),
              technologies: e.technologies?.join(", ") ?? "",
              published: true,
            })),
          )
        }
      } catch {}
    }
    load()
  }, [])

  const handleAdd = async () => {
    if (!newRole.trim() || !newOrg.trim()) return
    try {
      const { db } = getFirebaseClient()
      const docRef = await addDoc(collection(db, "experience"), {
        role: newRole,
        organization: newOrg,
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        achievements: "",
        technologies: "",
        published: false,
      })
      setItems((prev) => [...prev, { id: docRef.id, role: newRole, organization: newOrg, location: "", startDate: "", endDate: "", description: "", achievements: "", technologies: "", published: false }])
      setNewRole("")
      setNewOrg("")
    } catch {}
  }

  const handleDelete = async (id: string) => {
    try {
      const { db } = getFirebaseClient()
      await deleteDoc(doc(db, "experience", id))
      setItems((prev) => prev.filter((i) => i.id !== id))
    } catch {}
  }

  return (
    <div className="p-6">
      <PageHeader title="Experience" description="Manage professional experience entries." />

      <div className="mb-8 rounded-xl border border-border bg-surface p-6 max-w-xl">
        <div className="space-y-4">
          <FormField label="Role">
            <FormInput value={newRole} onChange={setNewRole} placeholder="Software Engineer" />
          </FormField>
          <FormField label="Organization">
            <FormInput value={newOrg} onChange={setNewOrg} placeholder="Company Name" />
          </FormField>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus size={16} />
            Add Experience
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium">{item.role}</h3>
              <p className="text-sm text-muted-foreground">{item.organization}</p>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-error-muted hover:text-error ml-4"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
