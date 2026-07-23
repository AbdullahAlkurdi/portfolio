"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/features/admin/page-header"
import { FormField, FormInput } from "@/features/admin/form-field"
import { getFirebaseClient } from "@/lib/firebase/config"
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"
import { resumeData } from "@/content/data/resume"
import { Plus, Trash2 } from "lucide-react"

type EducationItem = {
  id: string
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  description: string
  published: boolean
}

export default function AdminEducationPage() {
  const [items, setItems] = useState<EducationItem[]>([])
  const [newDegree, setNewDegree] = useState("")
  const [newInstitution, setNewInstitution] = useState("")

  useEffect(() => {
    async function load() {
      try {
        const { db } = await getFirebaseClient()
        const snapshot = await getDocs(collection(db, "education"))
        if (!snapshot.empty) {
          const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as EducationItem))
          setItems(list)
        } else {
          setItems(
            resumeData.education.map((e) => ({
              id: e.degree + e.institution,
              degree: e.degree,
              institution: e.institution,
              location: e.location ?? "",
              startDate: e.startDate ?? "",
              endDate: e.endDate ?? "",
              description: e.description ?? "",
              published: true,
            })),
          )
        }
      } catch {}
    }
    load()
  }, [])

  const handleAdd = async () => {
    if (!newDegree.trim() || !newInstitution.trim()) return
    try {
      const { db } = await getFirebaseClient()
      const docRef = await addDoc(collection(db, "education"), {
        degree: newDegree,
        institution: newInstitution,
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        published: false,
      })
      setItems((prev) => [...prev, { id: docRef.id, degree: newDegree, institution: newInstitution, location: "", startDate: "", endDate: "", description: "", published: false }])
      setNewDegree("")
      setNewInstitution("")
    } catch {}
  }

  const handleDelete = async (id: string) => {
    try {
      const { db } = await getFirebaseClient()
      await deleteDoc(doc(db, "education", id))
      setItems((prev) => prev.filter((i) => i.id !== id))
    } catch {}
  }

  return (
    <div className="p-6">
      <PageHeader title="Education" description="Manage education entries." />

      <div className="mb-8 rounded-xl border border-border bg-surface p-6 max-w-xl">
        <div className="space-y-4">
          <FormField label="Degree">
            <FormInput value={newDegree} onChange={setNewDegree} placeholder="Bachelor's in Information Technology" />
          </FormField>
          <FormField label="Institution">
            <FormInput value={newInstitution} onChange={setNewInstitution} placeholder="University" />
          </FormField>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus size={16} />
            Add Education
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium">{item.degree}</h3>
              <p className="text-sm text-muted-foreground">{item.institution}</p>
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
