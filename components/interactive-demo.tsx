"use client"

import { useEffect, useState, useRef } from "react"
import { Check, Video, MessageSquare, BookOpen, Search, Star, DollarSign, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function InteractiveDemo() {
  const [step, setStep] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [connected, setConnected] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [showWhiteboard, setShowWhiteboard] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const hasTriggered = useRef(false)
  const fullText = "Need help with calculus derivatives"

  const whiteboardContent = [
    "Derivative Rules:",
    "d/dx(x²) = 2x",
    "d/dx(sin x) = cos x",
    "Example: Find d/dx(3x² + 2x)",
    "= 6x + 2",
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true
          setTimeout(() => {
            setIsVisible(true)
          }, 10)
        }
      },
      { threshold: 0.1 },
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

  useEffect(() => {
    if (step === 8) {
      const resetTimer = setTimeout(() => {
        setStep(0)
        setTypedText("")
        setConnected(false)
        setSelectedRating(0)
        setHoveredRating(0)
        setShowWhiteboard(false)
        setShowLoading(false)
      }, 5000)
      return () => clearTimeout(resetTimer)
    }
  }, [step])

  useEffect(() => {
    if (step === 0 && typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    } else if (step === 0 && typedText.length === fullText.length) {
      setTimeout(() => setStep(1), 500)
    }

    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 1500)
      return () => clearTimeout(timer)
    }
    if (step === 2) {
      const timer = setTimeout(() => setStep(3), 2000)
      return () => clearTimeout(timer)
    }
    if (step === 3) {
      const timer = setTimeout(() => setStep(4), 1500)
      return () => clearTimeout(timer)
    }
    if (step === 4) {
      const timer = setTimeout(() => setStep(5), 1000)
      return () => clearTimeout(timer)
    }
    if (step === 5) {
      const timer = setTimeout(() => {
        setConnected(true)
        setStep(6)
      }, 1500)
      return () => clearTimeout(timer)
    }
    if (step === 6) {
      const timer = setTimeout(() => {
        setShowLoading(true)
        setStep(6.25)
      }, 2000)
      return () => clearTimeout(timer)
    }
    if (step === 6.25) {
      const timer = setTimeout(() => {
        setShowLoading(false)
        setShowWhiteboard(true)
        setStep(6.5)
      }, 800)
      return () => clearTimeout(timer)
    }
    if (step === 6.5) {
      const timer = setTimeout(() => setStep(7), 5000)
      return () => clearTimeout(timer)
    }
    if (step === 7) {
      const timer = setTimeout(() => setStep(8), 2000)
      return () => clearTimeout(timer)
    }
  }, [step, typedText])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const getCurrentStage = () => {
    if (step === 0 || step === 1) return "Stage 1: Student fills out and sends request"
    if (step === 2 || step === 3) return "Stage 2: Tutor accepts request"
    if (step >= 4 && step < 7) return "Stage 3: Student clicks 'Hop on Call' to enter video call"
    if (step >= 7) return "Stage 4: Session ends with rating and payout"
    return ""
  }

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 bg-background transition-all duration-[1500ms] ease-out ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-24 scale-95"
      }`}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <div className={`absolute inset-0 transition-all duration-[2000ms] ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/5 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-foreground/10 blur-[100px] rounded-full" />
      </div>

      <div
        className={`text-center mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"
        }`}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 relative">
          <span className="relative inline-block">
            The new standard in tutoring.
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent animate-shimmer" />
          </span>
        </h2>

        <div className="mt-12 flex justify-center">
          <Card className="inline-block px-6 py-2 bg-foreground/5 border-2 border-foreground/10">
            <p className="text-sm font-medium text-foreground/70">{getCurrentStage()}</p>
          </Card>
        </div>
      </div>

      <div
        className={`grid md:grid-cols-2 gap-0 relative max-w-7xl mx-auto transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block z-10" />

        {/* Left Screen - Student Side */}
        <div className="p-8 md:p-12 flex flex-col items-center justify-center min-h-[500px] relative">
          <div className="text-center mb-4 animate-fade-up">
            <h3 className="text-2xl font-bold mb-2">Student</h3>
            <p className="text-sm text-muted-foreground">Request instant help</p>
          </div>

          <div className="w-full max-w-lg">
            <Card className="overflow-hidden shadow-2xl border-2 animate-fade-up">
              <div className="bg-secondary/50 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-background rounded px-3 py-1 text-xs text-muted-foreground">
                  tuno.com/request
                </div>
              </div>

              <div className="p-4 space-y-4 min-h-[280px]">
                {step >= 0 && step < 4 && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium">What do you need help with?</label>
                    <div className="bg-secondary/30 rounded-lg p-3 min-h-[50px] font-mono text-sm">
                      {typedText}
                      {showCursor && step === 0 && <span className="inline-block w-0.5 h-4 bg-foreground ml-1" />}
                    </div>
                  </div>
                )}

                {step >= 1 && step < 4 && (
                  <Button
                    className="w-full h-12 text-base rounded-full bg-foreground text-background hover:bg-foreground/90 animate-slide-up"
                    disabled={step > 1}
                  >
                    {step === 1 && <span className="animate-pulse">Instant Session →</span>}
                    {step > 1 && "Instant Session"}
                  </Button>
                )}

                {step >= 2 && step < 4 && (
                  <Card className="p-5 animate-slide-up border-2">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <Search className="w-5 h-5 animate-spin" />
                      <span className="text-base font-medium">Finding your tutor...</span>
                    </div>
                    <div className="flex justify-center gap-2">
                      <div
                        className="w-2 h-2 bg-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0s" }}
                      />
                      <div
                        className="w-2 h-2 bg-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 bg-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </Card>
                )}

                {step >= 4 && step < 7 && (
                  <Card className="p-5 animate-slide-up border-2 border-foreground/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center text-lg font-bold">
                        JD
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-base">John Doe</h4>
                        <p className="text-xs text-muted-foreground">Calculus Expert</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs font-medium">⭐ 4.9 (127 sessions)</span>
                        </div>
                      </div>
                    </div>
                    {step >= 5 && step < 6 && (
                      <Button className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90 h-11 animate-slide-up">
                        {step === 5 ? <span className="animate-pulse">Hop on Call →</span> : "Hop on Call"}
                      </Button>
                    )}
                  </Card>
                )}

                {step >= 6 && step < 6.25 && (
                  <div className="animate-slide-up">
                    <Card className="p-5 bg-foreground text-background transition-opacity duration-500">
                      <div className="text-center">
                        <Check className="w-10 h-10 mx-auto mb-2" />
                        <p className="text-lg font-bold">Session Connected!</p>
                        <p className="text-sm opacity-90 mt-1">You're now connected with John</p>
                      </div>
                    </Card>
                    <div className="flex items-center justify-center gap-4 mt-5">
                      <Video className="w-5 h-5 animate-float" />
                      <MessageSquare className="w-5 h-5 animate-float" style={{ animationDelay: "0.5s" }} />
                      <BookOpen className="w-5 h-5 animate-float" style={{ animationDelay: "1s" }} />
                    </div>
                  </div>
                )}

                {step >= 6.25 && step < 6.5 && (
                  <Card className="p-6 bg-background border-2 animate-slide-up">
                    <div className="text-center">
                      <Loader2 className="w-10 h-10 mx-auto mb-3 animate-spin text-foreground" />
                      <p className="text-sm font-medium text-muted-foreground">Loading whiteboard...</p>
                    </div>
                  </Card>
                )}

                {step >= 6.5 && step < 7 && (
                  <div className="transition-opacity duration-700 ease-in" style={{ opacity: showWhiteboard ? 1 : 0 }}>
                    <Card className="p-4 bg-background border-2">
                      <div className="bg-white rounded-lg p-4 min-h-[240px] border-2 border-foreground/10 relative flex items-center justify-center">
                        <svg width="300" height="120" viewBox="0 0 300 120" className="overflow-visible">
                          <path
                            d="M 20 60 Q 25 40, 35 50 Q 40 55, 45 50 L 50 70 M 60 45 Q 65 50, 70 45 Q 75 40, 80 50 L 85 65 M 95 50 L 100 65 Q 105 55, 110 60 M 120 45 Q 125 55, 130 50 L 135 65 Q 140 60, 145 65 M 155 50 Q 160 45, 165 55 L 170 65 M 180 50 Q 185 60, 190 50 L 195 65 M 205 45 L 210 65 Q 215 55, 220 60 M 230 50 Q 235 45, 240 55 Q 245 60, 250 50 L 255 65"
                            stroke="#2563eb"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                              strokeDasharray: 600,
                              strokeDashoffset: 600,
                              animation: "draw 5s ease-out forwards",
                            }}
                          />
                          <circle
                            r="5"
                            fill="#2563eb"
                            style={{
                              offsetPath:
                                'path("M 20 60 Q 25 40, 35 50 Q 40 55, 45 50 L 50 70 M 60 45 Q 65 50, 70 45 Q 75 40, 80 50 L 85 65 M 95 50 L 100 65 Q 105 55, 110 60 M 120 45 Q 125 55, 130 50 L 135 65 Q 140 60, 145 65 M 155 50 Q 160 45, 165 55 L 170 65 M 180 50 Q 185 60, 190 50 L 195 65 M 205 45 L 210 65 Q 215 55, 220 60 M 230 50 Q 235 45, 240 55 Q 245 60, 250 50 L 255 65")',
                              animation: "moveMarker 5s ease-out forwards",
                            }}
                          />
                        </svg>
                        <style jsx>{`
                          @keyframes draw {
                            to {
                              stroke-dashoffset: 0;
                            }
                          }
                          @keyframes moveMarker {
                            to {
                              offset-distance: 100%;
                            }
                          }
                        `}</style>
                      </div>
                      <div className="flex items-center justify-center gap-3 mt-3 text-xs text-muted-foreground">
                        <Video className="w-4 h-4" />
                        <span>Session in progress...</span>
                      </div>
                    </Card>
                  </div>
                )}

                {step >= 7 && (
                  <div className="animate-slide-up space-y-4">
                    <Card className="p-4 border-2 border-foreground/20">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center text-sm font-bold">
                          JD
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm">John Doe</h4>
                          <p className="text-xs text-muted-foreground">Calculus Expert</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-5 bg-foreground text-background">
                      <div className="text-center">
                        <p className="text-lg font-bold mb-4">Session has Ended</p>
                        <p className="text-sm opacity-90 mb-4">How was your experience?</p>
                        <div className="flex justify-center gap-2 mb-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-8 h-8 cursor-pointer transition-all duration-200 hover:scale-110 ${
                                star <= (hoveredRating || selectedRating)
                                  ? "fill-background text-background"
                                  : "fill-none text-background/40"
                              }`}
                              onMouseEnter={() => setHoveredRating(star)}
                              onMouseLeave={() => setHoveredRating(0)}
                              onClick={() => setSelectedRating(star)}
                            />
                          ))}
                        </div>
                        <div className="text-sm opacity-90 pt-3 border-t border-background/20">
                          <p>Session duration: 15 minutes</p>
                          <p className="font-bold mt-1">Total cost: $6.00</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Right Screen - Tutor Side */}
        <div className="p-8 md:p-12 flex flex-col items-center justify-center min-h-[500px] relative">
          <div className="text-center mb-4 animate-fade-up">
            <h3 className="text-2xl font-bold mb-2">Tutor</h3>
            <p className="text-sm text-muted-foreground">Accept requests instantly</p>
          </div>

          <div className="w-full max-w-lg">
            <Card className="overflow-hidden shadow-2xl border-2 animate-fade-up">
              <div className="bg-secondary/50 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-background rounded px-3 py-1 text-xs text-muted-foreground">
                  tuno.com/tutor/dashboard
                </div>
              </div>

              <div className="p-4 space-y-4 min-h-[280px]">
                {step < 2 && (
                  <Card className="p-6 border-dashed">
                    <div className="text-center text-muted-foreground">
                      <div className="w-14 h-14 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-3">
                        <Search className="w-7 h-7 animate-pulse-subtle" />
                      </div>
                      <p className="text-sm font-medium">Waiting for requests...</p>
                    </div>
                  </Card>
                )}

                {step >= 2 && step < 4 && (
                  <Card className="p-5 border-2 border-foreground animate-slide-up shadow-lg">
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <h4 className="font-bold text-base">New Session Request</h4>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Subject:</span> Calculus
                        </p>
                        <p>
                          <span className="font-medium">Topic:</span> Derivatives
                        </p>
                        <p>
                          <span className="font-medium">Level:</span> University
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        className="flex-1 rounded-full bg-foreground text-background hover:bg-foreground/90 h-11"
                        disabled={step > 2}
                      >
                        {step === 2 && <span className="animate-pulse font-semibold">Accept →</span>}
                        {step > 2 && (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Accepted
                          </>
                        )}
                      </Button>
                      <Button variant="outline" className="flex-1 rounded-full h-11 bg-transparent" disabled={step > 2}>
                        Decline
                      </Button>
                    </div>
                  </Card>
                )}

                {step >= 4 && step < 6 && (
                  <Card className="p-5 animate-slide-up border-2">
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-full bg-foreground/10 flex items-center justify-center mx-auto mb-3">
                        <div className="w-10 h-10 rounded-full border-4 border-foreground border-t-transparent animate-spin" />
                      </div>
                      <p className="text-base font-semibold mb-2">Connecting to student...</p>
                      <div className="flex justify-center gap-2">
                        <div
                          className="w-2 h-2 bg-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0s" }}
                        />
                        <div
                          className="w-2 h-2 bg-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                        <div
                          className="w-2 h-2 bg-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        />
                      </div>
                    </div>
                  </Card>
                )}

                {step >= 6 && step < 6.25 && (
                  <Card className="p-6 bg-foreground text-background animate-slide-up transition-opacity duration-500">
                    <div className="text-center">
                      <Check className="w-14 h-14 mx-auto mb-3" />
                      <p className="text-xl font-bold mb-2">Session Active</p>
                      <p className="text-sm opacity-90">Connected with student</p>
                      <div className="mt-5 pt-5 border-t border-background/20">
                        <div className="flex items-center justify-between text-sm">
                          <span className="opacity-90">Session time:</span>
                          <span className="font-mono font-bold">00:15:00</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                {step >= 6.25 && step < 6.5 && (
                  <Card className="p-6 bg-background border-2 animate-slide-up">
                    <div className="text-center">
                      <Loader2 className="w-10 h-10 mx-auto mb-3 animate-spin text-foreground" />
                      <p className="text-sm font-medium text-muted-foreground">Loading whiteboard...</p>
                    </div>
                  </Card>
                )}

                {step >= 6.5 && step < 7 && (
                  <div className="transition-opacity duration-700 ease-in" style={{ opacity: showWhiteboard ? 1 : 0 }}>
                    <Card className="p-4 bg-background border-2">
                      <div className="bg-white rounded-lg p-4 min-h-[240px] border-2 border-foreground/10 relative flex items-center justify-center">
                        <svg width="300" height="120" viewBox="0 0 300 120" className="overflow-visible">
                          <path
                            d="M 20 60 Q 25 40, 35 50 Q 40 55, 45 50 L 50 70 M 60 45 Q 65 50, 70 45 Q 75 40, 80 50 L 85 65 M 95 50 L 100 65 Q 105 55, 110 60 M 120 45 Q 125 55, 130 50 L 135 65 Q 140 60, 145 65 M 155 50 Q 160 45, 165 55 L 170 65 M 180 50 Q 185 60, 190 50 L 195 65 M 205 45 L 210 65 Q 215 55, 220 60 M 230 50 Q 235 45, 240 55 Q 245 60, 250 50 L 255 65"
                            stroke="#2563eb"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                              strokeDasharray: 600,
                              strokeDashoffset: 600,
                              animation: "draw 5s ease-out forwards",
                            }}
                          />
                          <circle
                            r="5"
                            fill="#2563eb"
                            style={{
                              offsetPath:
                                'path("M 20 60 Q 25 40, 35 50 Q 40 55, 45 50 L 50 70 M 60 45 Q 65 50, 70 45 Q 75 40, 80 50 L 85 65 M 95 50 L 100 65 Q 105 55, 110 60 M 120 45 Q 125 55, 130 50 L 135 65 Q 140 60, 145 65 M 155 50 Q 160 45, 165 55 L 170 65 M 180 50 Q 185 60, 190 50 L 195 65 M 205 45 L 210 65 Q 215 55, 220 60 M 230 50 Q 235 45, 240 55 Q 245 60, 250 50 L 255 65")',
                              animation: "moveMarker 5s ease-out forwards",
                            }}
                          />
                        </svg>
                        <style jsx>{`
                          @keyframes draw {
                            to {
                              stroke-dashoffset: 0;
                            }
                          }
                          @keyframes moveMarker {
                            to {
                              offset-distance: 100%;
                            }
                          }
                        `}</style>
                      </div>
                      <div className="flex items-center justify-center gap-3 mt-3 text-xs text-muted-foreground">
                        <Video className="w-4 h-4" />
                        <span>Teaching in progress...</span>
                      </div>
                    </Card>
                  </div>
                )}

                {step >= 7 && (
                  <div className="animate-slide-up">
                    <Card className="p-6 bg-foreground text-background">
                      <div className="text-center">
                        <p className="text-xl font-bold mb-4">Session has Ended</p>
                        <div className="my-6">
                          <div className="w-16 h-16 rounded-full bg-background/20 flex items-center justify-center mx-auto mb-3">
                            <DollarSign className="w-10 h-10" />
                          </div>
                          <p className="text-sm opacity-90 mb-2">You earned</p>
                          <p className="text-4xl font-bold mb-2">$6.00</p>
                          <p className="text-sm opacity-90">15 minutes @ $0.40/min</p>
                        </div>
                        <div className="pt-4 border-t border-background/20">
                          <p className="text-xs opacity-90">Payment processed instantly</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
