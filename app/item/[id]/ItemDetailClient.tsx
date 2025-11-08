"use client"

// Import all UI components and Hooks
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, Heart, MessageCircle, Star, Package } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { mockItems } from "@/lib/mock-data" // Import mock data to get types

// Define Item type based on mock data structure
type Item = (typeof mockItems)[0]

// Props interface to receive data from server component
interface ItemDetailClientProps {
  item: Item
}

// Client component for displaying item details
// Receives item data as props from the server component (page.tsx)
export default function ItemDetailClient({ item }: ItemDetailClientProps) {
  const router = useRouter()
  
  // Item data is now received from props instead of being hardcoded

  // State management for trade requests and comments
  // Trade request status: pending, accepted, declined, cancelled, completed
  const [tradeStatus, setTradeStatus] = useState<string | null>(null)
  
  // Comments list - in production, this would be fetched from an API
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Smith",
      avatar: "/diverse-user-avatars.png",
      text: "Great item! Is it still available?",
      date: "1 day ago",
    },
    // Additional hardcoded comments would go here
  ])
  
  // New comment input state
  const [newComment, setNewComment] = useState("")

  // Mock trade request data - in production, this would come from props or API
  const tradeRequest = {
    id: 101,
    status: "pending", // Possible values: pending, accepted, declined, completed
    offeredItem: "Laptop Stand",
    offeredPrice: null,
  }

  // Navigate to messages page with seller information
  const handleMessageSeller = () => {
    console.log("[v0] Message Seller clicked for seller:", item.seller.name)
    router.push(`/messages?seller=${item.seller.name}`)
  }

  // Accept a pending trade request
  const handleAcceptTrade = () => {
    console.log("[v0] Accept Trade clicked for trade request:", tradeRequest.id)
    setTradeStatus("accepted")
    // In production, this would call an API to update the trade status
  }

  // Decline a pending trade request
  const handleDeclineTrade = () => {
    setTradeStatus("declined")
    // In production, this would call an API to update the trade status
  }

  // Cancel an active trade request
  const handleCancelRequest = () => {
    setTradeStatus("cancelled")
    // In production, this would call an API to cancel the trade
  }

  // Mark a trade as completed after successful exchange
  const handleMarkComplete = () => {
    setTradeStatus("completed")
    // In production, this would call an API to mark the trade as complete
  }

  // Post a new comment on the item
  const handlePostComment = () => {
    if (newComment.trim()) {
      console.log(`SIMULATE: Posting new comment on Item ID: ${item.id}`)
      const comment = {
        id: comments.length + 1,
        author: "Current User",
        avatar: "/diverse-user-avatars.png",
        text: newComment,
        date: "just now",
      }
      setComments([comment, ...comments])
      setNewComment("")
    }
  }
  return (
    <div>
      <main className="container mx-auto px-4 py-8">
        {/* Main layout: 2/3 for content, 1/3 for sidebar */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content Section - takes 2/3 of the width on large screens */}
          <div className="lg:col-span-2 space-y-6">
            {/* Item Image Gallery */}
            <Card className="overflow-hidden">
              <div className="aspect-video relative bg-muted">
                <Image src={item.images[0] || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>
            </Card>

            {/* Item Details Card */}
            <Card>
              <CardContent className="p-6 space-y-4">
                {/* Item Title and Badges */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-balance">{item.title}</h1>
                    {/* Display exchange type, category, and condition as badges */}
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{item.exchangeType}</Badge>
                      <Badge variant="outline">{item.category}</Badge>
                      <Badge variant="outline">{item.condition}</Badge>
                    </div>
                  </div>
                  {/* Favorite button - functionality to be implemented */}
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>

                <Separator />

                {/* Item Description */}
                <div>
                  <h2 className="font-semibold mb-2">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>

                {/* What the seller is looking for (optional field) */}
                {item.lookingFor && (
                  <>
                    <Separator />
                    <div>
                      <h2 className="font-semibold mb-2">Looking For</h2>
                      <p className="text-muted-foreground">{item.lookingFor}</p>
                    </div>
                  </>
                )}

                <Separator />

                {/* Item metadata: location and posting date */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {item.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Posted {item.postedDate}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trade Request Status Card - only shown if there's an active trade */}
            {tradeStatus && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Trade Request Status</h2>
                    <Badge className="capitalize">{tradeStatus}</Badge>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    {/* Display the item being offered in trade */}
                    <p className="text-sm text-muted-foreground">
                      <strong>Offered Item:</strong> {tradeRequest.offeredItem}
                    </p>
                    {/* Action buttons based on trade status */}
                    {tradeStatus === "pending" && (
                      <div className="flex gap-2">
                        <Button onClick={handleAcceptTrade} className="flex-1">
                          Accept Trade
                        </Button>
                        <Button onClick={handleDeclineTrade} variant="outline" className="flex-1 bg-transparent">
                          Decline
                        </Button>
                      </div>
                    )}
                    {tradeStatus === "accepted" && (
                      <Button onClick={handleMarkComplete} className="w-full">
                        Mark as Complete
                      </Button>
                    )}
                    {/* Cancel option available for pending or accepted trades */}
                    {(tradeStatus === "pending" || tradeStatus === "accepted") && (
                      <Button onClick={handleCancelRequest} variant="destructive" className="w-full">
                        Cancel Request
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Comments Section - allows users to view and post comments */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-semibold">Comments</h2>
                <Separator />

                {/* Comment Form - input field and submit button */}
                <div className="space-y-3">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Post a comment..."
                    className="w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                  />
                  <Button onClick={handlePostComment} className="w-full">
                    Post Comment
                  </Button>
                </div>

                <Separator />

                {/* Comments List - displays all comments with author info */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      {/* Comment author avatar */}
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{comment.author[0]}</AvatarFallback>
                      </Avatar>
                      {/* Comment content with author name and timestamp */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - takes 1/3 of the width on large screens, sticky positioned */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              {/* Seller Information Card */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-semibold">Listed By</h2>
                  {/* Seller profile with avatar, name, rating, and trade count */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={item.seller.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{item.seller.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Link href="/profile" className="font-semibold hover:underline">
                        {item.seller.name}
                      </Link>
                      {/* Seller rating and total trades count */}
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span>{item.seller.rating}</span>
                        <span>·</span>
                        <span>{item.seller.totalTrades} trades</span>
                      </div>
                    </div>
                  </div>
                  {/* Action buttons for contacting seller and requesting trade */}
                  <Button className="w-full" onClick={handleMessageSeller}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message Seller
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href={`/transactions/request/${item.id}`}>
                      <Package className="h-4 w-4 mr-2" />
                      Request Trade
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Safety Tips Card - provides safety guidelines for users */}
              <Card className="bg-muted/50">
                <CardContent className="p-6 space-y-2">
                  <h3 className="font-semibold text-sm">Safety Tips</h3>
                  <ul className="text-xs text-muted-foreground space-y-1 leading-relaxed">
                    <li>• Meet in public places</li>
                    <li>• Inspect items before trading</li>
                    <li>• Trust your instincts</li>
                    <li>• Report suspicious activity</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}