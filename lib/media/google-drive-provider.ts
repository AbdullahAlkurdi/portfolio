import "server-only"

const GOOGLE_DRIVE_FOLDER_IDS: Record<string, string> = {
  root: process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID ?? "",
  profile: process.env.GOOGLE_DRIVE_PROFILE_FOLDER_ID ?? "",
  projects: process.env.GOOGLE_DRIVE_PROJECTS_FOLDER_ID ?? "",
  certifications: process.env.GOOGLE_DRIVE_CERTIFICATIONS_FOLDER_ID ?? "",
  documents: process.env.GOOGLE_DRIVE_DOCUMENTS_FOLDER_ID ?? "",
}

let cachedAccessToken: { token: string; expiresAt: number } | null = null

async function getAccessToken(): Promise<string> {
  if (cachedAccessToken && Date.now() < cachedAccessToken.expiresAt) {
    return cachedAccessToken.token
  }

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Google Drive OAuth credentials not configured")
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to refresh token: ${response.status} ${errorText}`)
  }

  const data = (await response.json()) as { access_token: string; expires_in: number }
  cachedAccessToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  }

  return data.access_token
}

async function driveApiFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const token = await getAccessToken()
  const separator = path.includes("?") ? "&" : "?"
  const url = `https://www.googleapis.com/drive/v3${path}${separator}supportsAllDrives=true`
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  })
}

async function driveUploadApiFetch(
  method: string,
  metadata: unknown,
  fileBody: BodyInit | null,
  queryParams: string,
): Promise<Response> {
  const token = await getAccessToken()
  const boundary = `boundary_${Date.now()}`
  const delimiter = `--${boundary}`

  let body: BodyInit | null = null
  if (fileBody) {
    const fileBytes =
      fileBody instanceof Uint8Array
        ? fileBody
        : new Uint8Array(await new Response(fileBody).arrayBuffer())
    const textEncoder = new TextEncoder()
    const parts = [
      textEncoder.encode(
        `\r\n${delimiter}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`,
      ),
      textEncoder.encode(
        `${delimiter}\r\nContent-Type: application/octet-stream\r\n\r\n`,
      ),
      fileBytes,
      textEncoder.encode(`\r\n${delimiter}--\r\n`),
    ]
    const totalLen = parts.reduce((sum, p) => sum + p.length, 0)
    const combined = new Uint8Array(totalLen)
    let offset = 0
    for (const p of parts) {
      combined.set(p, offset)
      offset += p.length
    }
    body = combined as BodyInit
  }

  const uploadParams = queryParams
    ? `${queryParams}&supportsAllDrives=true`
    : "supportsAllDrives=true"
  return fetch(
    `https://www.googleapis.com/upload/drive/v3/files?${uploadParams}`,
    {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body,
    },
  )
}

function getFolderId(folder: string): string | null {
  return GOOGLE_DRIVE_FOLDER_IDS[folder] || null
}

export async function uploadFile(
  fileBuffer: ArrayBuffer,
  fileName: string,
  mimeType: string,
  folder: string = "root",
): Promise<{
  driveFileId: string
  name: string
  mimeType: string
  size: number
  publicUrl: string
  webViewLink: string
}> {
  const folderId = getFolderId(folder)

  const metadata: Record<string, unknown> = {
    name: `${Date.now()}-${fileName}`,
    mimeType,
  }

  if (folderId) {
    metadata.parents = [folderId]
  }

  const response = await driveUploadApiFetch(
    "POST",
    metadata,
    new Uint8Array(fileBuffer),
    "uploadType=multipart&fields=id,name,mimeType,size,webViewLink",
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Upload failed: ${response.status} ${errorText}`)
  }

  const data = (await response.json()) as {
    id: string
    name: string
    mimeType: string
    size: string
    webViewLink: string
  }

  return {
    driveFileId: data.id,
    name: data.name,
    mimeType: data.mimeType,
    size: parseInt(data.size ?? "0", 10),
    publicUrl: data.id,
    webViewLink: data.webViewLink ?? "",
  }
}

export async function getFileMetadata(fileId: string): Promise<{
  id: string
  name: string
  mimeType: string
  size: number
  webViewLink: string
  modifiedTime: string
} | null> {
  const response = await driveApiFetch(
    `/files/${fileId}?fields=id,name,mimeType,size,webViewLink,modifiedTime`,
  )

  if (response.status === 404) return null
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Failed to get file metadata: ${response.status} ${errorText}`,
    )
  }

  const data = (await response.json()) as {
    id: string
    name: string
    mimeType: string
    size: string
    webViewLink: string
    modifiedTime: string
  }

  return {
    id: data.id,
    name: data.name,
    mimeType: data.mimeType,
    size: parseInt(data.size ?? "0", 10),
    webViewLink: data.webViewLink ?? "",
    modifiedTime: data.modifiedTime,
  }
}

export async function downloadFile(fileId: string): Promise<{
  buffer: ArrayBuffer
  mimeType: string
  name: string
} | null> {
  const metadata = await getFileMetadata(fileId)
  if (!metadata) return null

  const response = await driveApiFetch(`/files/${fileId}?alt=media`)

  if (!response.ok) return null

  const buffer = await response.arrayBuffer()
  return { buffer, mimeType: metadata.mimeType, name: metadata.name }
}

export async function deleteFile(fileId: string): Promise<boolean> {
  const response = await driveApiFetch(`/files/${fileId}`, {
    method: "DELETE",
  })
  return response.ok || response.status === 404
}

export async function createFolder(
  name: string,
  parentFolderId: string | null = null,
): Promise<string> {
  const metadata: Record<string, unknown> = {
    name,
    mimeType: "application/vnd.google-apps.folder",
  }

  if (parentFolderId) {
    metadata.parents = [parentFolderId]
  }

  const response = await driveApiFetch("/files", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(metadata),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Failed to create folder: ${response.status} ${errorText}`,
    )
  }

  const data = (await response.json()) as { id: string }
  return data.id
}

export function getFolderIds(): Record<string, string> {
  return { ...GOOGLE_DRIVE_FOLDER_IDS }
}
