import { Header } from "@/components/header"
import TransactionDetailClient from "./TransactionDetailClient"

interface TransactionDetailPageProps {
  params: {
    transaction_id: string
  }
}

export default async function TransactionDetailPage({ params }: TransactionDetailPageProps) {
  const awaitedParams = await params
  const transactionId = awaitedParams.transaction_id

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TransactionDetailClient transactionId={transactionId} />
    </div>
  )
}
