import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { GoogleProvider } from "./GoogleProvider"
import { FcmForegroundAlert } from "@/components/fcm-foreground-alert"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: 'Arknights-SwapHub',
  description: 'Arknights-SwapHub is a platform for trading items with your neighbors.',
  generator: 'Cloud Computing Team Arknights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <GoogleProvider>
          <FcmForegroundAlert />
          {children}
          <Analytics />
        </GoogleProvider>
      </body>
    </html>
  )
}