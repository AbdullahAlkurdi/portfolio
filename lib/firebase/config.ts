const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
}

const hasConfig = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.authDomain,
)

let initPromise: Promise<{
  app: import("firebase/app").FirebaseApp
  db: import("firebase/firestore").Firestore
  auth: import("firebase/auth").Auth
}> | null = null

async function getFirebaseClient() {
  if (!hasConfig) {
    throw new Error(
      "Firebase not configured. Set NEXT_PUBLIC_FIREBASE_* environment variables.",
    )
  }
  if (!initPromise) {
    initPromise = (async () => {
      const { initializeApp, getApps } = await import("firebase/app")
      const { getFirestore } = await import("firebase/firestore")
      const { getAuth } = await import("firebase/auth")
      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]!
      const db = getFirestore(app)
      const auth = getAuth(app)
      return { app, db, auth }
    })()
  }
  return initPromise
}

export { getFirebaseClient }
