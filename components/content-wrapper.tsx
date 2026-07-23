"use client"

import { ContentProvider } from "@/lib/content/content-provider"
import type { ReactNode } from "react"

export function ContentWrapper({ children }: { children: ReactNode }) {
  return <ContentProvider>{children}</ContentProvider>
}
