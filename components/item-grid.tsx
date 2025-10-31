import { ItemCard } from "@/components/item-card"

const SAMPLE_ITEMS = [
  {
    id: "1",
    title: "Vintage Camera",
    description: "Classic film camera in excellent condition",
    category: "Electronics",
    image: "/vintage-film-camera.jpg",
    location: "Brooklyn, NY",
    postedBy: "Sarah M.",
  },
  {
    id: "2",
    title: "Designer Office Chair",
    description: "Ergonomic chair, barely used",
    category: "Furniture",
    image: "/modern-office-chair.png",
    location: "Manhattan, NY",
    postedBy: "James K.",
  },
  {
    id: "3",
    title: "Programming Books Set",
    description: "Collection of 12 tech books",
    category: "Books",
    image: "/programming-books-stack.jpg",
    location: "Queens, NY",
    postedBy: "Alex P.",
  },
  {
    id: "4",
    title: "Acoustic Guitar",
    description: "Yamaha acoustic guitar with case",
    category: "Music",
    image: "/acoustic-guitar.png",
    location: "Bronx, NY",
    postedBy: "Maria G.",
  },
  {
    id: "5",
    title: "Mountain Bike",
    description: "21-speed mountain bike, well maintained",
    category: "Sports",
    image: "/mountain-bike-trail.png",
    location: "Staten Island, NY",
    postedBy: "David L.",
  },
  {
    id: "6",
    title: "Kitchen Appliances",
    description: "Blender and food processor combo",
    category: "Home",
    image: "/kitchen-blender-appliances.jpg",
    location: "Brooklyn, NY",
    postedBy: "Emily R.",
  },
]

export function ItemGrid() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Available Items</h2>
            <p className="mt-2 text-muted-foreground">Browse items ready for exchange in your area</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_ITEMS.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
