"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header({ onJoinWaitlist, onOpenCareers }: { onJoinWaitlist: () => void; onOpenCareers: () => void }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "h-16 bg-transparent backdrop-blur-md" : "h-20 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 h-full">
        <div className="flex h-full items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/tuno-logo.png"
              alt="Tuno"
              width={180}
              height={90}
              className={`object-contain transition-all duration-500 ${scrolled ? "h-12 w-auto" : "h-16 w-auto"}`}
              priority
            />
          </Link>

          <div className="flex items-center gap-3">
            <Button
              size="lg"
              onClick={onOpenCareers}
              variant="outline"
              className={`rounded-full px-6 border-2 border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 hover:scale-105 transition-all duration-300 font-semibold ${
                scrolled ? "h-10 text-sm" : "h-11 text-base"
              }`}
            >
              Careers
            </Button>

            <Button
              size="lg"
              onClick={onJoinWaitlist}
              className={`rounded-full px-6 bg-foreground text-background hover:bg-foreground/90 hover:scale-105 hover:shadow-2xl transition-all duration-300 font-semibold ${
                scrolled ? "h-10 text-sm" : "h-11 text-base"
              }`}
            >
              Join the Waitlist
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
