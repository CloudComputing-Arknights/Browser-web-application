"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Loader2, Save, User } from "lucide-react"
import Link from "next/link"
import { ResolvedImage } from "@/components/resolved-image"
import { toast } from "sonner"

import { getOpenAPIConfiguration } from "@/lib/APIConfig"
import { ItemsApi, UserApi, ItemUserApi, ItemRead, UpdateOwnItemReq, ConditionType, TransactionType, AddressDTO } from "@/client"

interface EditItemClientProps {
    itemId: string
}

export default function EditItemClient({ itemId }: EditItemClientProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    const [itemData, setItemData] = useState<ItemRead | null>(null)
    const [etag, setEtag] = useState<string>("")
    const [myAddresses, setMyAddresses] = useState<AddressDTO[]>([])

    const [formData, setFormData] = useState<UpdateOwnItemReq>({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = getOpenAPIConfiguration()
                const itemsApi = new ItemsApi(config)
                const userApi = new UserApi(config)

                const [itemRes, userRes] = await Promise.all([
                    itemsApi.getPublicItemByIdItemsItemIdGet(itemId),
                    userApi.authMeMeUserGet()
                ])

                console.log("All Headers:", itemRes.headers);

                // get etag information
                const fetchedEtag = itemRes.headers['etag'] || itemRes.headers['Etag']
                if (fetchedEtag) setEtag(fetchedEtag)

                const currentItem = itemRes.data
                setItemData(currentItem)

                if (userRes.data.addresses) {
                    setMyAddresses(userRes.data.addresses)
                }

                setFormData({
                    title: currentItem.title,
                    description: currentItem.description,
                    price: currentItem.price,
                    condition: currentItem.condition,
                    transaction_type: currentItem.transaction_type,
                    address_UUID: currentItem.address_UUID,
                })
            } catch (error) {
                console.error("Fetch error:", error)
                toast.error("Can't load item.")
            } finally {
                setLoading(false)
            }
        }
        if (itemId) {
            fetchData()
        }
    }, [itemId])

    const handleInputChange = (field: keyof UpdateOwnItemReq, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSave = async () => {
        console.log("Current ETag:", etag);
        if (!etag) {
            toast.error("Can't get etag, Please refresh and try again.")
            return
        }

        setSubmitting(true)
        try {
            const config = getOpenAPIConfiguration()
            const itemUserApi = new ItemUserApi(config)

            await itemUserApi.updateMyItemMeItemsItemIdPatch(
                itemId,
                etag,
                formData
            )

            toast.success("Item has been successfully updated！")
            router.push(`/item?id=${itemId}`)
            router.refresh()

        } catch (error: any) {
            console.error("Update error:", error)
            // Handle 412 Precondition Failed
            if (error.response && error.response.status === 412) {
                toast.error("The page data has expired. Please refresh the page to get the latest data.")
            } else {
                toast.error("Update item failed.")
            }
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!itemData) {
        return <div className="text-center py-10">Can't find the item</div>
    }

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
                        {/* Current Images - only for show */}
                        <div className="space-y-2">
                            <Label>Photos</Label>
                            <div className="grid grid-cols-3 gap-4">
                                {itemData.image_urls?.map((url, index) => (
                                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border bg-muted">
                                        <ResolvedImage
                                            imageRef={url || "/placeholder.svg"}
                                            alt={`Item ${index + 1}`}
                                            className="absolute inset-0 h-full w-full object-cover"
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
                                <Input
                                    id="title"
                                    value={formData.title || ''}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {/* Condition Select */}
                                <div className="space-y-2">
                                    <Label htmlFor="condition">Condition</Label>
                                    <Select
                                        value={formData.condition || undefined}
                                        onValueChange={(val) => handleInputChange('condition', val)}
                                    >
                                        <SelectTrigger id="condition">
                                            <SelectValue placeholder="Select condition" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={ConditionType.BrandNew}>Brand New</SelectItem>
                                            <SelectItem value={ConditionType.LikeNew}>Like New</SelectItem>
                                            <SelectItem value={ConditionType.Good}>Good</SelectItem>
                                            <SelectItem value={ConditionType.Poor}>Poor</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Transaction Type Select */}
                                <div className="space-y-2">
                                    <Label htmlFor="transaction_type">Transaction Type</Label>
                                    <Select
                                        value={formData.transaction_type || undefined}
                                        onValueChange={(val) => handleInputChange('transaction_type', val)}
                                    >
                                        <SelectTrigger id="transaction_type">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={TransactionType.Sale}>Sale</SelectItem>
                                            <SelectItem value={TransactionType.Rent}>Rent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price">Price ($)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={formData.price || 0}
                                    onChange={(e) => handleInputChange('price', Number(e.target.value))}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    rows={5}
                                    value={formData.description || ''}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Pickup Location</Label>
                                <Select
                                    value={formData.address_UUID || undefined}
                                    onValueChange={(val) => handleInputChange('address_UUID', val)}
                                >
                                    <SelectTrigger id="address" className="h-auto py-3">
                                        <SelectValue placeholder="Select an address" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {myAddresses.length > 0 ? (
                                            myAddresses.map((addr) => (
                                                <SelectItem key={addr.id} value={addr.id!}>
                                                    <div className="flex flex-col items-start text-left">
                                                        <span className="font-medium">{addr.street}</span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {addr.city}, {addr.state} {addr.postal_code}
                                                        </span>
                                                    </div>
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <div className="p-2 text-sm text-center text-muted-foreground">
                                                No addresses found. Please add one in your profile.
                                            </div>
                                        )}
                                    </SelectContent>
                                </Select>
                                {myAddresses.length === 0 && (
                                    <p className="text-xs text-destructive">
                                        You need to add an address in your profile settings first.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Button className="flex-1" onClick={handleSave} disabled={submitting}>
                                {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Save Changes
                            </Button>
                            <Button variant="outline" className="flex-1 bg-transparent" asChild>
                                <Link href={`/item?id=${itemId}`}>Cancel</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Delete Item Zone */}
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