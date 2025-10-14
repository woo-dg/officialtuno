"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Loader2, Star, GraduationCap, Clock, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface MatchingModalProps {
  school: string
  courseCode: string
  topics: string[]
  onClose: () => void
}

interface Tutor {
  id: string
  name: string
  rating: number
  sessionsCompleted: number
  responseTime: string
  courses: string[]
}

const mockTutors: Tutor[] = [
  {
    id: "1",
    name: "Alex Thompson",
    rating: 4.9,
    sessionsCompleted: 342,
    responseTime: "< 1 min",
    courses: ["CS 101", "CS 102", "CS 201"],
  },
  {
    id: "2",
    name: "Jordan Lee",
    rating: 4.8,
    sessionsCompleted: 289,
    responseTime: "< 2 min",
    courses: ["CS 101", "MATH 221"],
  },
]

export function MatchingModal({ school, courseCode, topics, onClose }: MatchingModalProps) {
  const router = useRouter()
  const [stage, setStage] = useState<"searching" | "found" | "confirmed">("searching")
  const [progress, setProgress] = useState(0)
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null)
  const [swapTimer, setSwapTimer] = useState(10)

  useEffect(() => {
    // Simulate matching progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Simulate finding a tutor
    const matchTimeout = setTimeout(() => {
      setSelectedTutor(mockTutors[0])
      setStage("found")
    }, 2500)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(matchTimeout)
    }
  }, [])

  useEffect(() => {
    if (stage === "found" && swapTimer > 0) {
      const timer = setInterval(() => {
        setSwapTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setStage("confirmed")
            // Redirect to session room after confirmation
            setTimeout(() => {
              router.push("/session/demo-session-id")
            }, 1000)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [stage, swapTimer, router])

  const handleSwapTutor = () => {
    setSelectedTutor(mockTutors[1])
    setSwapTimer(10)
  }

  const handleConfirm = () => {
    setStage("confirmed")
    setTimeout(() => {
      router.push("/session/demo-session-id")
    }, 1000)
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {stage === "searching" && "Finding Your Tutor"}
            {stage === "found" && "Tutor Found!"}
            {stage === "confirmed" && "Connecting..."}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {stage === "searching" && (
            <>
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <p className="text-sm text-muted-foreground mb-4">Matching you with an expert tutor...</p>
                <Progress value={progress} className="w-full max-w-xs" />
              </div>

              <Card className="p-4 bg-secondary/30">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">School:</span>
                    <span className="font-medium">{school}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Course:</span>
                    <span className="font-medium">{courseCode}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Topics:</span>
                    <div className="flex gap-1">
                      {topics.map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}

          {stage === "found" && selectedTutor && (
            <>
              <Card className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {selectedTutor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{selectedTutor.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                        <span>{selectedTutor.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-3.5 w-3.5" />
                        <span>{selectedTutor.sessionsCompleted} sessions</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedTutor.courses.map((course) => (
                        <Badge key={course} variant="secondary" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Avg. response: {selectedTutor.responseTime}</span>
                  </div>
                  <Badge variant="default">Available Now</Badge>
                </div>
              </Card>

              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <p className="text-sm font-medium mb-1">Auto-connecting in {swapTimer} seconds</p>
                <p className="text-xs text-muted-foreground">You can swap tutors before the timer ends</p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={handleSwapTutor}>
                  Swap Tutor
                </Button>
                <Button className="flex-1" onClick={handleConfirm}>
                  Connect Now
                </Button>
              </div>
            </>
          )}

          {stage === "confirmed" && (
            <div className="flex flex-col items-center justify-center py-8">
              <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
              <p className="text-lg font-semibold mb-2">Tutor Confirmed!</p>
              <p className="text-sm text-muted-foreground">Entering session room...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
