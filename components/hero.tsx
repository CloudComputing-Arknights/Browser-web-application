"use client"

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/browse-items?q=${encodeURIComponent(searchQuery)}`)
    } else {
      router.push("/browse-items")
    }
  }

  return (
    <section className="border-b border-border bg-muted/30">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Trade Items You Love with Your Community
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Discover a sustainable way to exchange goods. Find what you need, share what you don't, and build
            connections in your local community.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for items..."
                className="h-11 pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch()
                  }
                }}
              />
            </div>
            <Button size="lg" className="h-11" onClick={handleSearch}>
              Browse Items
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>Popular:</span>
            <Button variant="secondary" size="sm">
              Electronics
            </Button>
            <Button variant="secondary" size="sm">
              Books
            </Button>
            <Button variant="secondary" size="sm">
              Furniture
            </Button>
            <Button variant="secondary" size="sm">
              Clothing
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
