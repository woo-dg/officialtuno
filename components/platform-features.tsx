"use client"

import { useEffect, useState, useRef } from "react"

export function PlatformFeatures() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2
            className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-12 sm:mb-16 md:mb-24 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            Why Tuno?
          </h2>

          <div className="space-y-10 sm:space-y-14 md:space-y-16">
            {/* Item 1 */}
            <div
              className={`flex items-start gap-4 sm:gap-6 transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
              }`}
            >
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-foreground text-background flex items-center justify-center text-lg sm:text-2xl font-bold mt-0.5 sm:mt-1">
                1
              </div>
              <p className="text-lg sm:text-2xl md:text-3xl text-foreground leading-relaxed">
                <span className="font-bold">
                  Remember cramming for a test and realizing you didn’t understand a key concept?
                </span>{" "}
                Tuno gets you a tutor in seconds for any subject, anywhere. No scheduling, just great sessions.
              </p>
            </div>

            {/* Item 2 */}
            <div
              className={`flex items-start gap-4 sm:gap-6 transition-all duration-1000 delay-600 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
              }`}
            >
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-foreground text-background flex items-center justify-center text-lg sm:text-2xl font-bold mt-0.5 sm:mt-1">
                2
              </div>
              <p className="text-lg sm:text-2xl md:text-3xl text-foreground leading-relaxed">
                We provide an integrated classroom experience into the virtual sessions, with tools such as screenshare,
                a whiteboard, graphing, etc.
              </p>
            </div>

            {/* Item 3 */}
            <div
              className={`flex items-start gap-4 sm:gap-6 transition-all duration-1500 delay-1000 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-foreground text-background flex items-center justify-center text-lg sm:text-2xl font-bold mt-0.5 sm:mt-1">
                3
              </div>
              <div className="flex-1">
                <p className="text-lg sm:text-2xl md:text-3xl text-foreground leading-relaxed mb-4 sm:mb-6">
                  Payment procedure is effortless, with a flat rate for every time block
                </p>
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="inline-flex items-baseline gap-2 sm:gap-3 bg-foreground/5 px-5 sm:px-8 py-3 sm:py-4 rounded-2xl">
                    <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">$8</span>
                    <span className="text-sm sm:text-base md:text-lg text-foreground/60">for 15 minutes</span>

                    <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">$14</span>
                    <span className="text-sm sm:text-base md:text-lg text-foreground/60">for 30 minutes</span>

                    <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">$24</span>
                    <span className="text-sm sm:text-base md:text-lg text-foreground/60">for 60 minutes</span>
                  </div>
                </div>
                <p className="text-sm sm:text-base md:text-xl text-foreground/70 leading-relaxed">
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
