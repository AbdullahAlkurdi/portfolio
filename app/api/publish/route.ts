import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { verifyAdminToken, getAdminDb } from "@/lib/firebase/admin"

export async function GET() {
  try {
    const mod = await import("@/lib/firebase/admin").catch(() => null)
    const adminDb = mod ? await mod.getAdminDb() : null

    if (!adminDb) {
      return NextResponse.json({
        status: { publishedAt: null, lastModified: null, publishedBy: null },
        note: "Firebase not configured",
      })
    }
    const doc = await adminDb.collection("site").doc("publishing").get()
    if (!doc.exists) {
      return NextResponse.json({
        status: { publishedAt: null, lastModified: null, publishedBy: null },
      })
    }
    const data = doc.data()
    return NextResponse.json({
      status: {
        publishedAt: data?.publishedAt?.toDate()?.toISOString() ?? null,
        lastModified: data?.lastModified?.toDate()?.toISOString() ?? null,
        publishedBy: data?.publishedBy ?? null,
      },
    })
  } catch {
    return NextResponse.json({
      status: { publishedAt: null, lastModified: null, publishedBy: null },
    })
  }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const isAuth = await verifyAdminToken(token)
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const adminDb = await getAdminDb()

    if (adminDb) {
      const now = new Date()
      await adminDb
        .collection("site")
        .doc("publishing")
        .set(
          {
            publishedAt: now,
            lastModified: now,
            publishedBy: "admin",
          },
          { merge: true },
        )
    }

    revalidatePath("/")
    revalidatePath("/projects")
    revalidatePath("/resume")

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error("Publish error:", error)
    return NextResponse.json({ error: "Failed to publish" }, { status: 500 })
  }
}
