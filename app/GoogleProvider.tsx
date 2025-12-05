"use client"

import { GoogleOAuthProvider } from "@react-oauth/google"
import React from "react"

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""

export function GoogleProvider({ children }: { children: React.ReactNode }) {
  if (!clientId) {
    console.warn("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set")
  }

  return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
}