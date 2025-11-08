import { Header } from "@/components/header"
import { mockItems } from "@/lib/mock-data"
import ItemDetailClient from "./ItemDetailClient" // Import the client component for item details



interface ItemDetailPageProps {
  params: {
    id: string // URL parameters are always strings
  }
}

// Generate static params for SSG (Static Site Generation)
// This function pre-generates all item detail pages at build time
export async function generateStaticParams() {
  return mockItems.map((item) => ({
    id: item.id.toString(),
  }))
}

// Server component that fetches data at build time (SSG)
// This component runs on the server and passes data to the client component
export default async function ItemDetailPage({ params }: ItemDetailPageProps) {
  // Await params object to avoid synchronous access errors in Next.js 15+
  const awaitedParams = await params
  const itemId = awaitedParams.id

  // Find item data at build time (SSG)
  // Important: Use .toString() for comparison since mock data id is a number
  const item = mockItems.find((i) => i.id.toString() === itemId)

  // Handle case where item is not found
  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <p className="text-center text-red-500">Item Not Found.</p>
        </main>
      </div>
    )
  }

  // Render client component and pass fetched data as props
  // The client component handles all interactive features (state, events, etc.)
  return (
    <div className="min-h-screen bg-background">
      {/* Reminder: If Header is already defined in layout.tsx, please remove this line */}
      <Header />
      <ItemDetailClient item={item} />
    </div>
  )
}

// Force static generation mode (SSG)
// This ensures all pages are pre-rendered at build time
export const dynamic = 'force-static'