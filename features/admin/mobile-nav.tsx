"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, User, FolderKanban, LogOut, Globe } from "lucide-react"
import { useLocale } from "@/lib/locale-context"
import { getSiteContent } from "@/content/data/content"

const navItems = [
  { key: "dashboard", href: "/admin", icon: LayoutDashboard },
  { key: "identity", href: "/admin/identity", icon: User },
  { key: "projects", href: "/admin/projects", icon: FolderKanban },
  { key: "site", href: "/", icon: Globe },
]

type AdminMobileNavProps = {
  onSignOut: () => void
}

export function AdminMobileNav({ onSignOut }: AdminMobileNavProps) {
  const { locale } = useLocale()
  const adminContent = getSiteContent(locale).admin
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/80 backdrop-blur-xl lg:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-md px-3 py-1 text-xs font-medium transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <Icon size={16} />
              {adminContent.mobileNav[item.key as keyof typeof adminContent.mobileNav]}
            </Link>
          )
        })}
        <button
          onClick={onSignOut}
          className="flex flex-col items-center gap-0.5 rounded-md px-3 py-1 text-xs font-medium text-muted-foreground"
        >
          <LogOut size={16} />
          {adminContent.mobileNav.signOut}
        </button>
      </div>
    </nav>
  )
}
