import { Card } from "@/components/ui/card"
import { Search, UserCheck, Video, Star } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Select Your Course",
    description: "Choose your school and course code. Add a quick topic or screenshot of your problem.",
  },
  {
    icon: UserCheck,
    title: "Instant Match",
    description: "Our system finds an available tutor in ~30 seconds. Review and swap if needed.",
  },
  {
    icon: Video,
    title: "Live Session",
    description: "Connect via audio/video with a shared whiteboard. Work through your problem together.",
  },
  {
    icon: Star,
    title: "Pay & Rate",
    description: "Pay only for minutes used. Rate your tutor and access session recordings anytime.",
  },
]

export function HowItWorks() {
  return (
    <section className="container py-20 bg-secondary/30">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">How Tuno Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get help in four simple steps. No scheduling, no waiting.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={index} className="relative p-6 hover:shadow-lg transition-shadow">
              <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                {index + 1}
              </div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-lg">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
