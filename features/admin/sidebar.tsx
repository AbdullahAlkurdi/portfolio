"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLocale } from "@/lib/locale-context"
import { getSiteContent } from "@/content/data/content"
import {
  LayoutDashboard,
  User,
  Briefcase,
  FolderKanban,
  Wrench,
  BookOpen,
  School,
  Award,
  GraduationCap,
  BookMarked,
  CalendarDays,
  Share2,
  Image,
  FileText,
  LogOut,
  Globe,
} from "lucide-react"

const navItems = [
  { key: "dashboard", href: "/admin", icon: LayoutDashboard },
  { key: "identity", href: "/admin/identity", icon: User },
  { key: "workingOn", href: "/admin/working", icon: Briefcase },
  { key: "projects", href: "/admin/projects", icon: FolderKanban },
  { key: "skills", href: "/admin/skills", icon: Wrench },
  { key: "knowledgeBase", href: "/admin/knowledge", icon: BookOpen },
  { key: "experience", href: "/admin/experience", icon: Briefcase },
  { key: "education", href: "/admin/education", icon: School },
  { key: "certifications", href: "/admin/certifications", icon: Award },
  { key: "courses", href: "/admin/courses", icon: GraduationCap },
  { key: "learning", href: "/admin/learning", icon: BookMarked },
  { key: "timeline", href: "/admin/timeline", icon: CalendarDays },
  { key: "socialLinks", href: "/admin/social", icon: Share2 },
  { key: "media", href: "/admin/media", icon: Image },
  { key: "resume", href: "/resume", icon: FileText, external: true },
  { key: "publicSite", href: "/", icon: Globe, external: true },
]

type AdminSidebarProps = {
  onSignOut: () => void
}

export function AdminSidebar({ onSignOut }: AdminSidebarProps) {
  const pathname = usePathname()
  const { locale } = useLocale()
  const adminContent = getSiteContent(locale).admin

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-60 flex-col border-r border-border bg-background lg:flex">
      <div className="flex h-14 items-center border-b border-border px-4">
        <Link href="/admin" className="text-sm font-semibold tracking-tight">
          {adminContent.brand}
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1" aria-label={getSiteContent(locale).ui.aria.mainNav}>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={16} />
              {adminContent.sidebar[item.key as keyof typeof adminContent.sidebar]}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-border p-3">
        <button
          onClick={onSignOut}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LogOut size={16} />
          {adminContent.sidebar.signOut}
        </button>
      </div>
    </aside>
  )
}
