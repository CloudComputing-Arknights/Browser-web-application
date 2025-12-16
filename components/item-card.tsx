import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, User } from "lucide-react"
import Link from "next/link"
import { ResolvedImage } from "@/components/resolved-image"

interface ItemCardProps {
  item: {
    id: string
    title: string
    description: string
    category: string
    image: string
    location: string
    postedBy: string
  }
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Link href={`/item?id=${item.id}`} className="block">
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <ResolvedImage
            imageRef={item.image || "/placeholder.svg"}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge className="absolute right-3 top-3 bg-background/90 text-foreground backdrop-blur">
            {item.category}
          </Badge>
        </div>

        <CardContent className="p-4">
          <h3 className="text-balance text-lg font-semibold leading-snug">{item.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-border p-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>{item.postedBy}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
