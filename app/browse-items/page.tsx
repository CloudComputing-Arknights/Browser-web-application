"use client"

import { Header } from "@/components/header"
import { ItemCard } from "@/components/item-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { Search, SlidersHorizontal } from "lucide-react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function BrowseItemsPage() {
  const searchParams = useSearchParams()
  const [keyword, setKeyword] = useState(searchParams.get("q") || "")

  useEffect(() => {
    const query = searchParams.get("q")
    if (query) {
      setKeyword(query)
    }
  }, [searchParams])

  // Mock items data
  const items = [
    {
      id: "1",
      title: "Vintage Film Camera",
      description: "Classic 35mm camera in excellent condition. Perfect for photography enthusiasts.",
      category: "Electronics",
      image: "/vintage-film-camera.jpg",
      location: "Downtown",
      postedBy: "Sarah M.",
    },
    {
      id: "2",
      title: "Modern Office Chair",
      description: "Ergonomic office chair with lumbar support. Barely used, like new condition.",
      category: "Furniture",
      image: "/modern-office-chair.png",
      location: "Westside",
      postedBy: "John D.",
    },
    {
      id: "3",
      title: "Programming Books Collection",
      description: "Set of 5 programming books covering JavaScript, Python, and web development.",
      category: "Books",
      image: "/programming-books-stack.jpg",
      location: "University District",
      postedBy: "Alex K.",
    },
    {
      id: "4",
      title: "Indoor Plant Collection",
      description: "Beautiful collection of low-maintenance indoor plants. Great for beginners.",
      category: "Plants",
      image: "/indoor-plants-collection.jpg",
      location: "Eastside",
      postedBy: "Maria G.",
    },
    {
      id: "5",
      title: "Acoustic Guitar",
      description: "Yamaha acoustic guitar with case. Great sound quality, well maintained.",
      category: "Musical Instruments",
      image: "/acoustic-guitar.png",
      location: "Midtown",
      postedBy: "Chris L.",
    },
    {
      id: "6",
      title: "Kitchen Appliance Set",
      description: "Blender, toaster, and coffee maker. All in working condition.",
      category: "Kitchen",
      image: "/modern-kitchen-appliances.png",
      location: "Southside",
      postedBy: "Emma W.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Browse Items</h1>
          <p className="text-muted-foreground">
            Discover items available for trade, lending, or giveaway in your community
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Filters Sidebar */}
          <aside className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="h-5 w-5" />
                <h2 className="font-semibold text-lg">Filters</h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Keyword Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by keyword..."
                      className="pl-9"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="plants">Plants</SelectItem>
                      <SelectItem value="instruments">Musical Instruments</SelectItem>
                      <SelectItem value="kitchen">Kitchen</SelectItem>
                      <SelectItem value="sports">Sports & Outdoors</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Exchange Type Filter */}
                <div className="space-y-2">
                  <Label>Exchange Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="trade">Trade</SelectItem>
                      <SelectItem value="lend">Lend</SelectItem>
                      <SelectItem value="giveaway">Giveaway</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Item Status Filter */}
                <div className="space-y-2">
                  <Label>Item Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Distance Filter */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Distance</Label>
                    <span className="text-sm text-muted-foreground">5 miles</span>
                  </div>
                  <Slider defaultValue={[5]} max={50} step={1} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0 mi</span>
                    <span>50 mi</span>
                  </div>
                </div>

                {/* Location Search */}
                <div className="space-y-2">
                  <Label>Location</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter location..." className="pl-9" />
                  </div>
                </div>

                <Button className="w-full bg-transparent" variant="outline">
                  Reset Filters
                </Button>
              </div>
            </Card>
          </aside>

          {/* Items Grid */}
          <div className="space-y-6">
            {/* Sort and View Options */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{items.length}</span> items
              </p>
              <Select defaultValue="recent">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="distance">Nearest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="alphabetical">A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Items Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
