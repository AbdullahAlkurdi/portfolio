"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({
  children,
  ...props
}: {
  children: ReactNode;
} & React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      {...props}
      scriptProps={
        typeof window !== "undefined"
          ? { type: "application/json" }
          : undefined
      }
    >
      {children}
    </NextThemesProvider>
  );
}
