import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"
import Link from "next/link"

export default function AddItemPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">List an Item</h1>
            <p className="text-muted-foreground mt-1">Share what you'd like to trade, lend, or give away</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
              <CardDescription>Provide clear information to help others understand your item</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Photos</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG or GIF (max. 5MB each)</p>
                </div>
                <p className="text-xs text-muted-foreground">Add up to 5 photos of your item</p>
              </div>

              {/* Basic Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Item Title</Label>
                  <Input id="title" placeholder="e.g., Vintage Film Camera" required />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
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
                    <Select>
                      <SelectTrigger id="condition">
                        <SelectValue placeholder="Select condition" />
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
                  <Textarea
                    id="description"
                    rows={5}
                    placeholder="Describe your item, its condition, and any relevant details..."
                    required
                  />
                  <p className="text-xs text-muted-foreground">Be honest and detailed to build trust</p>
                </div>
              </div>

              {/* Exchange Type */}
              <div className="space-y-2">
                <Label htmlFor="exchange-type">Exchange Type</Label>
                <Select>
                  <SelectTrigger id="exchange-type">
                    <SelectValue placeholder="How do you want to exchange?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trade">Trade - Exchange for another item</SelectItem>
                    <SelectItem value="lend">Lend - Temporary loan</SelectItem>
                    <SelectItem value="give">Give Away - Free to a good home</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Looking For (conditional on trade) */}
              <div className="space-y-2">
                <Label htmlFor="looking-for">What are you looking for? (Optional)</Label>
                <Input id="looking-for" placeholder="e.g., Books, plants, kitchen items..." />
                <p className="text-xs text-muted-foreground">Help others know what you'd like in exchange</p>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Pickup Location</Label>
                <Input id="location" placeholder="e.g., Near UT Austin campus" required />
                <p className="text-xs text-muted-foreground">General area for pickup or meetup</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button className="flex-1">Publish Listing</Button>
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
