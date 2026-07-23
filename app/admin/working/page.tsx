"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/features/admin/page-header"
import { FormField, FormInput } from "@/features/admin/form-field"
import { getFirebaseClient } from "@/lib/firebase/config"
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { Plus, Trash2, GripVertical } from "lucide-react"

type WorkingItem = {
  id: string
  name: string
  description: string
  phase: string
  whatBuilding: string
  technologies: string
  lastUpdated: string
  status: "active" | "paused" | "planning"
  order: number
  published: boolean
}

export default function AdminWorkingPage() {
  const [items, setItems] = useState<WorkingItem[]>([])
  const [loaded, setLoaded] = useState(false)
  const [newName, setNewName] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newPhase, setNewPhase] = useState("")
  const [newStatus, setNewStatus] = useState<"active" | "paused" | "planning">("active")

  useEffect(() => {
    async function load() {
      try {
        const { db } = await getFirebaseClient()
        const snapshot = await getDocs(collection(db, "working"))
        const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as WorkingItem))
        setItems(list.sort((a, b) => a.order - b.order))
      } catch {}
      setLoaded(true)
    }
    load()
  }, [])

  const handleAdd = async () => {
    if (!newName.trim()) return
    try {
      const { db } = await getFirebaseClient()
      const docRef = await addDoc(collection(db, "working"), {
        name: newName,
        description: newDescription,
        phase: newPhase,
        whatBuilding: "",
        technologies: "",
        lastUpdated: new Date().toISOString().split("T")[0],
        status: newStatus,
        order: items.length,
        published: false,
      })
      setItems((prev) => [
        ...prev,
        {
          id: docRef.id,
          name: newName,
          description: newDescription,
          phase: newPhase,
          whatBuilding: "",
          technologies: "",
          lastUpdated: new Date().toISOString().split("T")[0],
          status: newStatus,
          order: items.length,
          published: false,
        },
      ])
      setNewName("")
      setNewDescription("")
      setNewPhase("")
    } catch {}
  }

  const handleDelete = async (id: string) => {
    try {
      const { db } = await getFirebaseClient()
      await deleteDoc(doc(db, "working", id))
      setItems((prev) => prev.filter((i) => i.id !== id))
    } catch {}
  }

  const handleToggle = async (id: string, published: boolean) => {
    try {
      const { db } = await getFirebaseClient()
      await updateDoc(doc(db, "working", id), { published })
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, published } : i)))
    } catch {}
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Currently Working On"
        description="Manage what you're currently building."
      />

      <div className="mb-8 rounded-xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold mb-4">Add New Item</h2>
        <div className="space-y-4 max-w-xl">
          <FormField label="Project Name">
            <FormInput value={newName} onChange={setNewName} placeholder="Project Name" />
          </FormField>
          <FormField label="Description">
            <FormInput value={newDescription} onChange={setNewDescription} multiline rows={2} />
          </FormField>
          <FormField label="Phase">
            <FormInput value={newPhase} onChange={setNewPhase} placeholder="Development, Planning, etc." />
          </FormField>
          <FormField label="Status">
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as typeof newStatus)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="active">Active Development</option>
              <option value="paused">Paused</option>
              <option value="planning">Planning</option>
            </select>
          </FormField>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus size={16} />
            Add Item
          </button>
        </div>
      </div>

      {!loaded ? (
        <div className="flex justify-center p-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="space-y-3">
          {items.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              No items yet. Add your first project above.
            </p>
          )}
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-border bg-surface p-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <GripVertical size={14} className="text-muted-foreground" />
                  <h3 className="font-medium">{item.name}</h3>
                  {item.published ? (
                    <span className="rounded-full bg-success-muted px-2 py-0.5 text-[10px] font-medium text-success">
                      Published
                    </span>
                  ) : (
                    <span className="rounded-full bg-warning-muted px-2 py-0.5 text-[10px] font-medium text-warning">
                      Draft
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="mt-0.5 text-sm text-muted-foreground truncate">
                    {item.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => handleToggle(item.id, !item.published)}
                  className="rounded-lg border border-border px-3 py-1 text-xs font-medium transition-colors hover:bg-muted"
                >
                  {item.published ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
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
