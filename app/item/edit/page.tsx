"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Header } from "@/components/header"
import EditItemClient from "./EditItemClient"

function EditItemContent() {
    const searchParams = useSearchParams();
    const itemId = searchParams.get('id') || '';

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
            <EditItemClient itemId={itemId} />
        </div>
    )
}

// Client Component - uses useSearchParams to get query parameter
export default function EditItemPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background"><Header /></div>}>
            <EditItemContent />
        </Suspense>
    )
}
