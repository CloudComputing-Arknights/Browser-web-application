import { Header } from "@/components/header" // Only for this page.tsx, if Header is already globally defined in layout, please remove this line
import { mockItems } from "@/lib/mock-data"
import RequestTradeClient from "./RequestTradeClient" // Import the new client component
import { isLoggedIn } from "@/lib/auth"
import { useRouter } from "next/navigation"


interface RequestTradePageProps {
  params: {
    item_id: string
  }
}

// 1. Replace getStaticPaths -> generateStaticParams (implement SSG)
export async function generateStaticParams() {
  return mockItems.map((item) => ({
    item_id: item.id.toString(), // Key name must match the folder name [item_id]
  }))
}

// 2. Async Page component replaces getStaticProps
export default async function RequestTradePage({ params }: RequestTradePageProps) {

  // Key modification: Fix 'params should be awaited' error and maintain type safety
  const awaitedParams = await params;
  const itemId = awaitedParams.item_id.toString()
  
  // Find data at build time (SSG)
  const item = mockItems.find((i) => i.id.toString() === itemId.toString())

  if (!item) {
    // Render Not Found UI
    return (
      <div className="min-h-screen bg-background">
        <Header /> 
        <main className="container mx-auto px-4 py-8">
          <p className="text-center text-red-500">Item Not Found or not statically generated.</p>
        </main>
      </div>
    );
  }
  
  // 3. Render client component and pass fetched data as Props
  return (
    <div className="min-h-screen bg-background">
      {/* ⚠️ Reminder: If Header is already defined in layout.tsx, please remove this <Header /> */}
      <Header />
      <RequestTradeClient item={item} />
    </div>
  )
}

// Ensure SSG mode
export const dynamic = 'force-static';