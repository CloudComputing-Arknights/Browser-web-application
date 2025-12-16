"use client"

import * as React from "react"
import type { MessagePayload } from "firebase/messaging"
import { subscribeForegroundMessages } from "@/lib/firebaseMessaging"

/**
 * Global foreground FCM listener to keep the demo behavior:
 * show an obvious in-page alert when a message arrives (e.g. "image compress success").
 */
export function FcmForegroundAlert() {
  React.useEffect(() => {
    let unsubscribe: (() => void) | undefined

    ;(async () => {
      unsubscribe = await subscribeForegroundMessages((payload: MessagePayload) => {
        try {
          console.log("Received foreground message:", payload)
          const title = payload.notification?.title || "New Message"
          const body = payload.notification?.body || ""

          // Always show a popup so it's obvious the message arrived.
          alert(`${title}: ${body}`)

          // Optional: also try a system notification if available/allowed.
          if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
            try {
              new Notification(title, { body, icon: "/icon.svg" })
            } catch {
              // ignore
            }
          }
        } catch (err) {
          console.warn("Error handling foreground message:", err)
        }
      })
    })()

    return () => unsubscribe?.()
  }, [])

  return null
}


