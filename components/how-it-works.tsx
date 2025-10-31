import { Card, CardContent } from "@/components/ui/card"
import { Search, MessageSquare, Repeat } from "lucide-react"

const STEPS = [
  {
    icon: Search,
    title: "Browse & Discover",
    description: "Search through items available in your community. Filter by category, location, and more.",
  },
  {
    icon: MessageSquare,
    title: "Connect & Negotiate",
    description: "Message item owners to discuss exchange details. Build trust through conversation.",
  },
  {
    icon: Repeat,
    title: "Exchange & Enjoy",
    description: "Meet safely to complete the exchange. Rate your experience and build your reputation.",
  },
]

export function HowItWorks() {
  return (
    <section className="border-t border-border bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Trading items with your community is simple and sustainable
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <Card key={index} className="relative border-2">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <step.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{step.description}</p>
              </CardContent>
              {index < STEPS.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden h-0.5 w-8 -translate-y-1/2 bg-border md:block" />
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
