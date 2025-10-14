"use client"

import Link from "next/link"
import { ArrowUp } from "lucide-react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-14 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 mb-6 sm:mb-8">
          {/* Left side - Terms & Privacy */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms & Policies
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
            <Link
              href="https://www.instagram.com/tuno_co?igsh=aWt5enUyZHBpODAwRemove"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Instagram
            </Link>
            <Link
              href="https://www.linkedin.com/company/tuno1/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </Link>
          </div>
        </div>

        <div className="border-t border-border/40 pt-6 sm:pt-8">
          <p className="text-xs sm:text-sm text-center text-muted-foreground mb-4">
            &copy; {new Date().getFullYear()} Tuno. All Rights Reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all mx-auto group"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  )
}
