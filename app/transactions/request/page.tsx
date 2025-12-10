"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Header } from "@/components/header"
import RequestTradeClient from "./RequestTradeClient"

function RequestTradeContent() {
    const searchParams = useSearchParams();
    const itemId = searchParams.get('item_id') || '';

    if (!itemId) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto py-8">
                    <p className="text-center text-muted-foreground">No item ID provided</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <RequestTradeClient itemId={itemId} />
        </div>
    )
}

// Client Component - uses useSearchParams to get query parameter
export default function RequestTradePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background"><Header /></div>}>
            <RequestTradeContent />
        </Suspense>
    )
}
