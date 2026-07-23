"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/features/admin/page-header"
import { FormField, FormInput } from "@/features/admin/form-field"
import { getFirebaseClient } from "@/lib/firebase/config"
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"
import { resumeData } from "@/content/data/resume"
import { Plus, Trash2 } from "lucide-react"

type CertificationItem = {
  id: string
  name: string
  issuer: string
  date: string
  url: string
  credentialId: string
  published: boolean
}

export default function AdminCertificationsPage() {
  const [items, setItems] = useState<CertificationItem[]>([])
  const [newName, setNewName] = useState("")
  const [newIssuer, setNewIssuer] = useState("")

  useEffect(() => {
    async function load() {
      try {
        const { db } = getFirebaseClient()
        const snapshot = await getDocs(collection(db, "certifications"))
        if (!snapshot.empty) {
          const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as CertificationItem))
          setItems(list)
        } else {
          setItems(
            resumeData.certifications.map((c) => ({
              id: c.name,
              name: c.name,
              issuer: c.issuer,
              date: c.date ?? "",
              url: c.url ?? "",
              credentialId: "",
              published: true,
            })),
          )
        }
      } catch {}
    }
    load()
  }, [])

  const handleAdd = async () => {
    if (!newName.trim() || !newIssuer.trim()) return
    try {
      const { db } = getFirebaseClient()
      const docRef = await addDoc(collection(db, "certifications"), {
        name: newName,
        issuer: newIssuer,
        date: "",
        url: "",
        credentialId: "",
        published: false,
      })
      setItems((prev) => [...prev, { id: docRef.id, name: newName, issuer: newIssuer, date: "", url: "", credentialId: "", published: false }])
      setNewName("")
      setNewIssuer("")
    } catch {}
  }

  const handleDelete = async (id: string) => {
    try {
      const { db } = getFirebaseClient()
      await deleteDoc(doc(db, "certifications", id))
      setItems((prev) => prev.filter((i) => i.id !== id))
    } catch {}
  }

  return (
    <div className="p-6">
      <PageHeader title="Certifications" description="Manage certifications with dates and credential URLs." />

      <div className="mb-8 rounded-xl border border-border bg-surface p-6 max-w-xl">
        <div className="space-y-4">
          <FormField label="Certification Name">
            <FormInput value={newName} onChange={setNewName} placeholder="CCNA" />
          </FormField>
          <FormField label="Issuing Organization">
            <FormInput value={newIssuer} onChange={setNewIssuer} placeholder="Cisco" />
          </FormField>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus size={16} />
            Add Certification
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.issuer}</p>
              {item.date && <p className="text-xs text-muted-foreground">{item.date}</p>}
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
