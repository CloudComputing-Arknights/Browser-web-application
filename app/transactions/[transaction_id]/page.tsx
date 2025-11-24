import TransactionDetailClient from "./TransactionDetailClient"

interface TransactionDetailPageProps {
  params: {
    transaction_id: string
  }
}

// Required for static export
export function generateStaticParams() {
  return []
}

export default function TransactionDetailPage({ params }: TransactionDetailPageProps) {
  return <TransactionDetailClient transactionId={params.transaction_id} />
}
