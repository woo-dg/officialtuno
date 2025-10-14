"use client"

import { useEffect, useState, useRef } from "react"

export function PlatformFeatures() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <h2
            className={`text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-24 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            Why Tuno?
          </h2>

          <div className="space-y-16">
            <div
              className={`flex items-start gap-6 transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
              }`}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center text-2xl font-bold mt-1">
                1
              </div>
              <p className="text-2xl md:text-3xl text-foreground leading-relaxed">
                <span className="font-bold">Remember cramming for a test and realizing you didn’t understand a key concept? </span>
                Tuno gets you a tutor in seconds for any subject, anywhere. No scheduling, just great sessions.              </p>
            </div>

            <div
              className={`flex items-start gap-6 transition-all duration-1000 delay-600 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
              }`}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center text-2xl font-bold mt-1">
                2
              </div>
              <p className="text-2xl md:text-3xl text-foreground leading-relaxed">
                We provide an integrated classroom experience into the virtual sessions, with tools such as screenshare,
                a whiteboard, graphing, etc.
              </p>
            </div>

            <div
              className={`flex items-start gap-6 transition-all duration-1500 delay-1000 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center text-2xl font-bold mt-1">
                3
              </div>
              <div className="flex-1">
                <p className="text-2xl md:text-3xl text-foreground leading-relaxed mb-6">
                  Payment procedure is effortless, with a flat rate for every session at
                </p>
                <div className="flex justify-center mb-6">
                  <div className="inline-flex items-baseline gap-3 bg-foreground/5 px-8 py-4 rounded-2xl">
                    <span className="text-5xl md:text-6xl font-bold text-foreground">$0.40</span>
                    <span className="text-lg text-foreground/60">per minute</span>
                  </div>
                </div>
                <p className="text-xl text-foreground/70 leading-relaxed">
                  Pricing will exactly reflect the length of the session which is up to the discretion of students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
