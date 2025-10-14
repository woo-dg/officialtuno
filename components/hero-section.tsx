"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ImageIcon, BookOpen, Calculator, Lightbulb, Atom, Code, PenTool, Globe, Microscope } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function HeroSection({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  const [query, setQuery] = useState("")
  const [subject, setSubject] = useState("")
  const [level, setLevel] = useState("")
  const heroRef = useRef<HTMLElement>(null)
  const lightingRef = useRef<HTMLDivElement>(null)
  const lastUpdate = useRef(0)
  const [scrollY, setScrollY] = useState(0)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  const phrases = [
    "Stuck at 11:43 P.M?",
    "Test tomorrow morning?",
    "Assignment due at midnight?",
    "Can't figure it out?",
    "Cramming last minute?",
    "Confused at 2 A.M?",
    "Need help right now?",
  ]

  // rotate phrases
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentPhraseIndex((p) => (p + 1) % phrases.length)
        setIsTransitioning(false)
      }, 300)
    }, 2500)
    return () => clearInterval(interval)
  }, [phrases.length])

  // detect md+ to enable background effects only on larger screens
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener?.("change", update)
    return () => mq.removeEventListener?.("change", update)
  }, [])

  // mouse glow only on desktop
  useEffect(() => {
    if (!isDesktop) return
    let rafId: number
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastUpdate.current < 16) return
      lastUpdate.current = now
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (heroRef.current && lightingRef.current) {
          const rect = heroRef.current.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          lightingRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(0,0,0,0.08), transparent 40%)`
        }
      })
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isDesktop])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onJoinWaitlist()
  }

  const floatingIcons = [
    { Icon: Calculator, top: "15%", left: "10%", delay: "0s", size: 48 },
    { Icon: BookOpen, top: "25%", right: "15%", delay: "0.5s", size: 42 },
    { Icon: Lightbulb, top: "45%", left: "8%", delay: "1s", size: 46 },
    { Icon: Atom, top: "60%", right: "12%", delay: "1.5s", size: 44 },
    { Icon: Code, top: "70%", left: "15%", delay: "2s", size: 40 },
    { Icon: PenTool, top: "35%", right: "8%", delay: "2.5s", size: 40 },
    { Icon: Globe, top: "80%", right: "20%", delay: "3s", size: 42 },
    { Icon: Microscope, top: "20%", left: "20%", delay: "3.5s", size: 44 },
  ]

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20"
    >
      {isDesktop && <div ref={lightingRef} className="pointer-events-none absolute inset-0 opacity-30" />}

      {isDesktop && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingIcons.map(({ Icon, top, left, right, delay, size }, index) => (
            <div
              key={index}
              className="animate-float absolute transition-transform duration-300 ease-out"
              style={{ top, left, right, animationDelay: delay, transform: `translateY(${scrollY * 0.15}px)` }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-foreground/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div
                  className="relative bg-background/50 backdrop-blur-sm border-2 border-foreground/10 rounded-2xl p-4 shadow-lg hover:shadow-2xl hover:scale-110 hover:border-foreground/20 transition-all duration-500"
                  style={{ width: size, height: size }}
                >
                  <Icon className="w-full h-full text-foreground/20 group-hover:text-foreground/30 transition-colors duration-500" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 text-center container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* rotating phrase */}
        <div className="relative h-7 sm:h-8 md:h-10 mb-3 sm:mb-4 overflow-hidden">
          <p
            className={`text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 font-semibold tracking-wide absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            {phrases[currentPhraseIndex]}
          </p>
        </div>

        <h1
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-5 md:mb-6 animate-fade-up text-foreground/90"
          style={{ animationDelay: "0.1s" }}
        >
          the shortcut to
          <br />
          &ldquo;ohhh i get it&rdquo;
        </h1>

        <p
          className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/70 mb-8 md:mb-12 max-w-3xl mx-auto font-medium animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Connect with verified tutors in ~30 seconds. Pay by the minute — only 40 cents.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[1400px] mx-auto animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="flex flex-col md:flex-row items-stretch gap-4">
            <div className="relative group flex-1">
              <div className="absolute inset-0 bg-foreground/5 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
              <div className="relative bg-card border-2 border-border rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl hover:scale-[1.02] transition-all duration-500">
                <div className="flex flex-col md:flex-row items-center gap-3 p-4 md:p-6 md:px-8">
                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <button
                      type="button"
                      className="p-2 rounded-full hover:bg-secondary/50 transition-all duration-300 hover:scale-110"
                      aria-label="Upload image"
                    >
                      <ImageIcon className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>

                  <Input
                    type="text"
                    placeholder="What topic or question do you need help with?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 w-full min-w-0 md:min-w-[400px] border-0 bg-transparent text-base md:text-lg h-12 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
                  />

                  <div className="flex items-stretch md:items-center gap-3 w-full md:w-auto">
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger className="w-full md:w-[130px] h-11 rounded-full border-2">
                        <SelectValue placeholder="Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math">Math</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                        <SelectItem value="cs">Computer Science</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={level} onValueChange={setLevel}>
                      <SelectTrigger className="w-full md:w-[130px] h-11 rounded-full border-2">
                        <SelectValue placeholder="Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="university">University</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="rounded-full h-12 md:h-[88px] px-6 md:px-8 bg-foreground text-background hover:bg-foreground/90 hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-lg font-semibold text-base whitespace-nowrap w-full md:w-auto"
            >
              Join the Waitlist
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
