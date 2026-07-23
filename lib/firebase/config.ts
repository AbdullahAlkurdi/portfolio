import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getAuth, type Auth } from "firebase/auth"

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

let app: FirebaseApp
let db: Firestore
let auth: Auth

if (hasConfig) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]!
  db = getFirestore(app)
  auth = getAuth(app)
}

function getFirebaseClient() {
  if (!hasConfig) {
    throw new Error(
      "Firebase not configured. Set NEXT_PUBLIC_FIREBASE_* environment variables.",
    )
  }
  return { app: app!, db: db!, auth: auth! }
}

export { getFirebaseClient }
export type { FirebaseApp, Firestore, Auth }
