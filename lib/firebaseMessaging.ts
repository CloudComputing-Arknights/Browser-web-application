"use client"

import { initializeApp, getApps } from "firebase/app"
import type { MessagePayload, Messaging } from "firebase/messaging"

// --- Firebase Configuration ---
// NOTE: These are safe to expose in client code for Firebase web apps, but ideally should live in env vars.
const firebaseConfig = {
  apiKey: "AIzaSyBoS91U_Zfppcv1R_bAm3kQthwN5CZOsiI",
  authDomain: "cloud-computing-arknights.firebaseapp.com",
  projectId: "cloud-computing-arknights",
  storageBucket: "cloud-computing-arknights.firebasestorage.app",
  messagingSenderId: "977633385476",
  appId: "1:977633385476:web:66871b4a2182ba42196951",
  measurementId: "G-19JP5NW39G",
}

// Web Push certificate key pair
const VAPID_KEY =
  "BKN0bH0kaCV2nhLSU3KEkk60XfTwfyISgu3y9UalnEUVzy6s0omDAUYiqeBP95H2XN-awF8jbaYa0eGFmYEGagc"

/**
 * Firebase Messaging is not available in every runtime (SSR, some browsers, etc).
 * Never initialize it at module scope; gate it behind `isSupported()` in the browser.
 */
let messagingInitPromise: Promise<Messaging | null> | null = null
let serviceWorkerRegistration: ServiceWorkerRegistration | null = null
let cachedToken: string | null = null

async function getMessagingSafe(): Promise<Messaging | null> {
  if (typeof window === "undefined") return null

  if (!messagingInitPromise) {
    messagingInitPromise = (async () => {
      const { isSupported, getMessaging } = await import("firebase/messaging")
      const supported = await isSupported()
      if (!supported) return null

      const app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig)
      return getMessaging(app)
    })().catch((err) => {
      console.warn("Failed to initialize Firebase Messaging:", err)
      return null
    })
  }

  return messagingInitPromise
}

async function ensureServiceWorkerRegistered(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === "undefined") return null
  if (!("serviceWorker" in navigator)) return null
  if (serviceWorkerRegistration) return serviceWorkerRegistration

  try {
    serviceWorkerRegistration = await navigator.serviceWorker.register("/firebase-messaging-sw.js")
    return serviceWorkerRegistration
  } catch (err) {
    console.warn("Service Worker registration failed:", err)
    return null
  }
}

/**
 * Get (and cache) an FCM token. Safe to call multiple times.
 */
export async function getFcmToken(): Promise<string | null> {
  if (cachedToken) return cachedToken

  if (typeof window === "undefined" || !("Notification" in window)) {
    return null
  }

  try {
    const permission = await Notification.requestPermission()
    if (permission !== "granted") return null

    const messaging = await getMessagingSafe()
    if (!messaging) return null

    const swReg = await ensureServiceWorkerRegistered()
    const { getToken } = await import("firebase/messaging")

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: swReg ?? undefined,
    })

    if (!token) return null
    cachedToken = token
    return token
  } catch (err) {
    console.warn("Error retrieving FCM token:", err)
    return null
  }
}

/**
 * Subscribe to foreground FCM messages (optional). Returns an unsubscribe function.
 */
export async function subscribeForegroundMessages(
  handler: (payload: MessagePayload) => void,
): Promise<(() => void) | undefined> {
  const messaging = await getMessagingSafe()
  if (!messaging) return undefined

  await ensureServiceWorkerRegistered()

  const { onMessage } = await import("firebase/messaging")
  return onMessage(messaging, handler)
}


