import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

"use client"

import { GoogleOAuthProvider } from "@react-oauth/google"
import React from "react"

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!

export function GoogleProvider({ children }: { children: React.ReactNode }) {
  return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
}

import type { Metadata } from "next"
import { GoogleProvider } from "./GoogleProvider"

export const metadata: Metadata = {
  title: "SwapHub",
  description: "Neighborhood exchange",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GoogleProvider>{children}</GoogleProvider>
      </body>
    </html>
  )
}