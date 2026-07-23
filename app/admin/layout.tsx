export const dynamic = "force-dynamic"

import { AdminAuthProvider } from "@/lib/firebase/auth"
import { AdminShell } from "./admin-shell"

export const metadata = {
  title: "Admin — Portfolio CMS",
  robots: { index: false, follow: false },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthProvider>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  )
}
