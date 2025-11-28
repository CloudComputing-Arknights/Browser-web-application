import EditItemClient from "./EditItemClient"

interface EditItemPageProps {
    params: {
        id: string
    }
}

// Server component
export default async function EditItemPage({ params }: EditItemPageProps) {
    const awaitedParams = await params
    const { id } = awaitedParams

    return (
        <div className="min-h-screen bg-background">
            {/*Send item id to client component*/}
            <EditItemClient itemId={id} />
        </div>
    )
}