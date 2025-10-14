"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface EndSessionModalProps {
  elapsedTime: number
  totalCost: string
  onClose: () => void
  isStudent: boolean
}

export function EndSessionModal({ elapsedTime, totalCost, onClose, isStudent }: EndSessionModalProps) {
  const router = useRouter()
  const [stage, setStage] = useState<"confirm" | "rating" | "complete">("confirm")
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const handleEndSession = () => {
    if (isStudent) {
      setStage("rating")
    } else {
      setStage("complete")
      setTimeout(() => {
        router.push("/tutor/dashboard")
      }, 2000)
    }
  }

  const handleSubmitRating = () => {
    setStage("complete")
    setTimeout(() => {
      router.push("/student/dashboard")
    }, 2000)
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {stage === "confirm" && "End Session?"}
            {stage === "rating" && "Rate Your Tutor"}
            {stage === "complete" && "Session Complete"}
          </DialogTitle>
        </DialogHeader>

        {stage === "confirm" && (
          <div className="space-y-6">
            <Card className="p-6 bg-secondary/30">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Session Duration:</span>
                  <span className="font-semibold">{formatTime(elapsedTime)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rate:</span>
                  <span className="font-medium">$1.25/minute</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between text-base">
                  <span className="font-semibold">Total Cost:</span>
                  <span className="font-bold text-primary">${totalCost}</span>
                </div>
              </div>
            </Card>

            <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
              {isStudent ? (
                <p>
                  Your payment will be processed and the tutor will be paid. You'll receive a session summary and
                  recording via email.
                </p>
              ) : (
                <p>
                  The session will end and payment will be processed. Your earnings will be available for instant
                  cash-out.
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
                Continue Session
              </Button>
              <Button variant="destructive" className="flex-1" onClick={handleEndSession}>
                End Session
              </Button>
            </div>
          </div>
        )}

        {stage === "rating" && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">How was your experience with Alex Thompson?</p>
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)} className="transition-transform hover:scale-110">
                    <Star
                      className={`h-10 w-10 ${star <= rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Textarea
                placeholder="Share your feedback (optional)"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-24"
              />
            </div>

            <Button className="w-full" size="lg" onClick={handleSubmitRating} disabled={rating === 0}>
              Submit Rating
            </Button>
          </div>
        )}

        {stage === "complete" && (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              {isStudent
                ? "Your session summary and recording will be sent to your email."
                : "Your earnings have been added to your account."}
            </p>
            <p className="text-xs text-muted-foreground">Redirecting to dashboard...</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
