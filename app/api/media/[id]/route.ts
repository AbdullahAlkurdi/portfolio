import { NextResponse } from "next/server"
import { downloadFile, deleteFile, getFileMetadata } from "@/lib/media/google-drive-provider"
import { verifyAdminToken } from "@/lib/firebase/admin"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const file = await downloadFile(id)

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    return new NextResponse(file.buffer, {
      headers: {
        "Content-Type": file.mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Disposition": `inline; filename="${file.name}"`,
      },
    })
  } catch (error) {
    console.error("Media serve error:", error)
    return NextResponse.json({ error: "Failed to serve media" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authHeader = request.headers.get("Authorization")
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : ""
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const metadata = await getFileMetadata(id)
    if (!metadata) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }
    await deleteFile(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Media delete error:", error)
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 })
  }
}
