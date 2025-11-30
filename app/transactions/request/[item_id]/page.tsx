import { Header } from "@/components/header"
import RequestTradeClient from "./RequestTradeClient"

interface RequestTradePageProps {
  params: {
    item_id: string
  }
}

// Dynamic rendering to fetch item data from backend
export default async function RequestTradePage({ params }: RequestTradePageProps) {
  const awaitedParams = await params;
  const itemId = awaitedParams.item_id
  
  // Render client component and pass itemId - client will fetch the data
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <RequestTradeClient itemId={itemId} />
    </div>
  )
}