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
    let auth: ReturnType<typeof getFirebaseClient>["auth"] | null = null
    try {
      auth = getFirebaseClient().auth
    } catch {
      setLoading(false) // eslint-disable-line react-hooks/set-state-in-effect
      return
    }
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const isAdmin = user !== null && ADMIN_EMAILS.includes(user.email ?? "")

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { auth } = getFirebaseClient()
      await signInWithEmailAndPassword(auth, email, password)
    } catch {}
  }, [])

  const signOut = useCallback(async () => {
    try {
      const { auth } = getFirebaseClient()
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
