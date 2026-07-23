"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAdminAuth } from "@/lib/firebase/auth"
import { useLocale } from "@/lib/locale-context"
import { getSiteContent } from "@/content/data/content"
import {
  User,
  FolderKanban,
  Briefcase,
  Wrench,
  BookOpen,
  Award,
  CalendarDays,
  Image as ImageIcon,
} from "lucide-react"

type PublishStatus = {
  publishedAt: string | null
  lastModified: string | null
  publishedBy: string | null
}

type ContentItem = {
  key: string
  href: string
  icon: React.ReactNode
  status: "complete" | "incomplete" | "pending"
}

export default function AdminDashboard() {
  const { user } = useAdminAuth()
  const { locale } = useLocale()
  const adminContent = getSiteContent(locale).admin
  const dash = adminContent.dashboard
  const [publishStatus, setPublishStatus] = useState<PublishStatus | null>(null)

  useEffect(() => {
    fetch("/api/publish")
      .then((r) => r.json())
      .then((data) => setPublishStatus(data.status))
      .catch(() => {})
  }, [])

  const contentItems: ContentItem[] = [
    { key: "identity", href: "/admin/identity", icon: <User size={18} />, status: "incomplete" },
    { key: "projects", href: "/admin/projects", icon: <FolderKanban size={18} />, status: "incomplete" },
    { key: "workingOn", href: "/admin/working", icon: <Briefcase size={18} />, status: "incomplete" },
    { key: "skills", href: "/admin/skills", icon: <Wrench size={18} />, status: "incomplete" },
    { key: "knowledgeBase", href: "/admin/knowledge", icon: <BookOpen size={18} />, status: "incomplete" },
    { key: "certifications", href: "/admin/certifications", icon: <Award size={18} />, status: "incomplete" },
    { key: "timeline", href: "/admin/timeline", icon: <CalendarDays size={18} />, status: "incomplete" },
    { key: "media", href: "/admin/media", icon: <ImageIcon size={18} />, status: "incomplete" },
  ]

  const handlePublish = async () => {
    try {
      const res = await fetch("/api/publish", { method: "POST" })
      const data = await res.json()
      if (data.success) {
        setPublishStatus(data.status)
      }
    } catch {}
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">{dash.heading}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {dash.welcomeBack} {user?.email}
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-muted-foreground">{dash.published}</p>
          <p className="mt-1 text-lg font-semibold">
            {publishStatus?.publishedAt
              ? new Date(publishStatus.publishedAt).toLocaleDateString()
              : dash.never}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-muted-foreground">{dash.lastModified}</p>
          <p className="mt-1 text-lg font-semibold">
            {publishStatus?.lastModified
              ? new Date(publishStatus.lastModified).toLocaleDateString()
              : dash.never}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-muted-foreground">{dash.lastPublishedBy}</p>
          <p className="mt-1 text-lg font-semibold">
            {publishStatus?.publishedBy ?? "—"}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-muted-foreground">{dash.adminLabel}</p>
          <p className="mt-1 text-lg font-semibold">{user?.email}</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{dash.contentOverview}</h2>
          <button
            onClick={handlePublish}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {dash.publishAll}
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contentItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-muted"
            >
              <span className="text-primary">{item.icon}</span>
              <span className="text-sm font-medium">{dash.contentItems[item.key as keyof typeof dash.contentItems]}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold mb-2">{dash.quickActions}</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/identity"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            {dash.editIdentity}
          </Link>
          <Link
            href="/admin/projects"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            {dash.manageProjects}
          </Link>
          <Link
            href="/admin/media"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            {dash.uploadMedia}
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            {dash.viewPublicSite}
          </a>
        </div>
      </div>
    </div>
  )
}
