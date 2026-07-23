"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/features/admin/page-header"
import { FormField, FormInput } from "@/features/admin/form-field"
import { getFirebaseClient } from "@/lib/firebase/config"
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"
import { Plus, Trash2 } from "lucide-react"

type LearningItem = {
  id: string
  topic: string
  reason: string
  progress: string
  resources: string
  startDate: string
  published: boolean
}

export default function AdminLearningPage() {
  const [items, setItems] = useState<LearningItem[]>([])
  const [newTopic, setNewTopic] = useState("")
  const [newReason, setNewReason] = useState("")

  useEffect(() => {
    async function load() {
      try {
        const { db } = getFirebaseClient()
        const snapshot = await getDocs(collection(db, "learning"))
        if (!snapshot.empty) {
          setItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as LearningItem)))
        }
      } catch {}
    }
    load()
  }, [])

  const handleAdd = async () => {
    if (!newTopic.trim()) return
    try {
      const { db } = getFirebaseClient()
      const docRef = await addDoc(collection(db, "learning"), {
        topic: newTopic,
        reason: newReason,
        progress: "",
        resources: "",
        startDate: "",
        published: false,
      })
      setItems((prev) => [...prev, { id: docRef.id, topic: newTopic, reason: newReason, progress: "", resources: "", startDate: "", published: false }])
      setNewTopic("")
      setNewReason("")
    } catch {}
  }

  const handleDelete = async (id: string) => {
    try {
      const { db } = getFirebaseClient()
      await deleteDoc(doc(db, "learning", id))
      setItems((prev) => prev.filter((i) => i.id !== id))
    } catch {}
  }

  return (
    <div className="p-6">
      <PageHeader title="Currently Learning" description="Track what you're learning and why." />

      <div className="mb-8 rounded-xl border border-border bg-surface p-6 max-w-xl">
        <div className="space-y-4">
          <FormField label="Topic">
            <FormInput value={newTopic} onChange={setNewTopic} placeholder="Advanced Flutter Patterns" />
          </FormField>
          <FormField label="Why I'm learning it">
            <FormInput value={newReason} onChange={setNewReason} multiline rows={2} />
          </FormField>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus size={16} />
            Add Topic
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium">{item.topic}</h3>
              {item.reason && <p className="text-sm text-muted-foreground">{item.reason}</p>}
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
