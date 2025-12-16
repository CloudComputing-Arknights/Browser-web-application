"use client"

import * as React from "react"
import { getSignedImageUrl, isDirectImageUrl } from "@/lib/imageApi"

const SIGNED_URL_TTL_MS = 4 * 60 * 1000
const signedUrlCache = new Map<string, { url: string; expiresAt: number }>()

type ResolvedImageProps = {
  imageRef?: string | null
  fallbackSrc?: string
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src">

/**
 * Accepts either a direct URL (http/https, /public path, data/blob) OR an image UUID/id.
 * If it's an id, this component fetches a signed URL from `GET /image/{id}` and renders it.
 */
export function ResolvedImage({
  imageRef,
  fallbackSrc = "/placeholder.svg",
  alt = "",
  className,
  ...imgProps
}: ResolvedImageProps) {
  const [resolvedSrc, setResolvedSrc] = React.useState<string>(() => {
    if (!imageRef) return fallbackSrc
    if (isDirectImageUrl(imageRef)) return imageRef
    const cached = signedUrlCache.get(imageRef)
    if (cached && cached.expiresAt > Date.now()) return cached.url
    return fallbackSrc
  })

  React.useEffect(() => {
    let cancelled = false

    async function run() {
      if (!imageRef) {
        setResolvedSrc(fallbackSrc)
        return
      }

      if (isDirectImageUrl(imageRef)) {
        setResolvedSrc(imageRef)
        return
      }

      const cached = signedUrlCache.get(imageRef)
      if (cached && cached.expiresAt > Date.now()) {
        setResolvedSrc(cached.url)
        return
      }

      // While loading, keep fallback to avoid broken images in UI
      setResolvedSrc(fallbackSrc)
      try {
        const url = await getSignedImageUrl(imageRef)
        signedUrlCache.set(imageRef, { url, expiresAt: Date.now() + SIGNED_URL_TTL_MS })
        if (!cancelled) setResolvedSrc(url)
      } catch (err) {
        console.warn("Failed to resolve imageRef:", imageRef, err)
        if (!cancelled) setResolvedSrc(fallbackSrc)
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [imageRef, fallbackSrc])

  return <img {...imgProps} src={resolvedSrc} alt={alt} className={className} />
}


