"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Header } from "@/components/header"
import TransactionDetailClient from "./TransactionDetailClient"

function TransactionDetailContent() {
    const searchParams = useSearchParams();
    const transactionId = searchParams.get('id') || '';

    if (!transactionId) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto py-8">
                    <p className="text-center text-muted-foreground">No transaction ID provided</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <TransactionDetailClient transactionId={transactionId} />
        </div>
    )
}

// Client Component - uses useSearchParams to get query parameter
export default function TransactionDetailPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background"><Header /></div>}>
            <TransactionDetailContent />
        </Suspense>
    )
}
