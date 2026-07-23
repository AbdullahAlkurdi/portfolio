"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
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
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Identity", href: "/admin/identity", icon: User },
  { label: "Working On", href: "/admin/working", icon: Briefcase },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Skills", href: "/admin/skills", icon: Wrench },
  { label: "Knowledge Base", href: "/admin/knowledge", icon: BookOpen },
  { label: "Experience", href: "/admin/experience", icon: Briefcase },
  { label: "Education", href: "/admin/education", icon: School },
  { label: "Certifications", href: "/admin/certifications", icon: Award },
  { label: "Courses", href: "/admin/courses", icon: GraduationCap },
  { label: "Learning", href: "/admin/learning", icon: BookMarked },
  { label: "Timeline", href: "/admin/timeline", icon: CalendarDays },
  { label: "Social Links", href: "/admin/social", icon: Share2 },
  { label: "Media", href: "/admin/media", icon: Image },
  { label: "Resume", href: "/resume", icon: FileText, external: true },
  { label: "Public Site", href: "/", icon: Globe, external: true },
]

type AdminSidebarProps = {
  onSignOut: () => void
}

export function AdminSidebar({ onSignOut }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-60 flex-col border-r border-border bg-background lg:flex">
      <div className="flex h-14 items-center border-b border-border px-4">
        <Link href="/admin" className="text-sm font-semibold tracking-tight">
          Portfolio CMS
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1" aria-label="Admin navigation">
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
              {item.label}
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
          Sign Out
        </button>
      </div>
    </aside>
  )
}
