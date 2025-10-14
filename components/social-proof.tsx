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
    <section className="container py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Loved by Students</h2>
          <p className="text-lg text-muted-foreground">Join thousands of students getting instant help</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.course} • {testimonial.school}
                  </p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{testimonial.text}</p>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-primary mb-1">50K+</p>
            <p className="text-sm text-muted-foreground">Sessions completed</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary mb-1">28s</p>
            <p className="text-sm text-muted-foreground">Avg. connect time</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary mb-1">4.9/5</p>
            <p className="text-sm text-muted-foreground">Average rating</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary mb-1">200+</p>
            <p className="text-sm text-muted-foreground">Courses covered</p>
          </div>
        </div>
      </div>
    </section>
  )
}
