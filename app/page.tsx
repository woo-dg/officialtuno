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

        <PlatformFeatures />

        <InteractiveDemo />

        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <Button
                size="lg"
                onClick={() => setWaitlistOpen(true)}
                className="h-16 px-12 text-xl rounded-full bg-foreground text-background hover:bg-foreground/90 hover:scale-105 hover:shadow-2xl transition-all duration-300 font-bold group"
              >
                <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                Tutors, Join Waitlist Now and get future perks!!
                <Sparkles className="w-6 h-6 ml-3 group-hover:-rotate-12 transition-transform" />
              </Button>
              <p className="mt-6 text-sm text-muted-foreground">
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
