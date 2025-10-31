"use client"

// Simple client-side auth state management
// In a real app, this would use proper authentication with sessions/tokens

let isLoggedIn = false

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

export function loginUser(): boolean {
  // Placeholder function that always returns true to simulate successful login
  setUserLoggedIn(true)
  return true
}

export function logoutUser(): void {
  setUserLoggedIn(false)
}
