"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, CheckCircle2, XCircle, ArrowRightLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import TransactionClient from "@/lib/clients/TransactionClient"
import ItemsClient from "@/lib/clients/ItemsClient"
import UserClient from "@/lib/clients/UserClient"
import type { TransactionRes, ItemRead, PublicUserRes } from "@/client"
import { fetchCurrentUser, isUserLoggedIn } from "@/lib/auth"

// Extended Transaction type with additional frontend fields
type EnrichedTransaction = TransactionRes & {
  type_display: "received" | "sent"  // Whether the request was received or sent
  requested_item?: ItemRead  // Detailed information about the requested item
  offered_item?: ItemRead    // Detailed information about the offered item
  initiator_user?: PublicUserRes  // Information about the initiator user
  receiver_user?: PublicUserRes   // Information about the receiver user
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<EnrichedTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  // Fetch current user ID and transaction list
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Check login status
        if (!isUserLoggedIn()) {
          setError("Please log in to view transactions")
          setLoading(false)
          return
        }

        // Fetch current user information
        const user = await fetchCurrentUser()
        setCurrentUserId(user.id)

        // Fetch all transactions (backend automatically filters transactions related to current user)
        const transactionClient = new TransactionClient()
        const data = await transactionClient.listTransactions({
          limit: 100,
          offset: 0,
        })

        // Fetch detailed information for all related Items and Users
        const itemsClient = new ItemsClient()
        const userClient = new UserClient()
        const enrichedData: EnrichedTransaction[] = await Promise.all(
          data.map(async (transaction) => {
            const enriched: EnrichedTransaction = {
              ...transaction,
              type_display: transaction.initiator_user_id === user.id ? "sent" : "received"
            }

            // Fetch requested_item details
            try {
              enriched.requested_item = await itemsClient.getItemById(transaction.requested_item_id)
            } catch (err) {
              console.error(`Failed to fetch item ${transaction.requested_item_id}:`, err)
            }

            // Fetch offered_item details (if exists)
            if (transaction.offered_item_id) {
              try {
                enriched.offered_item = await itemsClient.getItemById(transaction.offered_item_id)
              } catch (err) {
                console.error(`Failed to fetch item ${transaction.offered_item_id}:`, err)
              }
            }

            // Fetch initiator_user details
            try {
              enriched.initiator_user = await userClient.getUserById(transaction.initiator_user_id)
            } catch (err) {
              console.error(`Failed to fetch user ${transaction.initiator_user_id}:`, err)
            }

            // Fetch receiver_user details
            try {
              enriched.receiver_user = await userClient.getUserById(transaction.receiver_user_id)
            } catch (err) {
              console.error(`Failed to fetch user ${transaction.receiver_user_id}:`, err)
            }

            return enriched
          })
        )

        setTransactions(enrichedData)
      } catch (err) {
        console.error("Failed to fetch transactions:", err)
        setError("Failed to load transactions")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Helper function to refresh transaction list
  const refreshTransactions = async () => {
    try {
      const transactionClient = new TransactionClient()
      const itemsClient = new ItemsClient()
      const userClient = new UserClient()
      
      const data = await transactionClient.listTransactions({ limit: 100, offset: 0 })
      
      const enrichedData: EnrichedTransaction[] = await Promise.all(
        data.map(async (transaction) => {
          const enriched: EnrichedTransaction = {
            ...transaction,
            type_display: transaction.initiator_user_id === currentUserId ? "sent" : "received"
          }

          try {
            enriched.requested_item = await itemsClient.getItemById(transaction.requested_item_id)
          } catch (err) {
            console.error(`Failed to fetch item:`, err)
          }

          if (transaction.offered_item_id) {
            try {
              enriched.offered_item = await itemsClient.getItemById(transaction.offered_item_id)
            } catch (err) {
              console.error(`Failed to fetch item:`, err)
            }
          }

          try {
            enriched.initiator_user = await userClient.getUserById(transaction.initiator_user_id)
          } catch (err) {
            console.error(`Failed to fetch user:`, err)
          }

          try {
            enriched.receiver_user = await userClient.getUserById(transaction.receiver_user_id)
          } catch (err) {
            console.error(`Failed to fetch user:`, err)
          }

          return enriched
        })
      )
      
      setTransactions(enrichedData)
    } catch (err) {
      console.error("Failed to refresh transactions:", err)
    }
  }

  // Button event handler: Accept trade
  const handleAcceptTrade = async (e: React.MouseEvent, transactionId: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      const client = new TransactionClient()
      await client.updateTransaction(transactionId, { status: "accepted" })
      await refreshTransactions()
    } catch (err) {
      console.error("Failed to accept trade:", err)
      alert("Failed to accept trade. Please try again.")
    }
  }

  // Button event handler: Decline trade
  const handleDecline = async (e: React.MouseEvent, transactionId: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      const client = new TransactionClient()
      await client.updateTransaction(transactionId, { status: "rejected" })
      await refreshTransactions()
    } catch (err) {
      console.error("Failed to decline trade:", err)
      alert("Failed to decline trade. Please try again.")
    }
  }

  // Button event handler: Cancel request
  const handleCancelRequest = async (e: React.MouseEvent, transactionId: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      const client = new TransactionClient()
      await client.updateTransaction(transactionId, { status: "canceled" })
      await refreshTransactions()
    } catch (err) {
      console.error("Failed to cancel request:", err)
      alert("Failed to cancel request. Please try again.")
    }
  }

  // Button event handler: Mark as complete
  const handleMarkAsComplete = async (e: React.MouseEvent, transactionId: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      const client = new TransactionClient()
      await client.updateTransaction(transactionId, { status: "completed" })
      await refreshTransactions()
    } catch (err) {
      console.error("Failed to mark as complete:", err)
      alert("Failed to mark transaction as complete. Please try again.")
    }
  }

  // Filter transactions by status
  const pendingTransactions = transactions.filter((t) => t.status === "pending")
  const activeTransactions = transactions.filter((t) => t.status === "accepted")
  const completedTransactions = transactions.filter((t) => t.status === "completed")

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Loading transactions...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <p className="text-destructive">{error}</p>
              <Button asChild>
                <Link href="/login">Go to Login</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
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
                  {pendingTransactions.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="active">
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Active
                <Badge variant="secondary" className="ml-2">
                  {activeTransactions.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="completed">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Completed
                <Badge variant="secondary" className="ml-2">
                  {completedTransactions.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            {/* Pending Requests */}
            <TabsContent value="requests" className="mt-6">
              <div className="space-y-4">
                {pendingTransactions.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <p className="text-muted-foreground">No pending requests</p>
                    </CardContent>
                  </Card>
                ) : (
                  pendingTransactions.map((request) => (
                    <Link key={request.transaction_id} href={`/transactions/${request.transaction_id}`}>
                      <Card className="cursor-pointer hover:border-primary/50 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <Badge variant={request.type_display === "received" ? "default" : "secondary"}>
                              {request.type_display === "received" ? "Request Received" : "Request Sent"}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {new Date(request.created_at).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr]">
                            {/* Left: Your Item / Requested Item */}
                            <div className="space-y-3">
                              <p className="text-sm font-medium text-muted-foreground">
                                {request.type_display === "received" ? "Your Item" : "Requested Item"}
                              </p>
                              <div className="flex gap-3">
                                <div className="relative h-20 w-20 rounded-lg overflow-hidden border flex-shrink-0">
                                  <Image
                                    src={request.requested_item?.image_urls?.[0] || "/placeholder.svg"}
                                    alt={request.requested_item?.title || "Item"}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-sm">
                                    {request.requested_item?.title || `Item ID: ${request.requested_item_id.slice(0, 8)}...`}
                                  </h3>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {request.type_display === "received" 
                                      ? `From: ${request.initiator_user?.username || request.initiator_user_id.slice(0, 8) + '...'}`
                                      : `Owner: ${request.receiver_user?.username || request.receiver_user_id.slice(0, 8) + '...'}`
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Exchange Icon */}
                            <div className="flex items-center justify-center">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <ArrowRightLeft className="h-5 w-5 text-primary" />
                              </div>
                            </div>

                            {/* Right: Offered Item / Offered Price */}
                            <div className="space-y-3">
                              <p className="text-sm font-medium text-muted-foreground">
                                {request.type === "trade" && request.offered_item ? "Offered Item" : "Offered Price"}
                              </p>
                              {request.type === "trade" && request.offered_item ? (
                                <div className="flex gap-3">
                                  <div className="relative h-20 w-20 rounded-lg overflow-hidden border flex-shrink-0">
                                    <Image
                                      src={request.offered_item.image_urls?.[0] || "/placeholder.svg"}
                                      alt={request.offered_item.title || "Offered Item"}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-sm">
                                      {request.offered_item.title || `Item ID: ${request.offered_item_id?.slice(0, 8)}...`}
                                    </h3>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center h-20">
                                  <p className="text-2xl font-bold">
                                    ${request.offered_price?.toFixed(2) || "0.00"}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {request.message && (
                            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                              <p className="text-sm">{request.message}</p>
                            </div>
                          )}

                          {/* Actions */}
                          {request.type_display === "received" ? (
                            <div className="flex gap-3 mt-6">
                              <Button 
                                className="flex-1" 
                                onClick={(e) => handleAcceptTrade(e, request.transaction_id)}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Accept Trade
                              </Button>
                              <Button
                                variant="outline"
                                className="flex-1 bg-transparent"
                                onClick={(e) => handleDecline(e, request.transaction_id)}
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
                                onClick={(e) => handleCancelRequest(e, request.transaction_id)}
                              >
                                Cancel Request
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Active Transactions */}
            <TabsContent value="active" className="mt-6">
              <div className="space-y-4">
                {activeTransactions.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <p className="text-muted-foreground">No active transactions</p>
                    </CardContent>
                  </Card>
                ) : (
                  activeTransactions.map((transaction) => (
                    <Link key={transaction.transaction_id} href={`/transactions/${transaction.transaction_id}`}>
                      <Card className="cursor-pointer hover:border-primary/50 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="relative h-24 w-24 rounded-lg overflow-hidden border flex-shrink-0">
                              <Image
                                src={transaction.requested_item?.image_urls?.[0] || "/placeholder.svg"}
                                alt={transaction.requested_item?.title || "Transaction Item"}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold text-lg">
                                    {transaction.requested_item?.title || `Item: ${transaction.requested_item_id.slice(0, 12)}...`}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    With: {transaction.type_display === "sent" 
                                      ? transaction.receiver_user?.username || transaction.receiver_user_id.slice(0, 12) + '...'
                                      : transaction.initiator_user?.username || transaction.initiator_user_id.slice(0, 12) + '...'
                                    }
                                  </p>
                                </div>
                                <Badge variant="secondary">{transaction.status}</Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                                <span>{transaction.type === "trade" ? "Trade" : "Purchase"}</span>
                                <span>•</span>
                                <span>{new Date(transaction.created_at).toLocaleDateString()}</span>
                              </div>
                              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                                <p className="text-sm">
                                  <span className="font-medium">Next Step:</span> Arrange meetup
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
                                  onClick={(e) => handleMarkAsComplete(e, transaction.transaction_id)}
                                >
                                  Mark as Complete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Completed Transactions */}
            <TabsContent value="completed" className="mt-6">
              <div className="space-y-4">
                {completedTransactions.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <p className="text-muted-foreground">No completed transactions</p>
                    </CardContent>
                  </Card>
                ) : (
                  completedTransactions.map((transaction) => (
                    <Link key={transaction.transaction_id} href={`/transactions/${transaction.transaction_id}`}>
                      <Card className="cursor-pointer hover:border-primary/50 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="relative h-20 w-20 rounded-lg overflow-hidden border flex-shrink-0">
                              <Image
                                src={transaction.requested_item?.image_urls?.[0] || "/placeholder.svg"}
                                alt={transaction.requested_item?.title || "Transaction Item"}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold">
                                    {transaction.requested_item?.title || `Item: ${transaction.requested_item_id.slice(0, 12)}...`}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    With: {transaction.type_display === "sent"
                                      ? transaction.receiver_user?.username || transaction.receiver_user_id.slice(0, 12) + '...'
                                      : transaction.initiator_user?.username || transaction.initiator_user_id.slice(0, 12) + '...'
                                    }
                                  </p>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                                    <Badge variant="outline">
                                      {transaction.type === "trade" ? "Trade" : "Purchase"}
                                    </Badge>
                                    <span>•</span>
                                    <span>Completed {new Date(transaction.updated_at).toLocaleDateString()}</span>
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
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
