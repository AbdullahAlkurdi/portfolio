import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { verifyAdminToken } from "@/lib/firebase/admin"

const ALLOWED_PATHS = ["/", "/projects", "/resume"]

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

    const body = await request.json().catch(() => ({}))
    const path = body.path ?? "/"

    if (!ALLOWED_PATHS.includes(path)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 })
    }

    revalidatePath(path)

    return NextResponse.json({ revalidated: true, path })
  } catch (error) {
    console.error("Revalidation error:", error)
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 })
  }
}
