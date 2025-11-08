// item/[id]/edit/page.tsx
import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { mockItems } from "@/lib/mock-data"

type Item = (typeof mockItems)[0]

interface EditItemClientProps {
  item: Item 
}

export default function EditItemClient({ item }: EditItemClientProps) {
  return (

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Edit Item</h1>
            <p className="text-muted-foreground mt-1">Update your item listing</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
              <CardDescription>Make changes to your listing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Images */}
              <div className="space-y-2">
                <Label>Photos</Label>
                <div className="grid grid-cols-3 gap-4">
                  {item.images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Item ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Item Title</Label>
                  <Input id="title" defaultValue={item.title} required />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select defaultValue={item.category}>
                      <SelectTrigger id="category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="books">Books & Media</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="plants">Plants & Garden</SelectItem>
                        <SelectItem value="sports">Sports & Outdoors</SelectItem>
                        <SelectItem value="kitchen">Kitchen & Home</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition</Label>
                    <Select defaultValue={item.condition}>
                      <SelectTrigger id="condition">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="like-new">Like New</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" rows={5} defaultValue={item.description} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exchange-type">Exchange Type</Label>
                  <Select defaultValue={item.exchangeType}>
                    <SelectTrigger id="exchange-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trade">Trade - Exchange for another item</SelectItem>
                      <SelectItem value="lend">Lend - Temporary loan</SelectItem>
                      <SelectItem value="give">Give Away - Free to a good home</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="looking-for">What are you looking for? (Optional)</Label>
                  <Input id="looking-for" defaultValue={item.lookingFor} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Pickup Location</Label>
                  <Input id="location" defaultValue={item.location} required />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button className="flex-1">Save Changes</Button>
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <Link href={`/item/${item.id}`}>Cancel</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Delete Item */}
          <Card className="mt-6 border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Delete Listing</CardTitle>
              <CardDescription>Permanently remove this item from the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" size="sm">
                Delete Item
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

  )
}
