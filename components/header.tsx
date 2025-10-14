"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

type HeaderProps = {
  onJoinWaitlist: () => void
  onOpenCareers: () => void
}

export function Header({ onJoinWaitlist, onOpenCareers }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Close mobile menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 supports-[backdrop-filter]:backdrop-blur-md ${
        scrolled ? "h-16 bg-background/60" : "h-20 bg-transparent"
      }`}
      role="banner"
    >
      <div className="mx-auto h-full w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-full items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="Tuno home" className="flex items-center gap-2">
            <Image
              src="/tuno-logo.png"
              alt="Tuno"
              width={180}
              height={90}
              priority
              className={`object-contain transition-all duration-500 ${
                scrolled ? "h-10 w-auto sm:h-12" : "h-12 w-auto sm:h-16"
              }`}
            />
          </Link>

          {/* Desktop actions */}
          <nav className="hidden items-center gap-3 lg:flex" aria-label="Primary">
            <Button
              size="lg"
              onClick={onOpenCareers}
              variant="outline"
              className={`rounded-full px-5 border-2 border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 motion-safe:hover:scale-105 transition-all duration-300 font-semibold ${
                scrolled ? "h-10 text-sm" : "h-11 text-base"
              }`}
            >
              Careers
            </Button>
            <Button
              size="lg"
              onClick={onJoinWaitlist}
              className={`rounded-full px-6 bg-foreground text-background hover:bg-foreground/90 motion-safe:hover:scale-105 hover:shadow-2xl transition-all duration-300 font-semibold ${
                scrolled ? "h-10 text-sm" : "h-11 text-base"
              }`}
            >
              Join the Waitlist
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              size="icon"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className={`rounded-full border-2 border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 transition-all duration-300 ${
                scrolled ? "h-10 w-10" : "h-11 w-11"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden transition-[max-height,opacity] duration-300 ease-out overflow-hidden ${
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-4">
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <Button
              onClick={() => {
                setMobileOpen(false)
                onOpenCareers()
              }}
              variant="outline"
              className="h-11 rounded-2xl border-2 border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 font-semibold"
            >
              Careers
            </Button>
            <Button
              onClick={() => {
                setMobileOpen(false)
                onJoinWaitlist()
              }}
              className="h-11 rounded-2xl bg-foreground text-background hover:bg-foreground/90 font-semibold"
            >
              Join the Waitlist
            </Button>
          </div>

          {/* Optional secondary links row */}
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href="#how-it-works"
              onClick={() => setMobileOpen(false)}
              className="rounded-full border border-foreground/15 px-4 py-2 text-sm hover:bg-foreground/5"
            >
              How it works
            </Link>
            <Link
              href="#faq"
              onClick={() => setMobileOpen(false)}
              className="rounded-full border border-foreground/15 px-4 py-2 text-sm hover:bg-foreground/5"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
