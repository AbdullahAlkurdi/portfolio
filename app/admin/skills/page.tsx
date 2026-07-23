"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/features/admin/page-header"
import { FormField, FormInput } from "@/features/admin/form-field"
import { getFirebaseClient } from "@/lib/firebase/config"
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"
import { resumeData } from "@/content/data/resume"
import { Plus, Trash2 } from "lucide-react"

type SkillCategory = {
  id: string
  category: string
  skills: string
  published: boolean
}

export default function AdminSkillsPage() {
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [newCategory, setNewCategory] = useState("")
  const [newSkills, setNewSkills] = useState("")

  useEffect(() => {
    async function load() {
      try {
        const { db } = await getFirebaseClient()
        const snapshot = await getDocs(collection(db, "skills"))
        if (!snapshot.empty) {
          const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as SkillCategory))
          setCategories(list)
        } else {
          setCategories(
            resumeData.skillCategories.map((c) => ({
              id: c.category,
              category: c.category,
              skills: c.skills.join(", "),
              published: true,
            })),
          )
        }
      } catch {}
    }
    load()
  }, [])

  const handleAdd = async () => {
    if (!newCategory.trim()) return
    try {
      const { db } = await getFirebaseClient()
      const docRef = await addDoc(collection(db, "skills"), {
        category: newCategory,
        skills: newSkills,
        published: false,
      })
      setCategories((prev) => [...prev, { id: docRef.id, category: newCategory, skills: newSkills, published: false }])
      setNewCategory("")
      setNewSkills("")
    } catch {}
  }

  const handleDelete = async (id: string) => {
    try {
      const { db } = await getFirebaseClient()
      await deleteDoc(doc(db, "skills", id))
      setCategories((prev) => prev.filter((c) => c.id !== id))
    } catch {}
  }

  return (
    <div className="p-6">
      <PageHeader title="Skills" description="Manage technical skill categories." />

      <div className="mb-8 rounded-xl border border-border bg-surface p-6 max-w-xl">
        <h2 className="text-lg font-semibold mb-4">Add Category</h2>
        <div className="space-y-4">
          <FormField label="Category Name">
            <FormInput value={newCategory} onChange={setNewCategory} placeholder="Programming Languages" />
          </FormField>
          <FormField label="Skills (comma-separated)">
            <FormInput value={newSkills} onChange={setNewSkills} placeholder="Python, Java, Dart" multiline rows={2} />
          </FormField>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus size={16} />
            Add Category
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium">{cat.category}</h3>
              <p className="text-sm text-muted-foreground">{cat.skills}</p>
            </div>
            <button
              onClick={() => handleDelete(cat.id)}
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
