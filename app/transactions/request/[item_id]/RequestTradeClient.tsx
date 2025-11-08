"use client"

import type { GetStaticPaths, GetStaticProps } from "next"
import type React from "react"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRightLeft, DollarSign, Package } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { mockItems } from "@/lib/mock-data"
import { useState } from "react"
import { useRouter } from "next/navigation"


type Item = (typeof mockItems)[0]

interface RequestTradeClientProps {
  item: Item // receive data from server component
}

export default function RequestTradeClient({ item }: RequestTradeClientProps) {  const router = useRouter()
  const [offerType, setOfferType] = useState<"trade" | "purchase">("trade")
  const [selectedItem, setSelectedItem] = useState("")
  const [offerPrice, setOfferPrice] = useState("")
  const [message, setMessage] = useState("")

  // Mock target item data
  const targetItem = {
    id: item.id,
    title: item.title,
    image: item.images[0] || "/placeholder.svg",
    seller: {
      name: "Sarah Johnson",
      avatar: "/diverse-user-avatars.png",
    },
  }

  // Mock user's items for trade
  const myItems = [
    { id: "1", title: "Programming Books Collection", image: "/programming-books-stack.jpg" },
    { id: "2", title: "Modern Office Chair", image: "/modern-office-chair.png" },
    { id: "3", title: "Desk Lamp", image: "/modern-desk-lamp.png" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Trade request submitted:", { offerType, selectedItem, offerPrice, message })
    router.push("/transactions")
  }

  return (
    
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href={`/item/${item.id}`} className="text-sm text-muted-foreground hover:underline">
              ← Back to item
            </Link>
            <h1 className="text-3xl font-bold mt-2">Request Trade</h1>
            <p className="text-muted-foreground mt-1">Make an offer to acquire this item</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Target Item */}
            <Card>
              <CardHeader>
                <CardTitle>Item You Want</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="relative h-24 w-24 rounded-lg overflow-hidden border flex-shrink-0">
                    <Image
                      src={targetItem.image || "/placeholder.svg"}
                      alt={targetItem.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{targetItem.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={targetItem.seller.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{targetItem.seller.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">Listed by {targetItem.seller.name}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Offer Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Your Offer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={offerType} onValueChange={(value) => setOfferType(value as "trade" | "purchase")}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="trade" id="trade" />
                    <Label htmlFor="trade" className="flex items-center gap-2 cursor-pointer">
                      <ArrowRightLeft className="h-4 w-4" />
                      Trade an item
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="purchase" id="purchase" />
                    <Label htmlFor="purchase" className="flex items-center gap-2 cursor-pointer">
                      <DollarSign className="h-4 w-4" />
                      Make a purchase offer
                    </Label>
                  </div>
                </RadioGroup>

                {/* Trade Offer */}
                {offerType === "trade" && (
                  <div className="space-y-3 pt-4 border-t">
                    <Label htmlFor="item-select">Select an item to trade</Label>
                    <Select value={selectedItem} onValueChange={setSelectedItem}>
                      <SelectTrigger id="item-select">
                        <SelectValue placeholder="Choose from your items" />
                      </SelectTrigger>
                      <SelectContent>
                        {myItems.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4" />
                              {item.title}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedItem && (
                      <div className="mt-4 p-4 border rounded-lg">
                        <p className="text-sm font-medium mb-2">Your offer:</p>
                        <div className="flex items-center gap-3">
                          <div className="relative h-16 w-16 rounded-lg overflow-hidden border flex-shrink-0">
                            <Image
                              src={myItems.find((item) => item.id === selectedItem)?.image || "/placeholder.svg"}
                              alt={myItems.find((item) => item.id === selectedItem)?.title || ""}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <p className="font-semibold">{myItems.find((item) => item.id === selectedItem)?.title}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Purchase Offer */}
                {offerType === "purchase" && (
                  <div className="space-y-3 pt-4 border-t">
                    <Label htmlFor="price">Offer Price</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        value={offerPrice}
                        onChange={(e) => setOfferPrice(e.target.value)}
                        className="pl-9"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                )}

                {/* Message */}
                <div className="space-y-3 pt-4 border-t">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Add a message to the seller..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-3">
              <Button type="submit" size="lg" className="flex-1">
                Send Trade Request
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.back()}
                className="bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </main>
    
  )
}
