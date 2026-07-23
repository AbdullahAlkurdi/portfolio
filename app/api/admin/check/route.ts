import { NextResponse } from "next/server"

export async function GET() {
  const hasFirebaseConfig = Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  )

  const hasAdminConfig = Boolean(
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY,
  )

  const hasDriveConfig = Boolean(
    process.env.GOOGLE_DRIVE_CLIENT_EMAIL &&
    process.env.GOOGLE_DRIVE_PRIVATE_KEY &&
    process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID,
  )

  return NextResponse.json({
    configured: hasFirebaseConfig,
    fullyConfigured: hasFirebaseConfig && hasAdminConfig && hasDriveConfig,
    env: {
      hasApiKey: Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
      hasProjectId: Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
      hasAuthDomain: Boolean(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
      hasAdminConfig,
      hasAdminEmail: Boolean(process.env.NEXT_PUBLIC_ADMIN_EMAIL),
      hasDriveConfig,
    },
  })
}
