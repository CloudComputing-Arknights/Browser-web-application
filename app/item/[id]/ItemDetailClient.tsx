"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, Heart, MessageCircle, Star, Package, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

import { getOpenAPIConfiguration } from "@/lib/APIConfig"
import { ItemsApi, ItemRead } from "@/client"

interface ItemDetailClientProps {
    itemId: string
}

export default function ItemDetailClient({ itemId }: ItemDetailClientProps) {
    const router = useRouter()

    const [item, setItem] = useState<ItemRead | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Mock Comment Data, may not need this
    const [comments, setComments] = useState([
        { id: 1, author: "System", avatar: "", text: "Test comment mock data!", date: "Now" },
    ])
    const [newComment, setNewComment] = useState("")

    useEffect(() => {
        const fetchItemDetails = async () => {
            setLoading(true)
            try {
                const config = getOpenAPIConfiguration();
                const itemsApi = new ItemsApi(config);

                // get a single item from back-end
                const response = await itemsApi.getPublicItemByIdItemsItemIdGet(itemId);
                setItem(response.data);
            } catch (err) {
                console.error("Failed to fetch item details:", err);
                setError("Item not found or an error occurred.");
            } finally {
                setLoading(false);
            }
        };

        if (itemId) {
            fetchItemDetails();
        }
    }, [itemId]);

    // =============================== Handle Event ===============================
    const handleMessageSeller = () => {
        // router.push(`/messages?seller=${item?.owner_id}`)
        console.log("Message seller clicked")
    }

    const handlePostComment = () => {
        if (newComment.trim()) {
            setComments([...comments, {
                id: comments.length + 1,
                author: "Me",
                avatar: "",
                text: newComment,
                date: "Just now"
            }])
            setNewComment("")
        }
    }

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

    if (error || !item) {
        return (
            <main className="container mx-auto px-4 py-20 flex justify-center">
                <Card className="w-full max-w-md p-6 text-center">
                    <div className="flex justify-center mb-4">
                        <AlertCircle className="h-10 w-10 text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Error</h2>
                    <p className="text-muted-foreground mb-4">{error || "Item not found"}</p>
                    <Button onClick={() => router.push('/browse-items')}>Back to Browse</Button>
                </Card>
            </main>
        )
    }

    const mainImage = (item.image_urls && item.image_urls.length > 0) ? item.image_urls[0] : "/placeholder.svg";

    return (
        <div>
            <main className="container mx-auto px-4 py-8">
                <div className="grid gap-8 lg:grid-cols-3">

                    <div className="lg:col-span-2 space-y-6">
                        {/* Image */}
                        <Card className="overflow-hidden">
                            <div className="aspect-video relative bg-muted">
                                {/* Note: If mainImage is http link, should set images.remotePatterns in next.config.js */}
                                <img
                                    src={mainImage}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </Card>

                        {/* Main Info */}
                        <Card>
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h1 className="text-3xl font-bold text-balance">{item.title}</h1>
                                        <div className="flex items-center gap-2 mt-2">
                                            {/* transaction_type */}
                                            <Badge variant="secondary">{item.transaction_type}</Badge>
                                            {/* categories */}
                                            {/*{item.categories && item.categories.length > 0 && (*/}
                                            {/*    <Badge variant="outline">{item.categories[0].name}</Badge>*/}
                                            {/*)}*/}
                                            {item.categories && item.categories.length > 0 && (
                                                <div className="flex gap-2 flex-wrap">
                                                    {item.categories.map((cat, idx) => (
                                                        <Badge
                                                            key={cat.id ?? `${cat.name ?? 'cat'}-${idx}`}
                                                            variant="outline"
                                                        >
                                                            {cat.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}

                                            {/* price */}
                                            <Badge variant="default" className="text-lg">
                                                ${item.price}
                                            </Badge>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <Heart className="h-5 w-5" />
                                    </Button>
                                </div>

                                <Separator />

                                <div>
                                    <h2 className="font-semibold mb-2">Description</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {item.description || "No description provided."}
                                    </p>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {item.address?.city+" "+item.address?.street || "Location Hidden"}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        Updated at: {item.updated_at ? new Date(item.updated_at).toLocaleString() : "Hidden"}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* TODO: Comment: NOW is MOCK */}
                        {/*<Card>*/}
                        {/*    <CardContent className="p-6 space-y-4">*/}
                        {/*        <h2 className="text-lg font-semibold">Comments</h2>*/}
                        {/*        <Separator />*/}
                        {/*        <div className="space-y-3">*/}
                        {/*          <textarea*/}
                        {/*              value={newComment}*/}
                        {/*              onChange={(e) => setNewComment(e.target.value)}*/}
                        {/*              placeholder="Post a comment..."*/}
                        {/*              className="w-full px-3 py-2 border rounded-md bg-background"*/}
                        {/*              rows={3}*/}
                        {/*          />*/}
                        {/*            <Button onClick={handlePostComment} className="w-full">Post Comment</Button>*/}
                        {/*        </div>*/}
                        {/*        <div className="space-y-4 mt-4">*/}
                        {/*            {comments.map((comment) => (*/}
                        {/*                <div key={comment.id} className="flex gap-3">*/}
                        {/*                    <Avatar className="h-8 w-8">*/}
                        {/*                        <AvatarFallback>{comment.author[0]}</AvatarFallback>*/}
                        {/*                    </Avatar>*/}
                        {/*                    <div>*/}
                        {/*                        <div className="flex items-center gap-2">*/}
                        {/*                            <span className="font-semibold text-sm">{comment.author}</span>*/}
                        {/*                            <span className="text-xs text-muted-foreground">{comment.date}</span>*/}
                        {/*                        </div>*/}
                        {/*                        <p className="text-sm text-muted-foreground">{comment.text}</p>*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            ))}*/}
                        {/*        </div>*/}
                        {/*    </CardContent>*/}
                        {/*</Card>*/}
                    </div>

                    {/* Right side */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-20 space-y-4">
                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <h2 className="font-semibold">Seller Info</h2>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="font-semibold">User</div>
                                            <div className="text-sm text-muted-foreground">
                                                {item.user?.username}
                                            </div>
                                        </div>
                                    </div>
                                    <Button className="w-full" onClick={handleMessageSeller}>
                                        <MessageCircle className="h-4 w-4 mr-2" />
                                        Message Seller
                                    </Button>
                                    <Button variant="outline" className="w-full bg-transparent" asChild>
                                        <Link href={`/transactions/request/${item.item_UUID}`}>
                                            <Package className="h-4 w-4 mr-2" />
                                            Request Trade
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}