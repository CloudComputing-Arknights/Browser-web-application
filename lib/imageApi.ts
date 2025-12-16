import { defaultAPIBaseURL } from "@/lib/APIConfig"

export interface UploadResponse {
  status: string
  filename: string
  message: string
}

export interface UrlResponse {
  url: string
}

export function isDirectImageUrl(ref: string): boolean {
  return (
    ref.startsWith("http://") ||
    ref.startsWith("https://") ||
    ref.startsWith("/") ||
    ref.startsWith("data:") ||
    ref.startsWith("blob:")
  )
}

export async function uploadImageFile(file: File, fcmToken?: string | null): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)
  if (fcmToken) formData.append("fcm_token", fcmToken)

  const res = await fetch(`${defaultAPIBaseURL}/image/upload`, {
    method: "POST",
    body: formData,
  })

  if (!res.ok) {
    throw new Error(`Upload failed: ${res.status} ${res.statusText}`)
  }

  const data = (await res.json()) as UploadResponse
  if (!data?.filename) throw new Error("Upload succeeded but response is missing filename")
  return data.filename
}

export async function getSignedImageUrl(imageId: string): Promise<string> {
  const res = await fetch(`${defaultAPIBaseURL}/image/${encodeURIComponent(imageId)}`, {
    method: "GET",
  })

  if (!res.ok) {
    throw new Error(`Failed to get signed URL: ${res.status} ${res.statusText}`)
  }

  const data = (await res.json()) as UrlResponse
  if (!data?.url) throw new Error("Signed URL response missing url")
  return data.url
}


