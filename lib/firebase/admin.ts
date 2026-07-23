import "server-only"
import type { Firestore } from "firebase-admin/firestore"
import type { Auth } from "firebase-admin/auth"

let adminDbInstance: Firestore | null = null
let adminAuthInstance: Auth | null = null

async function ensureAdminApp() {
  if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !process.env.FIREBASE_PRIVATE_KEY
  ) {
    return null
  }

  try {
    const { cert, getApps, initializeApp } = await import("firebase-admin/app")

    const adminApp =
      getApps().length === 0
        ? initializeApp({
            credential: cert({
              projectId: process.env.FIREBASE_PROJECT_ID,
              clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
              privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(
                /\\n/g,
                "\n",
              ),
            }),
          })
        : getApps()[0]

    return adminApp
  } catch {
    return null
  }
}

async function getAdminDb(): Promise<Firestore | null> {
  if (adminDbInstance) return adminDbInstance

  const app = await ensureAdminApp()
  if (!app) return null

  try {
    const { getFirestore } = await import("firebase-admin/firestore")
    adminDbInstance = getFirestore(app)
    return adminDbInstance
  } catch {
    return null
  }
}

async function getAdminAuth(): Promise<Auth | null> {
  if (adminAuthInstance) return adminAuthInstance

  const app = await ensureAdminApp()
  if (!app) return null

  try {
    const { getAuth } = await import("firebase-admin/auth")
    adminAuthInstance = getAuth(app)
    return adminAuthInstance
  } catch {
    return null
  }
}

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? ""

async function verifyAdminToken(
  token: string,
): Promise<boolean> {
  try {
    const auth = await getAdminAuth()
    if (!auth) return false
    const decoded = await auth.verifyIdToken(token)
    return decoded.email === ADMIN_EMAIL
  } catch {
    return false
  }
}

let adminDbPromise: Promise<Firestore | null> | null = null

function getAdminDbCached(): Promise<Firestore | null> {
  if (!adminDbPromise) {
    adminDbPromise = getAdminDb()
  }
  return adminDbPromise
}

export { getAdminDbCached as getAdminDb, verifyAdminToken, getAdminAuth }
