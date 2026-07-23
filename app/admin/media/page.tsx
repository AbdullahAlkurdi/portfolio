"use client"

import { useState, useEffect, useRef } from "react"
import { PageHeader } from "@/features/admin/page-header"
import { useAdminAuth } from "@/lib/firebase/auth"
import { getFirebaseClient } from "@/lib/firebase/config"
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"
import { Trash2, Upload, FileText, Image as ImageIcon, ExternalLink } from "lucide-react"

type MediaItem = {
  id: string
  name: string
  driveFileId: string
  mimeType: string
  size: number
  folder: string
  alt: string
  createdAt: string
}

export default function AdminMediaPage() {
  const { user } = useAdminAuth()
  const [items, setItems] = useState<MediaItem[]>([])
  const [loaded, setLoaded] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function load() {
      try {
        const { db } = getFirebaseClient()
        const snapshot = await getDocs(collection(db, "media"))
        setItems(
          snapshot.docs
            .map((d) => ({ id: d.id, ...d.data() } as MediaItem))
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
        )
      } catch {}
      setLoaded(true)
    }
    load()
  }, [])

  const mediaUrl = (driveFileId: string) => `/api/media/${driveFileId}`

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return
    setUploading(true)
    setError("")
    try {
      const token = await user.getIdToken()
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "root")

      const res = await fetch("/api/media/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? "Upload failed")
      }
      const data = await res.json()

      const { db } = getFirebaseClient()
      const docRef = await addDoc(collection(db, "media"), {
        name: file.name,
        driveFileId: data.file.driveFileId,
        mimeType: data.file.mimeType,
        size: data.file.size,
        folder: "root",
        alt: file.name,
        createdAt: new Date().toISOString(),
      })

      setItems((prev) => [
        {
          id: docRef.id,
          name: file.name,
          driveFileId: data.file.driveFileId,
          mimeType: data.file.mimeType,
          size: data.file.size,
          folder: "root",
          alt: file.name,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    }
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleDelete = async (item: MediaItem) => {
    if (!user) return
    try {
      const token = await user.getIdToken()
      const res = await fetch(`/api/media/${item.driveFileId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? "Delete failed")
      }
      const { db } = getFirebaseClient()
      await deleteDoc(doc(db, "media", item.id))
      setItems((prev) => prev.filter((i) => i.id !== item.id))
    } catch {}
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Media Library"
        description="Upload and manage images, documents, and other portfolio media."
        action={
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <Upload size={16} />
            {uploading ? "Uploading..." : "Upload"}
          </button>
        }
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={handleUpload}
      />

      {error && (
        <div className="mb-6 rounded-lg border border-error/30 bg-error-muted p-3 text-sm text-error">
          {error}
        </div>
      )}

      {!loaded ? (
        <div className="flex justify-center p-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-12 text-center">
          <ImageIcon size={32} className="mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No media uploaded yet.</p>
          <p className="text-xs text-muted-foreground mt-1">Storage Provider: Google Drive</p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-xs text-muted-foreground">
            Storage Provider: Google Drive &middot; {items.length} file{items.length !== 1 ? "s" : ""}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <div key={item.id} className="group relative rounded-xl border border-border bg-surface overflow-hidden">
                <div className="aspect-video bg-muted">
                  {item.mimeType?.startsWith("image/") ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={mediaUrl(item.driveFileId)}
                      alt={item.alt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <FileText size={32} className="text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium truncate" title={item.name}>{item.name}</p>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span>{item.mimeType?.split("/").pop()?.toUpperCase() ?? "—"}</span>
                    <span>&middot;</span>
                    <span>{item.size ? formatSize(item.size) : "—"}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
                  </p>
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  {item.mimeType?.startsWith("image/") && (
                    <a
                      href={mediaUrl(item.driveFileId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-background/80 p-1.5 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
                      title="Open in new tab"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(item)}
                    className="rounded-lg bg-background/80 p-1.5 text-muted-foreground opacity-0 transition-opacity hover:text-error group-hover:opacity-100"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
