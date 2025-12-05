import EditItemClient from "./EditItemClient"

interface EditItemPageProps {
    params: Promise<{
        id: string
    }>;
}

export default async function EditItemPage({ params }: EditItemPageProps) {
    const awaitedParams = await params
    const { id } = awaitedParams

    return (
        <div className="min-h-screen bg-background">
            <EditItemClient itemId={id} />
        </div>
    )
}