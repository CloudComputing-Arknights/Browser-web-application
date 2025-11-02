"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, CheckCircle2, XCircle, ArrowRightLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function TransactionsPage() {
  // Mock data for trade requests
  const pendingRequests = [
    {
      id: 1,
      type: "received",
      item: "Vintage Film Camera",
      itemImage: "/vintage-film-camera.jpg",
      user: "Mike Chen",
      userAvatar: "/diverse-user-avatars.png",
      offeredItem: "Collection of Programming Books",
      offeredImage: "/programming-books-stack.jpg",
      date: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      type: "sent",
      item: "Office Chair",
      itemImage: "/modern-office-chair.png",
      user: "Emma Wilson",
      userAvatar: "/diverse-user-avatars.png",
      offeredItem: "Desk Lamp",
      offeredImage: "/modern-desk-lamp.png",
      date: "1 day ago",
      status: "pending",
    },
  ]

  const activeTransactions = [
    {
      id: 1,
      item: "Programming Books",
      itemImage: "/programming-books-stack.jpg",
      user: "Alex Rodriguez",
      userAvatar: "/diverse-user-avatars.png",
      type: "Trade",
      status: "In Progress",
      date: "3 days ago",
      nextStep: "Arrange meetup",
    },
  ]

  const completedTransactions = [
    {
      id: 1,
      item: "Office Chair",
      itemImage: "/modern-office-chair.png",
      user: "Sarah Kim",
      userAvatar: "/diverse-user-avatars.png",
      type: "Trade",
      completedDate: "1 week ago",
      rating: 5,
    },
    {
      id: 2,
      item: "Desk Lamp",
      itemImage: "/modern-desk-lamp.png",
      user: "John Doe",
      userAvatar: "/diverse-user-avatars.png",
      type: "Give Away",
      completedDate: "2 weeks ago",
      rating: 5,
    },
  ]

  const handleAcceptTrade = (e: React.MouseEvent, requestId: number) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(`[v0] Accept Trade clicked for request ID: ${requestId}`)
  }

  const handleDecline = (e: React.MouseEvent, requestId: number) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(`[v0] Decline clicked for request ID: ${requestId}`)
  }

  const handleCancelRequest = (e: React.MouseEvent, requestId: number) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(`[v0] Cancel Request clicked for request ID: ${requestId}`)
  }

  const handleMarkAsComplete = (e: React.MouseEvent, transactionId: number) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(`[v0] Mark as Complete clicked for transaction ID: ${transactionId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Transactions</h1>
            <p className="text-muted-foreground mt-1">Manage your trades and exchanges</p>
          </div>

          <Tabs defaultValue="requests" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="requests">
                <Clock className="h-4 w-4 mr-2" />
                Requests
                <Badge variant="secondary" className="ml-2">
                  {pendingRequests.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="active">
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Active
              </TabsTrigger>
              <TabsTrigger value="completed">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Completed
              </TabsTrigger>
            </TabsList>

            {/* Pending Requests */}
            <TabsContent value="requests" className="mt-6">
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <Link key={request.id} href={`/transactions/${request.id}`}>
                    <Card className="cursor-pointer hover:border-primary/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <Badge variant={request.type === "received" ? "default" : "secondary"}>
                            {request.type === "received" ? "Request Received" : "Request Sent"}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{request.date}</span>
                        </div>

                        <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr]">
                          {/* Your Item */}
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-muted-foreground">
                              {request.type === "received" ? "Your Item" : "Requested Item"}
                            </p>
                            <div className="flex gap-3">
                              <div className="relative h-20 w-20 rounded-lg overflow-hidden border flex-shrink-0">
                                <Image
                                  src={request.itemImage || "/placeholder.svg"}
                                  alt={request.item}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold">{request.item}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={request.userAvatar || "/placeholder.svg"} />
                                    <AvatarFallback>{request.user[0]}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-muted-foreground">{request.user}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Exchange Icon */}
                          <div className="flex items-center justify-center">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <ArrowRightLeft className="h-5 w-5 text-primary" />
                            </div>
                          </div>

                          {/* Offered Item */}
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-muted-foreground">
                              {request.type === "received" ? "Offered Item" : "Your Item"}
                            </p>
                            <div className="flex gap-3">
                              <div className="relative h-20 w-20 rounded-lg overflow-hidden border flex-shrink-0">
                                <Image
                                  src={request.offeredImage || "/placeholder.svg"}
                                  alt={request.offeredItem}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold">{request.offeredItem}</h3>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        {request.type === "received" ? (
                          <div className="flex gap-3 mt-6">
                            <Button className="flex-1" onClick={(e) => handleAcceptTrade(e, request.id)}>
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Accept Trade
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 bg-transparent"
                              onClick={(e) => handleDecline(e, request.id)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Decline
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-3 mt-6">
                            <Button
                              variant="outline"
                              className="flex-1 bg-transparent"
                              onClick={(e) => handleCancelRequest(e, request.id)}
                            >
                              Cancel Request
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>

            {/* Active Transactions */}
            <TabsContent value="active" className="mt-6">
              <div className="space-y-4">
                {activeTransactions.map((transaction) => (
                  <Link key={transaction.id} href={`/transactions/${transaction.id}`}>
                    <Card className="cursor-pointer hover:border-primary/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="relative h-24 w-24 rounded-lg overflow-hidden border flex-shrink-0">
                            <Image
                              src={transaction.itemImage || "/placeholder.svg"}
                              alt={transaction.item}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{transaction.item}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={transaction.userAvatar || "/placeholder.svg"} />
                                    <AvatarFallback>{transaction.user[0]}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-muted-foreground">{transaction.user}</span>
                                </div>
                              </div>
                              <Badge variant="secondary">{transaction.status}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                              <span>{transaction.type}</span>
                              <span>•</span>
                              <span>{transaction.date}</span>
                            </div>
                            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                              <p className="text-sm">
                                <span className="font-medium">Next Step:</span> {transaction.nextStep}
                              </p>
                            </div>
                            <div className="flex gap-3 mt-4">
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  window.location.href = "/messages"
                                }}
                              >
                                Message User
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-transparent"
                                onClick={(e) => handleMarkAsComplete(e, transaction.id)}
                              >
                                Mark as Complete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>

            {/* Completed Transactions */}
            <TabsContent value="completed" className="mt-6">
              <div className="space-y-4">
                {completedTransactions.map((transaction) => (
                  <Link key={transaction.id} href={`/transactions/${transaction.id}`}>
                    <Card className="cursor-pointer hover:border-primary/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="relative h-20 w-20 rounded-lg overflow-hidden border flex-shrink-0">
                            <Image
                              src={transaction.itemImage || "/placeholder.svg"}
                              alt={transaction.item}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold">{transaction.item}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={transaction.userAvatar || "/placeholder.svg"} />
                                    <AvatarFallback>{transaction.user[0]}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-muted-foreground">{transaction.user}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                                  <Badge variant="outline">{transaction.type}</Badge>
                                  <span>•</span>
                                  <span>Completed {transaction.completedDate}</span>
                                </div>
                              </div>
                              <Badge variant="default" className="bg-green-500">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Completed
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
