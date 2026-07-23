"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth"
import { getFirebaseClient } from "./config"

type AdminAuthContextType = {
  user: User | null
  loading: boolean
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  signIn: async () => {},
  signOut: async () => {},
})

const ADMIN_EMAILS = [process.env.NEXT_PUBLIC_ADMIN_EMAIL].filter(Boolean)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function init() {
      try {
        const { auth } = await getFirebaseClient()
        if (cancelled) return
        const unsubscribe = onAuthStateChanged(auth, (u) => {
          setUser(u)
          setLoading(false)
        })
        return unsubscribe
      } catch {
        if (!cancelled) setLoading(false)
      }
    }
    const unsubPromise = init()
    return () => {
      cancelled = true
      unsubPromise.then((unsub) => unsub?.())
    }
  }, [])

  const isAdmin = user !== null && ADMIN_EMAILS.includes(user.email ?? "")

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { auth } = await getFirebaseClient()
      await signInWithEmailAndPassword(auth, email, password)
    } catch {}
  }, [])

  const signOut = useCallback(async () => {
    try {
      const { auth } = await getFirebaseClient()
      await firebaseSignOut(auth)
    } catch {}
  }, [])

  return (
    <AdminAuthContext.Provider value={{ user, loading, isAdmin, signIn, signOut }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  return useContext(AdminAuthContext)
}
