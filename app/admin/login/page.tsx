"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/lib/firebase/auth"
import { useLocale } from "@/lib/locale-context"
import { getSiteContent } from "@/content/data/content"

export default function AdminLoginPage() {
  const { user, loading, isAdmin, signIn } = useAdminAuth()
  const { locale } = useLocale()
  const loginContent = getSiteContent(locale).admin.login
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && user && isAdmin) {
      router.push("/admin")
    }
  }, [loading, user, isAdmin, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (user && isAdmin) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSubmitting(true)
    try {
      await signIn(email, password)
      router.push("/admin")
    } catch (err) {
      setError(err instanceof Error ? err.message : loginContent.authFailed)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-xl border border-border bg-surface p-8">
          <h1 className="mb-2 text-xl font-semibold tracking-tight">{loginContent.heading}</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            {loginContent.description}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                {loginContent.email}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5">
                {loginContent.password}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
                autoComplete="current-password"
              />
            </div>
            {error && (
              <p className="text-sm text-error">{error}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? loginContent.signingIn : loginContent.signIn}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
