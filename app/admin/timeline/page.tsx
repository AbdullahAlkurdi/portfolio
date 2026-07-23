"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/features/admin/page-header"
import { FormField, FormInput } from "@/features/admin/form-field"
import { getFirebaseClient } from "@/lib/firebase/config"
import { collection, getDocs, addDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore"
import { Plus, Trash2 } from "lucide-react"

type TimelineEvent = {
  id: string
  year: string
  title: string
  description: string
  order: number
  published: boolean
}

export default function AdminTimelinePage() {
  const [items, setItems] = useState<TimelineEvent[]>([])
  const [newYear, setNewYear] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")

  useEffect(() => {
    async function load() {
      try {
        const { db } = await getFirebaseClient()
        const q = query(collection(db, "timeline"), orderBy("order", "asc"))
        const snapshot = await getDocs(q)
        setItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as TimelineEvent)))
      } catch {}
    }
    load()
  }, [])

  const handleAdd = async () => {
    if (!newTitle.trim() || !newYear.trim()) return
    try {
      const { db } = await getFirebaseClient()
      const docRef = await addDoc(collection(db, "timeline"), {
        year: newYear,
        title: newTitle,
        description: newDescription,
        order: items.length,
        published: false,
      })
      setItems((prev) => [...prev, { id: docRef.id, year: newYear, title: newTitle, description: newDescription, order: items.length, published: false }])
      setNewYear("")
      setNewTitle("")
      setNewDescription("")
    } catch {}
  }

  const handleDelete = async (id: string) => {
    try {
      const { db } = await getFirebaseClient()
      await deleteDoc(doc(db, "timeline", id))
      setItems((prev) => prev.filter((i) => i.id !== id))
    } catch {}
  }

  return (
    <div className="p-6">
      <PageHeader title="Career Timeline" description="Manage career timeline events." />

      <div className="mb-8 rounded-xl border border-border bg-surface p-6 max-w-xl">
        <div className="space-y-4">
          <FormField label="Year">
            <FormInput value={newYear} onChange={setNewYear} placeholder="2022" />
          </FormField>
          <FormField label="Title">
            <FormInput value={newTitle} onChange={setNewTitle} placeholder="Started IT Support Work" />
          </FormField>
          <FormField label="Description">
            <FormInput value={newDescription} onChange={setNewDescription} multiline rows={2} />
          </FormField>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus size={16} />
            Add Event
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-primary">{item.year}</span>
                <h3 className="font-medium">{item.title}</h3>
              </div>
              {item.description && <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>}
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
