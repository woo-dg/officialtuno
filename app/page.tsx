"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { WaitlistModal } from "@/components/waitlist-modal"
import { CareersModal } from "@/components/careers-modal"
import { InteractiveDemo } from "@/components/interactive-demo"
import { PlatformFeatures } from "@/components/platform-features"
import { FAQSection } from "@/components/faq-section"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function HomePage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const [careersOpen, setCareersOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Fixed header already handles its own responsiveness */}
      <Header
        onJoinWaitlist={() => setWaitlistOpen(true)}
        onOpenCareers={() => setCareersOpen(true)}
      />

      {/* Add top padding so content isn't hidden behind fixed header */}
      <main className="flex-1 pt-20 sm:pt-24">
        {/* Hero stays first */}
        <HeroSection onJoinWaitlist={() => setWaitlistOpen(true)} />

        {/* Demo above features with responsive vertical spacing */}
        <section aria-labelledby="demo-title" className="py-14 sm:py-16 md:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="demo-title" className="sr-only">
              Interactive demo
            </h2>
            <InteractiveDemo />
          </div>
        </section>

        <section aria-labelledby="features-title" className="py-14 sm:py-16 md:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="features-title" className="sr-only">
              Platform features
            </h2>
            <PlatformFeatures />
          </div>
        </section>

        {/* CTA section: responsive padding, widths, and readable text on small screens */}
        <section className="py-16 sm:py-18 md:py-20 bg-secondary/20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-xl text-center">
              <Button
                size="lg"
                onClick={() => setWaitlistOpen(true)}
                className="h-14 sm:h-16 px-6 sm:px-10 text-base sm:text-lg md:text-xl rounded-full bg-foreground text-background hover:bg-foreground/90 motion-safe:hover:scale-105 hover:shadow-2xl transition-all duration-300 font-bold group w-full sm:w-auto"
                aria-label="Tutors, join the waitlist now"
              >
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 group-hover:rotate-12 transition-transform" />
                <span className="whitespace-normal sm:whitespace-nowrap">
                  Tutors, Join Waitlist Now & get future perks!
                </span>
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 ml-2 sm:ml-3 group-hover:-rotate-12 transition-transform" />
              </Button>

              <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Be among the first tutors on our platform and receive exclusive benefits.
              </p>
            </div>
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-title" className="py-14 sm:py-16 md:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="faq-title" className="sr-only">
              Frequently asked questions
            </h2>
            <FAQSection />
          </div>
        </section>
      </main>

      <Footer />

      {/* Modals */}
      <WaitlistModal open={waitlistOpen} onOpenChange={setWaitlistOpen} />
      <CareersModal open={careersOpen} onOpenChange={setCareersOpen} />
    </div>
  )
}
