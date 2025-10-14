"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "h-14 sm:h-16 bg-transparent backdrop-blur-md" : "h-16 sm:h-20 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 h-full">
        <div className="flex h-full items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/tuno-logo.png"
              alt="Tuno"
              width={180}
              height={90}
              priority
              sizes="(max-width: 640px) 140px, 180px"
              className={`object-contain transition-all duration-500 ${
                scrolled ? "h-10 sm:h-12 w-auto" : "h-12 sm:h-16 w-auto"
              }`}
            />
          </Link>

          <Button
            size="lg"
            onClick={onJoinWaitlist}
            className={`rounded-full font-semibold transition-all duration-300 bg-foreground text-background hover:bg-foreground/90 hover:scale-105 hover:shadow-2xl
              ${scrolled ? "h-10 text-xs sm:text-sm px-4 sm:px-6" : "h-11 text-sm sm:text-base px-4 sm:px-6"}`}
          >
            Join the Waitlist
          </Button>
        </div>
      </div>
    </header>
  )
}
