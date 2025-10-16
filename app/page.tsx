"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { WaitlistModal } from "@/components/waitlist-modal"
import { InteractiveDemo } from "@/components/interactive-demo"
import { PlatformFeatures } from "@/components/platform-features"
import { FAQSection } from "@/components/faq-section"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function HomePage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Header onJoinWaitlist={() => setWaitlistOpen(true)} />

      <main className="flex-1">
        <HeroSection onJoinWaitlist={() => setWaitlistOpen(true)} />

        <div className="w-full">
          <InteractiveDemo />
        </div>

        <div className="w-full">
          <PlatformFeatures />
        </div>

        <section className="py-16 sm:py-20 bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <Button
                onClick={() => setWaitlistOpen(true)}
                className="w-full sm:w-auto h-12 sm:h-14 lg:h-16 px-6 sm:px-10 lg:px-12 text-base sm:text-lg lg:text-xl rounded-full bg-foreground text-background hover:bg-foreground/90 hover:scale-105 hover:shadow-2xl transition-all duration-300 font-bold group"
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:rotate-12 transition-transform" />
                Tutors, Join Waitlist Now and get future perks!!
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3 group-hover:-rotate-12 transition-transform" />
              </Button>

              <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground px-2 sm:px-0">
                Be among the first tutors on our platform and receive exclusive benefits
              </p>
            </div>
          </div>
        </section>

        <FAQSection />
      </main>

      <Footer />

      <WaitlistModal open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </div>
  )
}
