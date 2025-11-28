import { Header } from "@/components/header"
import { mockItems } from "@/lib/mock-data"
import EditItemClient from "./EditItemClient" // Import the client component for editing items

// Define Item type based on mock data structure
type Item = (typeof mockItems)[0]

interface EditItemPageProps {
  params: {
    id: string // URL parameters are always strings
  }
}

// Generate static params for SSG (Static Site Generation)
// This function pre-generates all item edit pages at build time
export async function generateStaticParams() {
  // Key fix: Convert numeric ID to string for URL params
  return mockItems.map((item) => ({
    id: item.id.toString(),
  }))
}

// Server component that fetches data at build time (SSG)
// This component runs on the server and passes data to the client component
export default async function EditItemPage({ params }: EditItemPageProps) {
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
          <p className="text-center text-red-500">Item Not Found or not statically generated.</p>
        </main>
      </div>
    )
  }

  // Render client component and pass fetched data as props
  // The client component handles all interactive features (form state, events, etc.)
  return (
    <div className="min-h-screen bg-background">
      {/* Reminder: If Header is already defined in layout.tsx, please remove this line */}
      <Header />
      <EditItemClient item={item} />
    </div>
  )
}

// Force static generation mode (SSG)
// This ensures all pages are pre-rendered at build time
export const dynamic = 'force-static'