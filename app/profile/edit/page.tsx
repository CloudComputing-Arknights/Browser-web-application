"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

// ✅ Import existing client wrapper
import UserClient from "@/lib/clients/UserClient"
// ✅ Import generated types for type safety (SignedInUserRes matches the authMe response)
import { SignedInUserRes } from "@/client"

// Local interface for the form state to manage UI fields
interface UserFormData {
  username: string
  email: string
  phone: string
  location: string // Derived field, read-only
  avatar_url: string
  birth_date: string
}

export default function EditProfilePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  
  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    email: "",
    phone: "",
    location: "", 
    avatar_url: "",
    birth_date: "",
  })

  // --- 1. Fetch current user data (Optimized with UserClient) ---
  useEffect(() => {
    const fetchUser = async () => {
      // Note: UserClient handles token retrieval internally via APIConfig
      // We check token existence here just for quick redirection if logged out
      const token = localStorage.getItem("access_token")
      if (!token) {
        router.push("/login")
        return
      }

      try {
        // ✅ Optimization: Use existing UserClient.authMe() 
        // This replaces the manual fetch(GET /me/user) and header setup
        const userClient = new UserClient()
        const data: SignedInUserRes = await userClient.authMe()

        // Logic: Derive "Location" string from the first address in the list
        // Note: Using 'any' cast on addresses if generated types are strict about array types
        let derivedLocation = "No location set"
        if (data.addresses && data.addresses.length > 0) {
          const addr = (data.addresses as any)[0] 
          const parts = [addr.city, addr.state].filter(Boolean) 
          derivedLocation = parts.join(", ")
        }

        // Populate form state from the client response
        setFormData({
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          location: derivedLocation,
          avatar_url: data.avatar_url || "",
          // Format date to YYYY-MM-DD for HTML input
          birth_date: data.birth_date ? String(data.birth_date).split("T")[0] : "",
        })

      } catch (error) {
        console.error("Failed to load profile", error)
        // Optionally handle 401 Unauthorized specifically if needed
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [router])

  // --- 2. Handle Save Changes (Keep as fetch) ---
  // Constraint: We cannot use UserClient here because it lacks an 'updateMe' method.
  // We must stick to manual fetch until UserClient.ts is updated in the future.
  const handleSave = async () => {
    setIsSaving(true)
    const token = localStorage.getItem("access_token")
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

    try {
      const res = await fetch(`${API_BASE}/me/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          // Send editable fields only. Location is ignored as it is derived.
          email: formData.email,
          phone: formData.phone || null,       
          avatar_url: formData.avatar_url || null, 
          birth_date: formData.birth_date || null
        })
      })

      if (res.ok) {
        // Redirect back to main profile page on success
        router.push("/profile")
      } else {
        const err = await res.json()
        console.error("Update error:", err)
        alert("Failed to update profile. Please check your input.")
      }
    } catch (error) {
      console.error("Update failed", error)
      alert("Network error")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <div className="flex h-screen items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Edit Profile</h1>
            <p className="text-muted-foreground mt-1">Update your profile information</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>This information will be visible to other users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={formData.avatar_url || "/diverse-user-avatars.png"} />
                  <AvatarFallback>{formData.username.slice(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="w-full max-w-xs">
                  <Label htmlFor="avatar_url" className="text-xs text-muted-foreground mb-2 block">Avatar URL</Label>
                  <Input 
                      id="avatar_url" 
                      value={formData.avatar_url}
                      onChange={(e) => setFormData({...formData, avatar_url: e.target.value})}
                      className="h-8 text-xs"
                      placeholder="https://..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">Paste a direct link to an image.</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Username (Read-only) */}
                <div className="space-y-2">
                  <Label htmlFor="name">Username</Label>
                  <Input id="name" value={formData.username} disabled className="bg-muted"/>
                  <p className="text-xs text-muted-foreground">Username cannot be changed.</p>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>

                {/* Location (Read-only, derived from Address) */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    value={formData.location} 
                    disabled 
                    className="bg-muted" 
                  />
                  <p className="text-xs text-muted-foreground">
                    Location is derived from your primary address. 
                    <Link href="/profile" className="text-primary hover:underline ml-1">
                       Manage addresses in Profile
                    </Link>
                  </p>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>

                {/* Birth Date */}
                <div className="space-y-2">
                  <Label htmlFor="birth_date">Birth Date</Label>
                  <Input 
                    id="birth_date" 
                    type="date" 
                    value={formData.birth_date} 
                    onChange={(e) => setFormData({...formData, birth_date: e.target.value})} 
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button className="flex-1" onClick={handleSave} disabled={isSaving}>
                  {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Saving...</> : "Save Changes"}
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <Link href="/profile">Cancel</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}