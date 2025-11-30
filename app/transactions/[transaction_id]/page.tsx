import TransactionDetailClient from "./TransactionDetailClient"

interface TransactionDetailPageProps {
  params: Promise<{
    transaction_id: string
  }>;
}

// Required for static export
export function generateStaticParams() {
  return []
}

export default async function TransactionDetailPage({ params }: TransactionDetailPageProps) {
    const resolvedParams = await params;
    const transaction_id = resolvedParams.transaction_id;
    return <TransactionDetailClient transactionId={transaction_id} />
}
