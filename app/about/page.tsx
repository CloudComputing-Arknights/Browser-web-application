import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Leaf, Users, Heart, Target } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "We believe in reducing waste and promoting a circular economy. Every item exchanged is one less item in a landfill.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Building strong neighborhood connections through sharing. We bring people together around common needs and interests.",
    },
    {
      icon: Heart,
      title: "Generosity",
      description:
        "Fostering a culture of giving and helping others. Small acts of kindness create ripples of positive change.",
    },
    {
      icon: Target,
      title: "Accessibility",
      description:
        "Making resources available to everyone. We believe everyone deserves access to the items they need.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About SwapHub</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A community-driven platform connecting neighbors through sustainable exchange
            </p>
          </div>

          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              SwapHub was created to address two critical challenges: environmental waste and community disconnection.
              We believe that the items gathering dust in our homes could be treasures for our neighbors, and that every
              exchange is an opportunity to build meaningful connections.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our platform makes it simple and safe for people to trade, lend, or give away items they no longer need.
              By facilitating these exchanges, we're not just moving goods - we're building a more sustainable,
              connected, and generous community.
            </p>
          </Card>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {values.map((value, index) => (
                <Card key={index} className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Card className="p-8 bg-muted/30">
            <h2 className="text-2xl font-bold mb-4">Perfect for College Students</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              SwapHub is especially valuable for college students who often need items for short periods or have limited
              budgets. Whether you're looking for textbooks, furniture for your dorm, kitchen supplies, or electronics,
              our platform connects you with fellow students and community members who have what you need.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When you graduate or move, instead of throwing away or selling items at a loss, you can easily pass them
              on to other students who need them. It's a sustainable cycle that benefits everyone and strengthens the
              campus community.
            </p>
          </Card>
        </div>
      </main>
    </div>
  )
}
