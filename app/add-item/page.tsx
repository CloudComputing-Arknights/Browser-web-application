"use client"

import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import log from "loglevel"
import Link from "next/link"
import {Upload, Loader2, AlertCircle} from "lucide-react"

// UI Components
import {Header} from "@/components/header"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"

import {getOpenAPIConfiguration} from "@/lib/APIConfig"
import {
    ItemUserApi,
    ItemsApi,
    UserApi,
    ConditionType,
    TransactionType,
    CategoryRead,
    AddressDTO,
    JobStatus
} from "@/client/api"

export default function AddItemPage() {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [isPageLoading, setIsPageLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [statusMessage, setStatusMessage] = useState<string>("")

    const [categories, setCategories] = useState<CategoryRead[]>([])
    const [myAddresses, setMyAddresses] = useState<AddressDTO[]>([])

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        category_id: "",
        condition: "",
        transaction_type: "",
        address_id: "",
        image_urls: [] as string[]
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = getOpenAPIConfiguration()

                const itemsApi = new ItemsApi(config)
                const categoriesRes = await itemsApi.listCategoriesItemsCategoriesGet(0, 100)
                setCategories(categoriesRes.data)

                const userApi = new UserApi(config)
                const userRes = await userApi.authMeMeUserGet()
                setMyAddresses(userRes.data.addresses || [])

            } catch (error) {
                log.error("Can't load category or user information");
                setErrorMessage("Can't load category or user information")
            } finally {
                setIsPageLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {id, value} = e.target
        setFormData(prev => ({...prev, [id]: value}))
        if (errorMessage) setErrorMessage(null)
    }

    const handleSelectChange = (key: string, value: string) => {
        setFormData(prev => ({...prev, [key]: value}))
        if (errorMessage) setErrorMessage(null)
    }

    // Mock upload of picture
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            // TODO: fakeURL
            const fakeUrl = "https://placehold.co/600x400.png"
            setFormData(prev => ({
                ...prev,
                image_urls: [...prev.image_urls, fakeUrl]
            }))
        }
    }

    const pollJobStatus = async (jobId: string, api: ItemUserApi) => {
        const maxAttempts = 30;
        const delay = 1500; // try every 1.5s

        for (let i = 0; i < maxAttempts; i++) {
            await new Promise(resolve => setTimeout(resolve, delay));
            try {
                // Check the status of the job
                const res = await api.getMyJobStatusMeItemsJobsJobIdGet(jobId);
                const job = res.data;

                log.info(`Polling job ${jobId}: ${job.status}`);

                if (job.status === JobStatus.Completed) {
                    return job;
                }
                else if (job.status === JobStatus.Failed) {
                    log.error("Item creation job failed.")
                    throw new Error(job.error_message || "Item creation job failed.");
                }
            } catch (err) {
                log.error("Error polling job status", err);
                throw err;
            }
        }
        throw new Error("Creation timed out. Please check your profile later.");
    };

    const handleSubmit = async () => {
        setIsLoading(true)
        setErrorMessage(null)
        setStatusMessage("Submitting request...")

        try {
            if (!formData.title || !formData.price || !formData.category_id || !formData.address_id || !formData.condition || !formData.transaction_type) {
                throw new Error("Please fill in all required fields marked with an asterisk (*).")
            }

            const config = getOpenAPIConfiguration()
            const itemUserApi = new ItemUserApi(config)

            let apiCondition: ConditionType = ConditionType.Good
            if (formData.condition === 'new') apiCondition = ConditionType.BrandNew
            if (formData.condition === 'like-new') apiCondition = ConditionType.LikeNew
            if (formData.condition === 'good') apiCondition = ConditionType.Good
            if (formData.condition === 'poor') apiCondition = ConditionType.Poor

            let apiTransactionType: TransactionType = TransactionType.Sale
            if (formData.transaction_type === 'lend') apiTransactionType = TransactionType.Rent
            if (formData.transaction_type === 'trade') apiTransactionType = TransactionType.Sale
            if (formData.transaction_type === 'give') apiTransactionType = TransactionType.Sale

            // Send Post request
            const response = await itemUserApi.createItemForMeMeItemsPost({
                title: formData.title,
                price: parseFloat(formData.price),
                description: formData.description,
                condition: apiCondition,
                transaction_type: apiTransactionType,
                category_ids: [parseInt(formData.category_id)],
                address_UUID: formData.address_id,
                image_urls: formData.image_urls
            })

            const jobId = response.data.job_UUID;
            setStatusMessage("Processing... Please wait.")

            // polling until finished
            await pollJobStatus(jobId, itemUserApi);

            // Succeed
            setStatusMessage("Success!")
            alert(`Your item ${formData.title} has been posted successfully!`)
            router.push("/profile")


        } catch (error: any) {
            log.error(error)
            setErrorMessage(error.message || "Post failed.")
        } finally {
            setIsLoading(false)
            setStatusMessage("")
        }
    }

    if (isPageLoading) {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin"/></div>
    }

    return (
        <div className="min-h-screen bg-background">
            <Header/>
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold">List an Item</h1>
                        <p className="text-muted-foreground mt-1">Share what you'd like to trade, lend, or give away</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Item Details</CardTitle>
                            <CardDescription>Provide clear information to help others understand your
                                item</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">

                            {/* Image Upload Area */}
                            <div className="space-y-2">
                                <Label>Photos</Label>
                                <div
                                    className="relative border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer group">
                                    <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                    />
                                    <Upload
                                        className="h-10 w-10 mx-auto text-muted-foreground mb-3 group-hover:text-primary"/>
                                    <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                                    <p className="text-xs text-muted-foreground">PNG, JPG or GIF (max. 5MB each)</p>
                                </div>
                                {formData.image_urls.length > 0 && (
                                    <p className="text-sm text-green-600 mt-2">
                                        {formData.image_urls.length} pictures chosen
                                    </p>
                                )}
                            </div>

                            {/* Basic Information */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Item Title *</Label>
                                    <Input
                                        id="title"
                                        placeholder="e.g., Vintage Film Camera"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="price">Price / Value ($) *</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        placeholder="0.00"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">Set 0 if giving away.</p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="category_id">Category *</Label>
                                        <Select onValueChange={(val) => handleSelectChange("category_id", val)}>
                                            <SelectTrigger id="category_id">
                                                <SelectValue placeholder="Select category"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((cat) => (
                                                    <SelectItem key={cat.category_id}
                                                                value={cat.category_id.toString()}>
                                                        {cat.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="condition">Condition *</Label>
                                        <Select onValueChange={(val) => handleSelectChange("condition", val)}>
                                            <SelectTrigger id="condition">
                                                <SelectValue placeholder="Select condition"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="new">New</SelectItem>
                                                <SelectItem value="like-new">Like New</SelectItem>
                                                <SelectItem value="good">Good</SelectItem>
                                                <SelectItem value="poor">Fair / Poor</SelectItem>
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
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            {/* Exchange Type */}
                            <div className="space-y-2">
                                <Label htmlFor="transaction_type">Exchange Type *</Label>
                                <Select onValueChange={(val) => handleSelectChange("transaction_type", val)}>
                                    <SelectTrigger id="transaction_type">
                                        <SelectValue placeholder="How do you want to exchange?"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="trade">Trade / Sell (Permanent)</SelectItem>
                                        <SelectItem value="lend">Lend / Rent (Temporary)</SelectItem>
                                        <SelectItem value="give">Give Away</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Location Selection */}
                            <div className="space-y-2">
                                <Label htmlFor="address_id">Pickup Location (My Addresses) *</Label>
                                {myAddresses.length > 0 ? (
                                    <Select onValueChange={(val) => handleSelectChange("address_id", val)}>
                                        <SelectTrigger id="address_id">
                                            <SelectValue placeholder="Select one of your addresses"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {myAddresses.map((addr) => (
                                                <SelectItem key={addr.id} value={addr.id || "unknown"}>
                                                    {addr.street}, {addr.city}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <div
                                        className="border border-red-200 bg-red-50 p-3 rounded text-sm text-red-600 flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4"/>
                                        <span>
                                          You have no addresses saved. Please
                                          <Link href="/profile" className="font-bold underline ml-1">add an address in Profile {" "}first.</Link>
                                        </span>
                                    </div>
                                )}
                            </div>
                            {errorMessage && (
                                <div
                                    className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4"/>
                                    <span className="text-sm font-medium">{errorMessage}</span>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button className="flex-1" onClick={handleSubmit}
                                        disabled={isLoading || myAddresses.length === 0}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                    {statusMessage ? statusMessage : "Publish Listing"}
                                </Button>
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