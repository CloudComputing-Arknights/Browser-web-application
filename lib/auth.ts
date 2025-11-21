"use client"

import UserClient from "@/lib/clients/UserClient"

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

    const client = new UserClient()
    const data = (await client.signIn(username, password)) as LoginResponse

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

  const client = new UserClient()
  try {
    return await client.authMe()
  } catch (e) {
    throw new Error("Failed to fetch user")
  }
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

    const client = new UserClient()
    await client.signUp(payload.username, payload.email, payload.password)
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