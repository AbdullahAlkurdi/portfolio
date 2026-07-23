"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/features/admin/page-header"
import { FormField, FormInput } from "@/features/admin/form-field"
import { getFirebaseClient } from "@/lib/firebase/config"
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"
import { knowledgeDomains } from "@/content/data/knowledge-domains"
import { Plus, Trash2 } from "lucide-react"

type KnowledgeItem = {
  id: string
  name: string
  level: string
  description: string
  technologies: string
  evidence: string
  published: boolean
}

export default function AdminKnowledgePage() {
  const [items, setItems] = useState<KnowledgeItem[]>([])
  const [newName, setNewName] = useState("")
  const [newLevel, setNewLevel] = useState("Learning")

  useEffect(() => {
    async function load() {
      try {
        const { db } = getFirebaseClient()
        const snapshot = await getDocs(collection(db, "knowledge"))
        if (!snapshot.empty) {
          const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as KnowledgeItem))
          setItems(list)
        } else {
          setItems(
            knowledgeDomains.map((d) => ({
              id: d.name,
              name: d.name,
              level: d.level,
              description: d.description,
              technologies: d.technologies.join(", "),
              evidence: d.evidence.join(", "),
              published: true,
            })),
          )
        }
      } catch {}
    }
    load()
  }, [])

  const handleAdd = async () => {
    if (!newName.trim()) return
    try {
      const { db } = getFirebaseClient()
      const docRef = await addDoc(collection(db, "knowledge"), {
        name: newName,
        level: newLevel,
        description: "",
        technologies: "",
        evidence: "",
        published: false,
      })
      setItems((prev) => [...prev, { id: docRef.id, name: newName, level: newLevel, description: "", technologies: "", evidence: "", published: false }])
      setNewName("")
    } catch {}
  }

  const handleDelete = async (id: string) => {
    try {
      const { db } = getFirebaseClient()
      await deleteDoc(doc(db, "knowledge", id))
      setItems((prev) => prev.filter((i) => i.id !== id))
    } catch {}
  }

  return (
    <div className="p-6">
      <PageHeader title="Knowledge Base" description="Manage knowledge domains and expertise areas." />

      <div className="mb-8 rounded-xl border border-border bg-surface p-6 max-w-xl">
        <div className="space-y-4">
          <FormField label="Domain Name">
            <FormInput value={newName} onChange={setNewName} placeholder="Software Engineering" />
          </FormField>
          <FormField label="Level">
            <select
              value={newLevel}
              onChange={(e) => setNewLevel(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="Proficient">Proficient</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Developing">Developing</option>
              <option value="Learning">Learning</option>
              <option value="Exploring">Exploring</option>
            </select>
          </FormField>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus size={16} />
            Add Domain
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{item.name}</h3>
                <span className="rounded-full bg-primary-muted px-2 py-0.5 text-[10px] font-medium text-primary">{item.level}</span>
              </div>
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
