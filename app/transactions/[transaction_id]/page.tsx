import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowRightLeft, CheckCircle2, Clock, MessageCircle, XCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function TransactionDetailPage({ params }: { params: { transaction_id: string } }) {
  // Mock transaction data
  const transaction = {
    id: params.transaction_id,
    status: "canceled", // pending, accepted, rejected, canceled, completed
    type: "trade", // trade or purchase
    created_at: "2 hours ago",
    updated_at: "2 hours ago",
    requestedItem: {
      id: "1",
      title: "Vintage Film Camera",
      image: "/vintage-film-camera.jpg",
      owner: {
        name: "Sarah Johnson",
        avatar: "/diverse-user-avatars.png",
      },
    },
    offeredItem: {
      id: "2",
      title: "Collection of Programming Books",
      image: "/programming-books-stack.jpg",
    },
    offered_price: "50.00", // or a number like 50.00
    requester: {
      name: "Mike Chen",
      avatar: "/diverse-user-avatars.png",
    },
    message: "Hi! I'd love to trade my programming books for your camera. They're in excellent condition!",
    meetupLocation: "NYU", // Set when accepted
    timeline: [
      { status: "Request Sent", date: "2 hours ago", completed: true },
      { status: "Awaiting Response", date: "Pending", completed: false },
      { status: "Arrange Meetup", date: "Pending", completed: false },
      { status: "Complete Trade", date: "Pending", completed: false },
    ],
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "accepted":
        return (
          <Badge className="bg-blue-500">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Accepted
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      case "canceled":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Canceled
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-green-500">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/transactions" className="text-sm text-muted-foreground hover:underline">
              ← Back to transactions
            </Link>
            <div className="flex items-center justify-between mt-2">
              <div>
                <h1 className="text-3xl font-bold">Transaction Details</h1>
                <p className="text-muted-foreground mt-1">Request #{transaction.id}</p>
              </div>
              {getStatusBadge(transaction.status)}
            </div>
          </div>

          <div className="space-y-6">
            {/* Trade Overview */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg mb-4">Trade Overview</h2>
                <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr]">
                  {/* Requested Item */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">Requested Item</p>
                    <div className="space-y-3">
                      <div className="relative h-32 w-full rounded-lg overflow-hidden border">
                        <Image
                          src={transaction.requestedItem.image || "/placeholder.svg"}
                          alt={transaction.requestedItem.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{transaction.requestedItem.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={transaction.requestedItem.owner.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{transaction.requestedItem.owner.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{transaction.requestedItem.owner.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Exchange Icon */}
                  <div className="flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <ArrowRightLeft className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  {/* Offered Item/Price */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">
                      {transaction.type === "trade" ? "Offered Item" : "Offered Price"}
                    </p>
                    {transaction.type === "trade" && transaction.offeredItem ? (
                      <div className="space-y-3">
                        <div className="relative h-32 w-full rounded-lg overflow-hidden border">
                          <Image
                            src={transaction.offeredItem.image || "/placeholder.svg"}
                            alt={transaction.offeredItem.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{transaction.offeredItem.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={transaction.requester.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{transaction.requester.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">{transaction.requester.name}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-32 border rounded-lg bg-muted/50">
                        <div className="text-center">
                          <p className="text-3xl font-bold">${transaction.offered_price || "0.00"}</p>
                          <p className="text-sm text-muted-foreground mt-1">Purchase Offer</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {transaction.message && (
                  <>
                    <Separator className="my-6" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Message from requester</p>
                      <p className="text-sm leading-relaxed">{transaction.message}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg mb-4">Transaction Timeline</h2>
                <div className="space-y-4">
                  {transaction.timeline.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            step.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {step.completed ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                        </div>
                        {index < transaction.timeline.length - 1 && (
                          <div className={`w-0.5 h-12 ${step.completed ? "bg-primary" : "bg-muted"}`} />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <p className={`font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                          {step.status}
                        </p>
                        <p className="text-sm text-muted-foreground">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Transaction Details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg mb-4">Details</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Transaction Type</span>
                    <Badge variant="outline">{transaction.type === "trade" ? "Trade" : "Purchase"}</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Created</span>
                    <span className="text-sm font-medium">{transaction.created_at}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Last Updated</span>
                    <span className="text-sm font-medium">{transaction.updated_at}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            {transaction.status === "accepted" && (
              <Button size="lg" className="w-full" asChild>
                <Link href="/messages">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message to Arrange Meetup
                </Link>
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
