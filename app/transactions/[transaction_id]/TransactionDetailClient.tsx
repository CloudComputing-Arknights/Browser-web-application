"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowRightLeft, CheckCircle2, Clock, MessageCircle, XCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import TransactionClient from "@/lib/clients/TransactionClient"
import ItemsClient from "@/lib/clients/ItemsClient"
import UserClient from "@/lib/clients/UserClient"
import type { TransactionRes, ItemRead, PublicUserRes } from "@/client"

interface TransactionDetailClientProps {
  transactionId: string
}

// Timeline step interface
interface TimelineStep {
  label: string
  date: string
  completed: boolean
}

// Generate timeline based on current status
function generateTimeline(
  status: string,
  type: string,
  createdAt: string,
  updatedAt: string
): TimelineStep[] {
  const steps: TimelineStep[] = []
  
  // Step 1: Request Sent (always completed)
  steps.push({
    label: "Request Sent",
    date: new Date(createdAt).toLocaleDateString(),
    completed: true
  })
  
  // Step 2: Awaiting Response
  steps.push({
    label: "Awaiting Response",
    date: status !== "pending" ? new Date(updatedAt).toLocaleDateString() : "Pending",
    completed: status !== "pending"
  })
  
  // Step 3: Status-specific step
  if (status === "accepted") {
    steps.push({
      label: "Accepted",
      date: new Date(updatedAt).toLocaleDateString(),
      completed: true
    })
    steps.push({
      label: "Arrange Meetup",
      date: "In Progress",
      completed: false
    })
    steps.push({
      label: "Complete Transaction",
      date: "Pending",
      completed: false
    })
  } else if (status === "completed") {
    steps.push({
      label: "Accepted",
      date: new Date(createdAt).toLocaleDateString(),
      completed: true
    })
    steps.push({
      label: "Meetup Arranged",
      date: new Date(createdAt).toLocaleDateString(),
      completed: true
    })
    steps.push({
      label: "Completed",
      date: new Date(updatedAt).toLocaleDateString(),
      completed: true
    })
  } else if (status === "rejected") {
    steps.push({
      label: "Rejected",
      date: new Date(updatedAt).toLocaleDateString(),
      completed: true
    })
  } else if (status === "canceled") {
    steps.push({
      label: "Canceled",
      date: new Date(updatedAt).toLocaleDateString(),
      completed: true
    })
  }
  
  return steps
}

export default function TransactionDetailClient({ transactionId }: TransactionDetailClientProps) {
  const [transaction, setTransaction] = useState<TransactionRes | null>(null)
  const [requestedItem, setRequestedItem] = useState<ItemRead | null>(null)
  const [offeredItem, setOfferedItem] = useState<ItemRead | null>(null)
  const [initiatorUser, setInitiatorUser] = useState<PublicUserRes | null>(null)
  const [receiverUser, setReceiverUser] = useState<PublicUserRes | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const transactionClient = new TransactionClient()
        const data = await transactionClient.getTransaction(transactionId)
        setTransaction(data)

        // Fetch item and user details in parallel
        const itemsClient = new ItemsClient()
        const userClient = new UserClient()
        
        const [reqItem, offItem, initUser, recUser] = await Promise.all([
          // Fetch requested item
          itemsClient.getItemById(data.requested_item_id).catch(err => {
            console.error("Failed to fetch requested item:", err)
            return null
          }),
          // Fetch offered item (if exists)
          data.offered_item_id 
            ? itemsClient.getItemById(data.offered_item_id).catch(err => {
                console.error("Failed to fetch offered item:", err)
                return null
              })
            : Promise.resolve(null),
          // Fetch initiator user
          userClient.getUserById(data.initiator_user_id).catch(err => {
            console.error("Failed to fetch initiator user:", err)
            return null
          }),
          // Fetch receiver user
          userClient.getUserById(data.receiver_user_id).catch(err => {
            console.error("Failed to fetch receiver user:", err)
            return null
          })
        ])

        setRequestedItem(reqItem)
        setOfferedItem(offItem)
        setInitiatorUser(initUser)
        setReceiverUser(recUser)
      } catch (err) {
        setError("Failed to fetch transaction details.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTransaction()
  }, [transactionId])

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Loading transaction details...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !transaction) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <p className="text-destructive">{error || "Transaction not found"}</p>
              <Button asChild>
                <Link href="/transactions">Back to Transactions</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const timeline = generateTimeline(
    transaction.status,
    transaction.type,
    transaction.created_at,
    transaction.updated_at
  )

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
                <p className="text-muted-foreground mt-1">
                  Request #{transaction.transaction_id.slice(0, 8)}...
                </p>
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
                          src={requestedItem?.image_urls?.[0] || "/placeholder.svg"}
                          alt={requestedItem?.title || "Requested Item"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {requestedItem?.title || `Item ${transaction.requested_item_id.slice(0, 8)}...`}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={receiverUser?.avatar_url || "/placeholder.svg"} />
                            <AvatarFallback>
                              {receiverUser?.username?.[0]?.toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">
                            {receiverUser?.username || transaction.receiver_user_id.slice(0, 8) + "..."}
                          </span>
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
                      {transaction.type === "trade" && offeredItem ? "Offered Item" : "Offered Price"}
                    </p>
                    {transaction.type === "trade" && offeredItem ? (
                      <div className="space-y-3">
                        <div className="relative h-32 w-full rounded-lg overflow-hidden border">
                          <Image
                            src={offeredItem.image_urls?.[0] || "/placeholder.svg"}
                            alt={offeredItem.title || "Offered Item"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {offeredItem.title || `Item ${transaction.offered_item_id?.slice(0, 8)}...`}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={initiatorUser?.avatar_url || "/placeholder.svg"} />
                              <AvatarFallback>
                                {initiatorUser?.username?.[0]?.toUpperCase() || "U"}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">
                              {initiatorUser?.username || transaction.initiator_user_id.slice(0, 8) + "..."}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-32 border rounded-lg bg-muted/50">
                        <div className="text-center">
                          <p className="text-3xl font-bold">
                            ${transaction.offered_price?.toFixed(2) || "0.00"}
                          </p>
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
                  {timeline.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            step.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {step.completed ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                        </div>
                        {index < timeline.length - 1 && (
                          <div className={`w-0.5 h-12 ${step.completed ? "bg-primary" : "bg-muted"}`} />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <p className={`font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                          {step.label}
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
                    <span className="text-sm text-muted-foreground">Initiator</span>
                    <span className="text-sm font-medium">
                      {initiatorUser?.username || transaction.initiator_user_id.slice(0, 12) + "..."}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Receiver</span>
                    <span className="text-sm font-medium">
                      {receiverUser?.username || transaction.receiver_user_id.slice(0, 12) + "..."}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Created</span>
                    <span className="text-sm font-medium">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Last Updated</span>
                    <span className="text-sm font-medium">
                      {new Date(transaction.updated_at).toLocaleDateString()}
                    </span>
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

