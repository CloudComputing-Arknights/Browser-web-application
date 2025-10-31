import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Package, Search, MessageCircle, Handshake, CheckCircle, Users } from "lucide-react"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Users,
      title: "Create Your Profile",
      description:
        "Sign up and create your profile to join our community. Add your location and preferences to connect with nearby neighbors.",
    },
    {
      icon: Package,
      title: "List Your Items",
      description:
        "Post items you want to trade, lend, or give away. Add photos, descriptions, and choose your preferred exchange type.",
    },
    {
      icon: Search,
      title: "Browse & Discover",
      description:
        "Search through available items in your area. Use filters to find exactly what you need by category, distance, and exchange type.",
    },
    {
      icon: MessageCircle,
      title: "Connect & Communicate",
      description:
        "Message other users directly through our platform. Discuss details, arrange meetups, and build community connections.",
    },
    {
      icon: Handshake,
      title: "Make the Exchange",
      description:
        "Meet in a safe public location to complete your trade, lending, or giveaway. Both parties confirm the transaction.",
    },
    {
      icon: CheckCircle,
      title: "Leave Feedback",
      description:
        "Rate your experience and leave feedback. Help build trust in the community and guide others in their exchanges.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">How It Works</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              SwapHub makes it easy to trade, lend, and share items with your neighbors. Follow these simple steps to
              get started.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <Card key={index} className="p-6">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-primary">Step {index + 1}</span>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-12 p-8 bg-muted/30">
            <h2 className="text-2xl font-bold mb-4">Safety Tips</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Always meet in public, well-lit locations during daylight hours</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Bring a friend or let someone know where you're going</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Inspect items carefully before completing the exchange</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Trust your instincts - if something feels off, don't proceed</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Report any suspicious activity to our support team</span>
              </li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  )
}
