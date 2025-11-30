"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { loginUser, loginWithGoogle } from "@/lib/auth"  // 🔹 updated import
import { GoogleLogin } from "@react-oauth/google"        // 🔹 new import

export default function LoginPage() {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false) // 🔹

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const success = await loginUser(username, password)

    setLoading(false)

    if (success) {
      router.push("/")
    } else {
      setError("Invalid username or password.")
    }
  }

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setError(null)
    setGoogleLoading(true)

    const idToken = credentialResponse?.credential
    if (!idToken) {
      setGoogleLoading(false)
      setError("Google did not return a valid token.")
      return
    }

    const ok = await loginWithGoogle(idToken)
    setGoogleLoading(false)

    if (ok) {
      router.push("/")
    } else {
      setError("Google sign-in failed. Please try again.")
    }
  }

  const handleGoogleError = () => {
    setError("Google sign-in was cancelled or failed.")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Package className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold">SwapHub</span>
          </Link>
          <p className="text-sm text-muted-foreground mt-2">Welcome back to your community</p>
        </div>

        <Card>
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="yourusername"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              {/* 🔹 Divider or label */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex-1 h-px bg-border" />
                <span>or</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* 🔹 Google Login Button */}
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                />
              </div>

              {googleLoading && (
                <p className="text-xs text-muted-foreground text-center">Signing in with Google...</p>
              )}

              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary font-medium hover:underline">
                  Sign up
                </Link>
              </p>
              <div className="pt-4 border-t w-full">
                <Link href="/admin">
                  <Button variant="outline" className="w-full bg-transparent" size="sm" type="button">
                    <Shield className="h-4 w-4 mr-2" />
                    Sign in as Admin
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}