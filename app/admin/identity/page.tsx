"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/features/admin/page-header"
import { FormField, FormInput } from "@/features/admin/form-field"
import { useAdminAuth } from "@/lib/firebase/auth"
import { getFirebaseClient } from "@/lib/firebase/config"
import { doc, getDoc, setDoc } from "firebase/firestore"

type IdentityData = {
  fullName: string
  title: string
  headline: string
  summary: string
  location: string
  availability: string
  email: string
  phone: string
  whatsapp: string
  github: string
  linkedin: string
  instagram: string
  facebook: string
  telegram: string
  published: boolean
}

const defaultIdentity: IdentityData = {
  fullName: "",
  title: "",
  headline: "",
  summary: "",
  location: "",
  availability: "",
  email: "",
  phone: "",
  whatsapp: "",
  github: "",
  linkedin: "",
  instagram: "",
  facebook: "",
  telegram: "",
  published: false,
}

export default function AdminIdentityPage() {
  useAdminAuth()
  const [data, setData] = useState<IdentityData>(defaultIdentity)
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const { db } = getFirebaseClient()
        const docSnap = await getDoc(doc(db, "identity", "main"))
        if (docSnap.exists()) {
          setData({ ...defaultIdentity, ...docSnap.data() } as IdentityData)
        }
      } catch {}
      setLoaded(true)
    }
    load()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const { db } = getFirebaseClient()
      await setDoc(doc(db, "identity", "main"), { ...data, lastModified: new Date() })
    } catch {}
    setSaving(false)
  }

  const update = (key: keyof IdentityData) => (value: string) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Personal Identity"
        description="Manage your personal information and social links."
        action={
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        }
      />

      <div className="max-w-2xl space-y-6">
        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="space-y-4">
            <FormField label="Full Name">
              <FormInput value={data.fullName} onChange={update("fullName")} placeholder="Abdullah Alkurdi" />
            </FormField>
            <FormField label="Professional Title">
              <FormInput value={data.title} onChange={update("title")} placeholder="IT Specialist & Software Engineer" />
            </FormField>
            <FormField label="Short Headline">
              <FormInput value={data.headline} onChange={update("headline")} placeholder="Software Development · IT Support · Networking" />
            </FormField>
            <FormField label="Professional Summary">
              <FormInput value={data.summary} onChange={update("summary")} multiline rows={4} />
            </FormField>
            <FormField label="Location">
              <FormInput value={data.location} onChange={update("location")} placeholder="Makkah, Saudi Arabia" />
            </FormField>
            <FormField label="Availability">
              <FormInput value={data.availability} onChange={update("availability")} placeholder="Open to opportunities" />
            </FormField>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold mb-4">Contact & Social</h2>
          <div className="space-y-4">
            <FormField label="Email">
              <FormInput value={data.email} onChange={update("email")} type="email" placeholder="abdullah.h.alkurdi@gmail.com" />
            </FormField>
            <FormField label="Phone">
              <FormInput value={data.phone} onChange={update("phone")} placeholder="+966511792943" />
            </FormField>
            <FormField label="WhatsApp">
              <FormInput value={data.whatsapp} onChange={update("whatsapp")} placeholder="https://wa.me/..." />
            </FormField>
            <FormField label="GitHub">
              <FormInput value={data.github} onChange={update("github")} placeholder="https://github.com/AbdullahAlkurdi" />
            </FormField>
            <FormField label="LinkedIn">
              <FormInput value={data.linkedin} onChange={update("linkedin")} placeholder="https://linkedin.com/in/..." />
            </FormField>
            <FormField label="Instagram">
              <FormInput value={data.instagram} onChange={update("instagram")} />
            </FormField>
            <FormField label="Facebook">
              <FormInput value={data.facebook} onChange={update("facebook")} />
            </FormField>
            <FormField label="Telegram">
              <FormInput value={data.telegram} onChange={update("telegram")} />
            </FormField>
          </div>
        </div>
      </div>
    </div>
  )
}
