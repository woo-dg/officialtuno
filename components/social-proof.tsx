import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    school: "MIT",
    course: "CS 101",
    rating: 5,
    text: "Got help with my algorithm homework in under a minute. The tutor was amazing and the whiteboard made everything so clear!",
  },
  {
    name: "Marcus Johnson",
    school: "Stanford",
    course: "MATH 221",
    rating: 5,
    text: "Way better than waiting hours for office hours. The instant connection is a game-changer during exam season.",
  },
  {
    name: "Emily Rodriguez",
    school: "Berkeley",
    course: "PHYS 201",
    rating: 5,
    text: "Love that I only pay for what I need. Had a quick 7-minute session that saved me hours of frustration.",
  },
]

export function SocialProof() {
  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            Loved by Students
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Join thousands of students getting instant help
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-5 sm:p-6 md:p-7">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Avatar className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm sm:text-base">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {testimonial.course} • {testimonial.school}
                  </p>
                </div>
              </div>

              <div className="flex gap-0.5 mb-2 sm:mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{testimonial.text}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-primary mb-0.5 sm:mb-1">50K+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Sessions completed</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-primary mb-0.5 sm:mb-1">28s</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Avg. connect time</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-primary mb-0.5 sm:mb-1">4.9/5</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Average rating</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-primary mb-0.5 sm:mb-1">200+</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Courses covered</p>
          </div>
        </div>
      </div>
    </section>
  )
}
