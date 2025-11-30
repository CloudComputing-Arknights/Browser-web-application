import { Header } from "@/components/header"
import ItemDetailClient from "./ItemDetailClient"

interface ItemDetailPageProps {
    params: Promise<{
        id: string
    }>;
}

// Server Component
// Get id in the URL and sent it to client
export default async function ItemDetailPage({ params }: ItemDetailPageProps) {
    const resolvedParams = await params;
    const itemId = resolvedParams.id;

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <ItemDetailClient itemId={itemId} />
        </div>
    )
}