import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Calendar, Heart, MessageCircle, Star, Package } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ItemDetailPage() {
  // Mock item data - will be replaced with real data from database
  const item = {
    id: 1,
    title: "Vintage Film Camera",
    description:
      "Beautiful vintage 35mm film camera in excellent working condition. Comes with original leather case and strap. Perfect for photography enthusiasts or collectors. Has been well-maintained and produces stunning photos. Great for anyone looking to get into analog photography!",
    category: "Electronics",
    condition: "Good",
    exchangeType: "Trade",
    lookingFor: "Books, plants, or vintage items",
    location: "Near UT Austin campus",
    postedDate: "2 days ago",
    images: ["/vintage-film-camera.jpg"],
    seller: {
      name: "Sarah Johnson",
      avatar: "/diverse-user-avatars.png",
      rating: 4.8,
      totalTrades: 24,
    },
  }

  const comments = [
    {
      id: 1,
      user: "Mike Chen",
      avatar: "/diverse-user-avatars.png",
      comment: "Is this still available? I have some vintage books I could trade!",
      date: "1 day ago",
    },
    {
      id: 2,
      user: "Emma Wilson",
      avatar: "/diverse-user-avatars.png",
      comment: "Beautiful camera! Does it come with any film?",
      date: "1 day ago",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="aspect-video relative bg-muted">
                <Image src={item.images[0] || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>
            </Card>

            {/* Item Details */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-balance">{item.title}</h1>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{item.exchangeType}</Badge>
                      <Badge variant="outline">{item.category}</Badge>
                      <Badge variant="outline">{item.condition}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>

                <Separator />

                <div>
                  <h2 className="font-semibold mb-2">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>

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

            {/* Comments Section */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Comments ({comments.length})</h2>
                </div>

                {/* Add Comment */}
                <div className="space-y-3">
                  <Textarea placeholder="Ask a question or leave a comment..." rows={3} />
                  <Button>Post Comment</Button>
                </div>

                <Separator />

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{comment.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{comment.user}</span>
                          <span className="text-xs text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{comment.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              {/* Seller Info */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-semibold">Listed By</h2>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={item.seller.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{item.seller.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Link href="/profile" className="font-semibold hover:underline">
                        {item.seller.name}
                      </Link>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span>{item.seller.rating}</span>
                        <span>·</span>
                        <span>{item.seller.totalTrades} trades</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">
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

              {/* Safety Tips */}
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
