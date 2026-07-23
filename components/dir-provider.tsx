"use client";

import { useLocale } from "@/lib/locale-context";
import { useEffect } from "react";
import type { ReactNode } from "react";

export function DirProvider({ children }: { children: ReactNode }) {
  const { dir, locale } = useLocale();

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
  }, [dir, locale]);

  return <>{children}</>;
}
