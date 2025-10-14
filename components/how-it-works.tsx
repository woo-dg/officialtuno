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
    <section className="py-12 sm:py-16 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">How Tuno Works</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Get help in four simple steps. No scheduling, no waiting.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative p-4 sm:p-6 md:p-7 hover:shadow-lg transition-shadow"
            >
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-bold">
                {index + 1}
              </div>

              <div className="mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10">
                <step.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>

              <h3 className="mb-2 font-semibold text-base sm:text-lg">{step.title}</h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
