"use client"

import { Header } from "@/components/header"
import { ItemCard } from "@/components/item-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { Search, SlidersHorizontal, Loader2 } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"

import { getOpenAPIConfiguration } from "@/lib/APIConfig"

import { ItemsApi, ItemRead, TransactionType, CategoryRead } from "@/client"

export default function BrowseItemsPage() {
    const searchParams = useSearchParams()

    // --- State Management ---
    const [keyword, setKeyword] = useState(searchParams.get("q") || "")
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
    const [selectedType, setSelectedType] = useState<TransactionType | undefined>(undefined)

    const [items, setItems] = useState<ItemRead[]>([])
    const [categories, setCategories] = useState<CategoryRead[]>([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // --- API Logic ---
    const fetchCategories = useCallback(async () => {
        try {
            const config = getOpenAPIConfiguration();
            const itemsApi = new ItemsApi(config);
            const response = await itemsApi.listCategoriesItemsCategoriesGet(
                0,  // skip
                100 // limit
            );
            setCategories(response.data);
        } catch (err) {
            console.error("Failed to fetch categories:", err);
        }
    }, []);

    // Get items
    const fetchItems = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const config = getOpenAPIConfiguration();
            const itemsApi = new ItemsApi(config);

            const response = await itemsApi.listPublicItemsItemsGet(
                undefined, // id
                // if selectedCategory is undefined or "all" then undefined or convert string of category_id to int
                (selectedCategory && selectedCategory !== "all")
                    ? Number(selectedCategory)
                    : undefined,
                selectedType,
                keyword || undefined,
                0,
                50
            );

            setItems(response.data);
        } catch (err) {
            console.error("Failed to fetch items:", err);
            setError("Failed to load items. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [keyword, selectedCategory, selectedType]);

    // --- Effects ---
    // Get all categories when loading page
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        const query = searchParams.get("q")
        if (query) {
            setKeyword(query)
        }
    }, [searchParams])

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);


    // --- Data Mapping ---
    const mapItemToCardProps = (item: ItemRead) => {
        return {
            id: item.item_UUID,
            title: item.title,
            description: item.description || "No description provided.",
            // ???
            category: item.categories?.[0]?.name || "Uncategorized",
            image: item.image_urls && item.image_urls.length > 0
                ? item.image_urls[0]
                : "/placeholder-image.jpg",
            location: item.address?.city+" "+item.address?.street,
            postedBy: item.user?.username || "Unknown User",
            price: item.price,
            transactionType: item.transaction_type
        };
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Browse Items</h1>
                    <p className="text-muted-foreground">
                        Discover items available for rent or sale in your community
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                    {/* Filters Sidebar */}
                    <aside className="space-y-6">
                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <SlidersHorizontal className="h-5 w-5" />
                                <h2 className="font-semibold text-lg">Filters</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Keyword Search</Label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search by title..."
                                            className="pl-9"
                                            value={keyword}
                                            onChange={(e) => setKeyword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Category Filter - Dynamic Rendering */}
                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Select
                                        value={selectedCategory}
                                        onValueChange={(val) => setSelectedCategory(val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="All Categories" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Categories</SelectItem>
                                            {/* rendering categories */}
                                            {categories.map((cat) => (
                                                <SelectItem
                                                    key={cat.category_id}
                                                    value={String(cat.category_id)}
                                                >
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Transaction Type Filter */}
                                <div className="space-y-2">
                                    <Label>Transaction Type</Label>
                                    <Select
                                        value={selectedType}
                                        onValueChange={(val) => setSelectedType(val as TransactionType)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="All Types" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="SALE">Sale (Purchase)</SelectItem>
                                            <SelectItem value="RENT">Rent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Distance Filter */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Label>Distance</Label>
                                        <span className="text-sm text-muted-foreground">5 miles</span>
                                    </div>
                                    <Slider defaultValue={[5]} max={50} step={1} disabled={true} />
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>0 mi</span>
                                        <span>50 mi</span>
                                    </div>
                                    <p className="text-xs text-red-400">Distance filter not yet supported by API</p>
                                </div>

                                <Button
                                    className="w-full bg-transparent"
                                    variant="outline"
                                    onClick={() => {
                                        setKeyword("");
                                        setSelectedCategory(undefined);
                                        setSelectedType(undefined);
                                    }}
                                >
                                    Reset Filters
                                </Button>
                            </div>
                        </Card>
                    </aside>

                    {/* Items Grid Area */}
                    <div className="space-y-6">
                        {/* Sort and View Options */}
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Showing <span className="font-medium text-foreground">{items.length}</span> items
                            </p>
                            {/* No order function but keep the UI for now */}
                            <Select defaultValue="recent">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="recent">Most Recent</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Grid Content */}
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : error ? (
                            <div className="text-center py-10 text-red-500">
                                {error}
                            </div>
                        ) : items.length === 0 ? (
                            <div className="text-center py-10 text-muted-foreground">
                                No items found matching your criteria.
                            </div>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {items.map((item) => (
                                    <ItemCard
                                        key={item.item_UUID}
                                        item={mapItemToCardProps(item)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}