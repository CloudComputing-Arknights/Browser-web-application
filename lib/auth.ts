"use client"

// Simple client-side auth state management
// In a real app, this would use proper authentication with sessions/tokens

export let isLoggedIn = false

export function isUserLoggedIn(): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem("isLoggedIn") === "true"
  }
  return isLoggedIn
}

export function setUserLoggedIn(loggedIn: boolean): void {
  isLoggedIn = loggedIn
  if (typeof window !== "undefined") {
    if (loggedIn) {
      localStorage.setItem("isLoggedIn", "true")
    } else {
      localStorage.removeItem("isLoggedIn")
    }
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event("loginStateChange"))
  }
}

type LoginResponse = {
  access_token: string
  token_type?: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function loginUser(username: string, password: string): Promise<boolean> {
  try {
    if (!API_BASE_URL) {
      console.error("NEXT_PUBLIC_API_BASE_URL is not set")
      return false
    }

    const res = await fetch(`${API_BASE_URL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })

    if (!res.ok) {
      console.error("Login failed with status:", res.status)
      return false
    }

    const data = (await res.json()) as LoginResponse

    // Store token in localStorage (simple approach for now)
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", data.access_token)
      localStorage.setItem("token_type", data.token_type ?? "bearer")
    }

    setUserLoggedIn(true)

    return true
  } catch (err) {
    console.error("Login error:", err)

    return false
  }
}

export async function fetchCurrentUser() {
  if (!API_BASE_URL) {
    throw new Error("API base URL missing")
  }

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null
  if (!token) {
    throw new Error("Not logged in")
  }

  const res = await fetch(`${API_BASE_URL}/me/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch user")
  }

  return res.json()
}

type RegisterRequest = {
  username: string
  email: string
  password: string
}

export async function registerUser(payload: RegisterRequest): Promise<boolean> {
  try {
    if (!API_BASE_URL) {
      console.error("NEXT_PUBLIC_API_BASE_URL is not set")
      return false
    }

    const res = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      console.error("Signup failed with status:", res.status)
      return false
    }

    // If you want to auto-login after signup, you could parse the response here.
    // For now, just treat success as "account created".
    return true
  } catch (err) {
    console.error("Signup error:", err)
    return false
  }
}

export function logoutUser(): void {
  setUserLoggedIn(false)

  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token")
    localStorage.removeItem("token_type")

  }
}