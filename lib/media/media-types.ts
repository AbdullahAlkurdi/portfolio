export type MediaProvider = "google-drive"

export type MediaFile = {
  id: string
  provider: MediaProvider
  driveFileId: string
  name: string
  mimeType: string
  size: number
  folder: string
  publicUrl: string
  alt: string
  createdAt: string
  updatedAt: string
}

export type UploadResult = {
  driveFileId: string
  name: string
  mimeType: string
  size: number
  publicUrl: string
  webViewLink: string
}

export type MediaListOptions = {
  folder?: string
  pageSize?: number
  pageToken?: string
}
