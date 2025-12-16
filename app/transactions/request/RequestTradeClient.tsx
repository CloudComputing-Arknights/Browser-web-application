"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRightLeft, DollarSign, Package, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import ItemsClient from "@/lib/clients/ItemsClient"
import ItemUserClient from "@/lib/clients/ItemUserClient"
import TransactionClient from "@/lib/clients/TransactionClient"
import UserClient from "@/lib/clients/UserClient"
import { ItemRead, CreateTransactionReq } from "@/client"
import { ResolvedImage } from "@/components/resolved-image"

interface RequestTradeClientProps {
  itemId: string
}

export default function RequestTradeClient({ itemId }: RequestTradeClientProps) {
  const router = useRouter()
  
  // State for form inputs
  const [offerType, setOfferType] = useState<"trade" | "purchase">("trade")
  const [selectedItem, setSelectedItem] = useState("")
  const [offerPrice, setOfferPrice] = useState("")
  const [message, setMessage] = useState("")

  // State for data from backend
  const [item, setItem] = useState<any | null>(null) // Use 'any' to access extended fields like 'user' and 'address'
  const [myItems, setMyItems] = useState<ItemRead[]>([])
  const [currentUser, setCurrentUser] = useState<{ id: string } | null>(null)

  // State for UI
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch item details, user's items, and current user on mount
  useEffect(() => {
    // Guard: Don't fetch if itemId is not available
    if (!itemId || itemId === 'undefined') {
      setError("Invalid item ID")
      setLoading(false)
      return
    }

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const itemsClient = new ItemsClient()
        const itemUserClient = new ItemUserClient()
        const userClient = new UserClient()

        // Fetch item details
        console.log('[RequestTradeClient] Fetching item with ID:', itemId)
        const itemData = await itemsClient.getItemById(itemId)
        console.log('[RequestTradeClient] Item data received:', itemData)
        setItem(itemData)

        // Fetch current user info
        const userData = await userClient.authMe()
        setCurrentUser({ id: userData.id })

        // Fetch user's own items for trade option
        const myItemsData = await itemUserClient.listMyItems()
        // Filter out the current item from the list
        const filteredItems = Array.isArray(myItemsData) 
          ? myItemsData.filter((i: ItemRead) => i.item_UUID !== itemId)
          : []
        setMyItems(filteredItems)

        // Note: Backend returns seller info in item.user field
        // No need to fetch separately

      } catch (err) {
        console.error("Failed to fetch data:", err)
        setError("Failed to load item details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [itemId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!item || !currentUser) {
      setError("Missing required data. Please refresh the page.")
      return
    }

    // Validation
    if (offerType === "trade" && !selectedItem) {
      setError("Please select an item to trade.")
      return
    }

    if (offerType === "purchase" && (!offerPrice || parseFloat(offerPrice) <= 0)) {
      setError("Please enter a valid offer price.")
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const transactionClient = new TransactionClient()

      // Get receiver_user_id from item.user.id
      const receiverUserId = item.user?.id
      
      if (!receiverUserId) {
        throw new Error("Could not determine item owner. Please contact support.")
      }

      console.log('[RequestTradeClient] Creating transaction:', {
        requested_item_id: item.item_UUID,
        receiver_user_id: receiverUserId,
        type: offerType,
        offered_item_id: offerType === "trade" ? selectedItem : undefined,
        offered_price: offerType === "purchase" ? parseFloat(offerPrice) : undefined,
      })

      // Build transaction request
      const payload: CreateTransactionReq = {
        requested_item_id: item.item_UUID,
        receiver_user_id: receiverUserId,
        type: offerType as "trade" | "purchase",
        message: message || null,
      }

      // Add offer details based on type
      if (offerType === "trade") {
        payload.offered_item_id = selectedItem
      } else {
        payload.offered_price = parseFloat(offerPrice)
      }

      // Create transaction
      await transactionClient.createTransaction(payload)

      // Success - redirect to transactions page
      router.push("/transactions")
    } catch (err: any) {
      console.error("Failed to create transaction:", err)
      setError(err.message || "Failed to submit trade request. Please try again.")
      setSubmitting(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <main className="container mx-auto px-4 py-20 flex justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading item details...</p>
        </div>
      </main>
    )
  }

  // Error state or item not found
  if (error || !item) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <p>{error || "Item not found"}</p>
              </div>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => router.back()}
              >
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  const targetItem = {
    id: item.item_UUID,
    title: item.title,
    image: item.image_urls?.[0] || "/placeholder.svg",
    price: item.price,
    transactionType: item.transaction_type,
  }

  // Seller info from item.user
  const seller = item.user

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href={`/item/${itemId}`} className="text-sm text-muted-foreground hover:underline">
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
                  <ResolvedImage
                    imageRef={targetItem.image}
                    alt={targetItem.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{targetItem.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    ${targetItem.price} • {targetItem.transactionType}
                  </p>
                  {seller && (
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={seller.avatar_url || "/placeholder-user.jpg"} />
                        <AvatarFallback>{seller.username[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">Listed by {seller.username}</span>
                    </div>
                  )}
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
                    {myItems.length === 0 ? (
                      <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                        <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">You don't have any items to trade.</p>
                        <Link href="/add-item">
                          <Button variant="link" className="mt-2">
                            List an item first
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <>
                        <Select value={selectedItem} onValueChange={setSelectedItem}>
                          <SelectTrigger id="item-select">
                            <SelectValue placeholder="Choose from your items" />
                          </SelectTrigger>
                          <SelectContent>
                            {myItems.map((userItem) => (
                              <SelectItem key={userItem.item_UUID} value={userItem.item_UUID}>
                                <div className="flex items-center gap-2">
                                  <Package className="h-4 w-4" />
                                  {userItem.title}
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
                                <ResolvedImage
                                  imageRef={myItems.find((userItem) => userItem.item_UUID === selectedItem)?.image_urls?.[0] || "/placeholder.svg"}
                                  alt={myItems.find((userItem) => userItem.item_UUID === selectedItem)?.title || ""}
                                  className="absolute inset-0 h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-semibold">{myItems.find((userItem) => userItem.item_UUID === selectedItem)?.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  ${myItems.find((userItem) => userItem.item_UUID === selectedItem)?.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
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
                    disabled={submitting}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Error Display */}
            {error && (
              <Card className="border-destructive">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm">{error}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submit */}
            <div className="flex gap-3">
              <Button 
                type="submit" 
                size="lg" 
                className="flex-1"
                disabled={submitting || (offerType === "trade" && myItems.length === 0)}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Trade Request"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.back()}
                className="bg-transparent"
                disabled={submitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </main>
  )
}
