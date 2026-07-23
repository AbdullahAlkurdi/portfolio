"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/features/admin/page-header"
import { FormField, FormInput } from "@/features/admin/form-field"
import { getFirebaseClient } from "@/lib/firebase/config"
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"
import { footerData } from "@/content/data/footer"
import { Plus, Trash2 } from "lucide-react"

type SocialLink = {
  id: string
  label: string
  href: string
  icon: string
  published: boolean
}

export default function AdminSocialPage() {
  const [items, setItems] = useState<SocialLink[]>([])
  const [newLabel, setNewLabel] = useState("")
  const [newHref, setNewHref] = useState("")
  const [newIcon, setNewIcon] = useState("github")

  useEffect(() => {
    async function load() {
      try {
        const { db } = getFirebaseClient()
        const snapshot = await getDocs(collection(db, "social"))
        if (!snapshot.empty) {
          setItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as SocialLink)))
        } else {
          setItems(footerData.social.map((s) => ({ id: s.label, label: s.label, href: s.href, icon: s.icon, published: true })))
        }
      } catch {}
    }
    load()
  }, [])

  const handleAdd = async () => {
    if (!newLabel.trim() || !newHref.trim()) return
    try {
      const { db } = getFirebaseClient()
      const docRef = await addDoc(collection(db, "social"), {
        label: newLabel,
        href: newHref,
        icon: newIcon,
        published: false,
      })
      setItems((prev) => [...prev, { id: docRef.id, label: newLabel, href: newHref, icon: newIcon, published: false }])
      setNewLabel("")
      setNewHref("")
    } catch {}
  }

  const handleDelete = async (id: string) => {
    try {
      const { db } = getFirebaseClient()
      await deleteDoc(doc(db, "social", id))
      setItems((prev) => prev.filter((i) => i.id !== id))
    } catch {}
  }

  return (
    <div className="p-6">
      <PageHeader title="Social Links" description="Manage social and contact links." />

      <div className="mb-8 rounded-xl border border-border bg-surface p-6 max-w-xl">
        <div className="space-y-4">
          <FormField label="Label">
            <FormInput value={newLabel} onChange={setNewLabel} placeholder="GitHub" />
          </FormField>
          <FormField label="URL">
            <FormInput value={newHref} onChange={setNewHref} placeholder="https://github.com/..." />
          </FormField>
          <FormField label="Icon">
            <select value={newIcon} onChange={(e) => setNewIcon(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
              <option value="github">GitHub</option>
              <option value="linkedin">LinkedIn</option>
              <option value="mail">Email</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="telegram">Telegram</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </FormField>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus size={16} />
            Add Link
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{item.label}</h3>
                <span className="text-xs text-muted-foreground">({item.icon})</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{item.href}</p>
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
