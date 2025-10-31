import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ItemGrid } from "@/components/item-grid"
import { HowItWorks } from "@/components/how-it-works"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ItemGrid />
        <HowItWorks />
      </main>
    </div>
  )
}
