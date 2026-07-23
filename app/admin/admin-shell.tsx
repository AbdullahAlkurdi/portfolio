"use client"

import { useRouter, usePathname } from "next/navigation"
import { AdminSidebar } from "@/features/admin/sidebar"
import { AdminMobileNav } from "@/features/admin/mobile-nav"
import { useAdminAuth } from "@/lib/firebase/auth"
import { useEffect, useMemo } from "react"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin, signOut } = useAdminAuth()
  const router = useRouter()
  const pathname = usePathname()
  const isLoginPage = useMemo(() => pathname === "/admin/login", [pathname])

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push("/admin/login")
    }
  }, [loading, user, router, isLoginPage])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    if (isLoginPage) {
      return <div className="min-h-screen bg-background">{children}</div>
    }
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar onSignOut={signOut} />
      <AdminMobileNav onSignOut={signOut} />
      <div className="lg:pl-60">
        <main className="min-h-screen pb-20 lg:pb-0">{children}</main>
      </div>
    </div>
  )
}
